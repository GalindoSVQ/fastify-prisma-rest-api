import { FastifyInstance } from "fastify";
import { $expenseRef } from "./expense.schema";
import {
  createExpenseHandler,
  deleteExpenseHandler,
  getAllExpensesFromGroupHandler,
} from "./expense.controller";
import { $groupRef } from "../group/group.schema";

async function expenseRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $expenseRef("createExpenseSchema"),
        response: {
          201: $expenseRef("createExpenseResponseSchema"),
        },
      },
    },
    createExpenseHandler
  );

  server.delete(
    "/:expenseUuid",
    {
      preHandler: [server.authenticate],
      schema: {
        params: $expenseRef("expenseUuidParamSchema"),
        response: {
          204: {
            type: "null",
          },
        },
      },
    },
    deleteExpenseHandler
  );

  server.get(
    "/:groupUuid",
    {
      preHandler: [server.authenticate],
      schema: {
        params: $groupRef("groupUuidParam"),
        response: {
          200: $expenseRef("getAllExpensesSchema"),
        },
      },
    },
    getAllExpensesFromGroupHandler
  );
}

export default expenseRoutes;
