import { CloseSvg } from "@/assets/icons";
import { useUser } from "@/providers/user-provider";
import { usePatchOrderSeenStatus } from "@/queries/hooks/usePatchOrderSeenStatus";
import { cn } from "@/utils/misc/cn/cn";
import { useState } from "react";

const Order = ({
  order,
  barData,
}: {
  order: {
    id: number;
    tableId: number;
    status: string;
    barId: number;
    comment: string | null;
    date: string;
    total: number;
    OrderArticle: {
      articleId: number;
      quantity: number;
    }[];
  };
  barData: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { mutate } = usePatchOrderSeenStatus(user.accessToken ?? "");

  const handleViewClick = () => {
    setIsOpen(!isOpen);

    if (!isOpen && order.status === "PENDING") {
      mutate(order.id);
    }
  };

  return (
    <div className="space-y-4 w-full relative">
      <div
        key={order.id}
        className={cn(
          "border border-neutral-800 p-4 rounded-lg shadow-md bg-neutral-900 mt-[10px]",
          order.status === "PENDING" && "bg-neutral-700"
        )}
        onClick={handleViewClick}
      >
        <p>Ukupno: {order.total.toFixed(2) + " €"}</p>
        <p>Status: {order.status === "PENDING" ? "Zaprimljeno" : "Videno"}</p>
        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            !isOpen ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
          )}
        >
          <p className={cn("text-sm", order.comment === null && "hidden")}>
            Kommentar: {order.comment}
          </p>
          <ul className="list-disc list-inside mt-2">
            {order.OrderArticle.map((article) => (
              <li key={article.articleId}>
                {barData?.articles.find(
                  (a: { id: number }) => a.id === article.articleId
                )?.title || ""}{" "}
                Kolicina: {article.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Order;
