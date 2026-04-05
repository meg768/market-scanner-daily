import { refreshPublishedEdition } from "../lib/published-edition.js";

try {
  const edition = await refreshPublishedEdition();
  console.log(
    JSON.stringify(
      {
        title: edition.title,
        publishedAt: edition.publishedAt,
        lead: edition.leadItem.title,
        wireCount: edition.latestWire.length
      },
      null,
      2
    )
  );
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exit(1);
}
