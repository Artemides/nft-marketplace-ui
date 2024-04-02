import { MetadataNFT } from "@/types/types";
import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/constants";
import { z } from "zod";

type TraitValueType = number | string | Date;

type NFTTrait = {
  type: string;
  value: string;
  valueType?: TraitValueType;
};

type NFTBaseMetadata = {
  name: string;
  description: string;
  traits?: NFTTrait[];
};

type NFTMetadata = NFTBaseMetadata & {
  tokenURI: string;
};

type NFTFile = {
  file: File;
};

export const NFTTraits: z.ZodType<NFTTrait> = z.object({
  type: z.string().max(25),
  value: z.string().max(15),
  valueType: z.enum(["string", "number", "date"]).optional(),
});

export const NFTBaseMetadata: z.ZodType<NFTBaseMetadata> = z.object({
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

export const NFTFile: z.ZodType<NFTFile> = z.object({
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
