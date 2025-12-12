**Address API – Variáveis de API Documentadas**

O módulo `address.endpoint.ts` concentra as operações relacionadas aos **endereços do cliente**.
Abaixo estão todas as funções exportadas, suas rotas, parâmetros e retornos.

---

## **1. `getAddresses`**

Obtém todos os endereços de um cliente específico.

### **Rota**

```
GET /address/me/:clientId
```

### **Parâmetros**

| Nome       | Tipo   | Descrição                      |
| ---------- | ------ | ------------------------------ |
| `clientId` | string | Identificador único do cliente |

### **Comportamento especial**

* Se a API retornar **404**, a função devolve um **array vazio (`[]`)**.
* Outros erros são lançados normalmente.

### **Retorno**

`Promise<any[]>` — Lista de endereços do usuário.

### **Exemplo**

```ts
const addresses = await getAddresses("client_123");
```

---

## **2. `addAddressRequest`**

Cria um novo endereço para o usuário.

### **Rota**

```
POST /address
```

### **Parâmetros**

| Nome      | Tipo    | Descrição                                       |
| --------- | ------- | ----------------------------------------------- |
| `payload` | unknown | Dados do endereço (objeto enviado para criação) |

> Observação: o tipo é genérico (`unknown`) — pode ser tipado futuramente.

### **Retorno**

`Promise<any>` — Dados do endereço criado.

### **Exemplo**

```ts
await addAddressRequest({
  postalCode: "00000-000",
  street: "Rua Exemplo",
  number: 100,
});
```

---

## **3. `deleteAddressRequest`**

Remove um endereço pelo ID.

### **Rota**

```
DELETE /address/:id
```

### **Parâmetros**

| Nome | Tipo   | Descrição                     |
| ---- | ------ | ----------------------------- |
| `id` | string | ID do endereço a ser removido |

### **Retorno**

`Promise<string>` — Retorna o próprio ID removido.

### **Exemplo**

```ts
await deleteAddressRequest("address_123");
```

---

## **4. `setDefaultAddressRequest`**

Define um endereço como padrão para o cliente.

### **Rota**

```
PATCH /address/:id/default
```

### **Parâmetros**

| Nome | Tipo   | Descrição                                   |
| ---- | ------ | ------------------------------------------- |
| `id` | string | ID do endereço que será marcado como padrão |

### **Retorno**

`Promise<any>` — Dados atualizados do endereço padrão.

### **Exemplo**

```ts
await setDefaultAddressRequest("address_123");
```

