import { z } from "zod";
import { waiterServiceApi } from ".";

const postLoginBarBodySchema = z.object({
    username: z.string(),
    password: z.string(),
});

type UsePostLoginBarResponseSchema = {
    access_token: string;
};

export const postLoginBar = async (
    loginData: unknown
): Promise<UsePostLoginBarResponseSchema> => {
  const parsedOrderData = postLoginBarBodySchema.parse(loginData);

  const response = await waiterServiceApi.post("/auth/login-bar", parsedOrderData);
  return response.data;
};
