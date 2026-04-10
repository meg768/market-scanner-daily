# Market Scanner Daily

## Purpose

This file stores workflow, operating rules, restart behavior, and project-maintenance instructions for this workspace.

For the editorial brief covering what the market paper should contain, how it should be written, which signals matter, which sources to prioritize, and which configurable scan preferences should be remembered, read `CONTENTS.md` immediately after this file.

## Memory Split

- read this file first at the start of every new thread or restart
- read `CONTENTS.md` immediately after this file before replying to the user or running commands
- treat `CONTEXT.md` as the workflow and operations source of truth
- treat `CONTENTS.md` as the editorial, coverage, source, and presentation source of truth
- in user-facing replies, do not refer to these files by filename unless the user explicitly asks about the files themselves
- keep all project documentation in English
- when the user changes workflow, storage, automation, operating behavior, restart behavior, or developer conventions, update this file
- when the user changes what gets scanned, how the paper is presented, which sources to prioritize, which thresholds matter, or which markets and watchlists to cover, update `CONTENTS.md`
- when methods, analyses, short commands, or usage patterns change in this memory, mirror the user-facing parts of that change in `README.md`
- if either memory file is renamed in the future, preserve the same split of responsibilities and update `AGENTS.md` to point to the renamed files

## Working Rules

- startup rule: at the beginning of every new thread or restart, read this file first and then `CONTENTS.md` before replying to the user or running commands
- this startup rule applies even to casual greetings, short prompts, and trivial terminal-style requests
- scans are generated on demand in chat, while these memory files preserve durable intent, preferences, sources, and operating rules
- user mode is the default assumption
- do not assume the current user is the same as the future end user of the scanner; adapt tone and actions to the active role in the conversation
- before relying on prior workflow assumptions, check this file and `CONTENTS.md` as the source of truth for current behavior

## Operating Modes

### User Mode

Use this section when the current user is using the scanner as an end user rather than changing the project itself.

- user mode is the default assumption
- in user mode, treat short prompts such as `scan`, `What's new?`, and `help` as product-use commands rather than project-maintenance commands
- in user mode, the main output is the in-chat daily paper
- in user mode, when an HTML companion is produced for a scan, update `editions/YYYY-MM-DD.html` and `editions/latest.html` as part of the normal scan flow
- in user mode, when a published Apache copy is refreshed, treat `/var/www/html/market-scanner-daily/index.html` as the public front page and `/var/www/html/market-scanner-daily/editions/` as the dated archive
- in user mode, prefer explaining the product and the scan logic in simple language if the user asks how it works

### Developer Mode

Use this section when the current user is working on the project itself rather than using the scanner as an end user.

- only switch into developer mode when the user explicitly indicates that they are doing so, for example by saying `devmode`
- when the current user is in developer mode, interpret requests like `backup`, `restore`, git operations, workflow edits, HTML design work, and memory updates as project-maintenance tasks
- in developer mode, `commit` means commit plus push
- in developer mode, when a commit includes meaningful user-facing or workflow changes, update the `Change Log` section in `README.md` as part of that commit
- in developer mode, `backup` means update one rolling git backup that can be returned to later
- do not create separate named backup tags unless the user explicitly asks for them
- in developer mode, `restore` means return the repository to the rolling backup point unless the user specifies a different one
- when doing HTML design work without asking for a live scan, use `template.html` with small isolated changes rather than maintaining a separate preview page
- for HTML design iteration in developer mode, prefer small isolated visual changes instead of broad restyles unless the user explicitly asks for a larger redesign
- section titles in the HTML companion such as `Front Page` and `Cross-Asset Dashboard` should render as plain text only, without colored pill backgrounds behind the label itself
- current preferred HTML direction in developer mode: keep the existing card structure, keep the toning consistent across all boxes, and make visual adjustments incrementally

## Project Setup And Restart

Use this workflow to make restart behavior reliable:

- create the Codex project from this folder so the assistant can access these memory files directly
- keep `AGENTS.md` in the project root so Codex gets a native project instruction file
- keep both `CONTEXT.md` and `CONTENTS.md` in the project root
- use `AGENTS.md` to tell Codex to read `CONTEXT.md` first and then `CONTENTS.md`
- after a Codex restart or when starting a new thread in the same project, Codex should still follow `AGENTS.md`, then this file, then `CONTENTS.md`
- if either memory file is renamed, update `AGENTS.md` to point to the renamed file
- when updating workflow or operating rules, update this file so future sessions inherit the change
- when updating the editorial brief, source preferences, coverage rules, or presentation rules, update `CONTENTS.md` so future sessions inherit the change
- when in doubt, prefer updating these memory files over hard-coding workflow behavior elsewhere

## Deployment

Current published-site layout on `pi-kato`:

- repo clone: `/home/pi/market-scanner-daily`
- Apache web root: `/var/www/html/market-scanner-daily`
- public front page: `/var/www/html/market-scanner-daily/index.html`
- public archive: `/var/www/html/market-scanner-daily/editions/`
- public hostname: `market-scanner-daily.egelberg.se`

Publishing rule:

- `run.sh --publish` should mirror local `editions/` into `/var/www/html/market-scanner-daily/editions/`
- `run.sh --publish` should also copy `editions/latest.html` to `/var/www/html/market-scanner-daily/index.html` so Apache serves a normal site root rather than a bare file dump

Practical rule:

- Codex can reliably follow the memory split after restart if `AGENTS.md` points to both files and they remain in the project root
- do not rely on unstated memory across restarts; rely on `AGENTS.md`, `CONTEXT.md`, and `CONTENTS.md`

## Next Step

These memory files should be updated over time as the durable record of how the scanner works.

- update `CONTEXT.md` when operating rules or developer workflow changes
- update `CONTENTS.md` when scan content, source priorities, output structure, thresholds, watchlists, or presentation rules changes
- update `README.md` when user-facing workflow or usage expectations change
