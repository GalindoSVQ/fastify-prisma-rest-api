import { FastifyInstance } from "fastify";
import { $groupRef } from "./group.schema";
import {
  createGroupHandler,
  getGroupsHandler,
  getGroupHandler,
  addMembersToGroupHandler,
  getAllUsersInGroupHandler,
  getAllGroupsFromUserHandler,
} from "./group.controller";

async function groupRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $groupRef("createGroupSchema"),
        response: {
          201: $groupRef("groupResponseSchema"),
        },
      },
    },
    createGroupHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: $groupRef("groupsResponseSchema"),
        },
      },
    },
    getGroupsHandler
  );

  server.get(
    "/:groupUuid",
    {
      preHandler: [server.authenticate],
      schema: {
        params: $groupRef("groupUuidParam"),
        response: {
          200: $groupRef("groupResponseSchema"),
        },
      },
    },
    getGroupHandler
  );

  server.post(
    "/:groupUuid/members",
    {
      preHandler: [server.authenticate],
      schema: {
        params: $groupRef("groupUuidParam"),
        body: $groupRef("createGroupToUserSchema"),
        response: {
          201: $groupRef("addMemebersToGroupResponseSchema"),
        },
      },
    },
    addMembersToGroupHandler
  );

  server.get(
    "/:groupUuid/members",
    {
      preHandler: [server.authenticate],
      schema: {
        params: $groupRef("groupUuidParam"),
        response: {
          200: $groupRef("retrieveMembersFromGroupSchema"),
        },
      },
    },
    getAllUsersInGroupHandler
  );

  server.get(
    "/user/:userUuid",
    {
      preHandler: [server.authenticate],
      schema: {
        params: { userUuid: { type: "string" } },
        response: {
          200: $groupRef("findGroupsByUserSchema"),
        },
      },
    },
    getAllGroupsFromUserHandler
  );
}

export default groupRoutes;
