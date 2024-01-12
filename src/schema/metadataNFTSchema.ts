import * as Yup from "yup";
import { FileNFT, MetadataNFT, NFT, TraitNFT, ValueType } from "../types/types";

export const traitTypeSchema: Yup.ObjectSchema<TraitNFT> = Yup.object({
  type: Yup.string().max(15).required("NFT trait type is required"),
  value: Yup.string().max(15).required("NFT trait value is required"),
  valueType: Yup.mixed<ValueType>().oneOf(["string", "number", "date"]),
});

export const metadataNFTSchema: Yup.ObjectSchema<MetadataNFT> = Yup.object({
  name: Yup.string()
    .max(15, "Name cannot contain more than 15 chars")
    .required("NFT name required"),
  description: Yup.string()
    .max(100, "NFT description cannot be more than 150 chars")
    .required("NFT description required"),
  traits: Yup.array().of(traitTypeSchema),
});

export const fileNFTSchema = Yup.object().shape({
  file: Yup.mixed<File>()
    .required("NFT File is required")
    .test("File type validation", "File is not allowed", (file) => {
      if (!file) return true;

      const allowedFormats = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
        "image/svg",
      ];
      const isAllowedFormat = allowedFormats.includes(file.type);
      return isAllowedFormat;
    })
    .test("File size validation", "File is too large", (file) => {
      if (!file) return true;

      return file.size <= 50 * 1024 * 1024;
    }),
});

export const NFTSchema = metadataNFTSchema.concat(fileNFTSchema);
