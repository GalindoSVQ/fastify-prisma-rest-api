import { FastifyReply, FastifyRequest } from "fastify";
import { CreateExpenseInput } from "./expense.schema";
import {
  createExpense,
  deleteExpense,
  getExpensesFromGroup,
} from "./expense.service";

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
