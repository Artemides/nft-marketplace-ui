import formidable from "formidable";

export type ValueType = number | string | Date;

export type TraitNFT = {
  type: string;
  value: string;
  valueType?: ValueType;
};

export type MetadataNFT = {
  name: string;
  description: string;
  traits?: TraitNFT[];
};

export type MetadataNFTFiles = {
  file: formidable.File;
};
