import "dotenv/config";

export const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:8081";
export const CORS_ORIGINS = process.env.CORS_ORIGINS || "";

export const PORT = process.env.PORT || 3000;
