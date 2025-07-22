import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { parseJwt } from "@/utils/misc/jwt/jwt";
import { getBarData } from "@/queries/getBarData";
import { UserProvider } from "@/providers/user-provider";

interface UserHydrationProps {
  children: React.ReactNode;
}

const isTokenExpired = (token: string): boolean => {
  const claims = parseJwt(token);
  if (!claims || !claims.exp) {
    return true; 
  }
  const currentTime = Math.floor(Date.now() / 1000); 
  return claims.exp < currentTime; 
};

export default async function UserHydration({ children }: UserHydrationProps) {
  const queryClient = new QueryClient();

  const accessTokenCookie = (await cookies()).get("access_token");

  if (!accessTokenCookie) {
    redirect("/login");
  }

  const accessToken = accessTokenCookie.value;

  // Check if the token is expired
  if (isTokenExpired(accessToken)) {
    redirect("/login");
  }

  const claims = parseJwt(accessToken);
  if (!claims) {
    redirect("/login");
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserProvider
        value={{
          ...claims,
          accessToken,
        }}
      >
        {children}
      </UserProvider>
    </HydrationBoundary>
  );
}