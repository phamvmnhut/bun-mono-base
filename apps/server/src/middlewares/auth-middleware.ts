import { auth } from "../lib/auth";
import type { Context } from "elysia";

export const authGuard = async (c: Context) => {
	const session = await auth.api.getSession({ headers: c.request.headers });

	if (!session) {
		c.set.status = 401;
		return c.error(401);
	}

	return {
		user: session.user,
		session: session.session,
	};
};

export const authResolver = async (c: Context) => {
	const session = await auth.api.getSession({ headers: c.request.headers });

	return {
		user: session?.user,
		session: session?.session,
	};
};
