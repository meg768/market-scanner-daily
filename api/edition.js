import { getPublishedEdition } from "../lib/published-edition.js";

export default async function handler(_request, response) {
  try {
    const edition = await getPublishedEdition();

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");
    response.end(JSON.stringify(edition, null, 2));
  } catch (error) {
    response.statusCode = 500;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(
      JSON.stringify(
        {
          error: error instanceof Error ? error.message : "Unknown error"
        },
        null,
        2
      )
    );
  }
}
