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

export interface User {
  id: string;
  name: string;
  email: string;
  numberPhone: string;
  createdAt: string;
}
