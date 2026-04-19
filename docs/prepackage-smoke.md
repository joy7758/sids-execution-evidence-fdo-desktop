# Prepackage Smoke

## 1. Scope

This checklist defines the exact manual verification required before attempting
any Windows or macOS packaging for `Review Pack Desktop v0.1`.

Current bounded product scope:

- one desktop app only
- one workflow only: build a Review Pack from existing artifacts
- primary artifacts remain:
  - `bundle`
  - `receipt`
  - `summary`
- supporting files remain supporting only

This smoke is for the current local desktop flow only. It is not a packaging,
installer, or distribution checklist.

## 2. Prerequisites

Before running this smoke:

- `agent-evidence-desktop` dependencies are installed
- `pnpm tauri dev` can launch the desktop shell locally
- `ae-review-pack-engine` is available on the shell `PATH`
- one valid local input set exists for:
  - `bundle`
  - `receipt`
  - `summary`

Recommended local environment:

- macOS or Windows desktop environment with Tauri development prerequisites
- local shell with access to the adjacent `agent-evidence` engine repository

## 3. Sample Input Preparation

Use one known-good sample set from the local `agent-evidence` repository.

Example preparation flow:

```bash
cd /Users/zhangbin/GitHub/agent-evidence
source .venv/bin/activate

OUTPUT_DIR=/tmp/agent-evidence-desktop-sample
python examples/langchain_minimal_evidence.py --output-dir "$OUTPUT_DIR"

./.venv/bin/agent-evidence verify-export \
  --bundle "$OUTPUT_DIR/langchain-evidence.bundle.json" \
  --public-key "$OUTPUT_DIR/manifest-public.pem" \
  > "$OUTPUT_DIR/receipt.json"
```

Expected sample inputs:

- required:
  - `$OUTPUT_DIR/langchain-evidence.bundle.json`
  - `$OUTPUT_DIR/receipt.json`
  - `$OUTPUT_DIR/summary.json`
- optional supporting files:
  - `$OUTPUT_DIR/langchain-evidence.manifest.json`
  - `$OUTPUT_DIR/manifest-public.pem`
  - `$OUTPUT_DIR/runtime-events.jsonl`

Do not prepare or use a private key as a normal desktop input.

## 4. Local Dev Run Steps

Start the desktop shell in local development mode:

```bash
cd /Users/zhangbin/GitHub/agent-evidence-desktop
PATH="/Users/zhangbin/GitHub/agent-evidence/.venv/bin:$PATH" pnpm tauri dev
```

Then run the desktop flow:

1. Confirm the app launches successfully.
2. Confirm the default UI language is `zh-CN`.
3. Switch to `EN`.
4. Confirm the English UI is complete and readable.
5. Switch back to `zh-CN`.
6. On the Welcome page, click `开始生成审阅包`.

## 5. Smoke Checklist

Use this checklist in order.

### Launch and locale

- [ ] App launches successfully in local dev mode.
- [ ] Default locale is `zh-CN`.
- [ ] English locale is available and complete.
- [ ] Switching between `zh-CN` and `EN` does not break layout or state.

### Inputs page

- [ ] User can select required inputs:
  - [ ] `bundle`
  - [ ] `receipt`
  - [ ] `summary`
- [ ] User can select optional supporting files:
  - [ ] `manifest`
  - [ ] `public key`
  - [ ] `runtime events`
- [ ] User can select an output directory.
- [ ] Validation blocks progress until all required inputs and the output
      directory are present.
- [ ] Validation messages appear inline rather than as disruptive modal errors.
- [ ] Private key does not appear as a normal input field.

### Build page

- [ ] Build page shows a read-only preflight summary.
- [ ] Preflight summary includes:
  - [ ] required files
  - [ ] optional supporting files, when present
  - [ ] output directory
- [ ] Build action triggers the local engine:
  - [ ] `ae-review-pack-engine build-review-pack`
- [ ] Build page shows a clear running state.
- [ ] User can retry after failure.
- [ ] User can go back to modify inputs.

### Result page

- [ ] On success, Result page shows:
  - [ ] `pack_dir`
  - [ ] `index_path`
  - [ ] `report_path`
  - [ ] core files
  - [ ] supporting files
- [ ] `Open Folder` works.
- [ ] `Copy Path` works.
- [ ] Long paths remain readable and not vertically collapsed.

### Artifact boundary checks

- [ ] Private key is excluded by default.
- [ ] Generated pack contains at least:
  - [ ] `primary/bundle.json`
  - [ ] `primary/receipt.json`
  - [ ] `primary/summary.json`
  - [ ] `review/report.md`
  - [ ] `index.json`

## 6. Expected Output Layout

For a successful run, the output directory should contain at least:

```text
<pack_dir>/
├── index.json
├── primary/
│   ├── bundle.json
│   ├── receipt.json
│   └── summary.json
├── review/
│   └── report.md
└── supporting/
    ├── manifest-public.pem        (optional)
    ├── runtime-events.jsonl       (optional)
    └── *.manifest.json            (optional)
```

Layout rules:

- `index.json` is a pack index only
- `report.md` is a renderer output only
- supporting files may be partial or absent
- private key must not appear unless a future explicit opt-in path is tested

## 7. Failure Handling Notes

If the smoke fails, classify the failure before attempting packaging.

### Engine not found

Typical signs:

- Build page enters a failure state immediately
- error state indicates the local engine was not found

Checks:

- confirm `ae-review-pack-engine` is on `PATH`
- relaunch the desktop app from the correct shell

### Validation failure

Typical signs:

- inline errors remain on Inputs
- Build page blocks progress

Checks:

- confirm `bundle`, `receipt`, `summary`, and `output directory` are all set
- confirm paths point to real files/directories

### Execution failure

Typical signs:

- Build page reaches the engine call
- Result is failure rather than success
- machine-readable error details are available

Checks:

- inspect engine error details
- confirm sample inputs are valid
- confirm the output directory is writable

Packaging must not start while any of the above failures remain unresolved.

## 8. Explicit Non-Goals Before Packaging

This smoke does not cover:

- sidecar packaging or bundling
- installer creation
- Windows signing/notarization
- macOS signing/notarization
- settings, auth, sync, or cloud features
- provider-running UI
- schema changes
- new artifact types
- any redesign of the bounded `bundle / receipt / summary` contract
