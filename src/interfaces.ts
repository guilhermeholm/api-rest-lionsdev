import { type TUserRole } from "./types";

export interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface IUserAdmin extends IUser {
  role?: TUserRole;
}