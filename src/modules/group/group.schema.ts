import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const groupInput = {
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
};

const groupGenerated = {
  createdAt: z.string(),
  authorUuid: z.string(),
};

const groupMember = {
  uuid: z.string(),
  username: z.string(),
};

const createGroupSchema = z.object({
  ...groupInput,
});

const groupResponseSchema = z.object({
  ...groupInput,
  ...groupGenerated,
  uuid: z.string(),
  members: z.array(
    z.object({
      ...groupMember,
    })
  ),
  expenses: z.array(
    z.object({
      amount: z.number(),
      authorUuid: z.string(),
      category: z.string(),
      date: z.string(),
      description: z.string(),
      status: z.string(),
      title: z.string(),
      uuid: z.string(),
    })
  ),
});

const createGroupToUserSchema = z.object({
  userUuids: z.array(z.string()),
});

const addMemebersToGroupResponseSchema = z.object({
  ...groupGenerated,
  members: z.array(
    z.object({
      ...groupMember,
    })
  ),
});

const retrieveMembersFromGroupSchema = z.object({
  title: z.string().min(1).max(255),
  uuid: z.string(),
  members: z.array(
    z.object({
      uuid: z.string(),
      username: z.string(),
    })
  ),
});

const groupsResponseSchema = z.array(groupResponseSchema);

const groupUuidParam = z.object({
  groupUuid: z.string(),
});

const findGroupsByUserSchema = z.array(
  z.object({
    ...groupInput,
    uuid: z.string(),
    createdAt: z.string(),
    authorUuid: z.string(),
  })
);

export type CreateGroupInput = z.infer<typeof createGroupSchema>;

export const { schemas: groupSchemas, $ref: $groupRef } = buildJsonSchemas(
  {
    addMemebersToGroupResponseSchema,
    createGroupSchema,
    createGroupToUserSchema,
    findGroupsByUserSchema,
    groupResponseSchema,
    groupsResponseSchema,
    groupUuidParam,
    retrieveMembersFromGroupSchema,
  },
  {
    $id: "group",
  }
);
