const en = {
  shell: {
    badge: "Review Pack Desktop v0.1",
    title: "Review Pack Desktop",
    subtitle: "A desktop entry point for run results, evidence status, and review delivery.",
    languageLabel: "Language",
    locale: {
      zhCN: "中文",
      en: "EN",
    },
    stepNavigationLabel: "Page navigation",
  },
  steps: {
    welcome: {
      label: "Monitoring home",
      hint: "Start by checking whether the latest usable run result was found.",
    },
    inputs: {
      label: "Import results",
      hint: "Import one run result directory and detect the core files automatically.",
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
    kicker: "Run inbox",
    title: "Agent Run Monitoring",
    description:
      "Start by checking whether the app has already found the latest usable run result. Only when nothing usable is found, or detection stays incomplete, should users correct paths manually.",
    actions: {
      useLatest: "Use latest run result",
      primaryFound: "Generate Review Pack",
      primaryImport: "Import run result",
      viewDetails: "View details",
      hideDetails: "Hide details",
      chooseDirectory: "Choose run result directory",
      advancedManual: "Advanced: choose files manually",
    },
    discovery: {
      statusLoading: "Checking the inbox",
      statusFound: "Latest run result found",
      statusEmpty: "No usable run result found",
      statusMissing: "Run inbox not found yet",
      statusFailed: "Automatic discovery failed",
      loadingTitle: "Checking local run results",
      loadingDescription:
        "The app is checking the default inbox to see whether a complete recent run result is available.",
      foundTitle: "Latest run result found",
      foundDescription:
        "The app automatically detected a local run result and it is ready for Review Pack generation.",
      emptyTitle: "No usable run result found",
      emptyDescription:
        "Choose a run result directory now, or come back later after a new run result has been recorded.",
      emptyDescriptionWithCount:
        "{0} directories were found in the inbox, but none of them are complete yet. Choose a directory now or try again later.",
      missingTitle: "Run inbox not found yet",
      missingDescription:
        "The default inbox is {0}. You can also choose a run result directory directly.",
      failedTitle: "The inbox could not be checked right now",
      readyHint:
        "The latest run result is complete and can move directly into build confirmation.",
      readyAction: "Next: confirm the output location and generate Review Pack",
      missingHint: "Import one run result directory first, then continue.",
      emptyHint:
        "The inbox does not contain a complete result yet. Import a directory now, and use manual correction only if needed.",
      failedHint:
        "Automatic discovery is unavailable right now. You can still continue by importing a run result directory manually.",
      loadingHint:
        "The app is checking the default inbox to see whether a recent complete run result already exists.",
    },
    spotlight: {
      currentRunTitle: "Current usable run result",
      directoryLabel: "Latest run result",
      sourceInbox: "Source: run result inbox",
    },
    cards: {
      inbox: {
        title: "Run result inbox",
        body: "The default inbox path is `~/AgentEvidence/runs/`. M1 only scans this location and only inspects the first-level child directories.",
      },
      recentRun: {
        title: "Latest complete run",
        body: "If a complete run result exists in the inbox, the home page uses it as the default entry instead of asking users to pick files first.",
        directoryLabel: "Latest run result directory",
        empty: "No complete run result is available yet.",
      },
      manual: {
        title: "Fallback path",
        body: "Use directory import or advanced manual selection only when automatic discovery is incomplete or a path needs correction.",
      },
    },
  },
  inputs: {
    kicker: "Input setup",
    title: "Confirm the current run result",
    description:
      "Start from the current run status and only open technical file details when a correction is needed.",
    modeTitle: "Input mode",
    modeSummary: {
      directory:
        "The default path is automatic detection for the current run result. Switch to Advanced manual selection only when detection is incomplete.",
      manual:
        "You are correcting file paths manually. When the paths look right, return to the automatic path and continue.",
    },
    manualModeBadge: "Advanced manual selection",
    backToAutoAction: "Back to automatic path",
    modes: {
      directory: {
        label: "Import Run Result Directory",
        hint: "Default path. Import one directory and detect the files automatically.",
      },
      manual: {
        label: "Advanced manual selection",
        hint: "Use this only when you need to correct detected file paths.",
      },
    },
    requiredStatus: "{0}/{1} required files ready",
    optionalStatus: "{0} optional files attached",
    formStatusReady: "Ready for build",
    formStatusBlocked: "Required items still missing",
    requiredSectionTitle: "Required files",
    requiredSectionDescription:
      "These three files define the primary input surface for the customer desktop v0.1.",
    optionalSectionTitle: "Optional supporting files",
    optionalSectionDescription:
      "Supporting files stay supporting and do not become a new primary output line. Only manifest, public key, and runtime events are supported here. Private keys are excluded by default.",
    manualSectionTitle: "Advanced manual selection",
    manualSectionDescription:
      "Use this when automatic detection is incomplete, or when you want to replace a detected file path with a different one.",
    manualSectionDirectoryNotice:
      "The current directory-detection result has already been carried into this form. You can correct any missing or incorrect paths here.",
    latestResult: {
      title: "Latest run result detected",
      description:
        "The app is currently using the latest complete run result discovered automatically. Technical file paths stay collapsed by default and can be opened only when needed.",
      cardTitle: "Latest run result status",
      cardSourceInbox: "Source: run result inbox",
      directoryLabel: "Run result directory",
      actionLabel: "Next step",
      nextActionBuild: "Choose an output location and continue to Review Pack",
      nextActionFix: "Correct the missing items before continuing",
      showDetails: "View detection details",
      reselectDirectory: "Choose another directory",
      advancedManual: "Advanced: choose files manually",
      detectedLabel: "Latest run result detected",
    },
    directoryImport: {
      title: "Import Run Result Directory",
      description:
        "Choose one run result directory and the desktop app will automatically detect the evidence package, verification receipt, summary, and optional supporting files.",
      label: "Run result directory",
      hint: "Choose a directory that already contains one exported run result.",
      placeholder: "No run result directory selected yet",
      statusIdle: "Waiting for a directory",
      statusScanning: "Detecting files now",
      statusReady: "Automatic detection complete",
      statusIncomplete: "Automatic detection incomplete",
      statusFailed: "Directory scan failed",
      directorySelected: "Directory selected",
      detectedCardTitle: "Current run result",
      cardSourceManual: "Source: imported directory",
      scanningNotice:
        "The app is scanning the selected directory and detecting the available evidence files.",
      detectedPrimaryTitle: "Detected core files",
      detectedPrimaryDescription:
        "This shows the detected evidence package, verification receipt, and summary.",
      detectedSupportingTitle: "Detected supporting files",
      detectedSupportingDescription:
        "This shows optional supporting files. Only manifest, public key, and runtime events are detected here. Private keys are excluded by default.",
      notDetected: "This file was not detected yet",
      optionalNotDetected: "This supporting file was not detected in the selected directory",
      warningsTitle: "Detection warnings",
      multipleCandidates: "Multiple {0} candidates were found. The app is currently using {1}.",
      issuesTitle: "Items that need attention",
      detectedIncompleteHelp:
        "Automatic detection is incomplete. Review the missing items, or switch to Advanced manual selection to correct the file paths.",
      useAdvancedAction: "Switch to Advanced manual selection",
      hideDetails: "Hide detection details",
      scanFailedTitle: "The directory scan did not complete",
      scanFailed:
        "The app could not detect a complete result from this directory. Check the directory contents, or switch to Advanced manual selection.",
      detectedReady: "Detection completed and the app is ready for the build step.",
      detectedIncomplete:
        "The app detected some files, but required items are still missing. Correct them before continuing.",
      fixMissingNotice:
        "Automatic detection is still incomplete. Correct the missing files, or switch to Advanced manual selection before continuing.",
      missingFields: {
        bundle: "Evidence package file is missing",
        receipt: "Verification receipt file is missing",
        summary: "Summary file is missing",
      },
    },
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
  runStatus: {
    ready: {
      label: "Evidence is complete and Review Pack can be generated",
      hint: "Bundle, receipt, and summary are present. Choose the output location and continue.",
    },
    missingBundle: {
      label: "Evidence package missing and needs attention",
      hint: "The evidence package file (bundle) has not been detected yet, so Review Pack cannot continue.",
    },
    missingReceipt: {
      label: "Verification receipt missing and needs attention",
      hint: "The verification receipt file (receipt) has not been detected yet. Add it before continuing.",
    },
    missingSummary: {
      label: "Summary missing and needs attention",
      hint: "The summary file (summary) has not been detected yet. Add it before continuing.",
    },
  },
  build: {
    kicker: "Preflight review",
    title: "Confirm and generate Review Pack",
    description:
      "This page only confirms the current run source, the save location, and the status summary. Technical paths stay collapsed unless needed.",
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
    focus: {
      idle: "Everything needed is ready. Confirm it and generate Review Pack.",
      success:
        "The review pack has already been generated successfully. Open the result view when you are ready to deliver it.",
      failure: "This build did not finish. Review the result first, then decide whether to retry.",
    },
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
      runResultDirectorySelected: "Run result directory: imported",
      manualSource: "Current source: advanced manual selection",
      requiredFiles: "Required files: {0}",
      optionalFiles: "Optional supporting files: {0}",
      outputDirectory: "Output directory: selected",
      buildAction: "Next step: generate Review Pack",
      readyAction: "Current state: Review Pack already generated",
    },
    runCard: {
      title: "Current run result",
      directoryLabel: "Run result source",
      sourceDirectory: "Source: run result directory",
      sourceManual: "Source: advanced manual selection",
    },
    outputCard: {
      title: "Output location",
      description:
        "The generated Review Pack will be written here. The page shows a simple summary first; technical paths stay behind details.",
    },
    sourceManualValue: "Advanced manual selection",
    showDetailsAction: "View details",
    hideDetailsAction: "Hide details",
    preflight: {
      sourceDirectoryTitle: "Run result directory",
      sourceDirectoryDescription:
        "This shows the directory imported for automatic evidence-file detection.",
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
    successTitle: "Review Pack is ready",
    successDescription:
      "The first screen keeps the focus on the delivery result: where it was saved, and what to do next.",
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
    openPdfAction: "Open PDF report",
    copyPdfPathAction: "Copy PDF path",
    openMarkdownAction: "Open Markdown report",
    copyMarkdownPathAction: "Copy Markdown path",
    openFolderAction: "Open Folder",
    copySaveLocationAction: "Copy save location",
    openPdfSuccess: "Tried to open the PDF report.",
    openPdfFailed:
      "The PDF report could not be opened right now. Make sure the file still exists.",
    copyPdfPathSuccess: "Copied the PDF report path.",
    copyPdfPathFailed: "The PDF report path could not be copied. Try again.",
    openMarkdownFallbackSuccess:
      "PDF was not found, so the app tried to open the Markdown report instead.",
    openMarkdownFallbackFailed:
      "PDF was not found and the Markdown report could not be opened either.",
    copyMarkdownFallbackSuccess:
      "PDF was not found, so the Markdown report path was copied instead.",
    copyMarkdownFallbackFailed:
      "PDF was not found and the Markdown report path could not be copied.",
    openFolderSuccess: "Tried to open the review-pack folder.",
    openFolderFailed:
      "The review-pack folder could not be opened right now. Make sure the local output still exists.",
    copySaveLocationSuccess: "Copied the review-pack save location.",
    copySaveLocationFailed: "The save location could not be copied. Try again.",
    pdfFallbackTitle: "PDF report not found",
    pdfFallbackBody:
      "The build result is still available. You can open the Markdown report as a technical format instead.",
    showDetailsAction: "View output details",
    hideDetailsAction: "Hide output details",
    goToBuildAction: "Back to build",
    deliveryCard: {
      title: "Delivery result",
      body: "Start from the formal deliverable: the PDF report and its saved location. Technical and intermediate files stay behind the details toggle.",
      status: "Ready to deliver",
      pdfLabel: "PDF report",
      pdfChecking: "Checking whether the PDF report exists",
      pdfMissing: "PDF report was not found",
      pdfFallback: "Markdown report is still available as a technical format",
      directoryLabel: "Saved location",
    },
    cards: {
      packDir: {
        title: "Review pack directory",
        body: "This shows the stable pack directory returned by the current build.",
      },
      pdf: {
        title: "PDF report",
        body: "This shows the formal PDF-delivery path.",
        empty: "No PDF report was detected",
      },
      index: {
        title: "Index file (index.json)",
        body: "This shows the pack-index path. It remains a pack index, not a new primary artifact.",
      },
      report: {
        title: "Markdown report (technical format)",
        body: "This shows the Markdown intermediate report path for technical review and debugging.",
      },
    },
  },
} as const;

export default en;
