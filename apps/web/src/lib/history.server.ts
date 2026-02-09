import { createServerFn } from "@tanstack/react-start";
import { getDb } from "./db";
import type { HistoryEntry, Language, Segment } from "./types";

export const getHistory = createServerFn({ method: "GET" })
  .inputValidator((data: { visitorId: string }) => data)
  .handler(async ({ data }): Promise<HistoryEntry[]> => {
    const db = getDb();
    const rows = db
      .prepare(
        "SELECT * FROM history WHERE visitor_id = ? ORDER BY created_at DESC",
      )
      .all(data.visitorId) as Array<{
      id: string;
      example: string;
      segments: string;
      pattern: string;
      language: string;
      created_at: string;
    }>;
    return rows.map((row) => ({
      id: row.id,
      example: row.example,
      segments: JSON.parse(row.segments) as Segment[],
      pattern: row.pattern,
      language: row.language as Language,
      createdAt: row.created_at,
    }));
  });

export const saveHistory = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      visitorId: string;
      id: string;
      example: string;
      segments: Segment[];
      pattern: string;
      language: Language;
    }) => data,
  )
  .handler(async ({ data }) => {
    const db = getDb();
    db.prepare(
      "INSERT OR REPLACE INTO history (id, visitor_id, example, segments, pattern, language) VALUES (?, ?, ?, ?, ?, ?)",
    ).run(
      data.id,
      data.visitorId,
      data.example,
      JSON.stringify(data.segments),
      data.pattern,
      data.language,
    );
    return { success: true };
  });

export const deleteHistory = createServerFn({ method: "POST" })
  .inputValidator((data: { visitorId: string; id: string }) => data)
  .handler(async ({ data }) => {
    const db = getDb();
    db.prepare("DELETE FROM history WHERE id = ? AND visitor_id = ?").run(
      data.id,
      data.visitorId,
    );
    return { success: true };
  });
