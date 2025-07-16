"use client";
import useOrders from "@/hooks/useOrders";
import { useBarData } from "@/queries/hooks/useGetBarData";
import { usePatchOrderSeenStatus } from "@/queries/hooks/usePatchOrderSeenStatus";
import { cn } from "@/utils/misc/cn/cn";
import { connectSocket } from "@/utils/socket/socket";
import { useState } from "react";

export default function Home() {
  connectSocket();

  const orders = useOrders();
  const { data: barData } = useBarData(1);

  const ordersByTableId = orders.reduce<Record<number, (typeof orders)[0][]>>(
    (acc, order) => {
      if (!acc[order.tableId]) {
        acc[order.tableId] = [];
      }
      acc[order.tableId].push(order);
      return acc;
    },
    {}
  );

  const ordersArray = Object.values(ordersByTableId);

  return (
    <div className="max-w-[1440px] ml-auto mr-auto w-[100vw] h-[100vh] flex">
      <div className="w-[70%]"></div>
      <div className="flex flex-col items-center justify-start h-full ove w-[30%] py-[40px]">
        {ordersArray.length > 0 ? (
          <div className="space-y-4 w-full">
            {ordersArray.map((order) => (
              <div
                key={order[0].tableId}
                className="border border-neutral-800 p-4 rounded-lg shadow-md bg-neutral-900"
              >
                <h2 className="text-xl font-semibold">
                  Stol: {order[0].tableId}
                </h2>
                {order.map((item) => (
                  <OrderView key={item.id} order={item} barData={barData} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
}

const OrderView = ({
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
  const { mutate } = usePatchOrderSeenStatus();

  const handleViewClick = () => {
    setIsOpen(!isOpen);

    if (!isOpen && order.status === "PENDING") {
      mutate(order.id);
    }
  };

  return (
    <div className="space-y-4 w-full">
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
          <p className="text-sm">Kommentar: {order.comment || ""}</p>
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