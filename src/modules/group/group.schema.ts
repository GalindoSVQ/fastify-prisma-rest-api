import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const groupInput = {
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
};

const groupGenerated = {
  createdAt: z.string(),
  createBy: z.object({
    uuid: z.string(),
    name: z.string(),
    lastName: z.string(),
  }),
};

const createGroupSchema = z.object({
  ...groupInput,
});

const groupResponseSchema = z.object({
  ...groupInput,
  ...groupGenerated,
});

const groupsResponseSchema = z.array(groupResponseSchema);

export type CreateGroupInput = z.infer<typeof createGroupSchema>;

export const { schemas: groupSchemas, $ref: $groupRef } = buildJsonSchemas(
  {
    createGroupSchema,
    groupResponseSchema,
    groupsResponseSchema,
  },
  {
    $id: "group",
  }
);
