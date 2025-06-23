import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { DB_URL } from "../common/constant/db";
import * as schema from "./schemas";

if (!DB_URL) {
	throw new Error("Database credentials missing.");
}

const pool = new Pool({ connectionString: DB_URL });

export const db = drizzle(pool, { schema: { ...schema } });
