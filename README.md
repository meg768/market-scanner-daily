# Market Scanner Daily

Market Scanner Daily is a web-published market paper designed to detect unusual market behavior before it becomes ordinary news.

It is not meant to be a generic news site. The core workflow starts with market data, asks what is abnormal, and only then uses reporting and official releases to explain the move.

## What It Is For

- special situations
- catalyst trades
- bigger-than-normal moves in global assets and equities
- early information about changes in the world

## Core Method

The scanner should create news by asking the right market questions first:

- Was volume higher or lower than normal?
- Was the move bigger or smaller than normal?
- What moved, and on what volume?
- Is volatility up or down?
- Is volatility higher or lower than normal?

That means the first layer should be observable market evidence, not loose labels such as `relief rally`, `profit taking`, or `short covering`.

## First Screen

The default first screen should focus on:

- `USO` for oil direction, move size, and volume
- `VIXY` for volatility direction, move size, and volume
- `SPY` for broad U.S. equity direction, move size, and volume
- major U.S. sector indexes or sector ETFs for breadth and divergence

The intended style is concrete and comparative, for example:

- `SPY is up more than 80% of prior daily moves`
- `SPY volume is 30% above recent normal`
- `USO is up 4.2% on 55% above normal volume`

## Product Shape

The app publishes a market paper on the web:

- `/` serves the HTML edition
- `/api/edition` serves the same edition as JSON

The visual style is newspaper-like, but the editorial logic should remain signal-first and market-first.

## Current Deployment

Production currently runs on a Raspberry Pi:

- Apache fronts `market-scanner-daily.egelberg.se`
- Node serves the app on an internal port
- PM2 keeps the web app alive
- a separate PM2 refresh worker republishes the edition every 6 hours

## Current Repo Layout

- `server.js` local and production Node entry point
- `ecosystem.config.cjs` PM2 process definitions
- `lib/` shared scan and rendering logic
- `public/` live site styling and assets
- `scripts/` refresh and publishing helpers
- `data/` persisted published edition cache
- `CONTEXT.md` project memory and workflow rules

## Important Note

The current live web app infrastructure is in place, but the editorial logic should continue moving away from generic feed aggregation and toward a true market scanner based on abnormality detection, cross-asset confirmation, and catalyst follow-up.
