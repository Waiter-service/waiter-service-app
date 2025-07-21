import { useMutation } from "@tanstack/react-query";
import { deleteOrder } from "../deleteOrder";
import { toast } from "react-toastify";

export const useDeleteOrder = (accessToken: string) => {
  return useMutation({
    mutationFn: (tableId: string) => deleteOrder(tableId, accessToken),
    onSuccess: () => {
      toast.success(`Narudzba uspješno obrisana!`);
    },
    onError: (error) => {
      console.error("Error deleting order:", error);
    },
  });
};
