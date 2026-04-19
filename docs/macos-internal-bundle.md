# macOS Internal Bundle

## Purpose

This document defines the first internal macOS `.app` bundling path for
`Review Pack Desktop v0.1` using a bundled local sidecar.

This path is internal only:

- unsigned
- not notarized
- macOS only

## Sidecar staging

The desktop app no longer assumes `ae-review-pack-engine` is available on
`PATH`.

Before building the macOS app, stage the sidecar binary into the desktop
repository:

```bash
cd /Users/zhangbin/GitHub/agent-evidence-desktop
./scripts/stage_review_pack_engine_macos.sh
```

Default source artifact:

```text
../agent-evidence/dist/review-pack-engine-macos/ae-review-pack-engine
```

Default staged output:

```text
src-tauri/binaries/ae-review-pack-engine-aarch64-apple-darwin
```

If the sidecar artifact lives elsewhere, override the source path:

```bash
SOURCE_ARTIFACT=/path/to/ae-review-pack-engine \
  ./scripts/stage_review_pack_engine_macos.sh
```

## Build the `.app`

After staging the sidecar:

```bash
cd /Users/zhangbin/GitHub/agent-evidence-desktop
pnpm build
cargo check --manifest-path src-tauri/Cargo.toml
pnpm tauri build --bundles app
```

Convenience path:

```bash
pnpm run build:macos-internal
```

## Expected output location

Expected internal `.app` output:

```text
src-tauri/target/release/bundle/macos/Review Pack Desktop.app
```

## Runtime behavior

Current sidecar resolution direction:

- Tauri bundles `binaries/ae-review-pack-engine`
- frontend calls the sidecar through Tauri shell sidecar execution
- the app does not rely on a user shell `PATH` entry for the engine

Current product flow remains unchanged:

- select `bundle`
- select `receipt`
- select `summary`
- choose output directory
- generate Review Pack

## Current limitations

- macOS only
- unsigned
- not notarized
- no Windows packaging in this step
- no installer polish
- no packaged-app manual double-click runtime verification yet in this patch
