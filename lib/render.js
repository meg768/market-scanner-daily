const PAGE_DESCRIPTION =
  "A daily market paper focused on special situations, catalyst trades, and bigger-than-normal moves across global assets and equities.";
const DISPLAY_TIME_ZONE = "America/New_York";
const DISPLAY_TIME_ZONE_LABEL = "ET";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(isoString, options) {
  if (!isoString) {
    return "Live edition";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: DISPLAY_TIME_ZONE,
    ...options
  }).format(new Date(isoString));
}

function formatRelativeTime(isoString) {
  if (!isoString) {
    return "Updated recently";
  }

  const now = Date.now();
  const timestamp = new Date(isoString).getTime();
  const deltaMs = timestamp - now;
  const deltaHours = Math.round(deltaMs / (1000 * 60 * 60));
  const formatter = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

  if (Math.abs(deltaHours) < 24) {
    return formatter.format(deltaHours, "hour");
  }

  const deltaDays = Math.round(deltaHours / 24);
  return formatter.format(deltaDays, "day");
}

function renderLinkItem(item) {
  const sourceLine = item.publishedAt
    ? `${item.source} | ${formatRelativeTime(item.publishedAt)}`
    : item.source;

  return `
    <article class="story-card">
      <h3>
        <a class="story-card__source" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">
          ${escapeHtml(sourceLine)}
        </a>
      </h3>
      <p class="story-card__title">${escapeHtml(item.title)}</p>
    </article>
  `;
}

function renderSection(section) {
  return `
    <section class="news-section">
      <div class="section-label">${escapeHtml(section.title)}</div>
      <p class="section-summary">${escapeHtml(section.summary)}</p>
      <div class="story-grid">
        ${section.items.map(renderLinkItem).join("")}
      </div>
    </section>
  `;
}

function renderWireItems(items) {
  return items
    .map((item) => {
      const meta = `${item.source}${item.publishedAt ? ` | ${formatRelativeTime(item.publishedAt)}` : ""}`;
      const summary = item.summary
        ? `<p class="wire-list__summary">${escapeHtml(item.summary)}</p>`
        : "";

      return `
        <li>
          <a class="wire-list__source" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">
            ${escapeHtml(meta)}
          </a>
          <p class="wire-list__title">${escapeHtml(item.title)}</p>
          ${summary}
        </li>
      `;
    })
    .join("");
}

function renderSourceLinks(sources) {
  return sources
    .map(
      (source) => `
        <li>
          <a href="${escapeHtml(source.link)}" target="_blank" rel="noreferrer">
            ${escapeHtml(source.name)}
          </a>
        </li>
      `
    )
    .join("");
}

