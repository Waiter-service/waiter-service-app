import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify"; 
import { postLoginBar } from "../postLoginBar";

export const usePostLoginBar = () => {
  return useMutation({
    mutationFn: postLoginBar,
    onSuccess: (data) => {
      return data; 
    },
    onError: (error: any) => {
        console.error("Error posting login:", error);
        toast.error(`Failed to post login: ${error.response?.data?.message || "Please try again."}`);
      },
  });
};