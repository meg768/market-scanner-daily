# Market Scanner Daily

Market Scanner Daily is a Codex-driven workspace for producing a daily world-markets paper centered on abnormal moves, catalyst trades, and special situations.

It is built to function more like an early-warning system than a generic market recap. The workflow starts with market behavior, asks what looks unusual, and only then uses reporting or official releases to explain what changed and why it matters.

The same workspace can also be used as a market-analysis partner for testing narratives, comparing cross-asset signals, and discussing whether a move looks temporary, structural, or early.

The main project is the interactive Codex-driven scanning workflow. In addition to that main path, the repo also includes a separate optional webserver feature in `webserver/` for web publishing experiments.

> Work in progress: this project is still being actively shaped, and parts of the workflow, documentation, and presentation may continue to evolve.

## What This Project Is For

- Spot bigger-than-normal moves across equities, rates, FX, commodities, and crypto
- Surface special situations such as M&A, restructurings, financing stress, squeezes, and regulatory shocks
- Identify early signs that macro, policy, geopolitical, sector, or company narratives are shifting
- Present the result in a fixed newspaper-style format in chat
- Support a newspaper-style HTML page using the same daily structure
- Keep durable workflow preferences and recurring rules in the project memory for future scans

## Signal-First Scanning Logic

The scanner does not begin with the normal headline flow. It begins with the market asking:

- What moved?
- How large was the move?
- Was volume abnormal?
- Is volatility confirming or contradicting the move?
- Is the behavior confirmed across related assets, sectors, or regions?
- Does the pattern look like new information, positioning stress, or a regime shift?

The first screen prioritizes:

- `USO` for oil direction, move size, and volume
- `VIXY` for volatility direction, move size, and volume
- `SPY` for broad U.S. equity direction, move size, and volume
- Major U.S. sector indexes or sector ETFs for breadth and divergence

After that first-pass screen, the workflow uses current reporting and official releases to confirm the likely catalyst.

## Daily Paper Format

Every market paper uses the same section order:

1. `Market Scanner Daily`
2. Date line
3. `Front Page`
4. `Cross-Asset Dashboard`
5. `Abnormal Moves`
6. `Special Situations`
7. `Catalyst Calendar`
8. `Early-Info Signals`
9. `What Matters Most`
10. `Sources`

The aim is a concise market newspaper: overview first, then the most important cross-asset moves, then the situations and catalysts that deserve follow-up.

Inside each section, the default presentation should read like normal newspaper copy: short prose paragraphs first, with lists used only when they genuinely improve clarity.

The same editorial structure can also be presented as an HTML page for a more visually polished, newspaper-like reading experience.

The HTML presentation does not need to mimic any one newspaper exactly. It can use a more creative editorial design as long as the structure stays clear and readable.

Its theme should also be easy to retune: the HTML CSS is designed around one top-level base color so the overall page theme can be changed from a single place.

The HTML page is meant to reflect the same underlying scan content as the chat edition. It is a more readable presentation layer, not a separate version with different facts or conclusions.

Section labels such as `Front Page` and `Cross-Asset Dashboard` should appear as plain text, not as colored pill-shaped badges.

## HTML Daily Page

The project now includes a newspaper-style HTML prototype in:

- `daily-page/YYYY-MM-DD.html`
- `daily-page/template.html`

The root-side HTML companion is intended to mirror the same scan content as chat while remaining easy to open locally.

Normal local flow:

- fill `daily-page/template.html` with the current scan content
- write the readable companion page to `daily-page/YYYY-MM-DD.html` using the scan date
- overwrite that dated file if it already exists for the same day
- open the `daily-page/` folder from Finder / File Explorer and click the dated file there

That keeps the HTML edition reproducible without depending on Node, Python, or a preview server.

For layout iteration, edit `daily-page/template.html` and `daily-page/styles.css` directly so the real local edition stays as the single layout source.

To retheme the generated HTML edition, change the `--theme-base` value near the top of `daily-page/styles.css`.

Current intent:

- chat remains the default output
- the HTML page is a companion presentation layer
- it should mirror the same actual scan content rather than becoming its own separate summary
- the structure stays aligned with the main daily scan format
- when available, the chat edition should include a short `Today's Edition` section under the title and date, pointing to the `daily-page/` folder before the normal text version
- the normal `scan` workflow should keep `daily-page/template.html` and the matching `daily-page/YYYY-MM-DD.html` file aligned with the same edition structure

Example after a scan:

- chat shows the normal daily paper in markdown
- the `Today's Edition` section points to the `daily-page/` folder
- the HTML page presents the same scan in a more readable newspaper-style layout
- a typical edition includes a masthead, a lead story, sidebar summary boxes, and the same sections as the chat paper

Example file:

- `daily-page/2026-04-05.html`

## Optional Webserver Feature

The repo also contains a separate `webserver/` folder.

That folder is not the main interactive product. It is an extra feature that packages the newspaper output as a web-published server/app experiment.

Use `webserver/` when you want to work on:

- a standalone HTML/JSON server version
- the published-edition pipeline
- deployment-oriented work such as PM2, Apache, or scheduled republishes
- a more app-like version of the newspaper outside the normal interactive Codex flow

Use the repo root when you want to work on:

- the interactive daily scan behavior
- the project memory and workflow rules
- the HTML prototype under `daily-page/`
- the Codex-first usage model

For details about the webserver feature itself, see:

- `webserver/README.md`

## Developer Workflow

When working on the HTML presentation in developer mode, edit the real template first instead of maintaining a separate preview page.

