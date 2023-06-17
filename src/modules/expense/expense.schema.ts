import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const expenseUuidParamSchema = z.object({
  expenseUuid: z.string().min(2).max(255),
});

const createExpenseSchema = z.object({
  title: z.string().min(2).max(255),
  amount: z.number().min(0),
  date: z.string().min(2).max(255),
  category: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
  groupUuid: z.string().min(2).max(255),
});

const createExpenseResponseSchema = z.object({
  uuid: z.string(),
  title: z.string().min(2).max(255),
  amount: z.number().min(0),
  date: z.string().min(2).max(255),
  category: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
  groupUuid: z.string().min(2).max(255),
});

const retrieveExpenseResponseSchema = z.object({
  ...createExpenseResponseSchema.shape,
  authorUuid: z.string().min(2).max(255),
  status: z.string().min(2).max(255),
  sharedWith: z.array(
    z.object({
      uuid: z.string().min(2).max(255),
      username: z.string().min(2).max(255),
    })
  ),
});

const updateExpenseSchema = z.object({
  title: z.string().min(2).max(255),
  amount: z.number().min(0),
  date: z.string().min(2).max(255),
  category: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
  status: z.string().min(2).max(255),
});

const getAllExpensesSchema = z.array(createExpenseResponseSchema);

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;

export const { schemas: expenseSchemas, $ref: $expenseRef } = buildJsonSchemas(
  {
    createExpenseResponseSchema,
    createExpenseSchema,
    expenseUuidParamSchema,
    getAllExpensesSchema,
    retrieveExpenseResponseSchema,
    updateExpenseSchema,
  },
  {
    $id: "expense",
  }
);
