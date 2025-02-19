type ReturnType = Promise<Response>;

export async function fetchFromAPI(endpoint: string, init?: RequestInit): ReturnType {
  const url = `/api/${endpoint}`;
  return await fetch(url, init);
}
