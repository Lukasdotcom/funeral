import { Kysely, sql } from "kysely";

export async function up(db: Kysely<never>): Promise<void> {
  await db.schema
    .createTable("candles")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("for_name", "text", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("message", "text", (col) => col.notNull())
    .addColumn("date", "text", (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.schema
    .createTable("people")
    .addColumn("url", "text", (col) => col.notNull().primaryKey().notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("birth", "text", (col) => col.notNull())
    .addColumn("death", "text", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("photo", "text", (col) => col.notNull())
    .addColumn("album", "text", (col) => col)
    .execute();

  await db.schema
    .createIndex("candles_for_name_idx")
    .on("candles")
    .column("for_name")
    .execute();
}

export async function down(db: Kysely<never>): Promise<void> {
  await db.schema.dropTable("candles").execute();
  await db.schema.dropTable("people").execute();
}
