export const SITE_TITLE = "Market Scanner Daily";

export const FEED_SECTIONS = [
  {
    slug: "front-page",
    title: "Front Page",
    summary:
      "The broadest live read on what is setting the tone across the global news cycle.",
    feedUrl: "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en",
    itemLimit: 6
  },
  {
    slug: "world-desk",
    title: "World Desk",
    summary:
      "International developments, diplomacy, conflict, and cross-border policy moves.",
    feedUrl:
      "https://news.google.com/rss/headlines/section/topic/WORLD?hl=en-US&gl=US&ceid=US:en",
    itemLimit: 4
  },
  {
    slug: "business",
    title: "Business",
    summary:
      "Markets, companies, deals, and the commercial stories shaping the day.",
    feedUrl:
      "https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-US&gl=US&ceid=US:en",
    itemLimit: 4
  },
  {
    slug: "technology",
    title: "Technology",
    summary:
      "AI, platforms, devices, and infrastructure stories with outsized downstream impact.",
    feedUrl:
      "https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-US&gl=US&ceid=US:en",
    itemLimit: 4
  },
  {
    slug: "science-culture",
    title: "Science & Culture",
    summary:
      "Science, health, climate, and culture stories that broaden the front page.",
    feedUrl:
      "https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=en-US&gl=US&ceid=US:en",
    itemLimit: 4
  }
];
