import path from "path";
import fs from "fs/promises";

export const uploadFileLocally = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const filename = file.name.replaceAll(" ", "_");
  const url = `/tmp/${new Date().getTime()}-${filename}`;
  const filepath = path.join(process.cwd(), "src", url);

  try {
    await fs.writeFile(filepath, buffer);
    return filepath;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(`Something went wrong saving file at`);
  }
};

export const unlinkFileLocally = async (filepath: string) => {
  try {
    await fs.access(filepath);
    await fs.unlink(filepath);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(`Something went wrong removing file`);
  }
};
