import { waiterServiceApi } from ".";

type UsePatchOrderSeenStatusSchema = {
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
): Promise<UsePatchOrderSeenStatusSchema> => {

  const response = await waiterServiceApi.patch(`/order/${orderId}/status`, orderId);
  return response.data;
};
