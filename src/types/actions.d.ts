import { NFTMetadata } from "@/schema/nft";
import { FormError, NFTForm } from "./forms";

type ActionStatus = "default" | "error" | "success";

export type ActionState<FError> = {
  status: ActionStatus;
  errors?: string;
  formError?: FormError<FError>;
};
export type NFTFormActionState = ActionState<NFTForm> & {
  tokenURI?: string;
  metadata?: NFTMetadata;
};
