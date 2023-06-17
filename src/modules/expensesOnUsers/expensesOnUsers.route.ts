import { FastifyInstance } from "fastify";
import { $expensesOnUsersRef } from "./expensesOnUsers.schema";
import {
  createExpensesOnUsersHandler,
  createExpensesOnUsersToUserHandler,
  deleteExpensesOnUsersHandler,
} from "./expensesOnUsers.controller";

async function expensesOnUsersRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $expensesOnUsersRef("createExpensesOnUsersSchema"),
        response: {
          201: $expensesOnUsersRef("createExpensesOnUsersResponseSchema"),
        },
      },
    },
    createExpensesOnUsersHandler
  );

  server.post(
    "/members",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $expensesOnUsersRef("createExpensesOnUsersToUserSchema"),
      },
    },
    createExpensesOnUsersToUserHandler
  );

  server.delete(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $expensesOnUsersRef("createExpensesOnUsersSchema"),
      },
    },
    deleteExpensesOnUsersHandler
  );
}

export default expensesOnUsersRoutes;
