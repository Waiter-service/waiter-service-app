"use client";
import React from 'react';
import Order from '@/components/order';
import Image from "next/image";
import coffeeBarLayout from "@/assets/images/cafe-floor-plan.png";

const orderData=[
  {
    orderId: 1,
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
    orderId: 2,
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
    orderId: 3,
    table: 3,
    status: "Completed",
    time: new Date().toString(),
    comment: "No comments",
    items: [
      { id: 5, name: "Item 5", quantity: 2, price: 30.0 },
      { id: 6, name: "Item 6", quantity: 1, price: 25.0 },
    ],
  },
  {
    orderId: 4,
    table: 4,
    status: "In Progress",
    time: new Date().toString(),
    comment: "Please check the order",
    items: [
      { id: 7, name: "Item 7", quantity: 1, price: 12.0 },
      { id: 8, name: "Item 8", quantity: 2, price: 18.0 },
    ],
  },
  {
    orderId: 5,
    table: 5,
    status: "Pending",
    time: new Date().toString(),
    comment: "No special requests",
    items: [
      { id: 9, name: "Item 9", quantity: 1, price: 22.0 },
      { id: 10, name: "Item 10", quantity: 2, price: 8.0 },
    ],
  },
  {
    orderId: 6,
    table: 6,
    status: "Completed",
    time: new Date().toString(),
    comment: "Great service!",
    items: [
      { id: 11, name: "Item 11", quantity: 3, price: 14.0 },
      { id: 12, name: "Item 12", quantity: 1, price: 9.0 },
    ],
  },
  {
    orderId: 7,
    table: 7,
    status: "In Progress",
    time: new Date().toString(),
    comment: "Please hurry up",
    items: [
      { id: 13, name: "Item 13", quantity: 2, price: 11.0 },
      { id: 14, name: "Item 14", quantity: 1, price: 17.0 },
    ],
  },
  {
    orderId: 8,
    table: 8,
    status: "Pending",
    time: new Date().toString(),
    comment: "No comments",
    items: [
      { id: 15, name: "Item 15", quantity: 1, price: 19.0 },
      { id: 16, name: "Item 16", quantity: 2, price: 6.0 },
    ],
  },
  {
    orderId: 9,
    table: 9,
    status: "Completed",
    time: new Date().toString(),
    comment: "Everything was perfect",
    items: [
      { id: 17, name: "Item 17", quantity: 2, price: 13.0 },
      { id: 18, name: "Item 18", quantity: 1, price: 21.0 },
    ],
  },
  {
    orderId: 10,
    table: 10,
    status: "In Progress",
    time: new Date().toString(),
    comment: "Please check the order",
    items: [
      { id: 19, name: "Item 19", quantity: 1, price: 15.0 },
      { id: 20, name: "Item 20", quantity: 2, price: 10.0 },
    ],
  },
]
export default function Home() {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="fixed h-screen w-[65%] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={coffeeBarLayout}
            alt="Restaurant Layout"
            objectFit="cover"
            className="w-full h-full"
            quality={100}
            priority
          />
        </div>
      </div>

      <div className="ml-[65%] w-[35%]">
        <div className="flex flex-col items-center py-10">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Orders</h1>
          <div className="w-full max-w-md">
            {orderData.map((order) => (
              <Order
                key={order.orderId}
                orderId={order.orderId}
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
    </div>
  );
}
