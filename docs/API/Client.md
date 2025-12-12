**Clients API – Variáveis de API Documentadas**

O módulo `clients.endpoint.ts` contém as funções responsáveis por listar, consultar, atualizar e remover clientes do sistema.

---

## **1. `getClients`**

Retorna a lista de todos os clientes cadastrados.

### **Rota**

```
GET /clients
```

### **Parâmetros**

Nenhum.

### **Retorno**

`Promise<any[]>` — Lista de clientes.

### **Exemplo**

```ts
const clients = await getClients();
```

---

## **2. `getClient`**

Retorna os dados de um cliente específico pelo ID.

### **Rota**

```
GET /clients/:id
```

### **Parâmetros**

| Nome | Tipo   | Descrição              |
| ---- | ------ | ---------------------- |
| `id` | string | ID do cliente desejado |

### **Retorno**

`Promise<any>` — Dados completos do cliente.

### **Exemplo**

```ts
const client = await getClient("client_123");
```

---

## **3. `updateClient`**

Atualiza parcialmente os dados de um cliente.

### **Rota**

```
PATCH /clients/:id
```

### **Parâmetros**

| Nome      | Tipo    | Descrição                             |
| --------- | ------- | ------------------------------------- |
| `id`      | string  | ID do cliente a ser atualizado        |
| `payload` | unknown | Dados atualizados (nome, email, etc.) |

> O tipo `unknown` indica que o payload pode variar; pode ser tipado futuramente.

### **Retorno**

`Promise<any>` — Dados do cliente atualizado.

### **Exemplo**

```ts
await updateClient("client_123", { name: "Novo Nome" });
```

---

## **4. `deleteClient`**

Remove um cliente do sistema.

### **Rota**

```
DELETE /clients/:id
```

### **Parâmetros**

| Nome | Tipo   | Descrição                       |
| ---- | ------ | ------------------------------- |
| `id` | string | ID do cliente que será removido |

### **Retorno**

`Promise<any>` — Geralmente confirma remoção ou retorna o objeto deletado.

### **Exemplo**

```ts
await deleteClient("client_123");
```

