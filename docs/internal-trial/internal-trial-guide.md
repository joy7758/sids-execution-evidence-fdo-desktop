# Internal Trial Guide

Review Pack Desktop v0.1 is currently a macOS-only internal release. It supports one bounded workflow: selecting `bundle` / `receipt` / `summary` and generating a Review Pack.

## Current Scope

This build is intentionally narrow:

- macOS only
- internal release only
- one workflow only
- no cloud features
- no account or sign-in flow
- no model-running or provider-management workflow

This build should not be read as a promise that this line will be promoted
directly to GA.

## Who This Build Is For

This build is for internal trial users who need to:

- open an existing evidence export
- generate a Review Pack without using the command line
- review whether the app is clear, usable, and stable on macOS

## What You Need Before You Start

Prepare these three required files:

- `bundle`
- `receipt`
- `summary`

You may also provide these optional supporting files:

- `manifest`
- `public key`
- `runtime events`

You will also need:

- a macOS machine
- the packaged `Review Pack Desktop.app`
- a writable output folder for the generated Review Pack

## How To Launch The App

1. Open `Review Pack Desktop.app`.
2. If macOS asks for confirmation, use the normal internal-open path for this
   unsigned build.
3. The app should open in Chinese by default.
4. You can switch to English from the language toggle in the left panel.

## How To Generate A Review Pack

1. On the welcome screen, choose **Build Review Pack**.
2. On the inputs screen, select:
   - `bundle`
   - `receipt`
   - `summary`
3. Optionally add:
   - `manifest`
   - `public key`
   - `runtime events`
4. Choose an output directory.
5. Continue to the build screen.
6. Review the selected files.
7. Start the build.
8. Wait for the app to move to the result screen.

## What Output To Expect

After a successful build, the app should show:

- pack directory
- `index.json`
- `report.md`
- core files
- supporting files, if any were provided

The generated Review Pack should contain at least:

- `primary/bundle.json`
- `primary/receipt.json`
- `primary/summary.json`
- `review/report.md`
- `index.json`

Private key material should remain excluded by default.

## Known Limitations

- macOS only
- internal release only
- unsigned app
- unsigned zip archive
- no signing or notarization
- no Windows build
- no DMG polish
- no cloud, auth, or sync features
- no provider-running workflow

## How To Report Feedback

Please keep feedback focused on these areas only:

- install or launch problems
- Build -> Result flow problems
- Review Pack readability or clarity
- macOS compatibility issues

Use the internal feedback template:

- `docs/internal-trial/feedback-template.md`

When reporting an issue, include:

- what you tried to do
- what you expected
- what actually happened
- screenshots if helpful
- any generated output path that helps reproduction
