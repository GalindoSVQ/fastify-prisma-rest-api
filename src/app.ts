import Fastify from "fastify";
import { AddressInfo } from "net";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const server = Fastify();

server.get("/healthcheck", async () => {
  return { status: "OK" };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }
  server.register(userRoutes, { prefix: "api/user" });

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
