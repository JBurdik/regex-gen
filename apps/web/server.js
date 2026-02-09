import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const clientDir = join(__dirname, "dist", "client");

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};

async function tryServeStatic(req) {
  const url = new URL(req.url, "http://localhost");
  const filePath = join(clientDir, url.pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(clientDir)) return null;

  try {
    const data = await readFile(filePath);
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    const headers = { "Content-Type": contentType };
    // Cache immutable hashed assets
    if (url.pathname.startsWith("/assets/")) {
      headers["Cache-Control"] = "public, max-age=31536000, immutable";
    }

    return new Response(data, { status: 200, headers });
  } catch {
    return null;
  }
}

const { default: server } = await import("./dist/server/server.js");

const httpServer = createServer(async (req, res) => {
  try {
    // Try static files first
    const staticResponse = await tryServeStatic(req);
    if (staticResponse) {
      res.writeHead(staticResponse.status, Object.fromEntries(staticResponse.headers));
      const body = await staticResponse.arrayBuffer();
      res.end(Buffer.from(body));
      return;
    }

    // SSR via TanStack Start fetch handler
    const url = new URL(req.url, `http://${req.headers.host}`);
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    }

    // Collect request body for non-GET requests
    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }

    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
    });

    const response = await server.fetch(request);

    res.writeHead(response.status, Object.fromEntries(response.headers));
    const responseBody = await response.arrayBuffer();
    res.end(Buffer.from(responseBody));
  } catch (err) {
    console.error("Request error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "0.0.0.0";

httpServer.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
