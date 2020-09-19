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

function get<T>(url: string): Promise<T> {
  return request(`${apiRoot}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
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

export const whoami = () => {
  return get<{ email: string }>("auth/whoami");
};

export const logout = () => post("auth/logout", {});

export const register = (email: string, name: string, password: string) => {
  const postData = {
    email,
    name,
    password,
  };
  return post<{ id: string }>("auth/register", postData);
};

export const resetpassword = (email: string) => {
  const postData = {
    email,
  };
  return post("auth/resetpassword", postData);
};

export const changepassword = (token: string, password: string) => {
  const postData = {
    token,
    password,
  };
  console.log(postData);
  return post("auth/changepassword", postData);
};
