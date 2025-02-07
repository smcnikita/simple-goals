const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function fetchFromAPI<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}/api/${endpoint}`;
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error(`Error API: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
