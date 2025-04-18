type ApiData = {
  message?: string;
};

export class ApiError extends Error {
  status: number;
  data: ApiData;

  constructor(status: number, data: ApiData) {
    super("API Error");
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Makes an authenticated HTTP request to the specified URL with automatic handling of JSON and access tokens.
 * 
 * @param url - The URL to send the request to
 * @param options - Optional RequestInit object to customize the fetch request
 * @returns Promise that resolves with the JSON response data
 * @throws {ApiError} When the response status is not ok (2xx)
 * 
 * @example
 * try {
 *   const data = await fetcher('https://api.example.com/users', {
 *     method: 'POST',
 *     body: JSON.stringify({ name: 'John' })
 *   });
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.error(`API Error ${error.status}: ${error.data.message}`);
 *   }
 * }
 */
export const fetcher = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return data;
};
