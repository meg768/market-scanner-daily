# Market Scanner Daily

## Purpose

This file stores the project memory for this workspace: workflow, operating rules, layout and presentation rules, restart behavior, deployment, and project-maintenance instructions.

## Memory Model

- read this file first at the start of every new thread or restart
- when the request is to run a scan, generate an edition, or shape edition content, read `this-is-what-i-want.txt` immediately after this file
- treat `CONTEXT.md` as the source of truth for workflow, layout/presentation rules, runner behavior, and deployment
- treat `this-is-what-i-want.txt` as the source of truth for which information, signals, assets, and market questions are interesting enough to surface in the edition
- in user-facing replies, do not refer to these files by filename unless the user explicitly asks about the files themselves
- keep all project documentation in English
- when the user changes workflow, storage, automation, operating behavior, restart behavior, layout direction, or developer conventions, update this file
- when methods, analyses, short commands, or usage patterns change in this memory, mirror the user-facing parts of that change in `README.md`
- if this memory file is renamed in the future, update `AGENTS.md` to point to the renamed file

## Working Rules

- startup rule: at the beginning of every new thread or restart, read this file before replying to the user or running commands
- this startup rule applies even to casual greetings, short prompts, and trivial terminal-style requests
- when the task involves scans or edition content, read `this-is-what-i-want.txt` before deciding what the page should say
- scans are generated on demand in chat, while these memory files preserve durable intent, preferences, sources, and operating rules
- do not assume the current user is the same as the future end user of the scanner; adapt tone and actions to the active role in the conversation
- before relying on prior workflow assumptions, check this file as the source of truth for current behavior

## Project Rules

- treat `scan` as the normal manual command when a fresh edition should be generated on demand
- the main output of the project is one daily edition and its HTML presentation
- when an HTML companion is produced for a scan, update `editions/YYYY-MM-DD.html` and `editions/latest.html` as part of the normal scan flow
- when the user asks how the project works, explain the product and the scan logic in simple language
- `commit` means commit plus push
- when a commit includes meaningful user-facing or workflow changes, update the `Change Log` section in `README.md` as part of that commit
- `backup` means update one rolling git backup that can be returned to later
- do not create separate named backup tags unless the user explicitly asks for them
- `restore` means return the repository to the rolling backup point unless the user specifies a different one
- when doing HTML design work without asking for a live scan, use `template.html` as the single layout source
- for HTML design iteration, prefer small isolated visual changes instead of broad restyles unless the user explicitly asks for a larger redesign
- section titles in the HTML companion such as `Front Page` and `Cross-Asset Dashboard` should render as plain text only, without colored pill backgrounds behind the label itself
- current preferred HTML direction: keep the existing card structure, keep the toning consistent across all boxes, and make visual adjustments incrementally
- current preferred typography direction: every small label or title rendered in all caps should use the same sans serif family, while body copy can remain serif
- current preferred lead-story direction: the main lead headline should use the same serif family as the body copy
- when the user wants to tweak HTML without generating a new edition, edit the existing files and run `./publish-current.sh`

## Core Commands

- treat `scan` as the normal manual command when a fresh edition should be generated on demand
- internal runner shortcut: `market-scanner-daily-scan`
- treat the exact prompt `market-scanner-daily-scan` as a direct instruction to generate the current daily edition
- when handling `market-scanner-daily-scan`, run a fresh market scan using the normal project workflow
- when handling `market-scanner-daily-scan`, read `this-is-what-i-want.txt` and let it guide which information and signals should be prioritized in the edition
- when handling `market-scanner-daily-scan`, create `editions/` if it does not exist and update both `editions/YYYY-MM-DD.html` and `editions/latest.html`
- when handling `market-scanner-daily-scan`, keep the masthead undertitle generic and purpose-based rather than day-specific or news-like
- when handling `market-scanner-daily-scan`, preserve the established page layout and typography from `template.html` while letting the content follow the separate brief file
- `market-scanner-daily-scan` should only generate the local edition files; publishing is handled by `run.sh`
- never call `run.sh` from inside `market-scanner-daily-scan`
- never start a nested runner process from `market-scanner-daily-scan`

## Content Reset

- layout, workflow, and deployment rules stay here
- the active information-interest brief currently lives in `this-is-what-i-want.txt`
- keep that file separate from this memory so the list of interesting signals and assets can evolve without bloating the workflow memory
- if a more permanent editorial brief is wanted later, it can replace or refine `this-is-what-i-want.txt`

## Project Setup And Restart

Use this workflow to make restart behavior reliable:

- create the Codex project from this folder so the assistant can access these memory files directly
- keep `AGENTS.md` in the project root so Codex gets a native project instruction file
- keep `CONTEXT.md` in the project root
- use `AGENTS.md` to tell Codex to read `CONTEXT.md`
- after a Codex restart or when starting a new thread in the same project, Codex should still follow `AGENTS.md` and then this file
- if the memory file is renamed, update `AGENTS.md` to point to the renamed file
- when updating workflow or operating rules, update this file so future sessions inherit the change
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
- `publish-current.sh` should publish the existing `editions/` files without running a new scan

Practical rule:

- Codex can reliably follow the memory after restart if `AGENTS.md` points to `CONTEXT.md` and it remains in the project root
- do not rely on unstated memory across restarts; rely on `AGENTS.md` and `CONTEXT.md`
- `run.sh` should call `market-scanner-daily-scan` rather than embedding a long literal prompt

## Next Step

This memory file should be updated over time as the durable record of how the project works.

- update `CONTEXT.md` when operating rules, layout direction, runner behavior, deployment, or presentation rules change
- update `README.md` when user-facing workflow or usage expectations change
