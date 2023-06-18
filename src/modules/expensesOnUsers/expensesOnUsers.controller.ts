import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateExpensesOnUsersInput,
  CreateExpensesOnUsersToUserSchemaInput,
} from "./expensesOnUsers.schema";
import {
  createExpensesOnUsers,
  createExpensesOnUsersToUser,
  deleteExpensesOnUsers,
  getExpensesOnUsersByExpenseUuid,
} from "./expensesOnUsers.service";

export async function createExpensesOnUsersHandler(
  request: FastifyRequest<{ Body: CreateExpensesOnUsersInput }>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const expensesOnUsers = await createExpensesOnUsers(body);

    return reply.code(201).send(expensesOnUsers);
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

export async function createExpensesOnUsersToUserHandler(
  request: FastifyRequest<{ Body: CreateExpensesOnUsersToUserSchemaInput }>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const expensesOnUsers = await createExpensesOnUsersToUser(body);

    return reply.code(201).send(expensesOnUsers);
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

export async function deleteExpensesOnUsersHandler(
  request: FastifyRequest<{ Params: CreateExpensesOnUsersInput }>,
  reply: FastifyReply
) {
  const { expenseUuid, userUuid } = request.params;

  await deleteExpensesOnUsers(expenseUuid, userUuid);

  return reply.code(204).send();
}

export async function getExpensesOnUsersByExpenseUuidHandler(
  request: FastifyRequest<{ Params: { expenseUuid: string } }>
) {
  const { expenseUuid } = request.params;

  const expensesOnUsers = await getExpensesOnUsersByExpenseUuid(expenseUuid);

  return expensesOnUsers;
}
