import { waiterServiceApi } from ".";

const deleteOrder = async (tableId: string, accessToken: string) => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined;

  const res = await waiterServiceApi.delete(`/order/${tableId}`, { headers });

  return res.data;
};

export { deleteOrder };