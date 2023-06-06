import prisma from "../../utils/prisma";
import { CreateUserSchema } from "./user.schema";

export async function createUser(userData: CreateUserSchema) {
  const user = await prisma.user.create({
    data: userData,
  });

  return user;
}
