import { FastifyInstance } from "fastify";
import { regiterUserHandler } from "./user.controller";

async function userRoutes(server: FastifyInstance, options: any) {
  // server.get("/user", async () => {
  //   return { status: "OK" };
  // });

  server.post("/", regiterUserHandler);
}

export default userRoutes;
