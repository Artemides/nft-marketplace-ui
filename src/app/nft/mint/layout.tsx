import { MintingProvider } from "@/providers/MintingProvider";
import { ReactNode } from "react";

const MintingLayout = ({ children }: { children: ReactNode }) => {
  return <MintingProvider>{children}</MintingProvider>;
};

export default MintingLayout;
