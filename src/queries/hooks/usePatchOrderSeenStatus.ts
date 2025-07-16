import { useMutation } from "@tanstack/react-query";
import { patchOrderSeenStatus } from "../patchOrderSeenStatus";

export const usePatchOrderSeenStatus = () => {
  return useMutation({
    mutationFn: patchOrderSeenStatus,
    onSuccess: (data) => {
      console.log("Order seen status updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating order seen status:", error);
    },
  });
};
