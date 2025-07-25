import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://waiter-backend-production.up.railway.app"); // Replace with your server URL

/**
 * Function to emit an event to get orders by tableId
 * @param barId - The ID of the table to fetch orders for
 * @param callback - A callback function to handle the response
 */
export const getAllOrdersByBarId = (
  barId: number,
  callback: (response: any) => void
): void => {
  socket.emit("getAllOrdersByBarId", barId, (response: any) => {
    callback(response); // Pass the response to the callback
  });
};

/**
 * Function to connect to the WebSocket server
 */
export const connectSocket = (): void => {
  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
  });
};

/**
 * Function to disconnect from the WebSocket server
 */
export const disconnectSocket = (): void => {
  socket.disconnect();
};