function renderLeadParagraphs(paragraphs) {
  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function renderSidebarLinks(items) {
  return items
    .map(
      (item) => `
        <p>
          <a class="brief-links__source" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">
            ${escapeHtml(item.source)}
          </a>
          <span class="brief-links__body">${escapeHtml(item.title)}</span>
        </p>
      `
    )
    .join("");
}

export function renderEditionHtml(edition) {
  const editionDate = formatDate(edition.generatedAt, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const mastheadDate = edition.publishedAt
    ? `${editionDate} | ${formatDate(edition.publishedAt, {
        hour: "numeric",
        minute: "2-digit"
      })} ${DISPLAY_TIME_ZONE_LABEL}`
    : editionDate;
  const latestUpdate = edition.updatedAt
    ? `Latest wire update ${formatDate(edition.updatedAt, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      })}`
    : "Latest wire update unavailable";
  const railItems = edition.railItems ?? [
    "World Markets",
    "Signal-First Edition",
    latestUpdate
  ];
  const leadParagraphs =
    edition.leadParagraphs ?? [
      "The scan starts with market behavior rather than headline labels. Price, volume, and volatility are compared against recent normal behavior so the page highlights what is truly unusual instead of recycling soft narratives.",
      "The priority is to isolate where conviction really sits across oil, volatility, equities, sectors, rates, FX, and special situations, then use reporting only to confirm or explain the signal."
    ];
  const sidebarTitle = edition.sidebarTitle ?? "At a Glance";
  const sidebarPoints = edition.sidebarPoints ?? [
    `Edition date: ${formatDate(edition.generatedAt, {
      hour: "numeric",
      minute: "2-digit",
      month: "short",
      day: "numeric"
    })}`,
    latestUpdate,
    "Signal-first scan built from market moves before narrative labels.",
    "Direct source links are included in every story card."
  ];
  const sidebarLinksTitle = edition.sidebarLinksTitle ?? "Source File";
  const sidebarLinks = edition.frontPageItems ?? [];
  const latestWireTitle = edition.latestWireTitle ?? "What Matters Most";
  const latestWireSummary =
    edition.latestWireSummary ??
    "The highest-conviction takeaways from the current signal set, stated plainly and anchored in observable market behavior.";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(edition.title)} | ${escapeHtml(editionDate)}</title>
    <meta name="description" content="${escapeHtml(PAGE_DESCRIPTION)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Libre+Franklin:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="page-shell">
      <header class="masthead">
        <div class="masthead__rail">
          ${railItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
        <h1 class="masthead__title">${escapeHtml(edition.title)}</h1>
        <div class="masthead__meta">
          <p class="masthead__date">${escapeHtml(mastheadDate)}</p>
          <p class="masthead__tagline">
            A daily market paper focused on special situations, catalyst trades, and bigger-than-normal moves across global assets and equities.
          </p>
        </div>
      </header>

      <main class="layout">
        <section class="front-page">
          <div class="section-label">Front Page</div>
          <div class="lead-story">
            <p class="lead-story__kicker">Lead Story</p>
            <h2 class="lead-story__headline">
              <a href="${escapeHtml(edition.leadItem.link)}" target="_blank" rel="noreferrer">
                ${escapeHtml(edition.leadItem.title)}
              </a>
            </h2>
            <p class="lead-story__deck">
              ${escapeHtml(
                edition.leadItem.summary ??
                  "The lead story is selected automatically from the top of the live front-page feed."
              )}
            </p>
            <div class="lead-story__body">
              ${renderLeadParagraphs(leadParagraphs)}
            </div>
          </div>

          <aside class="front-page__sidebar">
            <section class="brief-card">
              <p class="brief-card__title">${escapeHtml(sidebarTitle)}</p>
              <ul class="brief-list">
                ${sidebarPoints.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </section>

            <section class="brief-card">
              <p class="brief-card__title">${escapeHtml(sidebarLinksTitle)}</p>
              <div class="brief-links">
                ${renderSidebarLinks(sidebarLinks)}
              </div>
            </section>
          </aside>
        </section>

        ${edition.sections.map(renderSection).join("")}

        <section class="news-section">
          <div class="section-label">${escapeHtml(latestWireTitle)}</div>
          <p class="section-summary">
            ${escapeHtml(latestWireSummary)}
          </p>
          <ol class="wire-list">
            ${renderWireItems(edition.latestWire)}
          </ol>
        </section>

        <section class="news-section news-section--sources">
          <div class="section-label">Sources</div>
          <p class="section-summary">
            Primary market-data and confirming-reporting sources used in the current edition.
          </p>
          <ul class="source-link-list">
            ${renderSourceLinks(edition.sources)}
          </ul>
        </section>
      </main>
    </div>
  </body>
</html>`;
}

export function renderErrorHtml(error) {
  const message = error instanceof Error ? error.message : "Unknown error";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Market Scanner Daily | Temporary Error</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="page-shell">
      <header class="masthead">
        <div class="masthead__rail">
          <span>World Markets</span>
          <span>Temporary Error</span>
          <span>Signal-First Edition</span>
        </div>
        <h1 class="masthead__title">Market Scanner Daily</h1>
        <div class="masthead__meta">
          <p class="masthead__date">The edition could not be generated right now.</p>
          <p class="masthead__tagline">${escapeHtml(message)}</p>
        </div>
      </header>
    </div>
  </body>
</html>`;
}
