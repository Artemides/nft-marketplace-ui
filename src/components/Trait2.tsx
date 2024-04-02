import { IoMdClose } from "react-icons/io";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Control } from "react-hook-form";
import { NFT } from "@/types/types";
import { Input } from "./ui/input";

type TraitProps = {
  idx: number;
  onDelete: (idx: number) => void;
  disabled?: boolean;
  control: Control<NFT, any>;
};

const Trait: React.FC<TraitProps> = ({ idx, onDelete, disabled, control }) => {
  const handleDeleteTrait = () => {
    onDelete(idx);
  };

  return (
    <div className="flex justify-between items-center  p-3 bg-neutral-900/50 rounded-lg">
      <div className="flex-1 border-r border-r-neutral-500/50 pr-3">
        <div className="flex gap-x-2 items-top">
          <FormField
            control={control}
            name={`traits.${idx}.type`}
            render={({ field, fieldState: { error } }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Trait"
                    className={error && "ring-1 ring-red-500"}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`traits.${idx}.value`}
            render={({ field, fieldState: { error } }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Value"
                    className={error && "ring-1 ring-red-500"}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
