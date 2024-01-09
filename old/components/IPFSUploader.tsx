import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Files from "./Files";
import axios from "axios";

type MetadData = {
  name: string;
  description: string;
};

const initialMetadata: MetadData = {
  name: "",
  description: "",
};

const IPFSUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [metaData, setMetaData] = useState<MetadData>(initialMetadata);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!file) {
        return alert("No File uploaded");
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("name", metaData.name);
      formData.append("description", metaData.description);

      const response = await axios.post("/api/pinata/upload", formData);
    } catch (error) {
      console.error(error);
      alert("error uploading to ipfs");
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecent = async () => {
    //load from
    try {
      //TODO get API
      setCid("my-cid");
    } catch (error) {
      console.error(error);
      alert("failed loading recent updated on IPFS");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    setFile(files[0]);
  };

  const handleMetadataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMetaData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="h-[calc(100vh-72px)] grid place-items-center">
      <div className="m-auto w-2/4  ring-1 ring-neutral-700 p-6 rounded-xl">
        <h1 className="text-2xl font-bold">Upload to IPFS</h1>
        <p className="mt-2">
          With Simple IPFS, you can upload a file, get a link, and share it with
          anyone who needs to access the file. The link is permanent, but it
          will only be shared once.
        </p>
        <input
          ref={fileRef}
          type="file"
          id="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg bg-light p-2 text-center text-secondary">
          <button
            disabled={isLoading}
            onClick={() => {
              if (!fileRef.current) return;

              fileRef.current.click();
            }}
            className="align-center flex h-64 w-3/4 flex-row items-center justify-center rounded-3xl bg-secondary px-4 py-2 text-light transition-all duration-300 ease-in-out hover:bg-accent hover:text-light"
          >
            {isLoading ? (
              "Uploading..."
            ) : (
              <div className="">
                <p className="text-lg font-light">
                  Select a file to upload to the IPFS network
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="m-auto mt-4 h-12 w-12 text-neutral-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  ></path>
                </svg>
              </div>
            )}
          </button>
        </div>
        {file && (
          <form onSubmit={uploadFile} className="flex flex-col gap-y-4">
            <div className="space-y-2 ">
              <label htmlFor="name">Name *</label>
              <br />
              <input
                className=" rounded-md p-2 outline-none bg-neutral-900"
                id="name"
                name="name"
                placeholder="Name"
                value={metaData.name}
                onChange={handleMetadataChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description">Description *</label>
              <br />
              <textarea
                className="bg-neutral-900 rounded-md p-2 outline-none"
                placeholder="Description..."
                value={metaData.description}
                onChange={handleMetadataChange}
                name="description"
              />
            </div>
            <button
              className="rounded-md bg-orange-500 text-white w-auto px-8 py-2"
              type="submit"
            >
              Upload
            </button>
          </form>
        )}

        {cid && <Files cid={cid} />}
      </div>
    </div>
  );
};

export default IPFSUploader;
