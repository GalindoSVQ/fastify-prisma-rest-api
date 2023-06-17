import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { AddressInfo } from "net";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import fastifyJwt, { JWT } from "@fastify/jwt";
import { groupSchemas } from "./modules/group/group.schema";
import groupRoutes from "./modules/group/group.route";
import expenseRoutes from "./modules/expense/expense.route";
import { expenseSchemas } from "./modules/expense/expense.schema";
import cors from "@fastify/cors";
import { expensesOnUsersSchemas } from "./modules/expensesOnUsers/expensesOnUsers.schema";
import expensesOnUsersRoutes from "./modules/expensesOnUsers/expensesOnUsers.route";

export const server = Fastify();

server.register(cors, {
  origin: "*",
});

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      uuid: string;
      username: string;
      firstName: string;
      lastName: string;
      iat: number;
    };
  }
}

server.register(fastifyJwt, {
  secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb",
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

server.get("/api/healthcheck", async () => {
  return { status: "OK" };
});

async function main() {
  for (const schema of [
    ...userSchemas,
    ...groupSchemas,
    ...expenseSchemas,
    ...expensesOnUsersSchemas,
  ]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "/api/user" });
  server.register(groupRoutes, { prefix: "/api/group" });
  server.register(expenseRoutes, { prefix: "/api/expense" });
  server.register(expensesOnUsersRoutes, { prefix: "/api/expenses-users" });

  try {
    await server.listen({
      port: 5000,
      host: "0.0.0.0",
    });

    const { address, port } = server.server.address() as AddressInfo;
    console.log(`Server listening on ${address}:${port}`);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
}

main();
