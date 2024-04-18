"use server";

import { handleActionError } from "@/lib/errors";
import { NFTBaseMetadata, NFTFile } from "@/schema/nft";
import { NFTFormActionState } from "@/types/actions";
import { NFTForm } from "@/types/forms";
import { NFTMetadata } from "@/types/types";
import { saveFile, saveJSON } from "@/utils/pinata";

export const uploadToPinata = async (formdata: FormData): Promise<NFTFormActionState> => {
  try {
    const traits = JSON.parse(formdata.get("traits") as string);
    const entries = Object.fromEntries(formdata);
    delete entries["traits"];
    if (traits) entries["traits"] = traits;

    //validate formdata
    const baseMetadata = NFTBaseMetadata.parse(entries);
    const { file } = NFTFile.parse(entries);

    const { IpfsHash } = await saveFile(file!);

    const metadata: NFTMetadata = {
      ...baseMetadata,
      image: `ipfs://${IpfsHash}`,
    };
    const { IpfsHash: tokenURI } = await saveJSON(metadata);

    return { status: "success", tokenURI, metadata };
  } catch (error) {
    const err = handleActionError<NFTForm>(error);
    console.error({ err });
    return err;
  }
};
