import prisma from "../../utils/prisma";
import { CreateGroupInput } from "./group.schema";

export async function createGroup(
  data: CreateGroupInput & { authorUuid: string }
) {
  return prisma.group.create({
    data,
  });
}

export async function getGroups() {
  const groups = await prisma.group.findMany({
    select: {
      uuid: true,
      title: true,
      description: true,
      createdAt: true,
      createdBy: {
        select: {
          uuid: true,
          name: true,
          lastName: true,
        },
      },
    },
  });

  return groups.map((group) => ({
    ...group,
    createBy: {
      uuid: group.createdBy.uuid,
      name: group.createdBy.name,
      lastName: group.createdBy.lastName,
    },
  }));
}
