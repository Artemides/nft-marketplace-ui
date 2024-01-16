"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from "formik";

import { Address } from "abitype";
import { MetadataNFT, NFT, TraitNFT } from "../types/types";
import { MdOutlineFileUpload } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { TransactionExecutionError } from "viem";
import { BiSolidCopyAlt } from "react-icons/bi";
import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import { NFTSchema } from "../schema/metadataNFTSchema";
import Trait from "./Trait";
import { uploadToPinata } from "@/actions/pinataUpload";
import { useWriteAstroNft } from "@/nftMarketHooks";
import { config } from "../../config";
import { newTrait } from "@/constants/constants";
import Clipboard from "./Clipboard";
import Link from "next/link";

const initialMetadata: NFT = {
  description: "",
  name: "",
  traits: [],
  file: null,
};

const AstroUploadForm = () => {
  const nftFileRef = useRef<HTMLInputElement>(null);
  const { writeContractAsync: writeAstro, data: txHash } = useWriteAstroNft();
  const [nftFile, setNftFile] = useState<File | null>(null);

  const handleBrowseFile = () => {
    if (!nftFileRef.current) return;

    nftFileRef.current.click();
  };

  const handleSubmit = async (
    values: NFT,
    { setSubmitting }: FormikHelpers<NFT>
  ) => {
    try {
      setSubmitting(true);
      const data = new FormData();
      if (values.file) {
        data.append("file", values.file, values.file.name);
      }
      const metadata: MetadataNFT = { ...values };

      data.append("metadata", JSON.stringify(metadata));
      const metadataIpfsHash = await uploadToPinata(data);

      const mintAstro = writeAstro({
        address: config.pubNftMarketAddress as Address,
        functionName: "mint",
        args: [metadataIpfsHash as string],
      });

      toast.promise(mintAstro, {
        loading: `Please Sign or Reject "Mint Astro" Transaction on Metamask `,
        success: (tx) => (
          <p>
            <b>{metadata.name}</b> Astro NFT Minted, <br />
            at:{" "}
            <b>
              {tx.slice(0, 6)}...{tx.slice(tx.length - 6, tx.length)}
            </b>
          </p>
        ),
        error: (err: TransactionExecutionError) => `${err.shortMessage}`,
      });
    } catch (error) {
      console.log({ error });
      if (error instanceof TransactionExecutionError) {
        toast.error(error.shortMessage, { style: { color: "#fa594d" } });
        return;
      }

      if (error instanceof Error)
        toast.error(error.message, { style: { color: "#fa594d" } });
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
                  disabled={isSubmitting}
                />
                <Input
                  type="text"
                  name="name"
                  placeholder="Name your NFT"
                  label="Name: *"
                  disabled={isSubmitting}
                />
                <Textarea
                  name="description"
                  placeholder="Describe your NFT"
                  label="Description: *"
                  className="resize-none scroll-w-0"
                  rows={4}
                  disabled={isSubmitting}
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
                              disabled={isSubmitting}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          className="font-semibold hover:text-neutral-400"
                          onClick={() => {
                            push(newTrait);
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
        {txHash && (
          <Clipboard copy={txHash} className="mt-2">
            <Link href={"/"}>
              Transaction: <b>{txHash}</b>
            </Link>
          </Clipboard>
        )}
      </div>
    </section>
  );
};

export default AstroUploadForm;
