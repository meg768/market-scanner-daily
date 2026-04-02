# Market Scanner Daily

Market Scanner Daily is a Codex-driven workspace for producing a daily world-markets paper centered on abnormal moves, catalyst trades, and special situations.

It is built to function more like an early-warning system than a generic market recap. The workflow starts with market behavior, asks what looks unusual, and only then uses reporting or official releases to explain what changed and why it matters.

The same workspace can also be used as a market-analysis partner for testing narratives, comparing cross-asset signals, and discussing whether a move looks temporary, structural, or early.

> Work in progress: this project is still being actively shaped, and parts of the workflow, documentation, and presentation may continue to evolve.

## What This Project Is For

- Spot bigger-than-normal moves across equities, rates, FX, commodities, and crypto
- Surface special situations such as M&A, restructurings, financing stress, squeezes, and regulatory shocks
- Identify early signs that macro, policy, geopolitical, sector, or company narratives are shifting
- Present the result in a fixed newspaper-style format in chat
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
- The paper is presented directly in chat
- The layout stays fixed even when the market is quiet
- Each scan request creates a new scan in chat
- The scan uses the same fixed structure each time

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

### April 2, 2026

- Added a first-time Codex setup section for non-technical users
- Added a direct GitHub ZIP download link for opening the project without Git
- Simplified onboarding to focus on the Codex app instead of the CLI
- Updated the scan workflow description so each `scan` request is treated as a new scan in chat

## Repository Layout

- `AGENTS.md` sets project-level operating instructions for Codex
- `CONTEXT.md` stores the project memory and scanning workflow
- `README.md` is the human-facing overview

## Documentation Standard

All project documentation should remain in English.
