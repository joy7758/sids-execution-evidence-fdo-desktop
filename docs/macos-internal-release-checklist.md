# macOS Internal Release Checklist

## 1. Scope

This checklist defines the current internal handoff path for
`Review Pack Desktop v0.1`.

Current scope is intentionally narrow:

- macOS only
- internal distribution only
- unsigned `.app`
- unsigned archive

The current desktop product remains:

- Review Pack Desktop only
- one workflow only: build a Review Pack from
  `bundle`, `receipt`, and `summary`

## 2. Prerequisites

Before creating an internal handoff build, confirm:

- macOS host machine
- Xcode Command Line Tools available
- `pnpm` available
- Rust/Tauri desktop build prerequisites available
- adjacent `agent-evidence` repository already produced the current sidecar
  source artifact

Expected sidecar source artifact:

```text
../agent-evidence/dist/review-pack-engine-macos/ae-review-pack-engine
```

## 3. Stage the Sidecar

The desktop app no longer relies on a user `PATH` entry for
`ae-review-pack-engine`.

Stage the macOS sidecar first:

```bash
cd /Users/zhangbin/GitHub/agent-evidence-desktop
./scripts/stage_review_pack_engine_macos.sh
```

Default staged output:

```text
src-tauri/binaries/ae-review-pack-engine-aarch64-apple-darwin
```

If the sidecar source artifact lives elsewhere, override it explicitly:

```bash
SOURCE_ARTIFACT=/path/to/ae-review-pack-engine \
  ./scripts/stage_review_pack_engine_macos.sh
```

## 4. Build the `.app`

For a repeatable internal release handoff, use the helper script:

```bash
cd /Users/zhangbin/GitHub/agent-evidence-desktop
./scripts/build_macos_internal_release.sh
```

This helper performs:

1. sidecar staging
2. frontend build
3. Rust/Tauri config check
4. macOS `.app` build
5. internal archive creation

## 5. Verify the Packaged App Still Runs

After the helper finishes, run one packaged-app verification pass before
handing the build to another internal user.

Minimum verification:

1. open the built `.app`
2. confirm default locale is `zh-CN`
3. select:
   - `bundle`
   - `receipt`
   - `summary`
4. choose an output directory
5. generate one Review Pack
6. confirm Result page shows:
   - pack directory
   - `index.json`
   - `report.md`
7. confirm private key remains excluded by default

## 6. Create the Internal Archive

The helper script creates one internal archive automatically.

Archive format:

- zip of the built `.app`

Packaging command used by the helper:

```bash
ditto -c -k --sequesterRsrc --keepParent \
  "src-tauri/target/release/bundle/macos/Review Pack Desktop.app" \
  "dist/internal-macos/Review Pack Desktop-macos-internal.zip"
```

## 7. Expected Output Locations

Built macOS app:

```text
src-tauri/target/release/bundle/macos/Review Pack Desktop.app
```

Internal handoff archive:

```text
dist/internal-macos/Review Pack Desktop-macos-internal.zip
```

## 8. Current Limitations

- macOS only
- internal use only
- host-architecture-specific sidecar
- unsigned app
- unsigned archive
- not notarized
- no installer polish
- no DMG packaging in this step

## 9. Explicit Non-Goals

- no Windows packaging
- no code signing
- no notarization
- no new product scope
- no provider-running UI
- no auth, sync, or cloud features
- no schema changes
- no artifact-contract redesign
