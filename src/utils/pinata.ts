import fs from "fs";
import pinata from "../../pinata.config";
import { PinataPinOptions, PinataPinResponse } from "@pinata/sdk";
import { NFTMetadata } from "@/types/types";
import { unlinkFileLocally, uploadFileLocally } from "./files";
import path from "path";

export const saveFile = async (file: File) => {
  try {
    const { name, ext: type } = path.parse(file.name);
    const filepath = await uploadFileLocally(file);
    const stream = fs.createReadStream(filepath);
    const options: PinataPinOptions = {
      pinataMetadata: {
        name,
        size: file.size,
        type,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    await unlinkFileLocally(filepath);

    return response;
  } catch (error) {
    throw error;
  }
};
export const saveJSON = async (
  metadata: NFTMetadata & { image: string }
): Promise<PinataPinResponse> => {
  try {
    const options: PinataPinOptions = {};
    const response = await pinata.pinJSONToIPFS(metadata, options);
    return response;
  } catch (error) {
    throw error;
  }
};
