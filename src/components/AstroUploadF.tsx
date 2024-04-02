import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { NFT } from "@/types/types";
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
import Trait from "./Trait2";
import { Button } from "./ui/button";

import { newTrait } from "@/constants/constants";
import { NFTForm } from "@/schema/nft";

const initialMetadata: NFT = {
  description: "",
  name: "",
  traits: [],
  file: null,
};

const AstroUploadF = () => {
  const form = useForm<NFT>({
    defaultValues: initialMetadata,
    resolver: zodResolver(NFTForm),
    mode: "all",
  });
  const {
    append,
    fields: traits,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "traits",
  });

  const { isSubmitting, isDirty, isValid } = form.formState;

  const unableToSubmit = isSubmitting || !isValid || !isDirty;

  return (
    <section id="upload-nft" className="grid grid-cols-2 gap-x-12 pl-8">
      <div className="min-h-fit pt-12">
        <Form {...form}>
          <form className="flex flex-col gap-y-4">
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
              <Button
                disabled={unableToSubmit}
                type="submit"
                className="font-semibold"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="p-2 "></div>
    </section>
  );
};

export default AstroUploadF;
