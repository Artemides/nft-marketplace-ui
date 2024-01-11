"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from "formik";

import { NFT, TraitNFT } from "../types/types";
import { MdOutlineFileUpload } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import axios from "axios";

import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import { NFTSchema } from "../schema/metadataNFTSchema";
import Trait from "./Trait";
import CustomToast from "./CustomToast";
import { useWriteContract } from "wagmi";
const initialMetadata: NFT = {
  description: "",
  name: "",
  traits: [],
  file: null,
};

const AstroUploadForm = () => {
  const nftFileRef = useRef<HTMLInputElement>(null);

  const [nftFile, setNftFile] = useState<File | null>(null);
  const {} = useWriteContract({});

  const handleBrowseFile = () => {
    if (!nftFileRef.current) return;

    nftFileRef.current.click();
  };
  const handleSubmit = async (
    values: NFT,
    { setSubmitting }: FormikHelpers<NFT>
  ) => {
    console.log("submitting");
    if (!values.file) return;

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append("file", values.file, values.file?.name);
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("traits", JSON.stringify(values.traits));

      const response = await axios.post("/api/pinata/upload", data);
      const { metadataIpfsHash } = response.data;
      console.log({ metadataIpfsHash });
      toast.custom((t) => (
        <CustomToast
          t={t}
          description={`Your ${values.name} NFT has been created`}
          image={nftFile ? URL.createObjectURL(nftFile) : undefined}
        />
      ));
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="upload-nft" className="grid grid-cols-2 gap-x-12 pl-8">
      <div className="min-h-fit pt-12">
        <Formik
          initialValues={initialMetadata}
          onSubmit={handleSubmit}
          validationSchema={NFTSchema}
        >
          {({ values, setFieldValue, isSubmitting, isValid, dirty }) => {
            return (
              <Form className="space-y-5">
                <Input
                  ref={nftFileRef}
                  type="file"
                  name="file"
                  className="hidden"
                  accept="image/*"
                  value={""}
                  onChange={(e) => {
                    if (!e.currentTarget.files) return;

                    setFieldValue("file", e.currentTarget.files[0], true);
                    setNftFile(e.currentTarget.files[0]);
                  }}
                  withMessage={false}
                />
                <Input
                  type="text"
                  name="name"
                  placeholder="Name your NFT"
                  label="Name: *"
                />
                <Textarea
                  name="description"
                  placeholder="Describe your NFT"
                  label="Description: *"
                  className="resize-none scroll-w-0"
                  rows={4}
                />
                <div>
                  <p className="font-semibold">Traits</p>
                  <span className="text-neutral-300">
                    Traits describe attributes of your item. They appear as
                    filters inside your collection page and are also listed out
                    inside your item page.
                  </span>
                  <FieldArray
                    name="traits"
                    render={({
                      remove,
                      push,
                      replace,
                    }: ArrayHelpers<TraitNFT[]>) => (
                      <div className="my-2">
                        <div className="grid grid-cols-1 gap-2">
                          {values.traits?.map((trait, idx) => (
                            <Trait
                              key={idx}
                              idx={idx}
                              trait={trait}
                              onDelete={remove}
                              onEdit={replace}
                              editing={!trait.type || !trait.value}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          className="font-semibold hover:text-neutral-400"
                          onClick={() => {
                            push({ type: "", value: "" });
                          }}
                        >
                          + Add trait
                        </button>
                      </div>
                    )}
                  />
                </div>
                <button
                  disabled={isSubmitting || !isValid || !dirty}
                  type="submit"
                  className="bg-orange-500 py-2 px-8 rounded-md text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="p-2 ">
        <div
          className={twMerge(
            `relative overflow-hidden aspect-square flex flex-col items-center justify-center rounded-lg hover:bg-neutral-500/10 hover:cursor-pointer transition`,
            !nftFile && " border border-neutral-500 border-dashed"
          )}
          onClick={handleBrowseFile}
        >
          {nftFile ? (
            <Image
              src={URL.createObjectURL(nftFile)}
              fill
              className="object-cover hover:opacity-80 transition"
              alt={nftFile.name}
            />
          ) : (
            <>
              <MdOutlineFileUpload size={40} />
              <p className="text-xs  text-center">
                <span className="font-semibold text-sky-500 text-sm ">
                  Browse files
                </span>
                <br />
                Max size: 50MB
                <br />
                JPG, JPEG, PNG, SVG or GIF
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AstroUploadForm;