- Use `daily-page/template.html` for structural layout changes
- Use `daily-page/styles.css` for styling changes
- Prefer small, isolated style changes during design work
- Section labels such as `Front Page` and `Cross-Asset Dashboard` are intended to stay as plain text labels, not colored pill badges

## First-Time Codex Setup

If you are new to Codex, use this simple step-by-step flow.

### 1. Get access to Codex

- Make sure you have a ChatGPT plan that includes Codex
- If needed, upgrade your plan in your ChatGPT account settings

### 2. Install Codex

For this project, use the Codex app:

- Download and install the Codex app for your operating system
- Open the app
- Sign in with your ChatGPT account when prompted

### 3. Open this project in Codex

Once Codex is installed and you are signed in:

- If you do not use Git, download the project as a ZIP from GitHub: [Download market-scanner-daily.zip](https://github.com/meg768/market-scanner-daily/archive/refs/heads/main.zip)
- Unzip the downloaded file on your computer
- Open Codex
- Choose to open a local folder or project
- Select the unzipped `market-scanner-daily` folder
- Wait for Codex to load the workspace context

### 4. Start with a simple first prompt

When the project is open, begin with one of these:

- `scan`
- `What's new?`
- `help`
- `how does this work?`
- `what do you do?`

### 5. Keep it simple at the start

Recommended first workflow:

1. Open the project
2. Type `help` if you want a quick explanation of how the scanner works
3. Type `scan` or `What's new?` to generate the latest market paper
4. Ask follow-up questions such as `What changed versus yesterday?`

### 6. What Codex will do in this repo

When used correctly in this workspace, Codex should:

- Read the project memory and operating context first
- Run a fresh market scan when you ask for one
- Present the result directly in chat
- Keep using the same fixed newspaper-style structure

## Using The Workspace

Open the repo in Codex and use short prompts such as:

- `scan`
- `What's new?`
- `help`

Expected behavior:

- `scan` or `What's new?` runs a fresh scan for the current day
- when the HTML companion is available, `scan` also points to the local HTML file automatically near the top
- `help`, `how does this work?`, or `what do you do?` explains how the scanner works
- The paper is presented directly in chat
- Each named section is written mainly as normal text rather than bullet-heavy notes
- The layout stays fixed even when the market is quiet
- Each scan request creates a new scan in chat
- The scan uses the same fixed structure each time
- Scans are generated in chat rather than saved as separate dated Markdown files

## Market Analysis Mode

This workspace is not limited to one-way daily scans. It can also be used as a sounding board for market interpretation.

Examples:

- `What changed versus yesterday?`
- `Is oil confirming or contradicting equities here?`
- `Does this look like positioning stress or new information?`
- `Which sectors are confirming the macro narrative?`

In those cases, the same signal-first framework should guide the analysis.

## Source Philosophy

The workflow prefers:

- Market-generated signals first
- Same-day reporting second
- Official releases, calendars, and investor-relations material when confirmation matters

Reuters is the default same-day reporting backbone when relevant, with primary releases used to confirm timing, policy, and catalysts.

## Customization

The scanner is intentionally configurable. Durable changes can be made to:

- Markets and regions covered
- Asset classes prioritized
- Signal thresholds
- Output length and tone
- Source preferences
- Watchlists and recurring situations
- How the paper is displayed or updated

Those changes should be preserved in the project memory so future scans follow the updated workflow automatically.

## Change Log

### April 5, 2026

- Moved the web-published experiment into a separate optional `webserver/` folder
- Re-centered the root project memory on the interactive Codex-driven scan workflow
- Simplified `daily-page/` to one real template, one dated generated edition, and one shared stylesheet
- Switched the local HTML companion naming convention to `YYYY-MM-DD.html`
- Updated the local HTML workflow so scans point to the `daily-page/` folder instead of direct file links

### April 3, 2026

- Updated the scan style so each section is written primarily as normal newspaper-style text instead of bullet-heavy formatting
- Mirrored that presentation rule in the README so the chat edition and documentation stay aligned
- Added a stable HTML design preview page so layout work can happen without waiting for a fresh scan
- Added a dedicated developer-mode section in the project memory to keep maintenance and design workflow rules in one place

### April 2, 2026

- Added a first-time Codex setup section for non-technical users
- Added a direct GitHub ZIP download link for opening the project without Git
- Simplified onboarding to focus on the Codex app instead of the CLI
- Updated the scan workflow description so each `scan` request is treated as a new scan in chat
- Added a newspaper-style HTML daily page prototype with the same editorial structure
- Added a local HTML companion workflow for opening the generated page directly from the file system
- Added a `Today's Edition` companion link in the chat paper format for the HTML page
- Added a single-color HTML theme system based on `--theme-base` for easier retheming
- Added a workflow rule that meaningful commits should also update this `Change Log`
- Added a concrete README example showing how the HTML edition relates to a completed scan
- Added a static SVG mockup in the README so GitHub visitors can preview the HTML edition visually
- Replaced the README mockup with a smaller preview image taken from the real HTML scan example
- Removed the embedded README preview image and kept the HTML section text-only again

## Repository Layout

- `AGENTS.md` sets project-level operating instructions for Codex
- `CONTEXT.md` stores the interactive project memory and scanning workflow
- `README.md` is the human-facing overview of the whole project
- `daily-page/` contains the local HTML companion and its template-driven layout files
- `webserver/` contains the separate optional webserver/app feature

Documentation split:

- `CONTEXT.md` should describe the interactive main workflow
- `README.md` should describe the whole project, including optional features such as `webserver/`
- `webserver/README.md` should document the webserver feature itself

When workflow, methods, short commands, or usage patterns change in the project memory, the matching user-facing explanation should also be updated here in `README.md`.

## Documentation Standard

All project documentation should remain in English.
