import { NFT } from "@/types/types";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { newTrait } from "@/constants/constants";
import { Button } from "./ui/button";

const AstroUploadF = () => {
  const form = useForm<NFT>();
  const {
    append,
    fields: traits,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "traits",
  });

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
                      className={error && "ring-1 ring-red-500"}
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
                      className={error && "ring-1 ring-red-500"}
                      rows={4}
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
            </div>
          </form>
        </Form>
      </div>
      <div className="p-2 "></div>
    </section>
  );
};

export default AstroUploadF;
