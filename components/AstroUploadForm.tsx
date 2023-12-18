import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from "formik";

import { MetadataNFT, TraitNFT } from "../types/types";

import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import { metadataNFTSchema } from "../schema/metadataNFTSchema";
import Trait from "./Trait";
import { useState } from "react";

const initialMetadata: MetadataNFT = {
  description: "",
  name: "",
  traits: [
    { type: "sign", value: "aquarius" },
    { type: "symbol", value: "aqua" },
  ],
};

const AstroUploadForm = () => {
  const handleSubmit = (
    values: MetadataNFT,
    {}: FormikHelpers<MetadataNFT>
  ) => {};

  return (
    <section id="upload-nft" className="grid grid-cols-2 gap-x-6 px-4">
      <Formik
        initialValues={initialMetadata}
        validationSchema={metadataNFTSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          console.log({ values });
          return (
            <Form className="space-y-5">
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
                            key={trait.value}
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
            </Form>
          );
        }}
      </Formik>
      <div className="p-2">
        <div className="w-full h-full border border-neutral-500 border-dashed rounded-lg"></div>
      </div>
    </section>
  );
};

export default AstroUploadForm;
