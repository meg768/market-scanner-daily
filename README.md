# Market Scanner Daily

Market Scanner Daily is a Codex-driven workspace for producing a daily market edition.

The published site lives at:

- `https://market-scanner-daily.egelberg.se`

The project is best understood as a small publishing pipeline:

- one daily edition
- one HTML presentation
- one runner that handles scheduling and publishing

> Work in progress: this project is still being actively shaped, and parts of the workflow, documentation, and presentation may continue to evolve.

The durable project memory lives in:

- `CONTEXT.md` for workflow, runner behavior, layout direction, restart rules, and deployment
- `this-is-what-i-want.txt` for the separate content brief that defines what the edition should emphasize and avoid

## HTML Daily Page

The project now includes a newspaper-style HTML prototype in:

- `editions/YYYY-MM-DD.html`
- `editions/latest.html`
- `template.html`
- `preview.html`

The layout is intentionally the main asset in the project right now.
The current direction is to keep the layout and publishing flow stable while the content brief lives separately from the workflow memory.

Normal local flow:

- fill `template.html` with the current edition content
- if `editions/` does not exist yet, create it before writing the generated files
- write the readable companion page to `editions/YYYY-MM-DD.html` using the scan date
- write the same content to `editions/latest.html`
- overwrite that dated file if it already exists for the same day
- overwrite `editions/latest.html` on every new scan
- open the `editions/` folder from Finder / File Explorer and click the dated file there

That keeps the HTML edition reproducible without depending on Node, Python, or a preview server.

`preview.html` is a fixed static reference page for quick visual checks.

For normal layout iteration, edit `template.html` directly so the real local edition stays as the single source of both layout and styling.

To retheme the generated HTML edition, change the `--theme-base` value near the top of the inline `<style>` block in `template.html`.

## Template Workflow

When working on the HTML presentation, edit the real template first instead of maintaining a separate preview page.

- Use `template.html` for structural layout changes
- Keep styling changes inside the inline `<style>` block in `template.html`
- Prefer small, isolated style changes during design work
- Section labels such as `Front Page` and `Cross-Asset Dashboard` are intended to stay as plain text labels, not colored pill badges

## Automation

The repo includes a `run.sh` runner for scans.

- `./run.sh`
  Runs one scan and exits.

- `./run.sh --publish`
  Runs one scan, mirrors `editions/` into the Apache site archive, writes `editions/latest.html` as `index.html`, and exits.

- `./run.sh --daily 15:30`
  Waits for the next `15:30` in `Europe/Stockholm`, then runs once per day at that time.

- `./run.sh --publish --daily 15:30`
  Publishes after each daily run, writes `latest.html` to the site root as `index.html`, and keeps the process alive inside PM2.

Internally, `run.sh` sends the short command `market-scanner-daily-scan` to Codex. That means the runner stays simple and the durable project rules stay in the project memory rather than in a long embedded prompt.
That scan flow is expected to read the separate brief in `this-is-what-i-want.txt` whenever the edition content itself is being produced.
In other words, the layout should remain consistent with the existing HTML pages, while the actual daily copy should be shaped by the separate brief.

## Publishing

At publish time:

- local `editions/` is mirrored to the server archive
- `editions/latest.html` is copied to the site root as `index.html`

That way Apache serves a normal front page while still keeping a browsable archive of dated editions.

## Deployment

Current production layout on `pi-kato`:

- repo clone:
  `/home/pi/market-scanner-daily`
- published site root:
  `/var/www/html/market-scanner-daily`
- public hostname:
  `market-scanner-daily.egelberg.se`
- current edition at runtime:
  `/var/www/html/market-scanner-daily/index.html`
- dated/public archive files:
  `/var/www/html/market-scanner-daily/editions/`

The public site is meant to be a normal static Apache page, with the latest edition served from the site root and the dated archive kept under `editions/`.

## Scheduling

Current PM2 setup on `pi-kato`:

- process name: `market-scanner-daily`
- script: `/home/pi/market-scanner-daily/run.sh`
- args: `--publish --daily 15:30`
- timezone intent: `Europe/Stockholm`

That means the public site should refresh automatically every trading day around the U.S. cash open, while manual runs can still be done with:

```bash
cd /home/pi/market-scanner-daily
./run.sh --publish
```

## Scratchpad

The content brief has been intentionally cleared out of the durable project memory for now.

The current scratchpad is:

- `this-is-what-i-want.txt`

That file is the place to define what the publication should show, what it should avoid, and how the page should think about markets.

## Change Log

### April 10, 2026

- Switched published output to a real Apache site layout with `index.html` at the web root and dated files under `editions/`
- Documented the production publish path on `pi-kato` and the PM2 daily publish schedule at `15:30` Swedish time
- Added the dedicated Apache hostname `market-scanner-daily.egelberg.se` for the published site
- Consolidated the project memory back into `CONTEXT.md` so workflow and layout rules live in one file again
- Cleared the durable content brief out of the project memory so the editorial direction can be rebuilt from scratch
- Removed the `user mode` / `developer mode` split and simplified the project to one normal workflow
- Added `this-is-what-i-want.txt` as the temporary scratch brief while the content direction is rebuilt
- Added a static `preview.html` reference page while keeping `template.html` as the main layout source
- Made the scan command chain explicitly read the separate brief so future editions keep the existing layout while following that content direction

## Repository Layout

- `AGENTS.md` sets project-level operating instructions for Codex
- `CONTEXT.md` stores workflow, operating rules, layout direction, restart behavior, and deployment conventions
- `README.md` is the human-facing overview of the whole project
- `this-is-what-i-want.txt` is the current scratchpad for rebuilding the content brief
- `editions/` contains the local HTML companion and its generated HTML files

Documentation layout:

- `CONTEXT.md` should describe workflow, layout direction, runner behavior, restart rules, and deployment
- `README.md` should describe the project at a high level and how the daily edition is produced

When workflow, methods, short commands, or usage patterns change in the project memory, the matching user-facing explanation should also be updated here in `README.md`.

## Documentation Standard

All project documentation should remain in English.
