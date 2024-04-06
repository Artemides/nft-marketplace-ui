import { NFTBaseMetadata as TNFTBaseMetadata, NFTFile as TNFTFile, NFTTrait } from "@/types/types";
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/constants";
import { z } from "zod";

export const NFTTraits: z.ZodType<NFTTrait> = z.object({
  type: z.string().min(1, `Trait "type" required`).max(25, `Trait "type" too long`),
  value: z.string().min(1, `Trait "value" required`).max(25, `Trait "value" too long`),
  valueType: z.enum(["string", "number", "date"]).optional(),
});

export const NFTBaseMetadata: z.ZodType<TNFTBaseMetadata> = z.object({
  name: z
    .string()
    .trim()
    .min(1, "NFT name required")
    .max(30, "NFT name cannot be longer than 30 letters"),
  description: z
    .string()
    .trim()
    .min(1, "NFT description required")
    .max(100, "NFT description cannot be longer than 150 letter"),
  traits: NFTTraits.array().optional(),
});

export const NFTFile: z.ZodType<TNFTFile> = z.object({
  file: z.custom<File>().superRefine((file, ctx) => {
    if (!file || !file.size) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Choose a NFT Image",
      });
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `NFT's file is not allowed: got ${
          file.type
        }, supported: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      });
    }

    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        type: "array",
        message: `NFT's file must be larger than ${MAX_FILE_SIZE} bytes, got ${file.size}`,
        maximum: MAX_FILE_SIZE,
        inclusive: true,
      });
    }
  }),
});

export const NFTForm = NFTBaseMetadata.and(NFTFile);
