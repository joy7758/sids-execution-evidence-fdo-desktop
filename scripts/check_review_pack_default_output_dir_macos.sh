#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OVERRIDE_DIR="/private/tmp/agent-evidence-p4d-review-pack-override"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This check is macOS-only." >&2
  exit 1
fi

cd "$ROOT_DIR"

extract_json_field() {
  local json="$1"
  local field="$2"
  sed -E "s/.*\"${field}\":\"([^\"]+)\".*/\\1/" <<<"$json"
}

assert_not_tcc_sensitive() {
  local path="$1"

  case "$path" in
    "$HOME/Desktop"* | "$HOME/Documents"* | "$HOME/Downloads"* | "$HOME/Library/Mobile Documents"* | /private/tmp* | /tmp*)
      echo "Unsafe default Review Pack output directory: $path" >&2
      exit 1
      ;;
  esac

  case "$path" in
    *"/Library/Application Support/"*) ;;
    *)
      echo "Default Review Pack output directory is not app data: $path" >&2
      exit 1
      ;;
  esac
}

default_json="$(cargo run --quiet --manifest-path src-tauri/Cargo.toml -- --print-review-pack-output-dir)"
default_dir="$(extract_json_field "$default_json" "output_dir")"
default_source="$(extract_json_field "$default_json" "source")"

if [[ -z "$default_dir" || "$default_dir" == "$default_json" ]]; then
  echo "Could not parse default Review Pack output directory." >&2
  echo "$default_json" >&2
  exit 1
fi

if [[ "$default_source" != "app_data_dir" ]]; then
  echo "Unexpected CLI default source: $default_source" >&2
  exit 1
fi

assert_not_tcc_sensitive "$default_dir"
test -d "$default_dir"

rm -rf "$OVERRIDE_DIR"
override_json="$(REVIEW_PACK_OUTPUT_DIR="$OVERRIDE_DIR" cargo run --quiet --manifest-path src-tauri/Cargo.toml -- --print-review-pack-output-dir)"
override_dir="$(extract_json_field "$override_json" "output_dir")"
override_source="$(extract_json_field "$override_json" "source")"

if [[ "$override_dir" != "$OVERRIDE_DIR" ]]; then
  echo "Override directory mismatch: expected $OVERRIDE_DIR, got $override_dir" >&2
  exit 1
fi

if [[ "$override_source" != "env_override" ]]; then
  echo "Unexpected override source: $override_source" >&2
  exit 1
fi

test -d "$OVERRIDE_DIR"

echo "default: $default_dir"
echo "default_source: $default_source"
echo "override: $override_dir"
echo "override_source: $override_source"
