# Packaging Plan

## 1. Packaging Scope

This document defines the minimum packaging plan for `Review Pack Desktop v0.1`.

Current product scope remains intentionally narrow:

- one desktop app only
- one workflow only: build a Review Pack from existing artifacts
- no model-running UI
- no provider management
- no cloud, auth, or sync features

Current artifact boundary also remains unchanged:

- primary artifacts:
  - `bundle`
  - `receipt`
  - `summary`
- supporting files remain supporting only

This plan covers packaging strategy only. It does not implement packaging.

## 2. Current App / Runtime Assumptions

Current desktop runtime:

- Tauri v2
- React
- TypeScript
- local shell/process invocation through Tauri plugins

Current engine/runtime boundary:

- the desktop app does not generate evidence artifacts itself
- it calls one local engine command:
  - `ae-review-pack-engine build-review-pack`
- the engine currently lives in the separate `agent-evidence` repository

Current local development assumption:

- the engine is available on `PATH`

Packaged-app assumption for P1:

- packaged builds must not depend on the user having Python or the engine on
  `PATH`
- the engine must ship with the desktop app as a local bundled sidecar

## 3. Sidecar Bundling Plan

### Goal

Bundle one platform-specific local executable with the desktop app so the app
can call the Review Pack engine without requiring a separate Python install.

### Proposed sidecar shape

- sidecar logical name:
  - `ae-review-pack-engine`
- desktop app continues to call one command only:
  - `build-review-pack`

### Proposed build strategy

1. build the Python engine into a platform-specific executable outside this
   repository
2. stage that executable into this desktop repository as a Tauri external
   binary
3. switch packaged-app execution from `PATH` lookup to bundled sidecar lookup

### Recommended engine packaging direction

Use PyInstaller to create one platform-native engine executable per platform.

Lowest-risk preference:

- start with one-folder or one-executable packaging only for the engine
- do not redesign the engine contract
- do not introduce a local HTTP service

### Expected staging location

Stage platform binaries under a Tauri-managed binary path such as:

```text
src-tauri/binaries/
```

Expected logical configuration direction:

- Tauri `bundle.externalBin`
- one binary per target triple

### Boundary rules

- the sidecar stays local only
- no network API
- no hosted delivery
- no new artifact types
- no change to the `agent-evidence` artifact contract

## 4. macOS Build Path

### Target

First macOS packaging target:

- `.app` bundle

Optional second output after the `.app` is validated:

- `.dmg`

### Build host assumption

Build the macOS app on a Mac with the normal Tauri/macOS prerequisites already
available.

### macOS packaging sequence

1. prepare the packaged desktop frontend
2. prepare the macOS sidecar executable
3. stage the sidecar into the Tauri binary location
4. configure Tauri bundling for the macOS target
5. build the `.app`
6. verify the app runs without relying on shell `PATH`
7. only then consider generating a `.dmg`

### macOS-specific checks

- app launches outside `pnpm tauri dev`
- bundled sidecar can be executed from the app
- Build → Result path still works
- `Open Folder` and `Copy Path` still work
- no private key is introduced as a normal input

## 5. Windows Build Path

### Target

First Windows packaging target:

- setup executable (`NSIS`) or equivalent single installer path

Lower-risk recommendation for the first pass:

- choose one Windows installer line first
- do not try to validate every Windows installer flavor in the same round

### Build host assumption

Prefer building Windows artifacts on a Windows machine.

### Windows packaging sequence

1. prepare the Windows sidecar executable
2. stage the sidecar into the Tauri binary location
3. build the desktop app on Windows
4. validate the packaged app can find and run the bundled engine
5. validate the Review Pack flow with one known-good sample set

### Windows-specific checks

- app installs and launches
- bundled sidecar is present
- no Python preinstall is required
- Build → Result path works with the bundled engine
- output pack layout remains unchanged

## 6. Installer / Output Artifacts

The packaging phase should produce only the minimum customer-facing outputs.

### macOS

First-pass outputs:

- `Review Pack Desktop.app`

Optional next output:

- `Review Pack Desktop.dmg`

### Windows

First-pass output:

- one installer artifact for the chosen Windows installer line

### Internal packaging artifacts

Expected internal build materials may include:

- staged sidecar binary files
- Tauri bundle output directories
- platform-specific build logs

These internal packaging artifacts are not product features.

## 7. Signing / Notarization Status

Current status for `v0.1` packaging planning:

- code signing: not implemented
- notarization: not implemented
- store distribution: not implemented

Packaging plan for the first pass:

- produce unsigned internal packaging artifacts first
- validate functional installation and local execution first
- defer signing/notarization hardening until after packaging succeeds

Expected consequence:

- platform trust warnings may appear during internal testing

This is acceptable for the first bounded packaging pass.

## 8. Pre-Package vs Package-Time Checks

### Pre-package checks

These must already be green before packaging work begins:

- `docs/prepackage-smoke.md` manual checks
- desktop app launches in local dev mode
- locale switching works
- required/optional inputs work
- Build → Result flow works against the local engine
- result layout is readable

### Package-time checks

These are specific to packaged artifacts:

- packaged app launches outside dev mode
- packaged app does not depend on engine presence on shell `PATH`
- bundled sidecar is present and executable
- packaged app can generate a Review Pack from sample inputs
- result screen still shows:
  - `pack_dir`
  - `index_path`
  - `report_path`
  - core files
  - supporting files
- private key remains excluded by default

## 9. Lowest-Risk Execution Order

1. finalize this packaging plan
2. package the Python engine as a local sidecar executable
3. stage the sidecar for macOS only first
4. build and verify the macOS `.app`
5. only after macOS passes, stage and build the Windows installer line
6. only after both platform builds work, consider optional polish such as DMG

Why this order:

- it keeps the first packaging round narrow
- it avoids cross-platform packaging noise too early
- it validates the sidecar integration before installer polish

## 10. Explicit Non-Goals

This plan does not include:

- new product scope
- provider-running UI
- cloud/auth/sync features
- schema changes
- artifact contract changes
- installer branding polish
- signing/notarization implementation
- store publishing
- hosted delivery
- cross-repo redesign
