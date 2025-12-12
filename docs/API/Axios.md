**Axios Config – Variáveis de API Documentadas**

O arquivo `axios.ts` configura a instância global da API usada por todo o projeto.
Ele define:

* Base URL da API
* Cabeçalhos padrão
* Interceptor de requisições (para anexar token)
* Interceptor de respostas (para lidar com erros de autenticação)

---

# **1. Instância Principal**

```ts
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
```

## 🔹 **baseURL**

Define a URL base usada em todos os endpoints.

> Normalmente substituída por uma variável de ambiente, ex: `env.apiUrl`.

## 🔹 **headers**

Define o tipo de dados enviado para a API:

```
Content-Type: application/json
```

---

# **2. Interceptor de Requisição**

Responsável por anexar automaticamente o **token JWT** em todas as requisições, quando o usuário estiver autenticado.

### Fluxo:

1. Obtém os dados do cliente armazenados com `getClientData("client")`.
2. Faz o parse do valor se ele estiver em formato string.
3. Verifica se existe `access_token`.
4. Se existir, adiciona no cabeçalho:

```
Authorization: Bearer <token>
```

### Código Documentado

```ts
api.interceptors.request.use(
  (config) => {
    const storedClient = getClientData("client");

    if (storedClient) {
      const parsedClient =
        typeof storedClient === "string"
          ? JSON.parse(storedClient)
          : storedClient;

      if (parsedClient.access_token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${parsedClient.access_token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
```

### **Comportamento**

* Todas as chamadas a `api.get`, `api.post`, etc., já incluem o token.
* Evita repetição de código nos endpoints.

---

# **3. Interceptor de Resposta**

Responsável por capturar erros de autenticação (401 e 403) e disparar um evento global de sessão expirada.

### Fluxo:

1. Se a resposta for **401 (Unauthorized)** ou **403 (Forbidden)**
2. Dispara:

```
authEvents.emitSessionExpired();
```

3. Continua lançando o erro para que a tela possa tratar se necessário.

### Código Documentado

```ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401) ||
      error.response.status === 403
    ) {
      authEvents.emitSessionExpired();
    }

    return Promise.reject(error);
  }
);
```

### **Comportamento**

* Garante que se o token expirar → o app é notificado.
* Pode ser usado para:

  * mandar o usuário para tela de login
  * limpar sessão
  * exibir modal de sessão expirada

---

# **4. Exportação**

A instância configurada é exportada para uso global:

```ts
export default api;
```
