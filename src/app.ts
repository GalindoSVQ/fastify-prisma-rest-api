import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { AddressInfo } from "net";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import fastifyJwt from "@fastify/jwt";
import { groupSchemas } from "./modules/group/group.schema";
import groupRoutes from "./modules/group/group.route";

export const server = Fastify();

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      uuid: string;
      email: string;
    };
  }
}

server.register(fastifyJwt, {
  secret: "supersecret",
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
  for (const schema of [...userSchemas, ...groupSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "/api/user" });
  server.register(groupRoutes, { prefix: "/api/group" });

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
