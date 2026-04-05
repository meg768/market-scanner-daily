import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEdition } from "./edition.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const cacheDirectory = path.join(projectRoot, "data");
const cachePath = path.join(cacheDirectory, "current-edition.json");
const manualEditionPath = path.join(cacheDirectory, "manual-edition.json");
const useManualEdition = process.env.USE_MANUAL_EDITION === "true";

async function readEditionFile(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function readPublishedEdition() {
  try {
    return await readEditionFile(cachePath);
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function readManualEdition() {
  try {
    return await readEditionFile(manualEditionPath);
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function refreshPublishedEdition() {
  const manualEdition = useManualEdition ? await readManualEdition() : null;
  const edition = manualEdition ?? (await buildEdition());
  const publishedEdition = {
    ...edition,
    publishedAt: new Date().toISOString()
  };

  await mkdir(cacheDirectory, { recursive: true });
  await writeFile(cachePath, JSON.stringify(publishedEdition, null, 2), "utf8");

  return publishedEdition;
}

export async function getPublishedEdition() {
  const cachedEdition = await readPublishedEdition();

  if (cachedEdition) {
    return cachedEdition;
  }

  return refreshPublishedEdition();
}

export { cachePath, manualEditionPath };
