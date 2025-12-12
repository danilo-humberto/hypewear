**Payments API – Variáveis de API Documentadas**

O módulo `payments.endpoint.ts` contém as funções responsáveis por criar pagamentos, confirmar/cancelar transações, consultar pagamentos específicos e listar todos os pagamentos.

---

## **1. `createPayment`**

Cria uma nova solicitação de pagamento.

### **Rota**

```
POST /payments
```

### **Parâmetros**

| Nome    | Tipo             | Descrição                                                             |
| ------- | ---------------- | --------------------------------------------------------------------- |
| `dto`   | CreatePaymentDto | Dados necessários para criar o pagamento (valor, pedido, método etc.) |
| `token` | string           | Token JWT do usuário autenticado                                      |

### **Headers**

```json
{
  "Authorization": "Bearer <token>"
}
```

### **Retorno**

`Promise<Payment>` — Dados do pagamento criado.

### **Exemplo**

```ts
const payment = await createPayment(paymentDto, token);
```

---

## **2. `confirmPayment`**

Confirma um pagamento específico e retorna o pedido associado atualizado.

### **Rota**

```
PATCH /payments/:paymentId/confirm
```

### **Parâmetros**

| Nome        | Tipo   | Descrição       |
| ----------- | ------ | --------------- |
| `paymentId` | string | ID do pagamento |
| `token`     | string | Token JWT       |

### **Retorno**

`Promise<Order>` — Pedido atualizado após a confirmação do pagamento.

### **Exemplo**

```ts
const order = await confirmPayment("payment_123", token);
```

---

## **3. `cancelPayment`**

Cancela um pagamento específico e retorna o pedido associado atualizado.

### **Rota**

```
PATCH /payments/:paymentId/cancel
```

### **Parâmetros**

| Nome        | Tipo   | Descrição       |
| ----------- | ------ | --------------- |
| `paymentId` | string | ID do pagamento |
| `token`     | string | Token JWT       |

### **Retorno**

`Promise<Order>` — Pedido atualizado após o cancelamento.

### **Exemplo**

```ts
const order = await cancelPayment("payment_123", token);
```

---

## **4. `getPaymentById`**

Busca os dados de um pagamento específico.

### **Rota**

```
GET /payments/:paymentId
```

### **Parâmetros**

| Nome        | Tipo   | Descrição       |
| ----------- | ------ | --------------- |
| `paymentId` | string | ID do pagamento |
| `token`     | string | Token JWT       |

### **Retorno**

`Promise<Payment>` — Informações do pagamento consultado.

### **Exemplo**

```ts
const payment = await getPaymentById("payment_123", token);
```

---

## **5. `getAllPayments`**

Retorna todos os pagamentos cadastrados no sistema.

> Geralmente essa rota é usada por administradores.

### **Rota**

```
GET /payments
```

### **Parâmetros**

| Nome    | Tipo   | Descrição |
| ------- | ------ | --------- |
| `token` | string | Token JWT |

### **Retorno**

`Promise<Payment[]>` — Lista de todos os pagamentos.

### **Exemplo**

```ts
const payments = await getAllPayments(token);
```

