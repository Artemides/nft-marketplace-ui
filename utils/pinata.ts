import axios from "axios";
import fs from "fs";
import pinata from "../pinata.config";
import { PinataPinOptions } from "@pinata/sdk";
import formidable from "formidable";
import { MetadataNFT } from "../schema/metadataNFTSchema";
const pinataApiKey = process.env.PINATA_API_KEY || "";
const pinataSecret = process.env.PINATA_SECRET || "";

const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

type UploadIPFSResponse = {
  success: boolean;
  pinataUrl?: string;
  message?: string;
};

export const saveFile = async (
  file: formidable.File,
  metadata: MetadataNFT
) => {
  try {
    const stream = fs.createReadStream(file.filepath);
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: metadata.name,
        description: metadata.description,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(file.filepath);
    return response;
  } catch (error) {
    throw error;
  }
};
