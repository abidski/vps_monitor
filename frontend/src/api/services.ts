const API_URL = import.meta.env.VITE_SERVICES_URL;
export async function get_services() {
  const data = await fetch(`${API_URL}`);
  if (!data.ok) throw new Error("Failed to fetch history");
  return data.json();
}
