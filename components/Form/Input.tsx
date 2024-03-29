import { useField } from "formik";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  withMessage?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, withMessage = true, ...props }, ref) => {
    const [field, meta] = useField(props.name || "input");

    return (
      <div
        className={twMerge(
          "w-full",
          label || (meta.error && meta.touched) ? "space-y-2" : ""
        )}
      >
        {label && (
          <label htmlFor={props.id || props.name} className="font-semibold">
            {label}
          </label>
        )}
        <div>
          <input
            ref={ref}
            {...field}
            {...props}
            className={twMerge(
              `w-full px-2 py-2 rounded-md bg-transparent ring-1 ring-[#424242] focus:outline-none`,
              meta.touched && meta.error && "ring-1 ring-red-500",
              props.className
            )}
          />
          {withMessage && meta.touched && meta.error && (
            <div className="text-red-500 text-xs">{meta.error}</div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "WithRef";

// const Input: React.FC<InputProps> = ({ label, ...props }) => {
//   const [field, meta] = useField(props.name || "input");
//   return (
//     <div
//       className={twMerge(
//         "w-full",
//         label || (meta.error && meta.touched) ? "space-y-2" : ""
//       )}
//     >
//       {label && (
//         <label htmlFor={props.id || props.name} className="font-semibold">
//           {label}
//         </label>
//       )}
//       <div>
//         <input
//           {...field}
//           {...props}
//           className={twMerge(
//             `w-full px-2 py-2 rounded-md bg-transparent ring-1 ring-[#424242] focus:outline-none`,
//             meta.touched && meta.error && "ring-1 ring-red-500",
//             props.className
//           )}
//         />
//         {meta.touched && meta.error && (
//           <div className="text-red-500 text-xs">{meta.error}</div>
//         )}
//       </div>
//     </div>
//   );
// };

export default Input;
