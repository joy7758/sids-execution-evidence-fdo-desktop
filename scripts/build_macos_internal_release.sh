#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="Review Pack Desktop.app"
APP_BUNDLE_DIR="$ROOT_DIR/src-tauri/target/release/bundle/macos"
APP_PATH="$APP_BUNDLE_DIR/$APP_NAME"
ARCHIVE_DIR="$ROOT_DIR/dist/internal-macos"
ARCHIVE_NAME="${ARCHIVE_NAME:-Review Pack Desktop-macos-internal.zip}"
ARCHIVE_PATH="$ARCHIVE_DIR/$ARCHIVE_NAME"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This helper is for macOS internal release handoff only." >&2
  exit 1
fi

cd "$ROOT_DIR"

./scripts/stage_review_pack_engine_macos.sh
pnpm build
cargo check --manifest-path src-tauri/Cargo.toml
pnpm tauri build --bundles app

if [[ ! -d "$APP_PATH" ]]; then
  echo "Built .app was not found: $APP_PATH" >&2
  exit 1
fi

mkdir -p "$ARCHIVE_DIR"
rm -f "$ARCHIVE_PATH"

ditto -c -k --sequesterRsrc --keepParent "$APP_PATH" "$ARCHIVE_PATH"

echo "macOS internal release ready:"
echo "app: $APP_PATH"
echo "archive: $ARCHIVE_PATH"
