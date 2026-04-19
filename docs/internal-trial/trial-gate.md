# Internal Trial Gate

## 1. Scope

This gate applies only to the current `Review Pack Desktop v0.1` trial line.

Boundaries:

- macOS only
- internal release only
- one workflow only:
  select `bundle` / `receipt` / `summary` and generate a Review Pack
- no Windows
- no signing or notarization in this trial gate
- no schema or engine-contract changes in this trial gate

## 2. Success Criteria For Internal Trial

Internal trial can continue when most testers can do the following without
workarounds:

1. launch the packaged macOS app
2. select required inputs
3. move from Build to Result
4. generate a Review Pack with the expected output structure
5. understand the result well enough to locate:
   - pack directory
   - `index.json`
   - `report.md`

## 3. Blocker Issues

Treat any of the following as blockers:

- app does not launch on supported macOS trial machines
- Build -> Result flow fails for valid inputs
- generated pack is missing required files:
  - `primary/bundle.json`
  - `primary/receipt.json`
  - `primary/summary.json`
  - `review/report.md`
  - `index.json`
- packaged app cannot find or run the bundled sidecar
- valid trial runs include private key material by default
- repeated crash, freeze, or unrecoverable error in the main workflow

## 4. Acceptable Non-Blocking Issues

The following can be accepted during internal trial if the main workflow still
works:

- minor wording confusion
- small UI spacing issues
- non-critical readability polish requests
- minor path display rough edges that do not block understanding
- non-critical performance roughness such as slow startup, if the app still
  completes the workflow

## 5. Triage Categories

Use these categories during internal review:

- launch/install
- Build -> Result flow
- Review Pack readability
- macOS compatibility

## 6. What Requires Immediate Fix

Fix before wider internal distribution when feedback shows:

- any blocker issue
- one issue repeated by multiple testers in the same workflow step
- misleading output that makes the generated Review Pack hard to trust
- UI behavior that causes users to select the wrong file or wrong output folder

## 7. What Can Wait

The following can wait until after initial internal trial feedback is gathered:

- installer polish
- DMG polish
- startup speed tuning
- non-critical copy refinement
- visual polish that does not affect task completion

## 8. What Is Explicitly Out Of Scope

- Windows packaging
- signing
- notarization
- cloud, auth, or sync work
- provider-running UI
- new feature commitments
- schema changes
- engine-contract redesign

## 9. Decision Rules

### Continue Internal Trial

Continue distribution when:

- no blocker issues are open
- the bounded workflow works for current testers
- reported issues are mostly low or medium severity
- trust in generated output is intact

### Pause And Fix

Pause new distribution and fix first when:

- one blocker issue is confirmed
- multiple high-severity issues affect the same workflow step
- testers cannot reliably complete Build -> Result
- output correctness or trust is unclear

### Stop Distribution

Stop the current internal package from further sharing when:

- the packaged app is unstable across trial machines
- the generated output is materially wrong
- private key handling or artifact-boundary behavior regresses
- the current package creates confusion serious enough to invalidate feedback
