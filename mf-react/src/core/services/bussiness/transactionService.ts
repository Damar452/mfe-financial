import { apiFetch } from "../utils/interceptor-api";

export async function fetchTransaction(transactionId: number) {
  try {
    const data = await apiFetch(`/transactions/?userId=${transactionId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener la transacción:", error);
    return null;
  }
}

export async function createTransaction(transactionData: any) {
  try {
    const response = await apiFetch("/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    });

    return response;
  } catch (error) {
    console.error("Error al crear la transacción:", error);
    throw error;
  }
}