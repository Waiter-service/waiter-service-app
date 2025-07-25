"use client";

import { useEffect, useState } from "react";
import { parseJwt } from "@/utils/misc/jwt/jwt";
import { UserProvider } from "@/providers/user-provider";
import { useRouter } from "next/navigation";

interface UserHydrationProps {
  children: React.ReactNode;
}

// Helper function to check if the token is expired
const isTokenExpired = (token: string): boolean => {
  const claims = parseJwt(token);
  if (!claims || !claims.exp) {
    return true; // Invalid token
  }
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return claims.exp < currentTime; // Token is expired if `exp` is less than the current time
};

export default function UserHydration({ children }: UserHydrationProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (isTokenExpired(token)) {
      router.push("/login");
      return;
    }

    setAccessToken(token);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const claims = accessToken ? parseJwt(accessToken) : null;

  return (
    <UserProvider
      value={{
        ...claims,
        accessToken,
      }}
    >
      {children}
    </UserProvider>
  );
}