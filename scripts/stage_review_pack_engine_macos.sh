#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_TRIPLE="$(rustc --print host-tuple 2>/dev/null || rustc -Vv | grep host | cut -f2 -d' ')"
SOURCE_ARTIFACT="${SOURCE_ARTIFACT:-$ROOT_DIR/../agent-evidence/dist/review-pack-engine-macos/ae-review-pack-engine}"
STAGING_DIR="$ROOT_DIR/src-tauri/binaries"
STAGED_ARTIFACT="$STAGING_DIR/ae-review-pack-engine-$TARGET_TRIPLE"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This staging helper is for macOS only." >&2
  exit 1
fi

if [[ -z "$TARGET_TRIPLE" ]]; then
  echo "Could not determine Rust target triple." >&2
  exit 1
fi

if [[ ! -f "$SOURCE_ARTIFACT" ]]; then
  echo "Sidecar source artifact was not found: $SOURCE_ARTIFACT" >&2
  echo "Build it first from the adjacent agent-evidence repository." >&2
  exit 1
fi

mkdir -p "$STAGING_DIR"
cp "$SOURCE_ARTIFACT" "$STAGED_ARTIFACT"
chmod +x "$STAGED_ARTIFACT"

echo "Staged bundled sidecar:"
echo "$STAGED_ARTIFACT"
