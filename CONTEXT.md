# Market Scanner Daily

## Purpose

This workspace is for a daily world-markets scanner published on the web.

The goal is not to run a generic news site. The goal is to detect unusual market behavior early, explain what changed, and surface special situations and catalyst trades before they become consensus.

The product should work as an early-warning system for:

- special situations
- catalyst trades
- bigger-than-normal moves in global assets and equities
- early signals that something important is changing in the world

## Conversation Context

Current user intent:

- publish a web-based version of Market Scanner Daily
- deploy it to the user's Raspberry Pi
- serve it at `market-scanner-daily.egelberg.se`
- refresh the published edition every 3 hours
- keep improving the visual newspaper presentation
- keep the product focused on signal-first market scanning rather than ordinary headline aggregation

Preferred maintenance style:

- on a brand-new thread or session, begin with a short English greeting before handling the first request
- keep user-facing progress updates concise and practical
- default to implementing the product rather than describing hypothetical plans
- when the user changes sources, sections, scan logic, layout, or deployment shape, store that change in this project memory
- keep project documentation in English

## Core Scanning Philosophy

Avoid normal news as the starting point. Much of it is low-signal and backward-looking.

The scanner should create news by asking the right market questions first:

- was volume higher or lower than normal
- was the move bigger or smaller than normal
- what moved, and on what volume
- is volatility up or down
- is volatility higher or lower than normal
- is the move confirmed across related assets, sectors, rates, FX, commodities, or credit

Interpretive shortcuts such as `relief rally`, `profit taking`, or `short covering` should not be the base layer. The base layer is observable market data versus normal behavior.

## Primary Screening Instruments

Right now the first screen should center on:

- `USO` for oil direction, volume, and size of move
- `VIXY` for volatility direction, volume, and size of move
- `SPY` for the broad U.S. stock market direction, volume, and size of move
- all major U.S. sector indexes or sector ETFs for breadth, divergence, and concentration

The default style should be concrete and data-first, for example:

- `SPY is up more than 80% of prior daily moves`
- `SPY volume is 30% above recent normal`
- `USO is up x% on y% above normal volume`

## Product Model

The product should behave like this:

- the root route serves a full HTML market paper
- a JSON endpoint exposes the same edition data for reuse
- the edition is generated from market screens plus confirming reporting
- the local development server uses the same shared generation code as the deployed function
- the page should feel editorial and newspaper-like rather than dashboard-like

## Edition Priorities

The market paper should emphasize:

- what changed today
- what is abnormal versus normal behavior
- what the likely catalyst is
- what could matter next

Preferred content hierarchy:

1. `Front Page`
2. `Cross-Asset Dashboard`
3. `Abnormal Moves`
4. `Special Situations`
5. `Catalyst Calendar`
6. `Early-Info Signals`
7. `What Matters Most`
8. `Sources`

Formatting rules:

- favor short paragraphs and explicit comparisons to normal behavior
- keep section labels as plain text, not pill badges
- use direct source links in the story modules
- preserve the newspaper aesthetic already explored in the design assets when possible

## Current Editorial Flow

The current paper is structured as a newspaper-style market scan with this content flow:

1. `Lead Story`
2. `At a Glance`
3. `Source File`
4. `Cross-Asset Dashboard`
5. `Abnormal Moves`
6. `Special Situations`
7. `Catalyst Calendar`
8. `Early-Info Signals`
9. `What Matters Most`
10. `Sources`

The intended meaning of each section is:

- `Lead Story`: the single most important market takeaway of the edition
- `At a Glance`: a few fast bullet signals for the top screen
- `Source File`: the key raw observations directly supporting the lead
- `Cross-Asset Dashboard`: how equities, oil, volatility, rates, FX, and related assets fit together
- `Abnormal Moves`: moves that are larger, stranger, or more important than normal behavior
- `Special Situations`: company-specific, financing, M&A, or idiosyncratic setups worth watching
- `Catalyst Calendar`: the next scheduled events or near-term timing catalysts that could matter
- `Early-Info Signals`: mismatches, second-order effects, or stress signals that may matter before the broader market fully reacts
- `What Matters Most`: the clearest plain-English conclusions from the current scan
- `Sources`: the confirmation links used in the edition

The editorial logic should remain:

