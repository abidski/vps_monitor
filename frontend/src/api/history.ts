const API_URL = import.meta.env.VITE_HISTORY_URL;
export async function get_history(hours: number = 24) {
  console.log(`${API_URL}?hours=${hours}`);
  const data = await fetch(`${API_URL}?hours=${hours}`);
  if (!data.ok) throw new Error("Failed to fetch history");
  return data.json();
}
