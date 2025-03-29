import { apiFetch } from "../utils/interceptor-api";

export async function getAccountByUser(userId: number) {
  try {
    const data = await apiFetch(`/accounts?userId=${userId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener la transacción:", error);
    return null;
  }
}

export async function getAccountByNumber(accountNumber: string) {
  try {
    const data = await apiFetch(`/accounts?accountNumber=${accountNumber}`);
    return data;
  } catch (error) {
    console.error("Error al obtener la transacción:", error);
    return null;
  }
}

export async function updateAccountById(accountId: any, payload: any) {
  try {
    const response = await apiFetch(`/accounts/${accountId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.error("Error al actualizar saldo", error);
    throw error;
  }
}

