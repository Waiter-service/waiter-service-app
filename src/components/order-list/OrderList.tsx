import { FC } from "react";
import Order from "@/components/order";

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
  barData: any;
}

const OrderList: FC<OrderListProps> = ({ orders, barData }) => {
  
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
    <div className="flex flex-col items-center justify-start h-full ove w-[30%]">
      {ordersArray.length > 0 ? (
        <div className="space-y-4 w-full">
          {ordersArray.map((order) => (
            <div
              key={order[0].tableId}
              className="border border-neutral-800 p-4 rounded-lg shadow-md bg-neutral-900"
            >
              <h2 className="text-xl font-semibold">
                Stol: {barData.tables.find((t: { id: number }) => t.id === order[0].tableId)?.number || "Nepoznato"}
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
    </div>
  );
};

export default OrderList;
