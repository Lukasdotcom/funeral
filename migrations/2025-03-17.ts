import { Kysely } from "kysely";

export async function up(db: Kysely<never>): Promise<void> {
  await db.schema
    .alterTable("candles")
    .addColumn("color", "text", (col) => col.notNull().defaultTo("gelb"))
    .execute();
}
