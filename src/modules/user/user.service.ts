import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserSchema } from "./user.schema";

export async function createUser(userData: CreateUserSchema) {
  const { password, ...rest } = userData;
  const { salt, hash } = hashPassword(password);

  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hash,
      salt,
    },
  });

  return user;
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function findUsers() {
  return await prisma.user.findMany();
}
