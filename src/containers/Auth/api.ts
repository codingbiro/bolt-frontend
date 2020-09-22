import sha1 from "sha1";

const apiRoot = "http://localhost:3332/";

// Function creates a new password that is the hash of plaintext password
// To the backend the hash is the password
// This makes it harder to detect the plaintext password
// It does not increase the security for authenticating to the backend
const hashPassword = (plaintext: string): string => {
  const salt = "LZXdFTBtTG8d6Z4BffixvRDakEktNxRC";
  return sha1(salt + plaintext) as string;
};

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
    password: hashPassword(password),
  };
  return post<{ id: string; email: string }>("auth/login", postData);
};

export const whoami = () => {
  return get<{ id: string; email: string }>("auth/whoami");
};

export const logout = () => post("auth/logout", {});

export const register = (email: string, name: string, password: string) => {
  const postData = {
    email,
    name,
    password: hashPassword(password),
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
  return post("auth/changepassword", postData);
};
