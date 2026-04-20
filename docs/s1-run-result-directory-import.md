# S1 Run Result Directory Import

## Scope

S1 changes the default desktop input path from manual three-file selection to:

1. import one run result directory
2. automatically detect the evidence package, verification receipt, and summary
3. keep manual file selection available only as **Advanced manual selection**

This step does not change the Review Pack sidecar contract, the Review Pack output
layout, or the current macOS-only internal scope.

## Prepare a complete run result directory

Prepare one directory that contains at least:

- `langchain-evidence.bundle.json` or another `*bundle*.json` file
- `receipt.json` or another `*receipt*.json` file
- `summary.json` or another `*summary*.json` file

Optional supporting files may also be present:

- `*manifest*.json`
- `*public*.pem`
- `runtime-events.jsonl`

Private keys are out of scope for S1. Do not place private keys into the normal
desktop input flow.

## Test automatic detection

1. Launch the desktop app in local development mode.
2. Go to the Inputs page.
3. Confirm the default mode is **Import Run Result Directory**.
4. Select a directory that contains a complete run result.
5. Confirm the app automatically detects:
   - evidence package file
   - verification receipt file
   - summary file
6. If supporting files are present, confirm the app also detects:
   - manifest
   - public key
   - runtime events
7. Confirm the primary continue action becomes available only after required
   files and the output directory are present.

## Test missing receipt detection

1. Prepare a second directory that contains:
   - bundle
   - summary
   - no receipt
2. Import that directory.
3. Confirm the app shows an incomplete detection state.
4. Confirm the receipt field is shown as missing with an inline error.
5. Confirm the continue action remains disabled.

## Test correction via Advanced manual selection

1. From an incomplete detection state, switch to **Advanced manual selection**.
2. Confirm the detected directory paths are carried into the manual form where
   available.
3. Manually select the missing receipt file.
4. Confirm the manual form now has:
   - bundle
   - receipt
   - summary
   - output directory
5. Confirm the continue action becomes available once the missing path is fixed.

## Test Build -> Result after directory import

1. Import a complete run result directory.
2. Choose an output directory.
3. Continue to the Build page.
4. Confirm the preflight summary shows:
   - selected run result directory
   - evidence package file
   - verification receipt file
   - summary file
   - optional supporting files
   - output directory
5. Run the build.
6. Confirm the app reaches the Result page with the existing success behavior
   unchanged.

## Confirm private key remains excluded by default

1. Confirm the desktop UI does not present a normal private-key input field.
2. Confirm automatic directory detection does not identify private keys.
3. Confirm the sidecar invocation remains limited to:
   - bundle path
   - receipt path
   - summary path
   - output directory
   - optional manifest path
   - optional public key path
   - optional runtime events path

## Explicit non-goals

- no Windows work
- no signing or notarization
- no cloud, auth, sync, or provider-running features
- no changes to the Review Pack JSON contract
- no changes to Review Pack output layout
