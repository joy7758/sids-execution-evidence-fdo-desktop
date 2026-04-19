# D5 Manual Verification

## Preconditions

- `agent-evidence-desktop` is running locally through `pnpm tauri dev`
- `ae-review-pack-engine` is available on the current shell `PATH`
- you already have one valid local set of:
  - `bundle`
  - `receipt`
  - `summary`

If the engine is not already on `PATH`, install or expose it from the local
`agent-evidence` repository before launching the desktop app.

## Success-path check

1. Open the desktop app.
2. Keep the default language at `zh-CN`.
3. Go to `输入文件`.
4. Select:
   - `bundle`
   - `receipt`
   - `summary`
   - output directory
5. Optionally add:
   - manifest
   - public key
   - runtime events
6. Continue to `生成审阅包`.
7. Confirm the preflight summary shows the selected files and output directory.
8. Click `生成审阅包`.
9. Confirm the Build page enters a running state.
10. Confirm the app navigates to the Result page after success.
11. Confirm the Result page shows:
    - `pack_dir`
    - `index_path`
    - `report_path`
    - primary files
    - supporting files
12. Click `打开文件夹`.
13. Click `复制路径`.

## Failure-path check

### Engine not found

1. Launch the desktop app from a shell that does not expose `ae-review-pack-engine`.
2. Run the same flow again.
3. Confirm the Build page shows an engine-not-found error.
4. Confirm a retry path is visible.
5. Confirm a back-to-inputs path is visible.
6. Confirm raw error details remain inspectable.

### Validation or execution failure

1. Use an intentionally invalid input set.
2. Click `生成审阅包`.
3. Confirm the Build page shows a failure state instead of crashing.
4. Confirm `error_code`, `message`, and raw details remain visible.

## Boundary checks

- private key is not shown as a normal input field
- private key is not sent unless a future explicit opt-in path is added
- no network/API behavior is introduced
- no provider-running UI is introduced
