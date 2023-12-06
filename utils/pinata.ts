import fs from "fs";
import pinata from "../pinata.config";
import { PinataPinOptions, PinataPinResponse } from "@pinata/sdk";
import formidable from "formidable";
import { MetadataNFT } from "../types/types";

export const saveFile = async (
  file: formidable.File
): Promise<PinataPinResponse> => {
  try {
    const stream = fs.createReadStream(file.filepath);
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: file.originalFilename,
        size: file.size,
        type: file.mimetype,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(file.filepath);
    return response;
  } catch (error) {
    throw error;
  }
};
export const saveJSON = async (
  metadata: MetadataNFT
): Promise<PinataPinResponse> => {
  try {
    const options: PinataPinOptions = {};
    const response = await pinata.pinJSONToIPFS(metadata, options);
    return response;
  } catch (error) {
    throw error;
  }
};
