export type ClientRole = "USER" | "ADMIN";

export interface Address {
  id: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
  bairro: string;
  complemento: string;
  isDefault?: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  role: ClientRole;
  numberPhone?: string;
  createdAt: string;
  addresses: Address[];
}
