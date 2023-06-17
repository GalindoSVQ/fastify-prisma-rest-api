import { FastifyReply, FastifyRequest } from "fastify";
import { CreateExpenseInput, UpdateExpenseInput } from "./expense.schema";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpensesFromGroup,
  updateExpense,
} from "./expense.service";
import {
  createExpensesOnUsers,
  getExpensesOnUsersByExpenseUuid,
} from "../expensesOnUsers/expensesOnUsers.service";
import { findUserByUuid } from "../user/user.service";

export async function createExpenseHandler(
  request: FastifyRequest<{ Body: CreateExpenseInput }>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const expense = await createExpense({
      ...body,
      authorUuid: request.user.uuid,
    });

    await createExpensesOnUsers({
      expenseUuid: expense.uuid,
      userUuid: request.user.uuid,
    });

    return reply.code(201).send(expense);
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}

export async function getAllExpensesFromGroupHandler(
  request: FastifyRequest<{ Params: { groupUuid: string } }>
) {
  const expenses = await getExpensesFromGroup(request.params.groupUuid);

  return expenses;
}

export async function deleteExpenseHandler(
  request: FastifyRequest<{ Params: { expenseUuid: string } }>,
  reply: FastifyReply
) {
  const { expenseUuid } = request.params;

  await deleteExpense(expenseUuid);

  return reply.code(204).send();
}

export async function updateExpenseHandler(
  request: FastifyRequest<{
    Params: { expenseUuid: string };
    Body: UpdateExpenseInput;
  }>,
  reply: FastifyReply
) {
  const { expenseUuid } = request.params;

  const expenseUpdated = await updateExpense(expenseUuid, request.body);

  return reply.code(200).send(expenseUpdated);
}

export async function getExpenseHandler(
  request: FastifyRequest<{
    Params: {
      expenseUuid: string;
    };
  }>
) {
  const expenseUuid = request.params.expenseUuid;

  const expense = await getExpense(expenseUuid);

  const expensesOnUsers = await getExpensesOnUsersByExpenseUuid(expenseUuid);

  const retrieveUsers = expensesOnUsers.map(async (expenseOnUser) => {
    const user = await findUserByUuid(expenseOnUser.userUuid);

    return user;
  });

  return {
    ...expense,
    sharedWith: (await Promise.all(retrieveUsers)).map((user) => ({
      uuid: user?.uuid,
      username: user?.username,
    })),
  };
}
