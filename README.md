# Market Scanner Daily

Market Scanner Daily is a Codex-driven workflow for producing a daily global market scan focused on abnormal moves, catalyst trades, and special situations.

The project is designed to work more like an early-warning market paper than a generic news recap. It starts from market-generated signals, then uses reporting and official releases to explain what changed and why it matters.

It can also be used as a market analysis sounding board: a place to test interpretations, discuss trends, compare narratives across asset classes, and think through whether a move looks temporary, structural, or early.

## What This Project Does

- Scans global markets for bigger-than-normal moves across equities, rates, FX, commodities, and crypto
- Prioritizes special situations such as M&A, restructurings, financing stress, regulatory shocks, and squeezes
- Looks for early signs that macro, policy, geopolitical, sector, or company narratives are changing
- Can be used as a sounding board for market analysis and trend discussion, not only as a one-way daily scan
- Presents the result in a fixed newspaper-style format in chat
- Stores durable workflow rules, preferences, and recurring source choices in the project memory

## Core Scanning Logic

The scan should begin from market behavior rather than from the headline flow.

The first screen focuses on:

- `USO` for oil direction, move size, and volume
- `VIXY` for volatility direction, move size, and volume
- `SPY` for broad U.S. equity direction, move size, and volume
- Major U.S. sector indexes or sector ETFs for breadth and divergence

For each core screen, the workflow asks:

- Is the price move unusual relative to normal behavior?
- Is trading volume unusual?
- Is volatility confirming the move?
- Is the move confirmed across related assets or regions?
- Does the behavior suggest new information, positioning stress, or a regime shift?

Only after that first-pass screen does the workflow use current reporting and official releases to confirm the likely catalyst.

## Output Format

Each scan should use the same section order:

1. `Market Scanner Daily`
2. Date line
3. `Edition status`
4. `Front Page`
5. `Cross-Asset Dashboard`
6. `Abnormal Moves`
7. `Special Situations`
8. `Catalyst Calendar`
9. `Early-Info Signals`
10. `What Matters Most`
11. `Sources`

The result is meant to read like a concise market newspaper: overview first, then the most important cross-asset moves, then catalyst names and interpretation.

## How To Use It

Open the project in Codex and use short prompts such as:

- `scan`
- `What's new?`
- `help`
- `how does this work?`
- `what do you do?`

Expected behavior:

- `scan` or `What's new?` runs a fresh market scan immediately
- The scan is presented directly in chat
- The same workspace can also be used interactively to analyze market moves and discuss emerging trends
- The workflow does not save each scan as a separate dated Markdown file
- Durable rules, preferences, source choices, and lasting insights can be written back into the project memory

## What `help` Should Explain

When a user asks `help`, `how does this work?`, or `what do you do?`, the assistant should explain the workflow in plain English.

That explanation should cover:

- The project is designed to scan world markets for special situations, catalyst trades, and bigger-than-normal moves
- The workflow starts from market-generated signals rather than generic headlines
- The first screen checks `USO`, `VIXY`, `SPY`, and major U.S. sector indexes or sector ETFs
- Those moves should be judged against recent normal behavior when possible, not only by absolute size
- The likely catalyst should then be confirmed with current reporting and official releases
- The result is delivered in a fixed newspaper-style format in chat
- The project can also be used as a sounding board for market analysis, trend discussion, and cross-asset interpretation

The `help` response should keep the explicit command list minimal:

- `scan`
- `help`

Even if they are not listed in that short command list, the assistant should still understand prompts such as `What's new?` as requests for a fresh scan.

## How To Ask For Analysis

The project is not limited to one-way daily scans. It can also be used as an interactive market discussion workspace.

Examples of useful prompts:

- `What is the most important trend in markets right now?`
- `Is this move in oil confirming or contradicting equities?`
- `What changed versus yesterday?`
- `Does this look like positioning stress or new information?`
- `Which sectors are confirming the macro narrative?`

In these cases, the assistant should act as a market analysis partner, using the same signal-first framework that powers the daily scan.

## Project Files

- `AGENTS.md`: project-level instructions that tell Codex how to start each session
- `CONTEXT.md`: the project memory and operating playbook for the scanner
- `README.md`: human-facing overview of what the project is and how it works

## Source Philosophy

The workflow prefers:

- Market-generated signals first
- Same-day reporting second
- Official releases and investor-relations sources when timing or confirmation matters

Reuters is the default same-day reporting backbone when relevant, with official calendars and primary releases used for confirmation and catalyst timing.

## Customization

The scanner is intentionally configurable. The user can change:

- Markets and regions covered
- Asset classes prioritized
- Signal thresholds
- Output length and tone
- Whether to include interpretation or trade framing
- Source preferences
- Watchlists and recurring situations

Those durable changes should be reflected in the project memory so future scans follow the updated workflow.

## Documentation Rule

All project documentation should be kept in English.
