import prisma from "../../utils/prisma";
import { CreateExpenseInput, UpdateExpenseInput } from "./expense.schema";
import { Category, Status } from "@prisma/client";

export async function createExpense(
  expenseData: CreateExpenseInput & { authorUuid: string }
) {
  const expense = await prisma.expense.create({
    data: {
      ...expenseData,
      category: expenseData.category as Category,
    },
  });

  return { ...expense, groupUuid: expenseData.groupUuid };
}

export async function getExpensesFromGroup(groupUuid: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      groupUuid: groupUuid,
    },
  });

  return expenses;
}
export async function deleteExpense(expenseUuid: string) {
  await prisma.expense.delete({
    where: {
      uuid: expenseUuid,
    },
  });
}

export async function updateExpense(
  expenseUuid: string,
  expenseData: UpdateExpenseInput
) {
  return await prisma.expense.update({
    where: {
      uuid: expenseUuid,
    },
    data: {
      ...expenseData,
      category: expenseData.category as Category,
      status: expenseData.status as Status,
    },
  });
}

export async function getExpense(expenseUuid: string) {
  return await prisma.expense.findUnique({
    where: {
      uuid: expenseUuid,
    },
  });
}
