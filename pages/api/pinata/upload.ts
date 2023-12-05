import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { Middleware, handler } from "../../../middleware/handler";
import {
  MetadataNFT,
  MetadataNFTFiles,
  metadataNFTSchema,
} from "../../../schema/metadataNFTSchema";
import { ValidationError } from "yup";
import { parseFields, parseFiles } from "../../../utils/formdata";
import { saveFile } from "../../../utils/pinata";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const validateMetadata: Middleware = async (req, res, next) => {
  const form = formidable({});
  try {
    const [fields] = await form.parse(req);
    const metadata = parseFields<MetadataNFT>(fields);
    await metadataNFTSchema.validate(metadata, { abortEarly: false });

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.errors });
    }
    console.log(error);
  }
};

const options: formidable.Options = {
  maxFiles: 1,
  filter: ({ mimetype }) => {
    const allowedFile = mimetype && mimetype.includes("image");

    return Boolean(allowedFile);
  },
};

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = formidable(options);
      const [fields, files] = await form.parse(req);
      const metadata = parseFields<MetadataNFT>(fields);
      const _files = parseFiles<MetadataNFTFiles>(files);

      await metadataNFTSchema.validate(metadata, { abortEarly: false });

      if (!_files.file) {
        throw new Error("Only images are supported");
      }

      await saveFile(_files.file, metadata);

      res
        .status(200)
        .json({
          ...metadata,
          file: _files.file.originalFilename,
          status: "created",
        });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(400).send(error.message);
        return;
      }

      res.status(500).send("Server Error");
    }
  }
};

export default handler(upload);
