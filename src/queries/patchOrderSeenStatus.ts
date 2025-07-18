import { waiterServiceApi } from ".";

export type UsePatchOrderSeenStatusSchema = {
  id: number;
  barId: number;
  tableId: number;
  status: string;
  date: string;
  total: number;
  comment?: string | null;
};

export const patchOrderSeenStatus = async (
  orderId: number,
  accessToken: string
): Promise<UsePatchOrderSeenStatusSchema> => {

  const headers = { Authorization: `Bearer ${accessToken}` }

  const response = await waiterServiceApi.patch(
    `/order/${orderId}/status`,
    { orderId },
    { headers }
  );

  return response.data;
};