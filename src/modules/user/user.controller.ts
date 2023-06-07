import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserSchema, LoginInput } from "./user.schema";
import { server } from "../../app";
import { verifyPassword } from "../../utils/hash";

export async function regiterUserHandler(
  request: FastifyRequest<{ Body: CreateUserSchema }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  const user = await findUserByEmail(body.email);

  if (!user) {
    return reply.code(401).send({ message: "Invalid email or password" });
  }

  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (correctPassword) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...rest } = user;

    return { token: server.jwt.sign(rest) };
  }

  return reply.code(401).send({ message: "Invalid email or password" });
}

export async function getUserHandler() {
  const users = await findUsers();

  return users;
}
