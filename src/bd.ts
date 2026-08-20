import { type IUserAdmin } from "./interfaces";

export const users: IUserAdmin[] = [
  {
    id: 1,
    name: "Guilherme Holm",
    email: "guilhermeholm@email.com",
    isActive: true,
    role: "admin",
  },
  { id: 2, name: "Alexo Ribas", email: "alexo@email.com", isActive: true },
  {
    id: 3,
    name: "Filipo Paixao",
    email: "filipopaixao@email.com",
    isActive: false,
  },
];
