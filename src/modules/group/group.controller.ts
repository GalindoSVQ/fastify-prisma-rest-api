import { FastifyRequest } from "fastify";
import { createGroup, getGroups } from "./group.service";
import { CreateGroupInput } from "./group.schema";

export async function createGroupHandler(
  request: FastifyRequest<{
    Body: CreateGroupInput;
  }>
) {
  const product = await createGroup({
    ...request.body,
    authorUuid: request.user.uuid,
  });

  return product;
}

export async function getGroupsHandler() {
  const groups = await getGroups();

  return groups;
}
