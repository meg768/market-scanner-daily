import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getPublishedEdition,
  refreshPublishedEdition
} from "./lib/published-edition.js";
import { renderEditionHtml, renderErrorHtml } from "./lib/render.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "public");
const port = Number(process.env.PORT || 3000);
const refreshIntervalMs = Number(process.env.REFRESH_INTERVAL_MS || 6 * 60 * 60 * 1000);
const refreshTimeZone = process.env.REFRESH_TIME_ZONE || "America/New_York";
const refreshIntervalHours = Math.max(1, Math.round(refreshIntervalMs / (60 * 60 * 1000)));
let refreshRunning = false;
let refreshTimer;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const zonedClockFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: refreshTimeZone,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hourCycle: "h23"
});

async function serveStaticAsset(assetPath) {
  const safePath = assetPath.replace(/^\/+/, "");
  const absolutePath = path.join(publicDirectory, safePath);
  const extension = path.extname(absolutePath);
  const body = await readFile(absolutePath);

  return {
    body,
    contentType: contentTypes[extension] ?? "application/octet-stream"
  };
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function getZonedClockParts(date) {
  const parts = Object.fromEntries(
    zonedClockFormatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  );

  return {
    hour: parts.hour ?? 0,
    minute: parts.minute ?? 0,
    second: parts.second ?? 0
  };
}

function getDelayUntilNextAlignedRefresh(now = new Date()) {
  const candidate = new Date(now.getTime());
  candidate.setUTCSeconds(0, 0);
  candidate.setTime(candidate.getTime() + 60 * 1000);

  for (let minuteStep = 0; minuteStep <= 48 * 60; minuteStep += 1) {
    const zonedTime = getZonedClockParts(candidate);

    if (
      zonedTime.minute === 0 &&
      zonedTime.second === 0 &&
      zonedTime.hour % refreshIntervalHours === 0
    ) {
      return candidate.getTime() - now.getTime();
    }

    candidate.setTime(candidate.getTime() + 60 * 1000);
  }

  return refreshIntervalMs;
}

function formatScheduledTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: refreshTimeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(date);
}

async function refreshOnce() {
  if (refreshRunning) {
    return;
  }

  refreshRunning = true;

  try {
    const edition = await refreshPublishedEdition();
    console.log(
      `[market-scanner-daily] Updated edition at ${edition.publishedAt}: ${edition.leadItem.title}`
    );
  } catch (error) {
    console.error(
      `[market-scanner-daily] Update failed: ${
        error instanceof Error ? error.stack : String(error)
      }`
    );
  } finally {
    refreshRunning = false;
  }
}

void refreshOnce();

function scheduleNextRefresh() {
  const delayMs = getDelayUntilNextAlignedRefresh();
  const nextRun = new Date(Date.now() + delayMs);

  console.log(
    `[market-scanner-daily] Next scheduled refresh at ${formatScheduledTime(nextRun)} ${refreshTimeZone}`
  );

  refreshTimer = setTimeout(async () => {
    await refreshOnce();
    scheduleNextRefresh();
  }, delayMs);

  refreshTimer.unref();
}

scheduleNextRefresh();

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  try {
    if (url.pathname === "/styles.css" || url.pathname === "/robots.txt") {
      const asset = await serveStaticAsset(url.pathname);
      response.writeHead(200, { "Content-Type": asset.contentType });
      response.end(asset.body);
      return;
    }

    if (url.pathname === "/api/edition" || url.pathname === "/edition.json") {
      const edition = await getPublishedEdition();
      sendJson(response, 200, edition);
      return;
    }

    if (url.pathname !== "/") {
      sendJson(response, 404, { error: "Not found" });
      return;
    }

    const edition = await getPublishedEdition();
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(renderEditionHtml(edition));
  } catch (error) {
    if (url.pathname === "/api/edition" || url.pathname === "/edition.json") {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : "Unknown error"
      });
      return;
    }

    response.writeHead(500, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(renderErrorHtml(error));
  }
});

server.listen(port, () => {
  console.log(`Market Scanner Daily running at http://127.0.0.1:${port}`);
});
