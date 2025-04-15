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
