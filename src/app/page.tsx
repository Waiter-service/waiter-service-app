import React from 'react';
import { useState } from 'react';
import Order from '@/components/order';
import { time } from 'console';

const orderData=[
  {
    id: 1,
    table: 1,
    status: "Pending",
    time: new Date().toString(),
    comment: "Please serve quickly",
    items: [
      { id: 1, name: "Item 1", quantity: 2, price: 10.0 },
      { id: 2, name: "Item 2", quantity: 1, price: 15.0 },
    ],
  },
  {
    id: 2,
    table: 2,
    status: "Pending",
    time: new Date().toString(),
    comment: "Extra spicy",
    items: [
      { id: 3, name: "Item 3", quantity: 1, price: 20.0 },
      { id: 4, name: "Item 4", quantity: 3, price: 5.0 },
    ],
  },
  {
    id: 3,
    table: 3,
    status: "Completed",
    time: new Date().toString(),
    comment: "No comments",
    items: [
      { id: 5, name: "Item 5", quantity: 2, price: 30.0 },
      { id: 6, name: "Item 6", quantity: 1, price: 25.0 },
    ],
  },
]
export default function Home() {
  return (
      <div className="flex w-full min-h-screen bg-gray-100">
        <div className="flex-1 flex flex-col items-center justify-center bg-green-500 text-white max-w-[65%]">
          <h1 className="">stolovi</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center  max-w-[35%]">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Orders</h1>
          <div className="w-full max-w-md">
            {orderData.map((order) => (
              <Order
                key={order.id}
                table={order.table}
                status={order.status}
                time={order.time}
                comment={order.comment}
                items={order.items}
              />
            ))}
          </div>
        </div>
      </div>
  )
}
