**Orders API – Variáveis de API Documentadas**

O módulo `orders.endpoint.ts` contém as funções responsáveis por criar pedidos, listar pedidos de um cliente e buscar detalhes de um pedido específico.

---

## **1. `createOrder`**

Cria um novo pedido no sistema.

### **Rota**

```
POST /orders
```

### **Parâmetros**

| Nome    | Tipo           | Descrição                                                                   |
| ------- | -------------- | --------------------------------------------------------------------------- |
| `dto`   | CreateOrderDto | Informações necessárias para criar o pedido (itens, valores, endereço etc.) |
| `token` | string         | Token JWT do cliente autenticado                                            |

### **Headers**

```json
{
  "Authorization": "Bearer <token>"
}
```

### **Retorno**

`Promise<Order>` — Retorna o pedido criado.

### **Exemplo**

```ts
const order = await createOrder(orderData, token);
```

---

## **2. `getOrders`**

Retorna todos os pedidos de um cliente específico.

### **Rota**

```
GET /orders/client/:id
```

### **Parâmetros**

| Nome | Tipo   | Descrição     |
| ---- | ------ | ------------- |
| `id` | string | ID do cliente |

### **Comportamento especial**

* Se a API retornar **404**, a função devolve **[]**.
* Outros erros são lançados.

### **Retorno**

`Promise<any[]>` — Lista de pedidos do cliente.

### **Exemplo**

```ts
const myOrders = await getOrders("client_123");
```

---

## **3. `getOrder`**

Obtém os detalhes de um pedido específico.

### **Rota**

```
GET /orders/:id
```

### **Parâmetros**

| Nome    | Tipo   | Descrição    |
| ------- | ------ | ------------ |
| `id`    | string | ID do pedido |
| `token` | string | Token JWT    |

### **Headers**

```json
{
  "Authorization": "Bearer <token>"
}
```

### **Comportamento especial**

* Se a API retornar **404**, a função devolve **null**.
* Outros erros são lançados.

### **Retorno**

`Promise<Order | null>`

### **Exemplo**

```ts
const orderDetails = await getOrder("order_789", token);
```
