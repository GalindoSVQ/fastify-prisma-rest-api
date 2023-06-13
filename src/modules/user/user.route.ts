import { FastifyInstance } from "fastify";
import {
  regiterUserHandler,
  loginHandler,
  getUserHandler,
} from "./user.controller";
import { $userRef } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $userRef("createUser"),
        response: {
          201: $userRef("createUserResponse"),
        },
      },
    },
    regiterUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $userRef("loginSchema"),
        response: {
          200: $userRef("loginResponseSchema"),
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
            items: $userRef("createUserResponse"),
          },
        },
      },
      preHandler: [server.authenticate],
    },
    getUserHandler
  );
}

export default userRoutes;
