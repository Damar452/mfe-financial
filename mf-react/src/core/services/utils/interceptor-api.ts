const API_BASE_URL = "http://localhost:3000";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = JSON.parse(window.localStorage.getItem('USER_DATA')!).token;

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.statusText}`);
  }

  return await response.json();
}
