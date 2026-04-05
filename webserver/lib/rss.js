const ENTITY_MAP = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": "\"",
  "&#39;": "'",
  "&#x27;": "'",
  "&#x2F;": "/",
  "&#8217;": "'",
  "&#8211;": "-",
  "&#8220;": "\"",
  "&#8221;": "\""
};

function decodeEntities(value) {
  return value.replace(
    /&amp;|&lt;|&gt;|&quot;|&#39;|&#x27;|&#x2F;|&#8217;|&#8211;|&#8220;|&#8221;/g,
    (entity) => ENTITY_MAP[entity] ?? entity
  );
}

function stripCdata(value) {
  return value.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
}

function cleanText(value) {
  return decodeEntities(stripCdata(value))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readTag(block, tagName) {
  const match = block.match(
    new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i")
  );

  return match ? cleanText(match[1]) : "";
}

function splitHeadlineAndSource(title, source) {
  if (source || !title.includes(" - ")) {
    return { title, source };
  }

  const parts = title.split(" - ");
  if (parts.length < 2) {
    return { title, source };
  }

  return {
    title: parts.slice(0, -1).join(" - ").trim(),
    source: parts.at(-1)?.trim() ?? source
  };
}

function parseItem(block) {
  const rawTitle = readTag(block, "title");
  const rawSource = readTag(block, "source");
  const { title, source } = splitHeadlineAndSource(rawTitle, rawSource);
  const link = readTag(block, "link");
  const publishedAt = readTag(block, "pubDate");

  if (!title || !link) {
    return null;
  }

  return {
    title,
    source: source || "Unknown source",
    link,
    publishedAt,
    publishedTimestamp: publishedAt ? Date.parse(publishedAt) : null
  };
}

export function parseRssItems(xml) {
  const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  return itemBlocks.map(parseItem).filter(Boolean);
}

export async function fetchRssFeed(feedUrl) {
  const response = await fetch(feedUrl, {
    headers: {
      "user-agent": "DailyNewsEdition/1.0",
      accept: "application/rss+xml, application/xml, text/xml;q=0.9,*/*;q=0.8"
    }
  });

  if (!response.ok) {
    throw new Error(`RSS fetch failed for ${feedUrl} with status ${response.status}`);
  }

  const xml = await response.text();
  return parseRssItems(xml);
}
