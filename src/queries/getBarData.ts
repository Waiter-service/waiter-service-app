import { waiterServiceApi } from ".";
import { z } from "zod";

const BarDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().nullable(),
  logo: z.string().nullable(),
  savingOrderHistory: z.boolean(),
  articles: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
    })
  ),
  tables: z.array(
    z.object({
      id: z.number(),
      number: z.number(),
      width: z.number(),
      positionX: z.number(),
      positionY: z.number(),
    })
  ),
});

export const getBarData = async (barId: number, accessToken?: string) => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  const res = await waiterServiceApi.get(`/bar/waiter/${barId}`, { headers });

  return BarDataSchema.parse(res.data);
};