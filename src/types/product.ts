export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  estoque: number;
  status: "ATIVO" | "INATIVO";
  imagem: string;
  categoryId: string;

  createdAt: string;
  updatedAt: string;
}
