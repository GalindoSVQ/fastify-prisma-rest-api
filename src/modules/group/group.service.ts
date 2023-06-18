import prisma from "../../utils/prisma";
import { CreateGroupInput } from "./group.schema";

export async function createGroup(
  data: CreateGroupInput & { authorUuid: string }
) {
  return prisma.group.create({
    data: {
      ...data,
      members: {
        connect: {
          uuid: data.authorUuid,
        },
      },
    },
  });
}

export async function getGroups() {
  const groups = await prisma.group.findMany({
    select: {
      uuid: true,
      title: true,
      description: true,
      createdAt: true,
      authorUuid: true,
    },
  });

  return groups.map((group) => ({
    ...group,
  }));
}

export async function getGroup(groupUuid: string) {
  const group = await prisma.group.findUnique({
    where: {
      uuid: groupUuid,
    },
    select: {
      uuid: true,
      title: true,
      description: true,
      createdAt: true,
      authorUuid: true,
      members: true,
    },
  });

  const expenses = await prisma.expense.findMany({
    where: {
      groupUuid,
    },
    select: {
      amount: true,
      authorUuid: true,
      category: true,
      date: true,
      description: true,
      status: true,
      title: true,
      uuid: true,
    },
  });

  const expensesOnUsers = await prisma.expensesOnUsers.findMany({
    where: {
      expenseUuid: {
        in: expenses.map((expense) => expense.uuid),
      },
    },
    select: {
      expenseUuid: true,
      userUuid: true,
      user: {
        select: {
          username: true,
          uuid: true,
        },
      },
    },
  });

  const expensesOnUsersByExpenseUuid = expensesOnUsers.reduce(
    (
      acc: Record<string, { uuid: string; username: string }[]>,
      expenseOnUser
    ) => {
      if (!acc[expenseOnUser.expenseUuid]) {
        acc[expenseOnUser.expenseUuid] = [];
      }

      acc[expenseOnUser.expenseUuid].push({
        uuid: expenseOnUser.userUuid,
        username: expenseOnUser.user.username,
      });

      return acc;
    },
    {}
  );

  const expensesShared = expenses.map((expense) => ({
    ...expense,
    sharedWith: expensesOnUsersByExpenseUuid[expense.uuid],
  }));

  return {
    ...group,
    expenses: expensesShared,
  };
}

export async function updateGroup(groupId: string, data: CreateGroupInput) {
  return prisma.group.update({
    where: {
      uuid: groupId,
    },
    data,
  });
}

export async function deleteGroup(groupId: string) {
  return prisma.group.delete({
    where: {
      uuid: groupId,
    },
  });
}

export async function addMembersToGroup(groupId: string, userUuids: string[]) {
  return prisma.group.update({
    where: {
      uuid: groupId,
    },
    data: {
      members: {
        connect: userUuids.map((userUuid) => ({
          uuid: userUuid,
        })),
      },
    },
  });
}

export async function getAllUsersInGroup(groupId: string) {
  const group = await prisma.group.findUnique({
    where: {
      uuid: groupId,
    },
    select: {
      title: true,
      uuid: true,
      members: true,
    },
  });

  return group;
}

export async function getAllGroupsFromUser(userId: string) {
  const groups = await prisma.group.findMany({
    where: {
      members: {
        some: {
          uuid: userId,
        },
      },
    },
    select: {
      uuid: true,
      title: true,
      description: true,
      createdAt: true,
      authorUuid: true,
    },
  });

  return groups;
}
