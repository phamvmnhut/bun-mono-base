import {
  CLIENT_URL,
  CORS_ORIGINS,
  PORT,
  SERVER_URL,
} from "./common/constant/config";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import Elysia from "elysia";
import { indexRoute } from "./route";
import path from "node:path";
import { betterAuthView } from "./route/auth";

const corsOrigins = CORS_ORIGINS.split(",");

export const app = new Elysia()
  .onBeforeHandle(({ request }) => {
    // log url and method and time; format: [2025-03-09T14:00:00.000Z] [GET] /api/auth/login
    console.log(
      `[${new Date().toISOString()}] [${request.method}] ${request.url}`
    );
  })
  .onError((ctx) => {
    const url = new URL(ctx.request.url);

    // if not start with /api/ then return index.html (SPA will handle the rest)
    if (!url.pathname.startsWith("/api/")) {
      ctx.set.status = 200;
      return Bun.file(path.join(__dirname, "../../client/dist/index.html"));
    }
  })
  .use(
    cors({
      origin: [CLIENT_URL, ...corsOrigins],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  )
  .use(indexRoute)
  .use(
    staticPlugin({
      assets: path.join(__dirname, "../../client/dist"),
      prefix: "/",
      alwaysStatic: false, // dynamic route enable
      indexHTML: true,
      noCache: true,
    })
  )
  .get("/api/auth/*", betterAuthView) // priority method and ALL method
  .listen({
    hostname: "0.0.0.0",
    port: PORT,
  });

export type ServerApp = typeof app;

console.log(`🦊 Server is running at ${SERVER_URL}`);

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received.");
  app.stop();
  process.exit(0);
});
