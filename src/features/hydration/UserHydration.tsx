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
import { patchOrderSeenStatus } from "@/queries/patchOrderSeenStatus";

interface UserHydrationProps {
  children: React.ReactNode;
}

export default async function UserHydration({ children }: UserHydrationProps) {
  const queryClient = new QueryClient();

  const accessTokenCookie = (await cookies()).get("access_token");

  if (!accessTokenCookie) {
    redirect("/login");
  }

  const accessToken = accessTokenCookie.value;
  const claims = parseJwt(accessToken);
  if (!claims) {
    redirect("/login");
  }

  await queryClient.prefetchQuery({
    queryKey: ["barData", claims.sub],
    queryFn: () => getBarData(claims.sub, accessToken),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
