import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const DB_PATH = process.env.REGEX_GEN_DB_PATH || "./data/regex-gen.db";

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    mkdirSync(dirname(DB_PATH), { recursive: true });
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.exec(`
      CREATE TABLE IF NOT EXISTS history (
        id         TEXT PRIMARY KEY,
        visitor_id TEXT NOT NULL DEFAULT '',
        example    TEXT NOT NULL,
        segments   TEXT NOT NULL,
        pattern    TEXT NOT NULL,
        language   TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_history_created_at ON history(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_history_visitor ON history(visitor_id, created_at DESC);
    `);
  }
  return _db;
}
