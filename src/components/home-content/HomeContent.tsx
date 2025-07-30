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
    <div className="max-w-[1440px] ml-auto mr-auto w-[100vw] h-[100vh] flex flex-col sm:flex-row p-[40px] gap-[20px]">
      <div className="w-full sm:w-[70%] h-[200%] sm:h-[100%] bg-neutral-900 rounded-2xl relative">
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
            <div className="text-black text-[70%] sm:text-[130%] text-center">
              {table.number}
            </div>
          </div>
        ))}
        <div className="w-[20%] h-[1%] bg-neutral-800 text-[20px] absolute bottom-[54%] right-0 "></div>
        <div className="w-[70%] h-[1%] bg-neutral-800 text-[20px] absolute bottom-[54%] left-0 "></div>
        <div className="w-[12%] h-[7px] bg-neutral-800 text-[20px] absolute top-[24%] left-0 "></div>
        <div className="w-[36%] h-[7px] bg-neutral-800 text-[20px] absolute top-[24%] left-[17%] "></div>
        <div className="w-[7px] h-[24.5%] bg-neutral-800 text-[20px] absolute top-0 left-[68%] "></div>
        <div className="w-[9.5%] h-[7px] bg-neutral-800 text-[20px] absolute top-[24%] left-[59%] "></div>
        <div className="w-[30%] h-[30%] bg-neutral-800 rounded-t-2xl text-[20px] absolute bottom-0 right-[15%] text-center flex items-center justify-center ">
          Šank
        </div>
      </div>
      {barData && <OrderList barData={barData} orders={orders} />}
    </div>
  );
};

export default HomeContent;
