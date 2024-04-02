import { NFT } from "@/types/types";
import React from "react";
import { useForm } from "react-hook-form";
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

const AstroUploadF = () => {
  const form = useForm<NFT>();
  return (
    <section id="upload-nft" className="grid grid-cols-2 gap-x-12 pl-8">
      <div className="min-h-fit pt-12">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Name: *</FormLabel>
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
                  <FormLabel>Name: *</FormLabel>
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
          </form>
        </Form>
      </div>
      <div className="p-2 "></div>
    </section>
  );
};

export default AstroUploadF;
