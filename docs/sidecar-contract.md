# Sidecar Contract

## 1. Command Overview

The desktop shell will call one local executable only:

- executable: `ae-review-pack-engine`
- command: `build-review-pack`

Example invocation:

```bash
ae-review-pack-engine build-review-pack \
  --bundle-path "/path/to/langchain-evidence.bundle.json" \
  --receipt-path "/path/to/receipt.json" \
  --summary-path "/path/to/summary.json" \
  --manifest-path "/path/to/langchain-evidence.manifest.json" \
  --public-key-path "/path/to/manifest-public.pem" \
  --runtime-events-path "/path/to/runtime-events.jsonl" \
  --output-dir "/path/to/review-pack"
```

The desktop app remains a Review Pack builder only. It does not run models, manage providers, or expose a network service.

## 2. Required Arguments

The minimum required arguments are:

- `--bundle-path`
- `--receipt-path`
- `--summary-path`
- `--output-dir`

These required arguments map directly to the current bounded product surface:

- `bundle`
- `receipt`
- `summary`
- output location for the generated Review Pack

If any required argument is missing, the command must fail without producing a partial pack.

## 3. Optional Supporting Arguments

Optional supporting arguments are:

- `--manifest-path`
- `--public-key-path`
- `--runtime-events-path`
- `--include-private-key`

Supporting files remain supporting only. They must not become new primary artifacts.

`--include-private-key` is explicit opt-in only:

- the desktop app must not expose private key input as a normal default field
- the desktop app should not send this flag in `v0.1`
- if a later workflow sends it, the engine must still treat private-key handling as exceptional and non-default

## 4. Success JSON Contract

On success, the sidecar must write one machine-readable JSON object to stdout:

```json
{
  "ok": true,
  "pack_dir": "/path/to/review-pack",
  "index_path": "/path/to/review-pack/index.json",
  "report_path": "/path/to/review-pack/review/report.md",
  "primary_files": {
    "bundle": "/path/to/review-pack/primary/bundle.json",
    "receipt": "/path/to/review-pack/primary/receipt.json",
    "summary": "/path/to/review-pack/primary/summary.json"
  },
  "supporting_files": {
    "manifest": "/path/to/review-pack/supporting/langchain-evidence.manifest.json",
    "public_key": "/path/to/review-pack/supporting/manifest-public.pem",
    "runtime_events": "/path/to/review-pack/supporting/runtime-events.jsonl"
  }
}
```

Success contract rules:

- `ok` must be `true`
- `pack_dir`, `index_path`, and `report_path` must always be present
- `primary_files` must always contain only:
  - `bundle`
  - `receipt`
  - `summary`
- `supporting_files` may be empty or partial
- `index.json` remains a pack index only
- `report.md` remains a renderer output only

## 5. Error JSON Contract

On failure, the sidecar must return one machine-readable JSON object:

```json
{
  "ok": false,
  "error_code": "AE_REVIEW_PACK_VALIDATION_FAILED",
  "message": "The receipt file is missing.",
  "details": {
    "field": "receipt_path"
  }
}
```

Error contract rules:

- `ok` must be `false`
- `error_code` must always be present
- `message` must always be present and safe to show in the desktop UI
- `details` is optional and may include field names, paths, or structured context

Recommended error-code categories:

- `AE_REVIEW_PACK_VALIDATION_FAILED`
- `AE_REVIEW_PACK_INPUT_READ_FAILED`
- `AE_REVIEW_PACK_ASSEMBLY_FAILED`
- `AE_REVIEW_PACK_RENDER_FAILED`
- `AE_REVIEW_PACK_WRITE_FAILED`
- `AE_REVIEW_PACK_UNEXPECTED_ERROR`

## 6. Exit Code Rules

The sidecar should use a small, stable exit-code surface:

- `0`: success
- `2`: validation failure
- `1`: execution failure

Interpretation:

- validation failure means the command shape was accepted, but required inputs were missing, unreadable, or incompatible with the bounded Review Pack contract
- execution failure means the command began execution but could not complete assembly, rendering, or output writing

## 7. Desktop Display Rules

### Build page while pending

While the sidecar is running, the desktop app should show:

- a pending/building state
- the selected required inputs
- the selected optional supporting files, if any
- the chosen output directory
- no synthesized verification facts

### Result page on success

On success, the desktop app should show:

- `pack_dir`
- `index_path`
- `report_path`
- primary output references from `primary_files`
- optional supporting output references from `supporting_files`
- actions such as:
  - Open Folder
  - Copy Path

### Result page on failure

On failure, the desktop app should show:

- a failure state
- `error_code`
- `message`
- any safe `details` fields that help the user fix the problem

The desktop UI must not invent new machine-readable fields beyond the sidecar response.

## 8. Security and Boundary Rules

The contract must preserve the current bounded product line:

- primary artifacts remain:
  - `bundle`
  - `receipt`
  - `summary`
- supporting files remain supporting only
- private key is excluded by default
- no schema changes
- no hosted delivery
- no network API
- no provider-running behavior

Boundary rules:

- machine-readable verification facts remain in `receipt`
- reviewer-facing orientation remains in `summary`
- Review Pack layout and rendering outputs must not flow back into canonical schema

## 9. Non-Goals

This contract does not define:

- a CLI redesign
- auth
- sync
- cloud or hosted delivery
- a network service
- provider-running behavior
- new artifact types
- schema expansion

This is a thin local contract only, meant to let the desktop shell call one bounded Review Pack engine.
