import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDone, MdEdit } from "react-icons/md";

import Input from "./Form/Input";

type TraitProps = {
  idx: number;
  onDelete: (idx: number) => void;
  disabled?: boolean;
};

const Trait: React.FC<TraitProps> = ({ idx, onDelete, disabled }) => {
  const handleDeleteTrait = () => {
    onDelete(idx);
  };

  return (
    <div className="flex justify-between items-center  p-3 bg-neutral-900/50 rounded-lg">
      <div className="flex-1 border-r border-r-neutral-500/50 pr-3">
        <>
          <div className="flex gap-x-2 items-top">
            <Input
              type="text"
              name={`traits.${idx}.type`}
              placeholder="Trait type"
              disabled={disabled}
            />

            <Input
              type="text"
              name={`traits.${idx}.value`}
              placeholder="Trait value"
              disabled={disabled}
            />
          </div>
        </>
      </div>
      <div className=" flex items-center pl-3 space-x-4">
        <button
          type="button"
          onClick={handleDeleteTrait}
          className="hover:text-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-800"
          disabled={disabled}
        >
          <IoMdClose size={21} />
        </button>
      </div>
    </div>
  );
};

export default Trait;
