import { FastifyRequest } from "fastify";
import {
  createGroup,
  getGroups,
  getGroup,
  addMembersToGroup,
  getAllUsersInGroup,
  getAllGroupsFromUser,
} from "./group.service";
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

export async function getGroupHandler(
  request: FastifyRequest<{
    Params: {
      groupUuid: string;
    };
  }>
) {
  const groupUuid = request.params.groupUuid;

  const group = await getGroup(groupUuid);

  return group;
}

export async function addMembersToGroupHandler(
  request: FastifyRequest<{
    Params: {
      groupUuid: string;
    };
    Body: {
      userUuids: string[];
    };
  }>
) {
  const groupUuid = request.params.groupUuid;
  const userUuids = request.body.userUuids;

  const group = await addMembersToGroup(groupUuid, userUuids);

  return group;
}

export async function getAllUsersInGroupHandler(
  request: FastifyRequest<{
    Params: {
      groupUuid: string;
    };
  }>
) {
  const groupUuid = request.params.groupUuid;

  const users = await getAllUsersInGroup(groupUuid);

  return users;
}

export async function getAllGroupsFromUserHandler(
  request: FastifyRequest<{
    Params: {
      userUuid: string;
    };
  }>
) {
  const userUuid = request.params.userUuid;

  const groups = await getAllGroupsFromUser(userUuid);

  return groups;
}
