# Internal Feedback Template

Use this template for the current `Review Pack Desktop v0.1` internal trial.

Scope reminder:

- macOS only
- internal release only
- one workflow only:
  select `bundle` / `receipt` / `summary` and generate a Review Pack

---

## 1. Tester Name / Date

- Tester name:
- Date:

## 2. macOS Version

- macOS version:
- device type, if relevant:

## 3. App Version / Build Reference

- app name: `Review Pack Desktop`
- app version / build reference:
- source artifact used, if known:

## 4. Area

Choose one:

- launch/install
- Build -> Result flow
- Review Pack readability
- macOS compatibility

## 5. What Was Attempted

Describe the exact action you took.

Examples:

- opened the app
- selected `bundle`, `receipt`, and `summary`
- generated a Review Pack
- reviewed the output files

## 6. Expected Result

Describe what you expected to happen.

## 7. Actual Result

Describe what actually happened.

## 8. Severity

Choose one:

- blocker
- high
- medium
- low

## 9. Screenshot / Evidence Note

Include any useful evidence:

- screenshot
- short screen recording
- visible error message
- path shown in the app

## 10. Generated Artifact Note

If the app generated output, note:

- output directory:
- whether `index.json` was present:
- whether `report.md` was present:
- whether `primary/bundle.json` was present:
- whether `primary/receipt.json` was present:
- whether `primary/summary.json` was present:

## 11. Reproduction Steps

List the shortest steps someone else can follow to reproduce the issue.

Example format:

1. Open `Review Pack Desktop.app`
2. Choose **Build Review Pack**
3. Select the same input files
4. Choose the same output directory
5. Click the same action
6. Observe the issue
