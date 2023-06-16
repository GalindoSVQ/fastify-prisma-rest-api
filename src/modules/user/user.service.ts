import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserSchema } from "./user.schema";

export async function createUser(userData: CreateUserSchema) {
  const { password, username } = userData;
  const { salt, hash } = hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      firstName: username,
      password: hash,
      salt,
    },
  });

  return user;
}

export async function findUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}

export async function findUsers() {
  return await prisma.user.findMany();
}
