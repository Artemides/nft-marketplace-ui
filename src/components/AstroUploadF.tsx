"use client";

import React, { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Trait } from "./Trait2";
import { Button } from "./ui/button";

import { newTrait } from "@/constants/constants";
import { NFTForm as NFTFormSchema } from "@/schema/nft";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MdOutlineFileUpload } from "react-icons/md";
import { z } from "zod";
import { uploadToPinata } from "@/actions/pinataUpload";
import { useWriteAstroNft } from "@/nftMarketHooks";
import toast from "react-hot-toast";
import { config } from "../../config";
import { Address, TransactionExecutionError } from "viem";
import Modal from "./Modal";
import AstroCard from "./AstroCard";
import Clipboard from "./Clipboard";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/nft/mint/_components/SubmitButton";

type NFTForm = z.infer<typeof NFTFormSchema>;
const initialMetadata: NFTForm = {
  description: "",
  name: "",
  traits: [],
  file: null,
};

const AstroUploadF = () => {
  const nftFileRef = useRef<HTMLInputElement>(null);

  const form = useForm<NFTForm>({
    defaultValues: initialMetadata,
    resolver: zodResolver(NFTFormSchema),
    mode: "all",
  });
  const {
    append,
    fields: traits,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "traits",

    shouldUnregister: true,
  });
  const {
    writeContractAsync: writeAstro,
    data: txHash,
    isSuccess,
    reset: astroReset,
  } = useWriteAstroNft();

  // const [formActionState, onFormAction] = useFormState(uploadToPinata, {
  //   status: "default",
  // });
  //derive

  const { isSubmitting, isDirty, isValid } = form.formState;
  const unableToSubmit = isSubmitting || !isValid || !isDirty;

  const NFTName = form.getValues("name");
  const NFTDescription = form.getValues("description");
  const NFTFile = form.getValues("file");
  const NFTImageURI = NFTFile ? URL.createObjectURL(NFTFile) : null;

  // console.log({ NFTImageURI });
  //event handlers

  const handleBrowseFile = () => {
    if (!nftFileRef.current) return;

    nftFileRef.current.click();
  };

  const handleContractReset = () => {
    astroReset();
    form.reset();
  };

  const handleAction = async () => {
    try {
      const formData = new FormData();
      formData.append("name", NFTName);
      formData.append("description", NFTDescription);
      formData.append("file", NFTFile!);
      const traits = form.getValues("traits");
      if (traits && traits.length > 0) {
        formData.append("traits", JSON.stringify(traits));
      }

      const { status, tokenURI, metadata } = await uploadToPinata(formData);
      if (status === "error") return;

      toast.promise(
        writeAstro({
          address: config.pubNftMarketAddress as Address,
          functionName: "mint",
          args: [tokenURI!],
        }),
        {
          loading: `Minting ${metadata!.name}`,
          success: "Your NFT has been mintent Successfully",
          error: "Error Minting your NFT",
        }
      );
    } catch (error) {
      console.error({ error });
      if (error instanceof TransactionExecutionError) {
        toast.error(error.shortMessage, { style: { color: "#fa594d" } });
      }
      if (error instanceof Error)
        toast.error(error.message, { style: { color: "#fa594d" } });
    }
  };

  // useEffect(() => {
  //   const { tokenURI, metadata, status } = formActionState;
  //   if (status !== "success" || !tokenURI || !metadata) return;
  //   return;

  //   console.log({ status });
  //   try {
  //     toast.promise(
  //       writeAstro({
  //         address: config.pubNftMarketAddress as Address,
  //         functionName: "mint",
  //         args: [tokenURI],
  //       }),
  //       {
  //         loading: `Minting ${metadata.name}`,
  //         success: "Your NFT has been mintent Successfully",
  //         error: "Error Minting your NFT",
  //       }
  //     );
  //   } catch (error) {
  //     console.error({ error });
  //     if (error instanceof TransactionExecutionError) {
  //       toast.error(error.shortMessage, { style: { color: "#fa594d" } });
  //     }
  //   }
  // }, [astroReset, formActionState, writeAstro]);

  // useEffect(() => {
  //   const { status, errors, formError } = formActionState;

  //   if (status !== "error") return;
  //   if (errors) {
  //     toast.error(errors, { style: { color: "#fa594d" } });
  //     return;
  //   }
  //   if (formError) {
  //     Object.keys(formError).forEach((key) => {
  //       if (!formError) return;
  //       const message = formError[key as keyof NFTForm];
  //       form.setError(key as keyof NFTForm, {
  //         message,
  //       });
  //     });
  //   }
  // }, [form, formActionState]);

  return (
    <section id="upload-nft" className="grid grid-cols-2 gap-x-12 pl-8">
      <div className="min-h-fit pt-12">
        <Form {...form}>
          <form className="flex flex-col gap-y-4" action={handleAction}>
            <input
              type="file"
              {...form.register("file")}
              ref={nftFileRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (!e.currentTarget.files) return;
                form.setValue("file", e.currentTarget.files[0], {
                  shouldValidate: true,
                });
              }}
              disabled={isSubmitting}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Name: *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Astro NFT name"
                      className={
                        error && "border-red-500 focus-visible:border-red-500"
                      }
                      maxLength={30}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Description: *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your NFT"
                      className={
                        error && "border-red-500 focus-visible:border-red-500"
                      }
                      rows={4}
                      maxLength={150}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p className="font-semibold">Traits</p>
              <span className="text-neutral-300">
                Traits describe attributes of your item. They appear as filters
                inside your collection page and are also listed out inside your
                item page.
              </span>
              <div className="my-2 space-y-2">
                {traits.map((trait, idx) => (
                  <Trait
                    key={trait.id}
                    control={form.control}
                    idx={idx}
                    onDelete={remove}
                    disabled={isSubmitting}
                  />
                ))}
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  type="button"
                  className="font-semibold "
                  onClick={() => {
                    append(newTrait);
                  }}
                >
                  + Add trait
                </Button>
              </div>
              <SubmitButton disabled={unableToSubmit} />
            </div>
          </form>
        </Form>
      </div>

      <div className="p-2">
        <div
          className={cn(
            `relative overflow-hidden aspect-1 flex flex-col items-center justify-center rounded-lg hover:bg-neutral-500/10 hover:cursor-pointer transition`,
            !NFTFile && " border border-neutral-500 border-dashed"
          )}
          onClick={handleBrowseFile}
        >
          {NFTImageURI ? (
            <Image
              src={NFTImageURI}
              fill
              className="object-cover hover:opacity-80 transition"
              alt={"your nft image"}
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
      <Modal isOpen={isSuccess} onClose={handleContractReset}>
        <AstroCard image={NFTImageURI} imageDescripion={"image"}>
          <div className="space-y-[4px]">
            <h2 className="font-semibold first-letter:uppercase">{NFTName}</h2>
            <p className="font-thin">{NFTDescription}</p>
            <div>
              <p>Transaction at:</p>
              <Clipboard copy={txHash || ""}>
                <p className="break-all font-thin">
                  <b>{txHash} </b>
                </p>
              </Clipboard>
            </div>
            <div className="flex gap-x-2 font-medium">
              <Button>List on Market</Button>
              <Button variant={"secondary"}>Gallery</Button>
            </div>
          </div>
        </AstroCard>
      </Modal>
    </section>
  );
};

export default AstroUploadF;
