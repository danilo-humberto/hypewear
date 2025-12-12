**Documentação das Variáveis de API Cart**

Este documento descreve todas as funções disponíveis no módulo `cart.endpoint.ts`, seus parâmetros, retornos e finalidades.
Essas funções são responsáveis por se comunicar com a API referente ao **carrinho de compras**.

---

# 🛒 **Cart API Endpoints**

## **1. `addItemToCart`**

Adiciona um item ao carrinho do usuário autenticado.

### **Rota**

```
POST /cart/items
```

### **Parâmetros**

| Nome        | Tipo   | Descrição                      |
| ----------- | ------ | ------------------------------ |
| `productId` | string | ID do produto a ser adicionado |
| `quantity`  | number | Quantidade do produto          |
| `token`     | string | Token JWT para autenticação    |

### **Retorno**

`Promise<CartItem>`

### **Exemplo de uso**

```ts
const item = await addItemToCart("123", 2, token);
```

---

## **2. `updateCartItem`**

Atualiza a quantidade de um item já existente no carrinho.

### **Rota**

```
PATCH /cart/items
```

### **Parâmetros**

| Nome        | Tipo   | Descrição                      |
| ----------- | ------ | ------------------------------ |
| `productId` | string | ID do produto a ser atualizado |
| `quantity`  | number | Nova quantidade                |
| `token`     | string | Token JWT                      |

### **Retorno**

`Promise<CartItem>`

### **Exemplo**

```ts
await updateCartItem("123", 5, token);
```

---

## **3. `removeCartItem`**

Remove um item do carrinho pelo `productId`.

### **Rota**

```
DELETE /cart/items/:productId
```

### **Parâmetros**

| Nome        | Tipo   | Descrição     |
| ----------- | ------ | ------------- |
| `productId` | string | ID do produto |
| `token`     | string | Token JWT     |

### **Retorno**

`Promise<{ removed: boolean }>`

### **Exemplo**

```ts
await removeCartItem("123", token);
```

---

## **4. `getMyCart`**

Retorna o carrinho atual do usuário autenticado.

### **Rota**

```
GET /cart
```

### **Parâmetros**

| Nome    | Tipo   | Descrição |
| ------- | ------ | --------- |
| `token` | string | Token JWT |

### **Retorno**

`Promise<Cart>`

### **Exemplo**

```ts
const cart = await getMyCart(token);
```

---

## **5. `clearMyCart`**

Remove todos os itens do carrinho do usuário.

### **Rota**

```
POST /cart/clear
```

### **Parâmetros**

| Nome    | Tipo   | Descrição |
| ------- | ------ | --------- |
| `token` | string | Token JWT |

### **Retorno**

`Promise<any>` *(depende da implementação da API)*

### **Exemplo**

```ts
await clearMyCart(token);
```
