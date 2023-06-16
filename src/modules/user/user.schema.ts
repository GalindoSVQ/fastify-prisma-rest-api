import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const userCoreSchema = {
  username: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2)
    .max(255),
};

const createUserSchema = z.object({
  ...userCoreSchema,
  lastName: z.string().min(2).max(255).optional(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6)
    .max(255),
});

const createUserResponseSchema = z.object({
  uuid: z.string(),
  username: userCoreSchema.username,
  groupUuid: z.string(),
});

const getAllUsersSchema = z.object({
  uuid: z.string(),
  ...userCoreSchema,
});

const loginSchema = z.object({
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }),
  password: z.string().min(6).max(255),
});

const loginResponseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  token: z.string(),
  username: z.string(),
  uuid: z.string(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref: $userRef } = buildJsonSchemas(
  {
    createUser: createUserSchema,
    createUserResponse: createUserResponseSchema,
    getAllUsers: getAllUsersSchema,
    loginSchema,
    loginResponseSchema,
  },
  {
    $id: "user",
  }
);
