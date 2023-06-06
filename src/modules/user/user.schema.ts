import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const userCoreSchema = {
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2)
    .max(255),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
};

const createUserSchema = z.object({
  ...userCoreSchema,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6)
    .max(255),
});

const createUserResponseSchema = z.object({
  id: z.string(),
  ...userCoreSchema,
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUser: createUserSchema,
  createUserResponse: createUserResponseSchema,
});
