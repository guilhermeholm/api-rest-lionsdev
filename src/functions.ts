import { type IUserAdmin } from "./interfaces";

export function getData<T>(items: T[]): T[] {
  return items;
}

export function getById<T extends { id: number }>(items: T[], id: number): T | undefined 
{
  for (let i = 0; i < items.length; i++) {
    if (items[i]?.id === id) {
      return items[i];
    }
  }
  return undefined;
}

export function isValidUser(
  user: {
    name: string;
    email: string;
    isActive: boolean;
  }
): boolean {
  return (
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    typeof user.isActive === "boolean"
  );
}

export function updateUser(
  user: IUserAdmin,
  data: Partial<IUserAdmin>
): IUserAdmin {
  if (data.name) {
    user.name = data.name;
  }

  if (data.email) {
    user.email = data.email;
  }

  if (data.isActive !== undefined) {
    user.isActive = data.isActive;
  }

  return user;
}