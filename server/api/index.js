import { getPublishedEdition } from "../lib/published-edition.js";
import { renderEditionHtml, renderErrorHtml } from "../lib/render.js";

export default async function handler(_request, response) {
  try {
    const edition = await getPublishedEdition();

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");
    response.end(renderEditionHtml(edition));
  } catch (error) {
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(renderErrorHtml(error));
  }
}
