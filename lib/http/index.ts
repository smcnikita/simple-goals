const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

type ReturnType = Promise<Response>;

export async function fetchFromAPI(endpoint: string, init?: RequestInit): ReturnType {
  const url = `${API_BASE_URL}/api/${endpoint}`;
  return await fetch(url, init);
}
