import { toast } from 'sonner';

export async function fetchFromAPI<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = `/api/${endpoint}`;
  const response = await fetch(url, init);

  console.log(response.ok);

  if (!response.ok) {
    const errorBody = await response.json();

    toast.error(errorBody.message);

    throw new Error(errorBody.message || 'API Error');
  }

  return await response.json();
}
