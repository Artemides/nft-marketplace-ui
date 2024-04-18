import { AlchemyContext } from "@/providers/AlchemyProvider";
import { useContext } from "react";

export const useAlchemy = () => {
  const alchemy = useContext(AlchemyContext);
  if (!alchemy) {
    throw new Error("useAlchemy must be wrapped within a AlchemyProvider");
  }

  return alchemy;
};
