const prefixKey = "@auth/";

type Client = {
  access_token: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
};

export const setClientData = (key: string, value: any) => {
  localStorage.setItem(`${prefixKey}${key}`, JSON.stringify(value));
};

export const getClientData = (key: string): Client =>
  JSON.parse(localStorage.getItem(`${prefixKey}${key}`) || "{}");

export const removeClientData = (key: string) =>
  localStorage.removeItem(`${prefixKey}${key}`);
