import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from "formik";

import { MetadataNFT, TraitNFT } from "../types/types";

import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import { metadataNFTSchema } from "../schema/metadataNFTSchema";
import Trait from "./Trait";
import { MdOutlineFileUpload } from "react-icons/md";

const initialMetadata: MetadataNFT = {
  description: "",
  name: "",
  traits: [],
};

const AstroUploadForm = () => {
  const handleSubmit = (
    values: MetadataNFT,
    {}: FormikHelpers<MetadataNFT>
  ) => {
    console.log(values);
  };

  return (
    <section id="upload-nft" className="grid grid-cols-2 gap-x-12 pl-8">
      <div className="min-h-fit pt-12">
        <Formik
          initialValues={initialMetadata}
          validationSchema={metadataNFTSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors }) => {
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
                  type="submit"
                  className="bg-orange-500 py-2 px-8 rounded-md text-xl font-semibold"
                >
                  Create
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="p-2">
        <div className="aspect-square flex flex-col items-center justify-center border border-neutral-500 border-dashed rounded-lg hover:bg-neutral-500/10 hover:cursor-pointer transition">
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
        </div>
      </div>
    </section>
  );
};

export default AstroUploadForm;
