import formidable from "formidable";
import * as Yup from "yup";
export type MetadataNFT = {
  name: string;
  description: string;
};

export type MetadataNFTFiles = {
  file: formidable.File;
};

export const metadataNFTSchema: Yup.ObjectSchema<MetadataNFT> = Yup.object({
  name: Yup.string()
    .max(15, "Name cannot contain more than 15 chars")
    .required("NFT name required"),
  description: Yup.string()
    .max(150, "NFT description cannot be more than 150 chars")
    .required("NFT description required"),
});
