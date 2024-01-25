"use client";

import { useContext, useRef, useState } from "react";
import Image from "next/image";
import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from "formik";
import qs from "query-string";

import { Address } from "abitype";
import { MetadataNFT, NFT, TraitNFT } from "../types/types";
import { MdOutlineFileUpload } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { TransactionExecutionError } from "viem";
import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import Trait from "./Trait";
import { uploadToPinata } from "@/actions/pinataUpload";
import { useWriteAstroNft } from "@/nftMarketHooks";
import { config } from "../../config";
import { newTrait } from "@/constants/constants";
import Clipboard from "./Clipboard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MintingContext } from "@/providers/MintingProvider";
import Modal from "./Modal";
import AstroCard from "./AstroCard";
import Button from "./Button";

const initialMetadata: NFT = {
  description: "",
  name: "",
  traits: [],
  file: null,
};

const AstroUploadForm = () => {
  const router = useRouter();

  const { setPinataResponse, setNftImage } = useContext(MintingContext)!;

  const nftFileRef = useRef<HTMLInputElement>(null);
  const {
    writeContractAsync: writeAstro,
    data: txHash,
    isSuccess,
  } = useWriteAstroNft();
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
      const response = await uploadToPinata(data);

      // const txHash = await writeAstro({
      //   address: config.pubNftMarketAddress as Address,
      //   functionName: "mint",
      //   args: [response.cid],
      // });

      const url = qs.stringifyUrl({
        url: `/nft/mint/0xT000001`,
      });

      setPinataResponse(response);
      setNftImage(nftFile);
      router.push(url);
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
          // validationSchema={NFTSchema}
        >
          {({ values, setFieldValue, isSubmitting, isValid, dirty }) => {
            return (
              <>
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
                      filters inside your collection page and are also listed
                      out inside your item page.
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
                <Modal isOpen={Boolean(nftFile)}>
                  <AstroCard
                    image={nftFile ? URL.createObjectURL(nftFile) : ""}
                    imageDescripion={"image"}
                  >
                    <div className="space-y-[4px]">
                      <h2 className="font-semibold first-letter:uppercase">
                        {values.name}
                      </h2>
                      <p className="font-thin">{values.description}</p>
                      <p>Transaction at:</p>
                      <Clipboard copy={txHash || ""}>
                        <p className="break-all font-thin">
                          <b>{txHash} 0xT000001</b>
                        </p>
                      </Clipboard>
                      <div className="flex gap-x-2 font-medium">
                        <Button
                          text="List on Market"
                          className="bg-orange-500 text-white"
                        ></Button>
                        <Button text="Gallery"></Button>
                      </div>
                    </div>
                  </AstroCard>
                </Modal>
              </>
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
