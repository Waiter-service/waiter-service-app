import { FC, useRef } from "react";
import Button from "../button/Button";
import { cn } from "@/utils/misc/cn/cn";
import { useUser } from "@/providers/user-provider";
import { useDeleteOrder } from "@/queries/hooks/useDeleteOrder";

interface CloseDialogProps {
  onClose: () => void;
  isOpen: number | null;
}

const CloseDialog: FC<CloseDialogProps> = ({ onClose, isOpen }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { mutate } = useDeleteOrder(user.accessToken ?? "");

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  const handleDeleteOrder = () => {
    if (isOpen === null) return;
    mutate(isOpen.toString());
    onClose();
  };

  return (
    <div
      className={cn(
        "w-full h-full fixed top-0 left-0 backdrop-blur-[3px]  items-center justify-center hidden",
        isOpen && "flex"
      )}
      onClick={handleClickOutside}
    >
      <div
        ref={dialogRef}
        className="bg-neutral-800 max-w-[330px] rounded-xl border border-neutral-700 flex-flex-col item p-[24px]"
      >
        <h1 className="text-center text-2xl">
          Jeste li sigurni da želite zatvoriti narudžbu?
        </h1>
        <div className="flex items-center gap-[10px] mt-[20px]">
          <Button
            variant="darkGray"
            className="py-[10px] w-full"
            onClick={handleDeleteOrder}
          >
            Da
          </Button>
          <Button variant="gray" className="py-[10px] w-full" onClick={onClose}>
            Ne
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CloseDialog;
