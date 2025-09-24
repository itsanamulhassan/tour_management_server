import { createClient } from "redis";
import env from "./env";

export const client = createClient({
  username: env.redis.user,
  password: env.redis.password,
  socket: {
    host: env.redis.host,
    port: env.redis.port,
  },
});

// eslint-disable-next-line no-console
client.on("error", (err) => console.log("Redis Client Error", err));
