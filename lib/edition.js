import { FEED_SECTIONS, SITE_TITLE } from "./news-config.js";
import { fetchRssFeed } from "./rss.js";

function dedupeItems(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = `${item.link}::${item.title}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function sortByNewest(items) {
  return [...items].sort((left, right) => {
    const leftTimestamp = left.publishedTimestamp ?? 0;
    const rightTimestamp = right.publishedTimestamp ?? 0;
    return rightTimestamp - leftTimestamp;
  });
}

function buildFallbackItem(title, summary) {
  return {
    title,
    source: "System",
    link: "#",
    publishedAt: "",
    publishedTimestamp: null,
    summary
  };
}

function buildSourceEntries(items) {
  const seen = new Set();
  const entries = [];

  for (const item of items) {
    if (!item.source || !item.link || seen.has(item.source)) {
      continue;
    }

    seen.add(item.source);
    entries.push({
      name: item.source,
      link: item.link
    });
  }

  return entries.slice(0, 16);
}

export async function buildEdition() {
  const fetchedSections = await Promise.all(
    FEED_SECTIONS.map(async (section) => {
      const items = dedupeItems(await fetchRssFeed(section.feedUrl)).slice(
        0,
        section.itemLimit
      );

      return {
        ...section,
        items
      };
    })
  );

  const allItems = sortByNewest(
    dedupeItems(fetchedSections.flatMap((section) => section.items))
  );
  const frontPageItems = fetchedSections[0]?.items ?? [];
  const leadItem =
    frontPageItems[0] ??
    buildFallbackItem(
      "The live feeds are temporarily quiet.",
      "The server function is up, but it did not receive enough items to compose the front page."
    );

  const latestTimestamp = allItems.find((item) => item.publishedTimestamp)?.publishedTimestamp;
  const sources = buildSourceEntries(allItems);

  return {
    title: SITE_TITLE,
    generatedAt: new Date().toISOString(),
    updatedAt: latestTimestamp ? new Date(latestTimestamp).toISOString() : null,
    leadItem,
    frontPageItems: frontPageItems.slice(1, 5),
    sections: fetchedSections.slice(1),
    latestWire: allItems.slice(0, 10),
    sources
  };
}
