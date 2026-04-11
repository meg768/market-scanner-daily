#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PUBLISH_DIR="/var/www/html/market-scanner-daily"

if [[ ! -f "$REPO_DIR/editions/latest.html" ]]; then
  echo "Cannot publish: $REPO_DIR/editions/latest.html does not exist" >&2
  exit 1
fi

mkdir -p "$PUBLISH_DIR"
mkdir -p "$PUBLISH_DIR/editions"
rsync -az --delete "$REPO_DIR/editions/" "$PUBLISH_DIR/editions/"
cp "$REPO_DIR/editions/latest.html" "$PUBLISH_DIR/index.html"

echo "Published current HTML from editions/latest.html"
