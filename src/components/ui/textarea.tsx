import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-neutral-600 bg-transparent px-2 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[1px] focus-visible:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 resize-none scroll-w-0",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
