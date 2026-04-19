# Review Pack Desktop v0.1

## 1. Release Title and Scope

**Release title:** Review Pack Desktop v0.1 for macOS  
**Release type:** macOS internal release  
**Current scope:** macOS only

This release is the current internal desktop handoff for
`Review Pack Desktop v0.1`.

It is intentionally narrow:

- macOS only
- internal use only
- unsigned `.app`
- unsigned zip archive

## 2. Supported Workflow

This release supports one workflow only:

1. choose an exported `bundle`
2. choose a machine-readable `receipt`
3. choose a reviewer-facing `summary`
4. choose an output directory
5. generate one Review Pack

The desktop app does not run models or manage providers.

## 3. Included Artifacts

Current internal release artifacts:

- macOS app bundle
  - `src-tauri/target/release/bundle/macos/Review Pack Desktop.app`
- internal handoff archive
  - `dist/internal-macos/Review Pack Desktop-macos-internal.zip`

The app itself packages the local Review Pack engine sidecar used for:

- `ae-review-pack-engine`
- `build-review-pack`

## 4. Current Boundaries

The current product boundary remains stable:

- primary artifacts remain:
  - `bundle`
  - `receipt`
  - `summary`
- Review Pack remains a packaging/rendering layer above those artifacts
- supporting files remain supporting only
- private key remains excluded by default

This internal macOS release does not change the underlying artifact contract.

## 5. Known Limitations

- macOS only
- internal use only
- unsigned app
- unsigned zip archive
- not notarized
- host-architecture-specific sidecar
- no DMG packaging
- no installer polish

## 6. How To Rebuild the Internal Release

Use the repeatable internal release helper:

```bash
cd /Users/zhangbin/GitHub/agent-evidence-desktop
./scripts/build_macos_internal_release.sh
```

This helper performs:

1. sidecar staging
2. frontend build
3. Rust/Tauri config check
4. macOS `.app` build
5. zip archive creation

If the sidecar source artifact is not in the default adjacent repo location,
override it explicitly:

```bash
cd /Users/zhangbin/GitHub/agent-evidence-desktop
SOURCE_ARTIFACT=/path/to/ae-review-pack-engine \
  ./scripts/build_macos_internal_release.sh
```

## 7. How To Verify the Packaged App

Minimum verification for this internal macOS release:

1. open `Review Pack Desktop.app`
2. confirm default locale is `zh-CN`
3. switch to `en` and confirm the UI remains complete
4. choose:
   - `bundle`
   - `receipt`
   - `summary`
5. choose an output directory
6. generate one Review Pack
7. confirm the Result page shows:
   - pack directory
   - `index.json`
   - `report.md`
8. confirm generated output contains:
   - `primary/bundle.json`
   - `primary/receipt.json`
   - `primary/summary.json`
   - `review/report.md`
   - `index.json`
9. confirm private key is still excluded by default

## 8. Non-Goals / Deferred Items

- no Windows packaging
- no signing
- no notarization
- no DMG polish
- no new product scope
- no provider-running UI
- no auth, sync, or cloud features
- no schema changes
