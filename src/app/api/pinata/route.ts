import { NextRequest, NextResponse } from "next/server";

import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { parseFields, parseFiles } from "@/utils/formdata";
import { MetadataNFT, MetadataNFTFiles } from "@/types/types";
import { metadataNFTSchema } from "@/schema/metadataNFTSchema";
import pinata from "../../../../pinata.config";

export const config = {
  api: {
    bodyParser: false,
  },
};

const options: formidable.Options = {
  maxFiles: 1,
  filter: ({ mimetype }) => {
    const allowedFile = mimetype && mimetype.includes("image");
    return Boolean(allowedFile);
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log({ req });
    const form = formidable(options);
    const [fields, files] = await form.parse(req);
    const metadata = parseFields<MetadataNFT>(fields);
    const { file } = parseFiles<MetadataNFTFiles>(files);

    await metadataNFTSchema.validate(metadata, { abortEarly: false });
    if (!file) {
      throw new Error("Please Update an image File");
    }

    // const { IpfsHash } = await saveFile(_files.file);
    const IpfsHash = "0xIpfsHashFile";
    const body = {
      ...metadata,
      image: IpfsHash,
    };
    console.log({ body });
    // const { IpfsHash: metadataIpfsHash } = await saveJSON(body);
    const metadataIpfsHash = "0xIpfsHashFile";
    return NextResponse.json({ metadataIpfsHash });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await pinata.pinList({ pageLimit: 1 });
  } catch (error) {}
}
