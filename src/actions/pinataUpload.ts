"use server";

import { fileNFTSchema, metadataNFTSchema } from "@/schema/metadataNFTSchema";
import * as Yup from "yup";
export const uploadToPinata = async (formdata: FormData): Promise<String> => {
  return new Promise(async (resolve, reject) => {
    try {
      const file = formdata.get("file") as File;
      console.log({ file });
      const metadata = JSON.parse(formdata.get("metadata") as string);
      await metadataNFTSchema.validate(metadata, { abortEarly: false });
      if (!file) reject("Please Update an image File");

      await fileNFTSchema.validate(file);

      // const { IpfsHash } = await saveFile(_files.file);
      const IpfsHash = "0xIpfsHashFile";
      const body = {
        ...metadata,
        image: IpfsHash,
      };
      console.log({ body });
      // const { IpfsHash: metadataIpfsHash } = await saveJSON(body);
      const metadataIpfsHash = "0xIpfsHashFile";
      resolve(metadataIpfsHash);
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        reject(error.message);
      }
      reject("Internal Server Error");
    }
  });
};
