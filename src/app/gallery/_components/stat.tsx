import React from "react";

type StatProps = {
  value: number;
  description: string;
};

export const Stat = ({ description, value }: StatProps) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <span className="text-5xl font-semibold">{value || "-"}</span>
      <p className="capitalize text-base text-neutral-400">{description}</p>
    </div>
  );
};
