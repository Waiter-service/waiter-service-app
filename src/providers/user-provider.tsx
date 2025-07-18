"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface UserContextType {
  user: {
    sub: number;
    accessToken?: string; // Optional, depending on your use case
    exp?: number; // Optional, depending on your use case
  };
  setUser: (user: any) => void;
}

// Create the context with default values
export const UserContext = createContext<UserContextType | null>(null);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider component
export const UserProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: any; // Optional initial value for the user
}) => {
  const [user, setUser] = useState<any>(value || null); // Initialize with `value` if provided

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
