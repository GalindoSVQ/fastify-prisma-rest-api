import prisma from "../../utils/prisma";
import {
  CreateExpensesOnUsersInput,
  CreateExpensesOnUsersToUserSchemaInput,
} from "./expensesOnUsers.schema";

export async function createExpensesOnUsers(
  expensesOnUsersData: CreateExpensesOnUsersInput
) {
  const expensesOnUsers = await prisma.expensesOnUsers.create({
    data: {
      ...expensesOnUsersData,
    },
  });

  return expensesOnUsers;
}

export async function getExpensesOnUsersByExpenseUuid(expenseUuid: string) {
  const expensesOnUsers = await prisma.expensesOnUsers.findMany({
    where: {
      expenseUuid: expenseUuid,
    },
  });

  return expensesOnUsers;
}

export async function createExpensesOnUsersToUser(
  expensesOnUsersData: CreateExpensesOnUsersToUserSchemaInput
) {
  const expensesOnUsers = await Promise.all(
    expensesOnUsersData.usersUuids.map((userUuid) =>
      prisma.expensesOnUsers.create({
        data: {
          expenseUuid: expensesOnUsersData.expenseUuid,
          userUuid,
        },
      })
    )
  );

  return expensesOnUsers;
}

export async function deleteExpensesOnUsers(
  expenseUuid: string,
  userUuid: string
) {
  const expensesOnUsers = await prisma.expensesOnUsers.findFirst({
    where: {
      expenseUuid: expenseUuid,
      userUuid: userUuid,
    },
  });

  if (expensesOnUsers) {
    await prisma.expensesOnUsers.delete({
      where: {
        uuid: expensesOnUsers.uuid,
      },
    });
  }
}
