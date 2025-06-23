import Elysia from "elysia";
import { betterAuthView } from "./auth";

export const indexRoute = new Elysia({
  prefix: "/api",
})
  .get("/health", () => {
    return "OK";
  })
  .all("/auth/*", betterAuthView);
