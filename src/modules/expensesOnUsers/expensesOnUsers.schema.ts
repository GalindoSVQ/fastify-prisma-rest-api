import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const expenseUuidSchema = z.object({
  expenseUuid: z.string(),
});

const createExpensesOnUsersSchema = z.object({
  ...expenseUuidSchema.shape,
  userUuid: z.string(),
});

const createExpensesOnUsersResponseSchema = z.object({
  uuid: z.string(),
  expenseUuid: z.string(),
  userUuid: z.string(),
});

const createExpensesOnUsersToUserSchema = z.object({
  ...expenseUuidSchema.shape,
  usersUuids: z.array(z.string()),
});

export type CreateExpensesOnUsersInput = z.infer<
  typeof createExpensesOnUsersSchema
>;

export type CreateExpensesOnUsersToUserSchemaInput = z.infer<
  typeof createExpensesOnUsersToUserSchema
>;

export const { schemas: expensesOnUsersSchemas, $ref: $expensesOnUsersRef } =
  buildJsonSchemas(
    {
      createExpensesOnUsersSchema,
      expenseUuidSchema,
      createExpensesOnUsersResponseSchema,
      createExpensesOnUsersToUserSchema,
    },
    {
      $id: "expensesOnUsers",
    }
  );
