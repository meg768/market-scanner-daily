#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
SCAN_COMMAND="Run a fresh scan for today using the project's normal scan workflow. If the editions directory does not exist, create it. Update the local HTML companion so editions/latest.html matches the new scan. Do not put current market news in the masthead undertitle; keep it generic and purpose-based, for example: A signal-first daily brief on cross-asset moves, catalysts, and special situations."
PUBLISH_DIR="/var/www/html/market-scanner-daily"
TIMEZONE="Europe/Stockholm"
PUBLISH=false
DAILY_TIME=""

usage() {
  cat <<'EOF'
Usage: ./run.sh [--publish] [--daily HH:MM]

  --publish       Publish editions/ to the web root after each scan
  --daily HH:MM   Wait for the next daily run at HH:MM in Europe/Stockholm

Defaults:
  publish is off
  daily scheduling is off, so the script runs one scan and exits
EOF
}

is_gnu_date() {
  date --version >/dev/null 2>&1
}

current_epoch() {
  TZ="$TIMEZONE" date +%s
}

target_epoch_today() {
  local target_time="$1"
  if is_gnu_date; then
    TZ="$TIMEZONE" date -d "$(TZ="$TIMEZONE" date +%F) ${target_time}:00" +%s
  else
    TZ="$TIMEZONE" date -j -f "%Y-%m-%d %H:%M:%S" "$(TZ="$TIMEZONE" date +%F) ${target_time}:00" +%s
  fi
}

next_daily_sleep_seconds() {
  local target_time="$1"
  local now_epoch target_epoch
  now_epoch="$(current_epoch)"
  target_epoch="$(target_epoch_today "$target_time")"

  if (( now_epoch >= target_epoch )); then
    target_epoch=$((target_epoch + 86400))
  fi

  echo $((target_epoch - now_epoch))
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --publish)
      PUBLISH=true
      shift
      ;;
    --daily)
      if [[ $# -lt 2 ]]; then
        echo "Missing value for --daily" >&2
        usage >&2
        exit 1
      fi
      DAILY_TIME="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -n "$DAILY_TIME" ]] && ! [[ "$DAILY_TIME" =~ ^([01][0-9]|2[0-3]):([0-5][0-9])$ ]]; then
  echo "--daily must be in HH:MM format" >&2
  exit 1
fi

run_scan() {
  mkdir -p "$REPO_DIR/.codex"
  mkdir -p "$REPO_DIR/editions"
  codex exec --full-auto -C "$REPO_DIR" "$SCAN_COMMAND" < /dev/null

  if [[ "$PUBLISH" == "true" ]]; then
    mkdir -p "$PUBLISH_DIR"
    rsync -az --delete "$REPO_DIR/editions/" "$PUBLISH_DIR/"
  fi
}

if [[ -z "$DAILY_TIME" ]]; then
  run_scan
  exit 0
fi

while true; do
  sleep "$(next_daily_sleep_seconds "$DAILY_TIME")"
  run_scan
done
