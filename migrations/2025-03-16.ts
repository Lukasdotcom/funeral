import { Kysely, sql } from "kysely";

export async function up(db: Kysely<never>): Promise<void> {
  await sql`ALTER TABLE candles
        RENAME TO candles_old`.execute(db);
  await db.schema
    .createTable("candles")
    .addColumn("for_url", "text", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("message", "text", (col) => col.notNull())
    .addColumn("date", "text", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn("owner", "text", (col) => col.notNull())
    .addPrimaryKeyConstraint("candles_pkey", ["for_url", "owner"])
    .addForeignKeyConstraint(
      "candles_for_url_fkey",
      ["for_url"],
      "people",
      ["url"],
      (fk) => fk.onDelete("cascade"),
    )
    .execute();

  await sql`INSERT INTO candles (for_url, name, message, date, owner)
              SELECT for_name, name, message, date, random()
              FROM candles_old`.execute(db);
  await db.schema.dropTable("candles_old").execute();
}
