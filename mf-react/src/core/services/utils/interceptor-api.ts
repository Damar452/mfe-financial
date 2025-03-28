const API_BASE_URL = "http://localhost:3000";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  //const token = localStorage.getItem("token"); // Obtiene el token almacenado
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDMxOTMxNzYsImV4cCI6MTc0MzE5Njc3Nn0.RwyNFp5iwMIzxgffKK7s-vm93tvMTVGlIdZNW4y53tg";

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
