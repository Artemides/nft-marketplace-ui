import { NFTForm } from "@/schema/nft";
import { z } from "zod";

export type FormError<Form> = Record<keyof Form, string>;

export type NFTForm = z.infer<typeof NFTForm>;
