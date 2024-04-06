"use client";

import React, { memo, useEffect, useMemo, useRef } from "react";
import { Address, ProviderRpcError, TransactionExecutionError } from "viem";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Image from "next/image";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import Modal from "./Modal";
import { Trait } from "./Trait2";
import { newTrait } from "@/constants/constants";
import { NFTForm as NFTFormSchema } from "@/schema/nft";
import { cn } from "@/lib/utils";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadToPinata } from "@/actions/pinataUpload";
import { useWriteAstroNft } from "@/nftMarketHooks";
import { config } from "../../config";
import AstroCard from "./AstroCard";
import Clipboard from "./Clipboard";
import SubmitButton from "@/app/nft/mint/_components/SubmitButton";
import { NFTForm } from "@/types/forms";

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
    isPending,
  } = useWriteAstroNft();

  // const [formActionState, onFormAction] = useFormState(uploadToPinata, {
  //   status: "default",
  // });
  //derive

  const { isSubmitting, isDirty, isValid } = form.formState;
  const unableToSubmit = isPending || isSubmitting || !isValid || !isDirty;

  const { file, description, name } = form.getValues();

  const imageURI = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  // console.log({ imageURI });
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
      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", file!);
      const traits = form.getValues("traits");
      if (traits && traits.length > 0) {
        formData.append("traits", JSON.stringify(traits));
      }

      const { status, tokenURI, metadata, formError, errors } = await uploadToPinata(formData);
      if (status === "error") {
        if (errors) {
          toast.error(errors, { style: { color: "#fa594d" } });
          return;
        }
        if (formError) {
          Object.keys(formError).forEach((key) => {
            if (!formError) return;
            const message = formError[key as keyof NFTForm];
            form.setError(key as keyof NFTForm, {
              message,
            });
          });
          return;
        }
        return;
      }

      toast.promise(
        writeAstro({
          address: config.pubNftMarketAddress as Address,
          functionName: "mint",
          args: [tokenURI!],
        }),
        {
          loading: `Minting ${metadata!.name}`,
          success: "Your NFT has been mintent Successfully",
          error: (err: ProviderRpcError) => err.shortMessage,
        }
      );
    } catch (error) {
      console.error({ error });
      if (error instanceof Error) toast.error(error.message, { style: { color: "#fa594d" } });
    }
  };

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
                      className={error && "border-red-500 focus-visible:border-red-500"}
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
                  <FormLabel className="font-semibold">Description: *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your NFT"
                      className={error && "border-red-500 focus-visible:border-red-500"}
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
                Traits describe attributes of your item. They appear as filters inside your
                collection page and are also listed out inside your item page.
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
            !file && " border border-neutral-500 border-dashed"
          )}
          onClick={handleBrowseFile}
        >
          {imageURI ? (
            <Image
              src={imageURI}
              fill
              className="object-cover hover:opacity-80 transition"
              alt={"your nft image"}
            />
          ) : (
            <>
              <MdOutlineFileUpload size={40} />
              <p className="text-xs  text-center">
                <span className="font-semibold text-sky-500 text-sm ">Browse files</span>
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
        <AstroCard image={imageURI} imageDescripion={"image"}>
          <div className="space-y-[4px]">
            <h2 className="text-xl font-semibold first-letter:uppercase">{name}</h2>
            <p className="font-thin">{description}</p>
            <div className="">
              <h3>Transaction:</h3>
              <Clipboard copy={txHash!}>
                <p className="break-all text-sm font-semibold">{txHash}</p>
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
