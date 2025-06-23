import "dotenv/config";

export const AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "secret";
export const AUTH_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || "";
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || "";
