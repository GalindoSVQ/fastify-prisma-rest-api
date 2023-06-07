import { FastifyInstance } from "fastify";
import {
  regiterUserHandler,
  loginHandler,
  getUserHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUser"),
        response: {
          201: $ref("createUserResponse"),
        },
      },
    },
    regiterUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.get(
    "/",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: $ref("createUserResponse"),
          },
        },
      },
      preHandler: [server.authenticate],
    },
    getUserHandler
  );
}

export default userRoutes;
