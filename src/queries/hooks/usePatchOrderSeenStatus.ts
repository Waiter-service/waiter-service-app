import { useMutation } from "@tanstack/react-query";
import { patchOrderSeenStatus } from "../patchOrderSeenStatus";

export const usePatchOrderSeenStatus = (accessToken?: string) => {
  return useMutation({
    mutationFn: (orderId: number) => patchOrderSeenStatus(orderId, accessToken),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error updating order seen status:", error);
    },
  });
};