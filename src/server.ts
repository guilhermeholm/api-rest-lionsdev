/*
Construindo uma API REST Básica com Express e TypeScript

Instale o Express e os tipos para ele: `npm install express @types/express`

Crie um arquivo `src/server.ts`.

Configure um servidor Express básico que escute na porta 3000.

Crie um array de usuários (objetos do tipo `IUser` que você criou no Exercício 3) em memória.
Implemente as seguintes rotas:

- GET `/users`: Retorna todos os usuários.

- GET `/users/:id`: Retorna um usuário específico pelo ID.

- POST `/users`: Adiciona um novo usuário ao array. 

O corpo da requisição deve ser validado para garantir que corresponde à interface `IUser` 
(pode ser uma validação simples para este exercício).

Example app listening on port

- PUT `/users/:id`: Atualiza um usuário existente.

- DELETE `/users/:id`: Remove um usuário.

Certifique-se de usar a tipagem do TypeScript em todas as partes da API 
(parâmetros de rota, corpo da requisição, respostas, etc.).
*/

import express from "express";
import type { Request, Response, Application } from "express";
import { users } from "./bd";
import type { IUserAdmin } from "./interfaces";
import { getData, getById, isValidUser, updateUser } from "./functions";

const app: Application = express();
const port: number = 3000;
app.use(express.json());

app.get("/users", (req: Request, res: Response<IUserAdmin[]>): void => {
  res.json(getData(users));
});

app.get("/users/:id", (req: Request<{ id: string }>, res: Response<IUserAdmin | { error: string }>): void => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).send({ error: "Formato de ID inválido"} );
      return;
    }

    const user = getById<IUserAdmin>(users, id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).send({
        error: "Usuário não encontrado",
      });
    }
  },
);

app.post("/users", (req: Request<object, IUserAdmin>, res: Response<IUserAdmin | { error: string }>): void => {
    const { name, email, isActive, role } = req.body;

    if (!isValidUser({ name, email, isActive })) {
      res.status(400).send({
        error: "Dados inválidos. Deve ter name, email e isActive.",
      });

      return;
    }

    let nextId = 1;

    const lastUser = users[users.length - 1];

    if (lastUser) {
      nextId = lastUser.id + 1;
    }

    const newUser: IUserAdmin = {
      id: nextId,
      name,
      email,
      isActive,
      role,
    };

    users.push(newUser);

    res.status(201).json(newUser);
  },
);

app.put("/users/:id", (req: Request<{ id: number }, IUserAdmin>,res: Response<IUserAdmin | { error: string }>,
  ): void => {
    const { name, email, isActive } = req.body;

    const user = getById<IUserAdmin>(users, req.params.id);

    if (user) {
      updateUser(user, { name, email, isActive });

      res.json(user);
    } else {
      res.status(404).send({ error: "Usuário não encontrado",});
    }
  },
);

app.delete("/users/:id", (req: Request<{ id: number }>, res: Response<IUserAdmin | string>): void => {
    const id = Number(req.params.id);

    const user: IUserAdmin | undefined = users.find((user) => user.id === id);

    if (!user) {
      res.status(404).send("Usuário não encontrado");
      return;
    }

    const newUsers: IUserAdmin[] = [];

    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];

      if (currentUser && currentUser.id !== id) {
        newUsers.push(currentUser);
      }
    }

    users.length = 0;

    for (let i = 0; i < newUsers.length; i++) {
      const currentUser = newUsers[i];

      if (currentUser) {
        users.push(currentUser);
      }
    }

    res.status(200).send(`Usuário ${user.name} removido com sucesso`);
  },
);

app.listen(port, (): void => {
  console.log(`Servidor de Holm rodando na porta ${port}`);
});
