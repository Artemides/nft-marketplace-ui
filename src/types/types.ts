import { z } from "zod";
import { NFTForm as NFTFormSchema } from "../schema/nft";

type TraitValueType = "number" | "string" | "date";

export type NFTTrait = {
  type: string;
  value: string;
  valueType?: TraitValueType;
};

export type NFTBaseMetadata = {
  name: string;
  description: string;
  traits?: NFTTrait[];
};

export type NFTMetadata = NFTBaseMetadata & {
  image: string;
};

export type NFTFile = {
  file: File | null;
};

type NFTForm = z.infer<typeof NFTFormSchema>;
