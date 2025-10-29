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

export interface Order {
  id: number;
  createdAt: string;
  total: number;
  status: "ABERTO" | "AGUARDANDO_PAGAMENTO" | "PAGO" | "CANCELADO";
}

export interface User {
  id: string;
  name: string;
  email: string;
  numberPhone: string;
}
