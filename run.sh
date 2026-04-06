#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PROMPT="Run a fresh scan for today using the project's normal scan workflow. If the editions directory does not exist, create it. Update the local HTML companion so editions/latest.html matches the new scan."
INTERVAL_SECONDS=10800
PUBLISH_DIR="/var/www/html/market-scanner-daily"

while true; do
  mkdir -p "$REPO_DIR/.codex"
  mkdir -p "$REPO_DIR/editions"
  codex exec --full-auto -C "$REPO_DIR" "$PROMPT" < /dev/null
  mkdir -p "$PUBLISH_DIR"
  rsync -az --delete "$REPO_DIR/editions/" "$PUBLISH_DIR/"
  sleep "$INTERVAL_SECONDS"
done
