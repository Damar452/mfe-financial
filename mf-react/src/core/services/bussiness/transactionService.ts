import { apiFetch } from "../utils/interceptor-api";

export async function fetchTransaction(transactionId: number) {
  try {
    const data = await apiFetch(`/transactions/${transactionId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener la transacción:", error);
    return null;
  }
}
