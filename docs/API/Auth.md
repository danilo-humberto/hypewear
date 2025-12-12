# 🔐 **Auth API – Variáveis de API Documentadas**

O módulo `auth.endpoint.ts` gerencia o fluxo de autenticação do usuário, incluindo login, registro e logout.

---

## **1. `login`**

Realiza autenticação do usuário com email e senha.

### **Rota**

```
POST /auth/login
```

### **Parâmetros**

| Nome          | Tipo     | Descrição                       |
| ------------- | -------- | ------------------------------- |
| `credentials` | LoginDto | Dados do login (e-mail e senha) |

### **Retorno**

`Promise<any>`
Geralmente retorna:

* Token JWT
* Dados do cliente autenticado

(Dependendo da implementação da API.)

### **Exemplo**

```ts
const response = await login({
  email: "user@example.com",
  password: "123456"
});
```

---

## **2. `register`**

Registra um novo usuário no sistema.

### **Rota**

```
POST /auth/register
```

### **Parâmetros**

| Nome          | Tipo        | Descrição                               |
| ------------- | ----------- | --------------------------------------- |
| `credentials` | RegisterDto | Dados necessários para criação da conta |

`RegisterDto` normalmente inclui:

* nome
* email
* senha
* confirmação de senha (varia conforme implementação)

### **Retorno**

`Promise<any>`
Retorna os dados do usuário criado e/ou token de autenticação.

### **Exemplo**

```ts
await register({
  name: "Juliana Felix",
  email: "ju@example.com",
  password: "123456",
});
```

---

## **3. `logout`**

Realiza logout localmente, limpando dados do cliente do storage.

### **Rota**

**Não possui chamada à API.**
Apenas remove os dados no dispositivo.

### **Parâmetros**

Nenhum.

### **Comportamento**

Executa:

```ts
removeClientData("client");
```

Ou seja:

* Remove informações de autenticação armazenadas localmente
* Invalida a sessão no app

### **Retorno**

`void`

### **Exemplo**

```ts
logout();
```

