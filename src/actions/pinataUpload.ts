"use server";

import { fileNFTSchema, metadataNFTSchema } from "@/schema/metadataNFTSchema";
import { NFTPinataResponse } from "@/types/types";
import * as Yup from "yup";

export const uploadToPinata = async (
  formdata: FormData
): Promise<NFTPinataResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const file = formdata.get("file") as File;
      const body = JSON.parse(formdata.get("metadata") as string);
      await metadataNFTSchema.validate(body, { abortEarly: false });
      if (!file) reject("Please Update an image File");

      await fileNFTSchema.validate({ file });

      // const { IpfsHash } = await saveFile(_files.file);
      const IpfsHash = "0xIpfsHashFile";
      const metadata = {
        ...body,
        image: `ipfs://${IpfsHash}`,
      };
      // const { IpfsHash: metadataIpfsHash } = await saveJSON(body);
      const cid = "0xIpfsHashFile";
      resolve({ cid, metadata });
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        reject(error.message);
      }
      reject("Internal Server Error");
    }
  });
};
