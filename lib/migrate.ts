import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "./db";
import fs from "fs";
import path from "path";

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs: fs.promises,
    path,
    migrationFolder: path.join(__dirname, "../migrations/"),
  }),
});
migrator.migrateToLatest().then(({ error, results }) => {
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });
  if (error) {
    console.error(error);
    process.exit(1);
  }
});
