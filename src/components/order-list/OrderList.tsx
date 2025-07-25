import { FC, useState } from "react";
import Order from "@/components/order";
import { CloseSvg } from "@/assets/icons";
import Image from "next/image";
import CloseDialog from "../close-dialog";

interface OrderListProps {
  orders: {
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
  }[];
  barData: {
    id: number;
    name: string;
    logo: string | null;
    image: string | null;
    savingOrderHistory: boolean;
    articles: {
      id: number;
      title: string;
    }[];
    tables: {
      id: number;
      number: number;
      width: number;
      positionX: number;
      positionY: number;
    }[];
  };
}

const OrderList: FC<OrderListProps> = ({ orders, barData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<number | null>(null);

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
    <div className="flex flex-col items-center justify-start h-full overflow-y-scroll sm:w-[30%] hide-scrollbar">
      {ordersArray.length > 0 ? (
        <div className="space-y-4 w-full ">
          {ordersArray.map((order) => (
            <div
              key={order[0].tableId}
              className="border border-neutral-800 p-4 rounded-lg shadow-md bg-neutral-900 relative"
            >
              <Image
                src={CloseSvg}
                alt="close"
                width={16}
                height={16}
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setIsDialogOpen(order[0].tableId)}
              />
              <h2 className="text-xl font-semibold">
                Stol:{" "}
                {barData.tables.find(
                  (table: any) => table.id === order[0].tableId
                )?.number || "N/A"}
              </h2>
              {order.map((item) => (
                <Order key={item.id} order={item} barData={barData} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Nema narudžbi za prikaz.</p>
      )}
      <CloseDialog
        onClose={() => setIsDialogOpen(null)}
        isOpen={isDialogOpen}
      />
    </div>
  );
};

export default OrderList;
