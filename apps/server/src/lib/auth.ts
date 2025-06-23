import {
	AUTH_SECRET,
	FACEBOOK_APP_ID,
	FACEBOOK_APP_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} from "../common/constant/auth";
import { CLIENT_URL, SERVER_URL } from "../common/constant/config";
import { db } from "../db";
import * as schema from "../db/schemas";
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
	baseURL: SERVER_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	origin: CLIENT_URL,
	plugins: [admin(), expo()],
	secret: AUTH_SECRET,
	emailAndPassword: {
		enabled: false,
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
			path: "/",
		},
	},
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			redirectURI: `${SERVER_URL}/api/auth/callback/google`,
		},
		facebook: {
			clientId: FACEBOOK_APP_ID,
			clientSecret: FACEBOOK_APP_SECRET,
			redirectURI: `${SERVER_URL}/api/auth/callback/facebook`,
			scope: ["email", "public_profile"],
		},
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "facebook"],
		},
	},
	trustedOrigins: ["exp://192.168.0.102:8081/--/index2", "myapp://", CLIENT_URL, SERVER_URL],
});
