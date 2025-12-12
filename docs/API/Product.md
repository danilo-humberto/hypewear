**Products API – Variáveis de API Documentadas**

O módulo `products.endpoint.ts` concentra todas as operações relacionadas a produtos: listagem com filtros, busca detalhada e criação de produto.

---

## **1. `getProducts`**

Retorna a lista de produtos aplicando filtros opcionais.

### **Rota**

```
GET /product
```

### **Parâmetros**

| Nome     | Tipo           | Descrição                                      |
| -------- | -------------- | ---------------------------------------------- |
| `params` | ProductFilters | Filtros de busca (categoria, preço, nome etc.) |

### **Tratamento interno**

O código remove automaticamente filtros **vazios, null ou undefined** antes da requisição:

```ts
Object.entries(params).filter(
  ([, value]) => value !== undefined && value !== "" && value !== null
);
```

Isso evita enviar parâmetros inválidos para a API.

### **Retorno**

`Promise<any[]>` — Lista de produtos filtrados.

### **Exemplo**

```ts
const products = await getProducts({
  category: "sneakers",
  minPrice: 100,
  maxPrice: 300
});
```

---

## **2. `getProduct`**

Retorna os detalhes de um produto específico.

### **Rota**

```
GET /product/:id
```

### **Parâmetros**

| Nome | Tipo   | Descrição     |
| ---- | ------ | ------------- |
| `id` | string | ID do produto |

### **Retorno**

`Promise<Product>` — Dados completos do produto.

### **Exemplo**

```ts
const product = await getProduct("product_123");
```

---

## **3. `addProduct`**

Cria um novo produto no sistema.
Requer autenticação via token.

### **Rota**

```
POST /product
```

### **Parâmetros**

| Nome      | Tipo    | Descrição                               |
| --------- | ------- | --------------------------------------- |
| `payload` | Product | Dados completos do produto a ser criado |

### **Autenticação**

O token é obtido diretamente do storage:

```ts
const token = getClientData("client")?.access_token;
```

### **Headers**

```json
{
  "Authorization": "Bearer <token>"
}
```

### **Retorno**

`Promise<any>` — Produto criado.

### **Exemplo**

```ts
await addProduct({
  name: "Tênis Nike Air",
  price: 399,
  description: "Lançamento exclusivo",
  category: "sneakers",
  images: [],
});
```

