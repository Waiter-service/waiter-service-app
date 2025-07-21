"use client";
import useOrders from "@/hooks/useOrders";
import { useBarData } from "@/queries/hooks/useGetBarData";
import { cn } from "@/utils/misc/cn/cn";
import OrderList from "../order-list";
import { useUser } from "@/providers/user-provider";

const HomeContent = () => {
  const { user } = useUser();
  const { data: barData } = useBarData(user.sub, user.accessToken ?? "");
  const orders = useOrders(user.sub);

  return (
    <div className="max-w-[1440px] ml-auto mr-auto w-[100vw] h-[100vh] flex p-[40px] gap-[20px]">
      <div className="w-[70%] bg-neutral-900 rounded-2xl relative">
        {barData?.tables.map((table) => (
          <div
            key={table.id}
            className={cn(
              "absolute bg-neutral-500 flex items-center justify-center rounded-full",
              orders.some(
                (order) =>
                  order.tableId === table.id && order.status === "COMPLETED"
              ) && "bg-green-300",
              orders.some(
                (order) =>
                  order.tableId === table.id && order.status === "PENDING"
              ) && "bg-yellow-300"
            )}
            style={{
              top: `${table.positionY}%`,
              left: `${table.positionX}%`,
              width: `${table.width}%`,
              aspectRatio: "1 / 1",
            }}
          >
            <div className="text-black text-4xl text-center">
              {table.number}
            </div>
          </div>
        ))}
      </div>
      {barData && <OrderList barData={barData} orders={orders} />}
    </div>
  );
};

export default HomeContent;
