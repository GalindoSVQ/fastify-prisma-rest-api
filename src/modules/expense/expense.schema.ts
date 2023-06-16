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

const getAllExpensesSchema = z.array(createExpenseResponseSchema);

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;

export const { schemas: expenseSchemas, $ref: $expenseRef } = buildJsonSchemas(
  {
    createExpenseResponseSchema,
    createExpenseSchema,
    expenseUuidParamSchema,
    getAllExpensesSchema,
  },
  {
    $id: "expense",
  }
);
