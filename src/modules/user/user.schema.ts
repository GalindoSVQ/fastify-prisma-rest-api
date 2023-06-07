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
  name: userCoreSchema.name,
  lastName: z.string().min(2).max(255).optional(),
  email: userCoreSchema.email,
});

const getAllUsersSchema = z.object({
  uuid: z.string(),
  ...userCoreSchema,
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6).max(255),
});

const loginResponseSchema = z.object({
  token: z.string(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUser: createUserSchema,
  createUserResponse: createUserResponseSchema,
  getAllUsers: getAllUsersSchema,
  loginSchema,
  loginResponseSchema,
});
