# Webserver Track

This folder contains the newer web-published Market Scanner Daily implementation.

It is the webserver/app track that was added on top of the older repository contents. The goal of this folder is to keep the newer runtime isolated from the older root-side newspaper companion that still lives under `daily-page/`.

## What Lives Here

- `server.js`: the Node entry point for local development and production
- `api/`: serverless-style route handlers for HTML and JSON responses
- `lib/`: shared edition, publishing, rendering, and feed logic
- `data/`: the persisted published edition cache and the fixed manual edition
- `public/`: live CSS and static assets
- `scripts/`: helper scripts such as manual edition refresh
- `ecosystem.config.cjs`: PM2 config for the Raspberry Pi deployment
- `package.json`: scripts for running the server track locally
- `vercel.json`: deployment config for this webserver/app track

## What This Folder Is For

Use this folder when working on:

- the live web app
- the Raspberry Pi deployment
- the published edition pipeline
- the JSON and HTML endpoints
- the newer server-side newspaper presentation

Do not use this folder for the older design-preview-only flow unless you explicitly want to port work from `daily-page/` into the live app.

## How To Work In This Folder

Run commands from this folder when working on the newer webserver/app track:

```bash
cd webserver
npm run dev
```

The server track is currently configured so that:

- the live site republishes on a 3-hour aligned ET schedule
- the fixed manual edition is the default published version
- the automatic generator still exists, but it is not the default path

## Relationship To The Rest Of The Repo

The repo root still contains:

- project memory and repo-level instructions
- the older HTML/design-preview artifacts
- the historical version that existed before the server track was separated

This means the repo now intentionally contains two layers:

- the older root/design layer
- the newer `webserver/` app layer
