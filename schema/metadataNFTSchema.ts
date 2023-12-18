import * as Yup from "yup";
import { MetadataNFT, TraitNFT, ValueType } from "../types/types";

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
