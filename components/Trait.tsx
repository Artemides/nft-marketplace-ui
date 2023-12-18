import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDone, MdEdit } from "react-icons/md";

import Input from "./Form/Input";

import { MetadataNFT, TraitNFT } from "../types/types";
import { useFormikContext } from "formik";

type TraitProps = {
  trait: TraitNFT;
  idx: number;
  onEdit: (idx: number, trait: TraitNFT) => void;
  onDelete: (idx: number) => void;
  editing?: boolean;
};

const Trait: React.FC<TraitProps> = ({
  idx,
  trait,
  onEdit,
  onDelete,
  editing,
}) => {
  const { errors } = useFormikContext<MetadataNFT>();
  const [isEditing, setIsEditing] = useState(editing || false);
  const [copyTrait] = useState(trait);
  const ableToSave = errors.traits?.[idx];

  const handleSaveTrait = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsEditing(false);
  };

  const handleDeleteTrait = () => {
    if (!isEditing) {
      onDelete(idx);
      return;
    }

    if (!trait.type && !trait.value) {
      onDelete(idx);
      return;
    }

    onEdit(idx, copyTrait);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center  p-3 bg-neutral-900 rounded-lg">
      <div className="flex-1 border-r border-r-neutral-500/50 pr-3">
        {isEditing ? (
          <>
            <span className="block text-center mb-2">New Trait</span>
            <div className="flex gap-x-2 items-top">
              <Input
                type="text"
                name={`traits.${idx}.type`}
                placeholder="Trait type"
              />

              <Input
                type="text"
                name={`traits.${idx}.value`}
                placeholder="Trait value"
              />
            </div>
          </>
        ) : (
          <p>
            {trait.type} : {trait.value}
          </p>
        )}
      </div>
      <div className=" flex items-center pl-3 space-x-4">
        <button
          disabled={Boolean(ableToSave)}
          type="button"
          onClick={handleSaveTrait}
          className="hover:text-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-800"
        >
          {isEditing ? <MdDone size={21} /> : <MdEdit />}
        </button>

        <button
          type="button"
          onClick={handleDeleteTrait}
          className="hover:text-neutral-400"
        >
          <IoMdClose size={21} />
        </button>
      </div>
    </div>
  );
};

export default Trait;
