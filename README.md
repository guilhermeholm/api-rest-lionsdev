# Construindo uma API REST Básica com Express e TypeScript

Instale o Express e os tipos para ele:

`npm install express @types/express`

Crie um arquivo `src/server.ts`.

Configure um servidor Express básico que escute na porta `3000`.

Crie um array de usuários (objetos do tipo `IUser` que você criou no Exercício 3) em memória.

Implemente as seguintes rotas:

- **GET `/users`**: Retorna todos os usuários.

- **GET `/users/:id`**: Retorna um usuário específico pelo ID.

- **POST `/users`**: Adiciona um novo usuário ao array.

  O corpo da requisição deve ser validado para garantir que corresponde à interface `IUser` (pode ser uma validação simples para este exercício).

  Exemplo:

  `Example app listening on port 3000`

- **PUT `/users/:id`**: Atualiza um usuário existente.

- **DELETE `/users/:id`**: Remove um usuário.

Certifique-se de usar a tipagem do TypeScript em todas as partes da API (parâmetros de rota, corpo da requisição, respostas, etc.).
