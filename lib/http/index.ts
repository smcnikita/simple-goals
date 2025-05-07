export async function fetchFromAPI<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = `/api/${endpoint}`;
  const response = await fetch(url, init);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'API Error');
  }

  return await response.json();
}
