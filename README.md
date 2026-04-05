# Market Scanner Daily

Market Scanner Daily is a Codex-driven workspace for producing a daily world-markets paper centered on abnormal moves, catalyst trades, and special situations.

It is built to function more like an early-warning system than a generic market recap. The workflow starts with market behavior, asks what looks unusual, and only then uses reporting or official releases to explain what changed and why it matters.

The same workspace can also be used as a market-analysis partner for testing narratives, comparing cross-asset signals, and discussing whether a move looks temporary, structural, or early.

The main project is the interactive Codex-driven scanning workflow.

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
- `daily-page/latest.html`
- `daily-page/template.html`

The root-side HTML companion is intended to mirror the same scan content as chat while remaining easy to open locally.

Normal local flow:

- fill `daily-page/template.html` with the current scan content
- write the readable companion page to `daily-page/YYYY-MM-DD.html` using the scan date
- write the same content to `daily-page/latest.html`
- overwrite that dated file if it already exists for the same day
- overwrite `daily-page/latest.html` on every new scan
- open the `daily-page/` folder from Finder / File Explorer and click the dated file there

That keeps the HTML edition reproducible without depending on Node, Python, or a preview server.

For layout iteration, edit `daily-page/template.html` directly so the real local edition stays as the single source of both layout and styling.

To retheme the generated HTML edition, change the `--theme-base` value near the top of the inline `<style>` block in `daily-page/template.html`.

Current intent:

- chat remains the default output
- the HTML page is a companion presentation layer
- it should mirror the same actual scan content rather than becoming its own separate summary
- the structure stays aligned with the main daily scan format
- when available, the chat edition should include a short `Today's Edition` section under the title and date, pointing to the `daily-page/` folder before the normal text version
- the normal `scan` workflow should keep `daily-page/template.html`, the matching `daily-page/YYYY-MM-DD.html` file, and `daily-page/latest.html` aligned with the same edition structure

Example after a scan:

- chat shows the normal daily paper in markdown
- the `Today's Edition` section points to the `daily-page/` folder
- the HTML page presents the same scan in a more readable newspaper-style layout
- a typical edition includes a masthead, a lead story, sidebar summary boxes, and the same sections as the chat paper

Example file:

- `daily-page/2026-04-05.html`
- `daily-page/latest.html`

## Developer Workflow

When working on the HTML presentation in developer mode, edit the real template first instead of maintaining a separate preview page.

- Use `daily-page/template.html` for structural layout changes
- Keep styling changes inside the inline `<style>` block in `daily-page/template.html`
- Prefer small, isolated style changes during design work
- Section labels such as `Front Page` and `Cross-Asset Dashboard` are intended to stay as plain text labels, not colored pill badges

Optional publish workflow in server mode:

- keep the editable scan output in `daily-page/YYYY-MM-DD.html` and `daily-page/latest.html`
- publish `daily-page/latest.html` to the Raspberry Pi as `/var/www/html/market-scanner-daily/latest.html`
- publish the matching dated file to the same Raspberry Pi folder as an archive copy
- keep those copy instructions in the automation itself rather than in a repo script
- publishing is treated as a server-mode task, not a normal end-user action
- if someone tries to publish in user mode, the workflow should simply state that publishing is not available there
- server mode should prefer reliable completion over open-ended research depth
- the practical server-mode source set should stay small:
  - a narrow tape check around `USO`, `VIXY`, `SPY`, and the most relevant sectors or confirming assets
  - one or two official sources for exact macro timing or release confirmation
  - one or two same-day reporting sources for catalyst confirmation
- once the edition is coherent, server mode should write and publish immediately rather than keep expanding the scan
- if a server-mode run cannot produce a perfect scan, it should still aim to publish a concise complete edition instead of stalling out

Published Raspberry Pi path:

- `/var/www/html/market-scanner-daily/latest.html`
- `/var/www/html/market-scanner-daily/YYYY-MM-DD.html`

## Operating Modes

The project now has three distinct modes:

- `user mode`: normal scanner usage such as `scan`, `What's new?`, and `help`
- `developer mode`: project maintenance such as git work, memory edits, layout changes, and workflow changes
- `server mode`: production-style scan generation plus Raspberry Pi publishing

Mode intent:

- `user mode` should produce the daily paper and its local HTML companion, but should not publish
- `developer mode` should change the project, not act like the publishing runtime
- `server mode` should optimize for reliable completion and publication rather than open-ended research depth

Server-mode production rules:

- keep the source budget intentionally small
- center the tape check on `USO`, `VIXY`, `SPY`, and only the most relevant confirming sectors or assets
- use one or two official sources for exact timing or macro confirmation
- use one or two same-day reporting sources such as Reuters or AP for catalyst confirmation
- once the edition is coherent, stop researching and write the files
- if one small detail is missing, omit it instead of stalling the run
- success means `daily-page/YYYY-MM-DD.html`, `daily-page/latest.html`, and the Raspberry Pi copies are updated

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

- Removed the separate webserver experiment and re-centered the repo on the interactive scan plus the local HTML companion
- Re-centered the root project memory on the interactive Codex-driven scan workflow
- Simplified `daily-page/` to one real template plus generated standalone HTML editions
- Switched the local HTML companion naming convention to `YYYY-MM-DD.html`
- Added `daily-page/latest.html` as the rolling current-edition companion file
- Inlined the HTML companion styling into the template and generated editions so each file is self-contained
- Updated the local HTML workflow so scans point to the `daily-page/` folder instead of direct file links
- Added `server mode` as the dedicated role for automated scan generation and Raspberry Pi publishing
- Blocked publishing in user mode and kept developer mode focused on project maintenance instead
- Reorganized the project memory around explicit `user mode`, `developer mode`, and `server mode` sections
- Tightened the documented server-mode production rules so automation prioritizes finishing and publishing over open-ended research depth

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

Documentation split:

- `CONTEXT.md` should describe the interactive main workflow
- `README.md` should describe the interactive workflow and its local HTML companion

When workflow, methods, short commands, or usage patterns change in the project memory, the matching user-facing explanation should also be updated here in `README.md`.

## Documentation Standard

All project documentation should remain in English.