- start with market behavior, not generic headlines
- use `USO`, `VIXY`, `SPY`, and major U.S. sector ETFs as the first screen
- compare moves, volume, and volatility versus recent normal behavior whenever possible
- use reporting to confirm and explain a move, not to replace the first screen
- avoid soft labels such as `relief rally`, `profit taking`, or `short covering` unless the observable market data clearly supports them

## How To Change The Content

The user should be able to change the entire paper flow with a direct prompt. When the user does that, update this memory file so the new editorial flow becomes the default.

A user can change the paper by specifying:

- which instruments should be on the first screen
- which sections should exist, be removed, or be renamed
- which asset classes, markets, sectors, or regions matter most
- whether the paper should be more macro, more trading-focused, or more special-situations-focused
- whether to prioritize facts only or facts plus interpretation
- whether to reduce generic company news and increase cross-asset analysis
- how long the paper should be and which sections deserve the most space

Use direct prompts rather than asking for special syntax. Example control prompt:

```text
From now on, change the entire Market Scanner Daily flow to this:

1. Start with market-generated signals, not headline news.
2. Make the first screen:
   - SPY
   - QQQ
   - IWM
   - USO
   - VIXY
   - DXY
   - 10-year yield
   - all major U.S. sector ETFs
3. Compare every important move to recent normal behavior:
   - size of move
   - volume versus normal
   - volatility versus normal
4. Only include news if it helps explain a move already visible in the market.
5. Reduce generic company stories and increase cross-asset interpretation.
6. Make the sections:
   - Front Page
   - First Screen
   - Cross-Asset Dashboard
   - Abnormal Moves
   - Catalyst Calendar
   - Early Signals
   - What Matters Most
   - Sources
7. In What Matters Most, write 3-5 plain-English conclusions with no soft narrative labels.
8. Keep the tone data-first, concrete, and newspaper-like.
9. Update the project memory so this becomes the new default flow.
```

When the user gives instructions like this:

- treat them as editorial configuration, not as a one-off answer request
- update both the runtime behavior and this memory file when appropriate
- preserve the core rule that the market is the first source and reporting is confirming context

## Source Philosophy

Start from market-generated signals, not from generic headlines.

Use these rules:

- price, volume, and volatility are the first source
- current reporting is used to confirm and explain moves after the first screen
- primary or official sources should be preferred when timing or catalysts matter
- avoid fragile scraping flows unless the user explicitly wants them
- if the source mix changes later, update this memory and the runtime together

## Runtime Rules

- keep shared logic in reusable modules so local development and production stay in sync
- prefer zero-dependency Node.js implementations when they are good enough
- the repo should stay deployable without a heavy build step
- static assets should live in `public/`
- persisted published output may live under `data/`
- the legacy `daily-page/` folder may remain as a design reference unless the user asks to remove or replace it

## Deployment Direction

The current preferred deployment target is the user's Raspberry Pi.

Current deployment model:

- Apache fronts the public subdomain
- Node serves the app behind Apache on a local port
- PM2 keeps the web process alive
- the web process itself republishes the edition every 3 hours on aligned Eastern Time boundaries such as `12:00 AM`, `3:00 AM`, `6:00 AM`, and `9:00 AM`
- each scheduled refresh should republish the fixed manual edition by default unless the runtime is explicitly switched to automatic generation
- local development should still work with `npm run dev`

## Working Rules

- startup rule: at the beginning of every new thread or restart, read this memory file before replying to the user or running commands
- future changes to feeds, layout, routes, scan logic, or deployment should be reflected in this memory file
- if the memory file is renamed later, keep all accumulated instructions in the renamed file and treat that renamed file as the source of truth

## Change Log

### April 4, 2026

- Re-centered the project on the original Market Scanner Daily mission
- Replaced the generic online-newspaper framing with a signal-first market-scanner framing
- Added the user's concrete first-screen rules for `USO`, `VIXY`, `SPY`, and sector indexes
- Reinforced the rule that headline narratives should come after the base data, not before
- Kept the Raspberry Pi, Apache, HTTPS, and PM2 deployment model as the production target
- Simplified runtime operations to one PM2 process by moving the 6-hour refresh loop into the web server
- Changed the automatic republish interval from 6 hours to 3 hours
- Aligned the automatic republish schedule to fixed 3-hour Eastern Time clock boundaries instead of `3 hours after startup`
- Restored the fixed manual edition as the default published version, while keeping the 3-hour aligned republish schedule
