const apiRoot = "http://localhost:3332/";

function parseJSON(response: Response) {
  if (response.status === 204) {
    return undefined;
  }
  return response.json();
}

function checkStatus(response: Response) {
  if (response.status !== 200 && response.status !== 204) {
    throw response;
  }
  return response;
}

function request(url: string, options: RequestInit) {
  return window.fetch(url, options).then(checkStatus).then(parseJSON);
}

function post<T>(url: string, postData: Record<string, unknown>): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return request(`${apiRoot}${url}`, {
    headers,
    method: "POST",
    body: JSON.stringify(postData),
    credentials: "include",
  });
}

export const login = (email: string, password: string) => {
  const postData = {
    email,
    password,
  };
  return post<{ id: string; email: string }>("auth/login", postData);
};
