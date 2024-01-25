import * as Dialog from "@radix-ui/react-dialog";
import React, { ReactNode, useState } from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  children?: ReactNode;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/50 backdrop-blur-sm  fixed inset-0" />
        <Dialog.Content className="fixed drop-shadow-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-md ">
          {children}
          <Dialog.DialogClose asChild>
            <button
              className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex w-[25px] h-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
              aria-label="Close"
            >
              <IoMdClose />
            </button>
          </Dialog.DialogClose>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
