"use server";

import { handleActionError } from "@/lib/errors";
import { NFTBaseMetadata, NFTFile } from "@/schema/nft";
import { NFTFormActionState } from "@/types/actions";
import { NFTForm } from "@/types/forms";
import { NFTMetadata } from "@/types/types";

export const uploadToPinata = async (
  // _: NFTFormActionState,
  formdata: FormData
): Promise<NFTFormActionState> => {
  try {
    const traits = JSON.parse(formdata.get("traits") as string);
    const entries = Object.fromEntries(formdata);
    delete entries["traits"];
    if (traits) entries["traits"] = traits;

    const baseMetadata = NFTBaseMetadata.parse(entries);
    const file = NFTFile.parse(entries);

    // const { IpfsHash } = await saveFile(file);
    const IpfsHash = "0xIpfsHashFile";
    const metadata: NFTMetadata = {
      ...baseMetadata,
      image: `ipfs://${IpfsHash}`,
    };
    // const { IpfsHash: metadataIpfsHash } = await saveJSON(body);
    const tokenURI = "0xIpfsHashFile";

    return { status: "success", tokenURI, metadata };
  } catch (error) {
    const err = handleActionError<NFTForm>(error);
    console.error({ err });
    return err;
  }
};
