import { FastifyInstance } from "fastify";
import { $groupRef } from "./group.schema";
import { createGroupHandler, getGroupsHandler } from "./group.controller";

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
}

export default groupRoutes;
