**Categories API – Variáveis de API Documentadas**

O módulo `categories.endpoint.ts` contém as funções responsáveis por listar e criar categorias dentro da aplicação.

---

## **1. `getCategories`**

Retorna a lista de todas as categorias disponíveis.

### **Rota**

```
GET /category
```

### **Parâmetros**

Não recebe parâmetros.

### **Retorno**

`Promise<any[]>` — Lista de categorias cadastradas.

### **Exemplo**

```ts
const categories = await getCategories();
```

---

## **2. `addCategory`**

Cria uma nova categoria.
Necessita autenticação via token **Bearer**.

### **Rota**

```
POST /category
```

### **Parâmetros**

| Nome    | Tipo   | Descrição                                        |
| ------- | ------ | ------------------------------------------------ |
| `name`  | string | Nome da nova categoria                           |
| `token` | string | Token JWT do administrador ou usuário autorizado |

### **Corpo da Requisição**

```json
{
  "name": "Tênis"
}
```

### **Headers**

```json
{
  "Authorization": "Bearer <token>"
}
```

### **Retorno**

`Promise<any>` — Dados da categoria recém-criada.

### **Exemplo**

```ts
await addCategory("Acessórios", token);
```
