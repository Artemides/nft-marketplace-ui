import Image from "next/image";
import React from "react";
import { Toast } from "react-hot-toast";

type ErrorToast = {
  description: string;
  t: Toast;
};

const ErrorToast: React.FC<ErrorToast> = ({ description, t }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full flex gap-x-4 items-center bg-[#070512]/50 shadow-lg rounded-lg pointer-events-auto overflow-hidden backdrop-blur-sm`}
    >
      <p className="flex-1 text-white font-semibold pr-2 text-center">
        {description}
      </p>
    </div>
  );
};

export default ErrorToast;
