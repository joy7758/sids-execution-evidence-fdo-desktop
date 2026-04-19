const en = {
  shell: {
    badge: "Review Pack Desktop v0.1",
    title: "Review Pack Desktop",
    subtitle: "No command line. Just turn the current artifact set into one review pack.",
    languageLabel: "Language",
    locale: {
      zhCN: "中文",
      en: "EN",
    },
    stepNavigationLabel: "Page navigation",
  },
  steps: {
    welcome: {
      label: "Welcome",
      hint: "Start with the one job this customer app should solve.",
    },
    inputs: {
      label: "Inputs",
      hint: "Choose bundle, receipt, summary, and an output folder.",
    },
    build: {
      label: "Build",
      hint: "Run the local engine and track idle, running, success, and failure states.",
    },
    result: {
      label: "Result",
      hint: "Review the pack directory, the index file, and the review report.",
    },
  },
  common: {
    required: "Required",
    optional: "Optional",
    selectFile: "Choose file",
    replaceFile: "Replace file",
    selectFolder: "Choose folder",
    replaceFolder: "Replace folder",
    clear: "Clear",
    notSelected: "No file selected yet",
    notProvided: "Not attached this time",
    retry: "Retry",
  },
  welcome: {
    kicker: "Customer desktop path",
    title: "Turn the current artifact set into one review pack",
    description:
      "This desktop shell does one job only: help customers choose an existing bundle, receipt, and summary without touching the command line, then move into a stable Review Pack flow.",
    primaryAction: "Build Review Pack",
    secondaryAction: "View result page",
    cards: {
      input: {
        title: "Keep input simple",
        body: "Only bundle, receipt, and summary are primary inputs. Manifest, public key, and runtime events stay optional supporting files.",
      },
      output: {
        title: "Keep the output boundary stable",
        body: "The primary outputs are still bundle, receipt, and summary. Review Pack stays on top of that contract.",
      },
      boundary: {
        title: "Do not turn this into a platform",
        body: "This version does not run models, manage providers, or add cloud sync. It only shapes the customer-facing desktop shell.",
      },
    },
  },
  inputs: {
    kicker: "Input setup",
    title: "Choose the files needed for Review Pack",
    description:
      "D2 upgrades the Inputs page into a real desktop form: choose files, choose an output folder, and finish validation before continuing.",
    requiredStatus: "{0}/{1} required files ready",
    optionalStatus: "{0} optional files attached",
    formStatusReady: "Ready for build",
    formStatusBlocked: "Required items still missing",
    requiredSectionTitle: "Required files",
    requiredSectionDescription:
      "These three files define the primary input surface for the customer desktop v0.1.",
    optionalSectionTitle: "Optional supporting files",
    optionalSectionDescription:
      "Supporting files stay supporting and do not become a new primary output line.",
    outputSectionTitle: "Output directory",
    outputSectionDescription:
      "Before Review Pack is generated, choose the local folder where it should be written.",
    outputLabel: "Review pack output directory",
    outputHint: "Choose where the review pack will be saved.",
    outputPlaceholder: "No output directory selected yet",
    primaryAction: "Continue to build",
    secondaryAction: "Back to welcome",
    buildBlockedNotice:
      "Choose bundle, receipt, summary, and an output directory before entering the build step.",
    validationHelp:
      "Complete every required field before continuing. Each missing item is shown inline below its field.",
    validation: {
      bundleRequired: "Choose the evidence package file (bundle).",
      receiptRequired: "Choose the verification result file (receipt).",
      summaryRequired: "Choose the summary file (summary).",
      outputDirRequired: "Choose where the review pack will be saved.",
    },
    fields: {
      bundle: {
        label: "Evidence package file (bundle)",
        hint: "The exported evidence package file. This is one of the core inputs.",
      },
      receipt: {
        label: "Verification result file (receipt)",
        hint: "The machine-readable verification result file. It carries the verification facts.",
      },
      summary: {
        label: "Summary file (summary)",
        hint: "The reviewer-facing summary file. It carries the current result overview.",
      },
      manifest: {
        label: "Manifest file (manifest)",
        hint: "Optional supporting file for export-time manifest details.",
      },
      publicKey: {
        label: "Public key file (public key)",
        hint: "Optional supporting file for offline verification context.",
      },
      runtimeEvents: {
        label: "Runtime events file (runtime events)",
        hint: "Optional supporting file for deeper runtime diagnostics.",
      },
    },
  },
  build: {
    kicker: "Preflight review",
    title: "Review the inputs, then send them to the local engine",
    description:
      "D5 wires this page to the local sidecar. Review the preflight summary, then run the bounded Review Pack build.",
    statusIdle: "Ready to build",
    statusRunning: "Building now",
    statusSuccess: "Build succeeded",
    statusFailure: "Build failed",
    primaryActionIdle: "Generate Review Pack",
    primaryActionRunning: "Generating Review Pack…",
    primaryActionRetry: "Retry build",
    secondaryAction: "Back to inputs",
    runningCallout:
      "The desktop app is calling the local Review Pack engine now. Keep this window open until the result returns.",
    failure: {
      title: "This build did not complete",
      detailsTitle: "Machine-readable error details",
      engineNotFound:
        "The Review Pack engine was not found on this machine. Make sure `ae-review-pack-engine` is installed and available on the current path.",
      permissionDenied:
        "The desktop shell was not allowed to start the local Review Pack engine. Check the local install and desktop permissions.",
      validation:
        "The local engine rejected the selected files or output directory. Fix the inputs and try again.",
      execution:
        "The local engine started, but the review pack could not be assembled or written. Check the error details and retry.",
      unexpected:
        "The local engine returned an unexpected result. Check the error details, then go back to the input step if needed.",
    },
    cards: {
      review: {
        title: "Input review",
        body: "Bundle, receipt, summary, and the output directory have passed the current stage validation.",
        stateReady: "Ready",
        stateLocked: "Running",
        stateConfirmed: "Confirmed",
        stateNeedsAttention: "Needs attention",
      },
      engine: {
        title: "Local engine",
        body: "The desktop shell calls `ae-review-pack-engine build-review-pack` and returns the result into this flow.",
        stateWaiting: "Waiting",
        stateRunning: "Running",
        stateReady: "Finished",
        stateFailed: "Failed",
      },
      result: {
        title: "Result slots",
        body: "On success, the desktop app moves into the Result page and shows pack_dir, index.json, and report.md.",
        stateReserved: "Reserved",
        statePreparing: "Preparing",
        stateReady: "Ready to review",
        stateBlocked: "Not produced",
      },
    },
    summary: {
      requiredFiles: "Required files: {0}",
      optionalFiles: "Optional supporting files: {0}",
      outputDirectory: "Output directory: selected",
    },
    preflight: {
      requiredTitle: "Required inputs",
      requiredDescription:
        "These are the three primary files that will be handed to the local engine.",
      optionalTitle: "Optional supporting files",
      optionalDescription:
        "This shows whether manifest, public key, and runtime events were attached for this run.",
      outputTitle: "Output directory",
      outputDescription:
        "This is the local folder where Review Pack will be written for this build.",
    },
  },
  result: {
    kicker: "Build result",
    statusEmpty: "No result yet",
    statusSuccess: "Build succeeded",
    statusFailure: "Build failed",
    emptyTitle: "Run one review-pack build first",
    emptyDescription:
      "There is no generated result to show yet. Go back to the Build page, run the local engine once, then return here.",
    successTitle: "The review pack is ready",
    successDescription:
      "This build returned a stable result. You can open the output folder or copy the pack path for the next handoff.",
    failureTitle: "The local engine returned a failure",
    failureDetailsTitle: "Failure details",
    errorCodeLabel: "Error code",
    errorMessageLabel: "Error message",
    rawDetailsTitle: "Raw error details",
    inventoryTitle: "Current input summary",
    primaryFilesTitle: "Primary output files",
    supportingFilesTitle: "Supporting files",
    primaryFiles: {
      bundle: "Evidence package file (bundle)",
      receipt: "Verification result file (receipt)",
      summary: "Summary file (summary)",
    },
    optionalNotIncluded: "Not attached this time",
    placeholderOutputDirectory: "~/Documents/review-pack-output",
    openFolderAction: "Open Folder",
    copyPathAction: "Copy Path",
    openFolderSuccess: "Tried to open the review-pack folder.",
    openFolderFailed:
      "The review-pack folder could not be opened right now. Make sure the local output still exists.",
    copyPathSuccess: "Copied the review-pack folder path.",
    copyPathFailed: "The path could not be copied. Try again.",
    goToBuildAction: "Back to build",
    cards: {
      packDir: {
        title: "Review pack directory",
        body: "This shows the stable pack directory returned by the current build.",
      },
      index: {
        title: "Index file (index.json)",
        body: "This shows the pack-index path. It remains a pack index, not a new primary artifact.",
      },
      report: {
        title: "Review report (report.md)",
        body: "This shows the review-report path. Taxonomy and explanation still belong to the renderer layer only.",
      },
    },
  },
} as const;

export default en;
