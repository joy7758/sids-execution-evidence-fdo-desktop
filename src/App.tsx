import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { openPath } from "@tauri-apps/plugin-opener";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import "./App.css";
import {
  discoverRunInbox,
  type RunInboxItem,
  type RunInboxDiscoveryResult,
} from "./lib/runInbox";
import {
  detectRunResultDirectory,
  type DetectionWarningKind,
  type RunResultDetectionResult,
} from "./lib/runResultDetection";
import {
  runReviewPackBuild,
  type ReviewPackEngineInput,
  type ReviewPackEngineInvocation,
} from "./lib/reviewPackEngine";
import { useI18n } from "./i18n";

type Screen = "welcome" | "inputs" | "build" | "result";
type InputMode = "directory" | "manual";
type RequiredFieldKey = "bundle" | "receipt" | "summary";
type OptionalFieldKey = "manifest" | "publicKey" | "runtimeEvents";
type FieldKey = RequiredFieldKey | OptionalFieldKey;

type RequiredFieldState = Record<RequiredFieldKey, string>;
type OptionalFieldState = Record<OptionalFieldKey, string>;
type ValidationErrors = Record<RequiredFieldKey | "outputDir", string>;
type NoticeTone = "neutral" | "warning" | "success";

type PreflightItem = {
  key: FieldKey;
  label: string;
  path: string;
  provided: boolean;
};

type NoticeState = {
  tone: NoticeTone;
  text: string;
} | null;

type DeliveryAssetState =
  | { status: "idle"; pdfPath: string }
  | { status: "checking"; pdfPath: string }
  | { status: "available"; pdfPath: string }
  | { status: "missing"; pdfPath: string };

type DirectoryOrigin = "inbox" | "manual" | null;

type DetectionState =
  | { status: "idle" }
  | { status: "scanning"; directory: string }
  | { status: "ready"; result: RunResultDetectionResult }
  | { status: "failure"; directory: string; message: string };

type InboxDiscoveryState =
  | { status: "loading" }
  | { status: "ready"; discovery: RunInboxDiscoveryResult }
  | { status: "failure"; message: string };

type BuildRunState =
  | { status: "idle" }
  | {
      status: "running";
      command: string[];
    }
  | {
      status: "success";
      run: Extract<ReviewPackEngineInvocation, { status: "success" }>;
    }
  | {
      status: "failure";
      run: Extract<ReviewPackEngineInvocation, { status: "failure" }>;
    };

type RunStatusKey =
  | "ready"
  | "missingBundle"
  | "missingReceipt"
  | "missingSummary";

type RunListStatusModel = {
  label: string;
  hint: string;
  tone: NoticeTone;
  primaryActionLabel: string;
  verificationLabel: string;
  reviewPackLabel: string;
};

const requiredFieldKeys: RequiredFieldKey[] = ["bundle", "receipt", "summary"];
const optionalFieldKeys: OptionalFieldKey[] = [
  "manifest",
  "publicKey",
  "runtimeEvents",
];
const screenOrder: Screen[] = ["welcome", "inputs", "build", "result"];
const recentRunDisplayLimit = 5;
const detectionWarningFieldMap: Record<DetectionWarningKind, FieldKey> = {
  bundle: "bundle",
  receipt: "receipt",
  summary: "summary",
  manifest: "manifest",
  publicKey: "publicKey",
  runtimeEvents: "runtimeEvents",
};

const emptyRequiredFieldState: RequiredFieldState = {
  bundle: "",
  receipt: "",
  summary: "",
};

const emptyOptionalFieldState: OptionalFieldState = {
  manifest: "",
  publicKey: "",
  runtimeEvents: "",
};

function basenameFromPath(path: string) {
  if (!path) {
    return "";
  }

  const normalized = path.replace(/\\/g, "/");
  return normalized.split("/").pop() ?? path;
}

function buildFailureMessageKey(errorCode: string) {
  switch (errorCode) {
    case "AE_REVIEW_PACK_ENGINE_NOT_FOUND":
      return "build.failure.engineNotFound";
    case "AE_REVIEW_PACK_ENGINE_PERMISSION_DENIED":
      return "build.failure.permissionDenied";
    case "AE_REVIEW_PACK_VALIDATION_FAILED":
    case "AE_REVIEW_PACK_INPUT_READ_FAILED":
      return "build.failure.validation";
    case "AE_REVIEW_PACK_ASSEMBLY_FAILED":
    case "AE_REVIEW_PACK_RENDER_FAILED":
    case "AE_REVIEW_PACK_WRITE_FAILED":
    case "AE_REVIEW_PACK_ENGINE_EXECUTION_FAILED":
      return "build.failure.execution";
    default:
      return "build.failure.unexpected";
  }
}

function formatDebugDetails(value: unknown) {
  if (value === undefined) {
    return "";
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function normalizeDetectionError(error: unknown) {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function inferPdfPath(params: { packDir: string; reportPath: string }) {
  const normalizedReportPath = params.reportPath.replace(/\\/g, "/");
  if (normalizedReportPath.endsWith("/review/report.md")) {
    return normalizedReportPath.replace(/report\.md$/, "report.pdf");
  }

  if (normalizedReportPath.endsWith(".md")) {
    return normalizedReportPath.replace(/\.md$/, ".pdf");
  }

  return `${params.packDir.replace(/\\/g, "/")}/review/report.pdf`;
}

function formatRunTimestamp(locale: "zh-CN" | "en", modifiedMs: number) {
  const formatter = new Intl.DateTimeFormat(locale === "zh-CN" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(new Date(modifiedMs));
}

function App() {
  const { locale, setLocale, t } = useI18n();
  const [screen, setScreen] = useState<Screen>("welcome");
  const [inputMode, setInputMode] = useState<InputMode>("directory");
  const [directoryOrigin, setDirectoryOrigin] = useState<DirectoryOrigin>(null);
  const [runResultDirectory, setRunResultDirectory] = useState("");
  const [detectionState, setDetectionState] = useState<DetectionState>({
    status: "idle",
  });
  const [inboxDiscovery, setInboxDiscovery] = useState<InboxDiscoveryState>({
    status: "loading",
  });
  const [requiredPaths, setRequiredPaths] = useState<RequiredFieldState>(
    emptyRequiredFieldState,
  );
  const [optionalPaths, setOptionalPaths] = useState<OptionalFieldState>(
    emptyOptionalFieldState,
  );
  const [outputDir, setOutputDir] = useState("");
  const [notice, setNotice] = useState<NoticeState>(null);
  const [buildRun, setBuildRun] = useState<BuildRunState>({ status: "idle" });
  const [welcomeDetailsVisible, setWelcomeDetailsVisible] = useState(false);
  const [directoryDetailsVisible, setDirectoryDetailsVisible] = useState(false);
  const [buildDetailsVisible, setBuildDetailsVisible] = useState(false);
  const [resultDetailsVisible, setResultDetailsVisible] = useState(false);
  const [deliveryAssetState, setDeliveryAssetState] = useState<DeliveryAssetState>({
    status: "idle",
    pdfPath: "",
  });

  const validationErrors = useMemo<ValidationErrors>(
    () => ({
      bundle: requiredPaths.bundle ? "" : t("inputs.validation.bundleRequired"),
      receipt: requiredPaths.receipt
        ? ""
        : t("inputs.validation.receiptRequired"),
      summary: requiredPaths.summary ? "" : t("inputs.validation.summaryRequired"),
      outputDir: outputDir.trim()
        ? ""
        : t("inputs.validation.outputDirRequired"),
    }),
    [outputDir, requiredPaths, t],
  );

  const formValid = Object.values(validationErrors).every((value) => !value);
  const requiredReadyCount = requiredFieldKeys.filter(
    (key) => Boolean(requiredPaths[key]),
  ).length;

  const directoryWarnings = useMemo(() => {
    if (detectionState.status !== "ready") {
      return [];
    }

    return detectionState.result.warnings.map((warning) => {
      const fieldKey = detectionWarningFieldMap[warning.kind];
      return {
        summary: t("inputs.directoryImport.multipleCandidates", [
          t(`inputs.fields.${fieldKey}.label`),
          basenameFromPath(warning.selectedPath),
        ]),
        candidatePaths: warning.candidatePaths,
      };
    });
  }, [detectionState, t]);
  const usingRunResultDirectory = Boolean(runResultDirectory.trim());

  const detectionIssues = useMemo(() => {
    if (detectionState.status !== "ready") {
      return [];
    }

    return detectionState.result.missingRequiredFields.map((field) =>
      t(`inputs.directoryImport.missingFields.${field}`),
    );
  }, [detectionState, t]);

  const detectedDirectoryStatusLabel = useMemo(() => {
    switch (detectionState.status) {
      case "scanning":
        return t("inputs.directoryImport.statusScanning");
      case "ready":
        return detectionState.result.missingRequiredFields.length === 0
          ? t("inputs.directoryImport.statusReady")
          : t("inputs.directoryImport.statusIncomplete");
      case "failure":
        return t("inputs.directoryImport.statusFailed");
      default:
        return t("inputs.directoryImport.statusIdle");
    }
  }, [detectionState, t]);

  const preflightState = useMemo(
    () => ({
      inputMode,
      runResultDirectory: runResultDirectory.trim(),
      requiredFiles: requiredFieldKeys.map<PreflightItem>((key) => ({
        key,
        label: t(`inputs.fields.${key}.label`),
        path: requiredPaths[key],
        provided: Boolean(requiredPaths[key]),
      })),
      optionalFiles: optionalFieldKeys.map<PreflightItem>((key) => ({
        key,
        label: t(`inputs.fields.${key}.label`),
        path: optionalPaths[key],
        provided: Boolean(optionalPaths[key]),
      })),
      outputDir: outputDir.trim(),
    }),
    [inputMode, optionalPaths, outputDir, requiredPaths, runResultDirectory, t],
  );

  const emptyResultPaths = useMemo(() => {
    const fallbackOutputDir = t("result.placeholderOutputDirectory");
    return {
      packDir: fallbackOutputDir,
      indexPath: `${fallbackOutputDir}/index.json`,
      reportPath: `${fallbackOutputDir}/review/report.md`,
    };
  }, [t]);

  const buildButtonLabel = useMemo(() => {
    if (buildRun.status === "running") {
      return t("build.primaryActionRunning");
    }

    if (buildRun.status === "failure") {
      return t("build.primaryActionRetry");
    }

    return t("build.primaryActionIdle");
  }, [buildRun.status, t]);

  const buildStatusLabel = useMemo(() => {
    switch (buildRun.status) {
      case "running":
        return t("build.statusRunning");
      case "success":
        return t("build.statusSuccess");
      case "failure":
        return t("build.statusFailure");
      default:
        return t("build.statusIdle");
    }
  }, [buildRun.status, t]);

  const latestInboxResult =
    inboxDiscovery.status === "ready"
      ? inboxDiscovery.discovery.latestCompleteResult
      : null;
  const inboxPath =
    inboxDiscovery.status === "ready" ? inboxDiscovery.discovery.inboxPath : "";
  const recentRuns =
    inboxDiscovery.status === "ready"
      ? inboxDiscovery.discovery.recentRuns.slice(0, recentRunDisplayLimit)
      : [];
  const selectedRunDirectory =
    detectionState.status === "ready"
      ? detectionState.result.runResultDirectory
      : latestInboxResult?.runResultDirectory ?? "";

  const currentRunStatusKey = useMemo<RunStatusKey>(() => {
    if (!requiredPaths.bundle) {
      return "missingBundle";
    }

    if (!requiredPaths.receipt) {
      return "missingReceipt";
    }

    if (!requiredPaths.summary) {
      return "missingSummary";
    }

    return "ready";
  }, [requiredPaths]);

  const currentRunStatusTone: NoticeTone =
    currentRunStatusKey === "ready" ? "success" : "warning";

  const welcomeState = useMemo(() => {
    if (inboxDiscovery.status === "loading") {
      return {
        mode: "loading" as const,
        title: t("welcome.discovery.loadingTitle"),
        description: t("welcome.discovery.loadingDescription"),
      };
    }

    if (inboxDiscovery.status === "failure") {
      return {
        mode: "failure" as const,
        title: t("welcome.discovery.failedTitle"),
        description: inboxDiscovery.message,
      };
    }

    if (inboxDiscovery.discovery.latestCompleteResult) {
      return {
        mode: "found" as const,
        title: t("welcome.discovery.foundTitle"),
        description: t("welcome.discovery.foundDescription"),
      };
    }

    if (inboxDiscovery.discovery.inboxExists) {
      return {
        mode: "empty" as const,
        title: t("welcome.discovery.emptyTitle"),
        description:
          inboxDiscovery.discovery.incompleteDirectoryCount > 0
            ? t("welcome.discovery.emptyDescriptionWithCount", [
                String(inboxDiscovery.discovery.incompleteDirectoryCount),
              ])
            : t("welcome.discovery.emptyDescription"),
      };
    }

    return {
      mode: "missing" as const,
      title: t("welcome.discovery.missingTitle"),
      description: t("welcome.discovery.missingDescription", [
        inboxDiscovery.discovery.inboxPath,
      ]),
    };
  }, [inboxDiscovery, t]);

  function describeRunListStatus(run: RunInboxItem): RunListStatusModel {
    if (run.reviewPackStatus === "generated") {
      return {
        label: t("welcome.recentRuns.status.reviewPackGenerated"),
        hint: t("welcome.recentRuns.statusHints.reviewPackGenerated"),
        tone: "success",
        primaryActionLabel: t("welcome.recentRuns.actions.useRun"),
        verificationLabel: t("welcome.recentRuns.verification.hasReceipt"),
        reviewPackLabel: t("welcome.recentRuns.reviewPack.generated"),
      };
    }

    if (run.missingRequiredFields.includes("bundle")) {
      return {
        label: t("runStatus.missingBundle.label"),
        hint: t("runStatus.missingBundle.hint"),
        tone: "warning",
        primaryActionLabel: t("welcome.recentRuns.actions.fixRun"),
        verificationLabel: run.verificationStatus === "hasReceipt"
          ? t("welcome.recentRuns.verification.hasReceipt")
          : t("welcome.recentRuns.verification.missingReceipt"),
        reviewPackLabel: t("welcome.recentRuns.reviewPack.needsAttention"),
      };
    }

    if (run.missingRequiredFields.includes("receipt")) {
      return {
        label: t("runStatus.missingReceipt.label"),
        hint: t("runStatus.missingReceipt.hint"),
        tone: "warning",
        primaryActionLabel: t("welcome.recentRuns.actions.fixRun"),
        verificationLabel: t("welcome.recentRuns.verification.missingReceipt"),
        reviewPackLabel: t("welcome.recentRuns.reviewPack.needsAttention"),
      };
    }

    if (run.missingRequiredFields.includes("summary")) {
      return {
        label: t("runStatus.missingSummary.label"),
        hint: t("runStatus.missingSummary.hint"),
        tone: "warning",
        primaryActionLabel: t("welcome.recentRuns.actions.fixRun"),
        verificationLabel: run.verificationStatus === "hasReceipt"
          ? t("welcome.recentRuns.verification.hasReceipt")
          : t("welcome.recentRuns.verification.missingReceipt"),
        reviewPackLabel: t("welcome.recentRuns.reviewPack.needsAttention"),
      };
    }

    return {
      label: t("runStatus.ready.label"),
      hint: t("welcome.recentRuns.statusHints.ready"),
      tone: "success",
      primaryActionLabel: t("welcome.recentRuns.actions.useRun"),
      verificationLabel: t("welcome.recentRuns.verification.hasReceipt"),
      reviewPackLabel: t("welcome.recentRuns.reviewPack.ready"),
    };
  }

  useEffect(() => {
    let active = true;

    async function refreshRunInbox() {
      setInboxDiscovery({ status: "loading" });

      try {
        const discovery = await discoverRunInbox();
        if (!active) {
          return;
        }

        setInboxDiscovery({ status: "ready", discovery });
      } catch (error) {
        if (!active) {
          return;
        }

        setInboxDiscovery({
          status: "failure",
          message: normalizeDetectionError(error),
        });
      }
    }

    if (screen === "welcome") {
      void refreshRunInbox();
    }

    return () => {
      active = false;
    };
  }, [screen]);

  const failureDebugDetails = useMemo(() => {
    if (buildRun.status !== "failure") {
      return "";
    }

    return formatDebugDetails({
      error_code: buildRun.run.error.error_code,
      message: buildRun.run.error.message,
      details: buildRun.run.error.details ?? null,
      exit_code: buildRun.run.exitCode,
      command: buildRun.run.command,
      stdout: buildRun.run.stdout,
      stderr: buildRun.run.stderr,
    });
  }, [buildRun]);

  const resultData =
    buildRun.status === "success"
      ? {
          packDir: buildRun.run.result.pack_dir,
          indexPath: buildRun.run.result.index_path,
          reportPath: buildRun.run.result.report_path,
          primaryFiles: buildRun.run.result.primary_files,
          supportingFiles: buildRun.run.result.supporting_files,
        }
      : null;

  useEffect(() => {
    let active = true;

    async function refreshDeliveryAsset() {
      if (!resultData) {
        setDeliveryAssetState({ status: "idle", pdfPath: "" });
        return;
      }

      const pdfPath = inferPdfPath({
        packDir: resultData.packDir,
        reportPath: resultData.reportPath,
      });

      setDeliveryAssetState({ status: "checking", pdfPath });

      try {
        const exists = await invoke<boolean>("path_exists", { path: pdfPath });
        if (!active) {
          return;
        }

        setDeliveryAssetState({
          status: exists ? "available" : "missing",
          pdfPath,
        });
      } catch {
        if (!active) {
          return;
        }

        setDeliveryAssetState({ status: "missing", pdfPath });
      }
    }

    void refreshDeliveryAsset();

    return () => {
      active = false;
    };
  }, [resultData]);

  const deliveryPdfAvailable = deliveryAssetState.status === "available";
  const deliveryPdfPath = deliveryAssetState.pdfPath;

  function resetBuildFlow() {
    setBuildRun({ status: "idle" });
    setBuildDetailsVisible(false);
    setResultDetailsVisible(false);
    setNotice(null);
  }

  function setPanelNotice(tone: NoticeTone, text: string) {
    setNotice({ tone, text });
  }

  function applyDetectionResult(result: RunResultDetectionResult) {
    setRequiredPaths({
      bundle: result.bundlePath,
      receipt: result.receiptPath,
      summary: result.summaryPath,
    });
    setOptionalPaths({
      manifest: result.manifestPath,
      publicKey: result.publicKeyPath,
      runtimeEvents: result.runtimeEventsPath,
    });
  }

  function activateDetectionResult(
    result: RunResultDetectionResult,
    options: { origin: DirectoryOrigin; detailsVisible: boolean },
  ) {
    resetBuildFlow();
    setInputMode("directory");
    setDirectoryOrigin(options.origin);
    setRunResultDirectory(result.runResultDirectory);
    setDetectionState({ status: "ready", result });
    setDirectoryDetailsVisible(options.detailsVisible);
    applyDetectionResult(result);
  }

  async function pickPath(options: {
    directory: boolean;
    title?: string;
  }): Promise<string | null> {
    const selected = await open({
      directory: options.directory,
      multiple: false,
      title: options.title,
    });

    return typeof selected === "string" ? selected : null;
  }

  function switchInputMode(nextMode: InputMode) {
    if (nextMode === "directory" && detectionState.status === "ready") {
      applyDetectionResult(detectionState.result);
    }

    setNotice(null);
    setInputMode(nextMode);
  }

  async function chooseRunResultDirectory() {
    const selected = await pickPath({
      directory: true,
      title: t("inputs.directoryImport.label"),
    });

    if (!selected) {
      return false;
    }

    resetBuildFlow();
    setInputMode("directory");
    setDirectoryOrigin("manual");
    setDirectoryDetailsVisible(false);
    setRunResultDirectory(selected);
    setDetectionState({ status: "scanning", directory: selected });
    setRequiredPaths({ ...emptyRequiredFieldState });
    setOptionalPaths({ ...emptyOptionalFieldState });

    try {
      const result = await detectRunResultDirectory(selected);
      setDetectionState({ status: "ready", result });
      applyDetectionResult(result);

      if (result.missingRequiredFields.length === 0) {
        setPanelNotice("success", t("inputs.directoryImport.detectedReady"));
      } else {
        setPanelNotice("warning", t("inputs.directoryImport.detectedIncomplete"));
      }
    } catch (error) {
      setDetectionState({
        status: "failure",
        directory: selected,
        message: normalizeDetectionError(error),
      });
      setPanelNotice("warning", t("inputs.directoryImport.scanFailed"));
    }

    return true;
  }

  function useLatestRunResult() {
    if (!latestInboxResult) {
      return;
    }

    activateDetectionResult(latestInboxResult, {
      origin: "inbox",
      detailsVisible: false,
    });
    setScreen("inputs");
  }

  function useInboxRun(
    run: RunInboxItem,
    options: { detailsVisible: boolean },
  ) {
    activateDetectionResult(run.detection, {
      origin: "inbox",
      detailsVisible: options.detailsVisible || run.missingRequiredFields.length > 0,
    });
    setScreen("inputs");
  }

  async function handleWelcomeChooseDirectory() {
    const selected = await chooseRunResultDirectory();
    if (selected) {
      setScreen("inputs");
    }
  }

  function handleWelcomeManualMode() {
    if (latestInboxResult) {
      activateDetectionResult(latestInboxResult, {
        origin: "inbox",
        detailsVisible: false,
      });
    }

    setNotice(null);
    setInputMode("manual");
    setScreen("inputs");
  }

  async function chooseRequiredFile(key: RequiredFieldKey) {
    const selected = await pickPath({
      directory: false,
      title: t(`inputs.fields.${key}.label`),
    });

    if (!selected) {
      return;
    }

    resetBuildFlow();
    setRequiredPaths((current) => ({ ...current, [key]: selected }));
  }

  async function chooseOptionalFile(key: OptionalFieldKey) {
    const selected = await pickPath({
      directory: false,
      title: t(`inputs.fields.${key}.label`),
    });

    if (!selected) {
      return;
    }

    resetBuildFlow();
    setOptionalPaths((current) => ({ ...current, [key]: selected }));
  }

  async function chooseOutputDirectory() {
    const selected = await pickPath({
      directory: true,
      title: t("inputs.outputLabel"),
    });

    if (!selected) {
      return;
    }

    resetBuildFlow();
    setOutputDir(selected);
  }

  function clearRequiredFile(key: RequiredFieldKey) {
    resetBuildFlow();
    setRequiredPaths((current) => ({ ...current, [key]: "" }));
  }

  function clearOptionalFile(key: OptionalFieldKey) {
    resetBuildFlow();
    setOptionalPaths((current) => ({ ...current, [key]: "" }));
  }

  function clearOutputDirectory() {
    resetBuildFlow();
    setOutputDir("");
  }

  function clearRunResultDirectory() {
    resetBuildFlow();
    setDirectoryOrigin(null);
    setRunResultDirectory("");
    setDirectoryDetailsVisible(false);
    setDetectionState({ status: "idle" });
    setRequiredPaths({ ...emptyRequiredFieldState });
    setOptionalPaths({ ...emptyOptionalFieldState });
  }

  function goToScreen(target: Screen) {
    if (target === "build" && !formValid) {
      setScreen("inputs");
      setPanelNotice(
        "warning",
        inputMode === "directory"
          ? t("inputs.directoryImport.fixMissingNotice")
          : t("inputs.buildBlockedNotice"),
      );
      return;
    }

    setNotice(null);
    if (target === "build") {
      setBuildDetailsVisible(false);
    }
    setScreen(target);
  }

  async function runBuild() {
    if (!formValid || buildRun.status === "running") {
      return;
    }

    const input: ReviewPackEngineInput = {
      bundlePath: requiredPaths.bundle,
      receiptPath: requiredPaths.receipt,
      summaryPath: requiredPaths.summary,
      outputDir,
      manifestPath: optionalPaths.manifest || undefined,
      publicKeyPath: optionalPaths.publicKey || undefined,
      runtimeEventsPath: optionalPaths.runtimeEvents || undefined,
    };

    setNotice(null);
    setBuildRun({
      status: "running",
      command: [
        "ae-review-pack-engine",
        "build-review-pack",
        "--bundle-path",
        input.bundlePath,
        "--receipt-path",
        input.receiptPath,
        "--summary-path",
        input.summaryPath,
        "--output-dir",
        input.outputDir,
      ],
    });

    const invocation = await runReviewPackBuild(input);

    if (invocation.status === "success") {
      setBuildRun({ status: "success", run: invocation });
      setNotice(null);
      setScreen("result");
      return;
    }

    setBuildRun({ status: "failure", run: invocation });
  }

  async function handleOpenFolder() {
    if (!resultData) {
      return;
    }

    try {
      await openPath(resultData.packDir);
      setPanelNotice("success", t("result.openFolderSuccess"));
    } catch {
      setPanelNotice("warning", t("result.openFolderFailed"));
    }
  }

  async function handleCopySaveLocation() {
    if (!resultData) {
      return;
    }

    try {
      await writeText(resultData.packDir);
      setPanelNotice("success", t("result.copySaveLocationSuccess"));
    } catch {
      setPanelNotice("warning", t("result.copySaveLocationFailed"));
    }
  }

  async function handleOpenPdfReport() {
    if (!resultData) {
      return;
    }

    const targetPath = deliveryPdfAvailable ? deliveryPdfPath : resultData.reportPath;

    try {
      await openPath(targetPath);
      setPanelNotice(
        "success",
        deliveryPdfAvailable
          ? t("result.openPdfSuccess")
          : t("result.openMarkdownFallbackSuccess"),
      );
    } catch {
      setPanelNotice(
        "warning",
        deliveryPdfAvailable
          ? t("result.openPdfFailed")
          : t("result.openMarkdownFallbackFailed"),
      );
    }
  }

  async function handleCopyPdfPath() {
    if (!resultData) {
      return;
    }

    const targetPath = deliveryPdfAvailable ? deliveryPdfPath : resultData.reportPath;

    try {
      await writeText(targetPath);
      setPanelNotice(
        "success",
        deliveryPdfAvailable
          ? t("result.copyPdfPathSuccess")
          : t("result.copyMarkdownFallbackSuccess"),
      );
    } catch {
      setPanelNotice(
        "warning",
        deliveryPdfAvailable
          ? t("result.copyPdfPathFailed")
          : t("result.copyMarkdownFallbackFailed"),
      );
    }
  }

  const showInboxCompactCard =
    inputMode === "directory" &&
    directoryOrigin === "inbox" &&
    detectionState.status === "ready" &&
    !directoryDetailsVisible;

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand-block">
          <span className="brand-kicker">{t("shell.badge")}</span>
          <h1 className="brand-title">{t("shell.title")}</h1>
          <p className="brand-subtitle">{t("shell.subtitle")}</p>
        </div>

        <div className="locale-block">
          <span className="locale-label">{t("shell.languageLabel")}</span>
          <div
            className="locale-toggle"
            role="tablist"
            aria-label={t("shell.languageLabel")}
          >
            {(["zh-CN", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={
                  item === locale ? "locale-button active" : "locale-button"
                }
                onClick={() => setLocale(item)}
              >
                {item === "zh-CN"
                  ? t("shell.locale.zhCN")
                  : t("shell.locale.en")}
              </button>
            ))}
          </div>
        </div>

        <nav className="step-nav" aria-label={t("shell.stepNavigationLabel")}>
          {screenOrder.map((item, index) => {
            const isActive = item === screen;
            const blocked = item === "build" && !formValid;

            return (
              <button
                key={item}
                type="button"
                className={isActive ? "step-item active" : "step-item"}
                disabled={blocked}
                onClick={() => goToScreen(item)}
              >
                <span className="step-index">{index + 1}</span>
                <span className="step-copy">
                  <strong>{t(`steps.${item}.label`)}</strong>
                  <small>{t(`steps.${item}.hint`)}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="app-main">
        {screen === "welcome" && (
          <section className="panel">
            <div className="panel-hero">
              <span className="section-kicker">{t("welcome.kicker")}</span>
              <h2>{t("welcome.title")}</h2>
              <p>{t("welcome.description")}</p>
            </div>

            <article className="spotlight-card">
              <div className="spotlight-card-header">
                <div>
                  <h3>{welcomeState.title}</h3>
                  <p>{welcomeState.description}</p>
                </div>
                <span
                  className={
                    welcomeState.mode === "found"
                      ? "status-chip status-chip-ready"
                      : welcomeState.mode === "loading"
                        ? "status-chip status-chip-running"
                        : welcomeState.mode === "failure"
                          ? "status-chip status-chip-warning"
                          : "status-chip"
                  }
                >
                  {welcomeState.mode === "found"
                    ? t("welcome.discovery.statusFound")
                    : welcomeState.mode === "empty"
                      ? t("welcome.discovery.statusEmpty")
                      : welcomeState.mode === "missing"
                        ? t("welcome.discovery.statusMissing")
                        : welcomeState.mode === "failure"
                          ? t("welcome.discovery.statusFailed")
                          : t("welcome.discovery.statusLoading")}
                </span>
              </div>

              {latestInboxResult && welcomeState.mode === "found" && (
                <RunStatusCard
                  directory={latestInboxResult.runResultDirectory}
                  statusLabel={t("runStatus.ready.label")}
                  statusHint={t("welcome.discovery.readyHint")}
                  tone="success"
                  actionLabel={t("welcome.discovery.readyAction")}
                  title={t("welcome.spotlight.currentRunTitle")}
                  directoryLabel={t("welcome.spotlight.directoryLabel")}
                  sourceLabel={t("welcome.spotlight.sourceInbox")}
                />
              )}

              {welcomeState.mode !== "found" && (
                <Callout
                  tone={
                    welcomeState.mode === "failure" ? "warning" : "neutral"
                  }
                >
                  {welcomeState.mode === "missing"
                    ? t("welcome.discovery.missingHint")
                    : welcomeState.mode === "empty"
                      ? t("welcome.discovery.emptyHint")
                      : welcomeState.mode === "failure"
                        ? t("welcome.discovery.failedHint")
                        : t("welcome.discovery.loadingHint")}
                </Callout>
              )}

              <div className="panel-actions">
                {welcomeState.mode === "found" ? (
                  <button
                    className="primary-button"
                    type="button"
                    onClick={useLatestRunResult}
                  >
                    {t("welcome.actions.primaryFound")}
                  </button>
                ) : (
                  <button
                    className="primary-button"
                    type="button"
                    onClick={handleWelcomeChooseDirectory}
                    disabled={welcomeState.mode === "loading"}
                  >
                    {t("welcome.actions.primaryImport")}
                  </button>
                )}

                <button
                  className="secondary-button"
                  type="button"
                  onClick={() =>
                    setWelcomeDetailsVisible((current) => !current)
                  }
                  disabled={welcomeState.mode === "loading"}
                >
                  {welcomeDetailsVisible
                    ? t("welcome.actions.hideDetails")
                    : t("welcome.actions.viewDetails")}
                </button>
              </div>
            </article>

            <section className="recent-runs-section">
              <div className="section-heading-row">
                <div>
                  <h3>{t("welcome.recentRuns.title")}</h3>
                  <p>{t("welcome.recentRuns.description")}</p>
                </div>
                {inboxDiscovery.status === "ready" && recentRuns.length > 0 && (
                  <span className="status-chip">
                    {t("welcome.recentRuns.countLabel", [String(recentRuns.length)])}
                  </span>
                )}
              </div>

              {inboxDiscovery.status === "ready" && recentRuns.length > 0 ? (
                <div className="recent-run-list">
                  {recentRuns.map((run) => {
                    const status = describeRunListStatus(run);

                    return (
                      <RecentRunCard
                        key={run.runId}
                        directory={run.runResultDirectory}
                        directoryLabel={t("welcome.recentRuns.directoryLabel")}
                        reviewPackLabel={status.reviewPackLabel}
                        selected={selectedRunDirectory === run.runResultDirectory}
                        sourceLabel={
                          run.source === "localRunResult"
                            ? t("welcome.recentRuns.sourceLocal")
                            : t("welcome.recentRuns.sourceFallback")
                        }
                        statusHint={status.hint}
                        statusLabel={status.label}
                        timeLabel={formatRunTimestamp(locale, run.modifiedMs)}
                        title={run.runId}
                        tone={status.tone}
                        verificationLabel={status.verificationLabel}
                        onSelect={() => useInboxRun(run, { detailsVisible: false })}
                        onViewDetails={() =>
                          useInboxRun(run, { detailsVisible: true })
                        }
                        selectLabel={status.primaryActionLabel}
                        viewDetailsLabel={t("welcome.recentRuns.actions.viewDetails")}
                      />
                    );
                  })}
                </div>
              ) : (
                <Callout tone="neutral">
                  {inboxDiscovery.status === "loading"
                    ? t("welcome.recentRuns.loading")
                    : t("welcome.recentRuns.empty")}
                </Callout>
              )}
            </section>

            {welcomeDetailsVisible && (
              <div className="feature-grid">
                <article className="feature-card">
                  <h3>{t("welcome.cards.inbox.title")}</h3>
                  <p>{t("welcome.cards.inbox.body")}</p>
                  {inboxPath && <PathDisplay path={inboxPath} />}
                </article>
                <article className="feature-card">
                  <h3>{t("welcome.cards.recentRun.title")}</h3>
                  <p>{t("welcome.cards.recentRun.body")}</p>
                  {latestInboxResult ? (
                    <PathGroup
                      label={t("welcome.cards.recentRun.directoryLabel")}
                      path={latestInboxResult.runResultDirectory}
                    />
                  ) : (
                    <span>{t("welcome.cards.recentRun.empty")}</span>
                  )}
                </article>
                <article className="feature-card">
                  <h3>{t("welcome.cards.manual.title")}</h3>
                  <p>{t("welcome.cards.manual.body")}</p>
                  <div className="panel-actions">
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={handleWelcomeChooseDirectory}
                    >
                      {t("welcome.actions.chooseDirectory")}
                    </button>
                    <button
                      className="tertiary-button"
                      type="button"
                      onClick={handleWelcomeManualMode}
                    >
                      {t("welcome.actions.advancedManual")}
                    </button>
                  </div>
                </article>
              </div>
            )}
          </section>
        )}

        {screen === "inputs" && (
          <section className="panel">
            <header className="panel-header">
              <div>
                <span className="section-kicker">{t("inputs.kicker")}</span>
                <h2>{t("inputs.title")}</h2>
                <p>{t("inputs.description")}</p>
              </div>
              <div className="status-chip-group">
                <span className="status-chip">
                  {inputMode === "directory"
                    ? t(`runStatus.${currentRunStatusKey}.label`)
                    : t("inputs.manualModeBadge")}
                </span>
              </div>
            </header>

            <div className="mode-summary-card">
              <div>
                <strong>
                  {inputMode === "directory"
                    ? t("inputs.modes.directory.label")
                    : t("inputs.modes.manual.label")}
                </strong>
                <p>
                  {inputMode === "directory"
                    ? t("inputs.modeSummary.directory")
                    : t("inputs.modeSummary.manual")}
                </p>
              </div>
              {inputMode === "directory" ? (
                <button
                  className="tertiary-button"
                  type="button"
                  onClick={() => switchInputMode("manual")}
                >
                  {t("inputs.directoryImport.useAdvancedAction")}
                </button>
              ) : (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => switchInputMode("directory")}
                >
                  {t("inputs.backToAutoAction")}
                </button>
              )}
            </div>

            <div className="input-sections">
              {inputMode === "directory" ? (
                <>
                  <section className="input-section">
                    <h3>{t("inputs.directoryImport.title")}</h3>
                    <p>{t("inputs.directoryImport.description")}</p>

                    {!usingRunResultDirectory && (
                      <DirectoryField
                        label={t("inputs.directoryImport.label")}
                        hint={t("inputs.directoryImport.hint")}
                        placeholder={t("inputs.directoryImport.placeholder")}
                        path={runResultDirectory}
                        onPick={chooseRunResultDirectory}
                        onClear={clearRunResultDirectory}
                      />
                    )}

                    {usingRunResultDirectory && detectionState.status !== "failure" && (
                      <>
                        <RunStatusCard
                          directory={runResultDirectory}
                          statusLabel={t(`runStatus.${currentRunStatusKey}.label`)}
                          statusHint={t(`runStatus.${currentRunStatusKey}.hint`)}
                          tone={currentRunStatusTone}
                          actionLabel={
                            currentRunStatusKey === "ready"
                              ? t("inputs.latestResult.nextActionBuild")
                              : t("inputs.latestResult.nextActionFix")
                          }
                          title={
                            showInboxCompactCard
                              ? t("inputs.latestResult.title")
                              : t("inputs.directoryImport.detectedCardTitle")
                          }
                          sourceLabel={
                            directoryOrigin === "inbox"
                              ? t("inputs.latestResult.cardSourceInbox")
                              : t("inputs.directoryImport.cardSourceManual")
                          }
                        />

                        <div className="panel-actions">
                          <button
                            className="secondary-button"
                            type="button"
                            onClick={chooseRunResultDirectory}
                          >
                            {t("inputs.latestResult.reselectDirectory")}
                          </button>
                          <button
                            className="tertiary-button"
                            type="button"
                            onClick={() =>
                              setDirectoryDetailsVisible((current) => !current)
                            }
                          >
                            {directoryDetailsVisible
                              ? t("inputs.directoryImport.hideDetails")
                              : t("inputs.latestResult.showDetails")}
                          </button>
                        </div>
                      </>
                    )}

                    <div className="status-chip-group">
                      <span
                        className={
                          detectionState.status === "ready" &&
                          requiredReadyCount === requiredFieldKeys.length
                            ? "status-chip status-chip-ready"
                            : detectionState.status === "failure"
                              ? "status-chip status-chip-warning"
                              : "status-chip"
                        }
                      >
                        {detectedDirectoryStatusLabel}
                      </span>
                      {usingRunResultDirectory && (
                        <span className="status-chip">
                          {directoryOrigin === "inbox"
                            ? t("inputs.latestResult.detectedLabel")
                            : t("inputs.directoryImport.directorySelected")}
                        </span>
                      )}
                    </div>

                    {detectionState.status === "scanning" && (
                      <Callout tone="neutral">
                        {t("inputs.directoryImport.scanningNotice")}
                      </Callout>
                    )}

                    {detectionState.status === "ready" &&
                      detectionState.result.missingRequiredFields.length > 0 && (
                        <div className="directory-followup">
                          <Callout tone="warning">
                            <strong>{t("inputs.directoryImport.issuesTitle")}</strong>
                            <span>{t("inputs.directoryImport.detectedIncompleteHelp")}</span>
                            <ul className="issue-list">
                              {detectionIssues.map((issue) => (
                                <li key={issue}>{issue}</li>
                              ))}
                            </ul>
                          </Callout>
                          <button
                            className="secondary-button"
                            type="button"
                            onClick={() => switchInputMode("manual")}
                          >
                            {t("inputs.directoryImport.useAdvancedAction")}
                          </button>
                        </div>
                      )}

                    {detectionState.status === "failure" && (
                      <div className="directory-followup">
                        <Callout tone="warning">
                          <strong>{t("inputs.directoryImport.scanFailedTitle")}</strong>
                          <span>{t("inputs.directoryImport.scanFailed")}</span>
                          <small>{detectionState.message}</small>
                        </Callout>
                        <button
                          className="secondary-button"
                          type="button"
                          onClick={() => switchInputMode("manual")}
                        >
                          {t("inputs.directoryImport.useAdvancedAction")}
                        </button>
                      </div>
                    )}

                    {usingRunResultDirectory &&
                      detectionState.status === "ready" &&
                      directoryDetailsVisible && (
                        <div className="inventory-grid">
                          <div className="inventory-panel">
                            <h3>{t("inputs.directoryImport.detectedPrimaryTitle")}</h3>
                            <p>{t("inputs.directoryImport.detectedPrimaryDescription")}</p>
                            <ul className="path-list">
                              {requiredFieldKeys.map((key) => (
                                <li key={key}>
                                  <PathGroup
                                    label={t(`inputs.fields.${key}.label`)}
                                    path={requiredPaths[key]}
                                    emptyText={t("inputs.directoryImport.notDetected")}
                                    error={
                                      !requiredPaths[key]
                                        ? validationErrors[key]
                                        : undefined
                                    }
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="inventory-panel">
                            <h3>{t("inputs.directoryImport.detectedSupportingTitle")}</h3>
                            <p>{t("inputs.directoryImport.detectedSupportingDescription")}</p>
                            <ul className="path-list">
                              {optionalFieldKeys.map((key) => (
                                <li key={key}>
                                  <PathGroup
                                    label={t(`inputs.fields.${key}.label`)}
                                    path={optionalPaths[key]}
                                    emptyText={t("inputs.directoryImport.optionalNotDetected")}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                    {directoryDetailsVisible &&
                      detectionState.status === "ready" &&
                      detectionState.result.warnings.length > 0 && (
                        <div className="inventory-panel">
                          <h3>{t("inputs.directoryImport.warningsTitle")}</h3>
                          <ul className="warning-list">
                            {directoryWarnings.map((warning) => (
                              <li key={warning.summary} className="warning-item">
                                <strong>{warning.summary}</strong>
                                <div className="warning-path-list">
                                  {warning.candidatePaths.map((candidatePath) => (
                                    <PathDisplay key={candidatePath} path={candidatePath} />
                                  ))}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </section>
                </>
              ) : (
                <>
                  <section className="input-section">
                    <h3>{t("inputs.manualSectionTitle")}</h3>
                    <p>{t("inputs.manualSectionDescription")}</p>
                    {usingRunResultDirectory && (
                      <Callout tone="neutral">
                        {t("inputs.manualSectionDirectoryNotice")}
                      </Callout>
                    )}
                    <div className="panel-actions">
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={() => switchInputMode("directory")}
                      >
                        {t("inputs.backToAutoAction")}
                      </button>
                    </div>
                    <div className="field-list">
                      {requiredFieldKeys.map((key) => (
                        <PathField
                          key={key}
                          fieldKey={key}
                          selectedPath={requiredPaths[key]}
                          required
                          error={validationErrors[key]}
                          onPick={() => chooseRequiredFile(key)}
                          onClear={() => clearRequiredFile(key)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="input-section">
                    <h3>{t("inputs.optionalSectionTitle")}</h3>
                    <p>{t("inputs.optionalSectionDescription")}</p>
                    <div className="field-list">
                      {optionalFieldKeys.map((key) => (
                        <PathField
                          key={key}
                          fieldKey={key}
                          selectedPath={optionalPaths[key]}
                          required={false}
                          onPick={() => chooseOptionalFile(key)}
                          onClear={() => clearOptionalFile(key)}
                        />
                      ))}
                    </div>
                  </section>
                </>
              )}

              <section className="input-section">
                <h3>{t("inputs.outputSectionTitle")}</h3>
                <p>{t("inputs.outputSectionDescription")}</p>
                <DirectoryField
                  label={t("inputs.outputLabel")}
                  hint={t("inputs.outputHint")}
                  placeholder={t("inputs.outputPlaceholder")}
                  path={outputDir}
                  error={validationErrors.outputDir}
                  onPick={chooseOutputDirectory}
                  onClear={clearOutputDirectory}
                />
              </section>
            </div>

            {!formValid && (
              <div className="callout callout-warning">
                {t("inputs.validationHelp")}
              </div>
            )}

            {notice && screen === "inputs" && (
              <Callout tone={notice.tone}>{notice.text}</Callout>
            )}

            <div className="panel-actions">
              <button
                className="primary-button"
                type="button"
                onClick={() => goToScreen("build")}
                disabled={!formValid}
              >
                {t("inputs.primaryAction")}
              </button>
              <button
                className="tertiary-button"
                type="button"
                onClick={() => goToScreen("welcome")}
              >
                {t("inputs.secondaryAction")}
              </button>
            </div>
          </section>
        )}

        {screen === "build" && (
          <section className="panel">
            <header className="panel-header">
              <div>
                <span className="section-kicker">{t("build.kicker")}</span>
                <h2>{t("build.title")}</h2>
                <p>{t("build.description")}</p>
              </div>
              <span
                className={
                  buildRun.status === "failure"
                    ? "status-chip status-chip-warning"
                    : buildRun.status === "success"
                      ? "status-chip status-chip-ready"
                      : buildRun.status === "running"
                        ? "status-chip status-chip-running"
                        : "status-chip"
                }
              >
                {buildStatusLabel}
              </span>
            </header>

            <Callout
              tone={
                buildRun.status === "failure"
                  ? "warning"
                  : buildRun.status === "success"
                    ? "success"
                    : "neutral"
              }
            >
              {buildRun.status === "failure"
                ? t("build.focus.failure")
                : buildRun.status === "success"
                  ? t("build.focus.success")
                  : t("build.focus.idle")}
            </Callout>

            <div className="build-summary-grid">
              <RunStatusCard
                directory={
                  preflightState.runResultDirectory || t("build.sourceManualValue")
                }
                statusLabel={t(`runStatus.${currentRunStatusKey}.label`)}
                statusHint={t(`runStatus.${currentRunStatusKey}.hint`)}
                tone={currentRunStatusTone}
                actionLabel={
                  buildRun.status === "success"
                    ? t("build.summary.readyAction")
                    : t("build.summary.buildAction")
                }
                title={t("build.runCard.title")}
                directoryLabel={t("build.runCard.directoryLabel")}
                sourceLabel={
                  preflightState.runResultDirectory
                    ? t("build.runCard.sourceDirectory")
                    : t("build.runCard.sourceManual")
                }
              />

              <section className="preflight-card compact-summary-card">
                <h3>{t("build.outputCard.title")}</h3>
                <p>{t("build.outputCard.description")}</p>
                <PathDisplay path={preflightState.outputDir} />
              </section>
            </div>

            <div className="panel-actions">
              <button
                className="tertiary-button"
                type="button"
                onClick={() => setBuildDetailsVisible((current) => !current)}
              >
                {buildDetailsVisible
                  ? t("build.hideDetailsAction")
                  : t("build.showDetailsAction")}
              </button>
            </div>

            {buildDetailsVisible && (
              <div className="preflight-grid">
                {preflightState.runResultDirectory && (
                  <section className="preflight-card">
                    <h3>{t("build.preflight.sourceDirectoryTitle")}</h3>
                    <p>{t("build.preflight.sourceDirectoryDescription")}</p>
                    <PathDisplay path={preflightState.runResultDirectory} />
                  </section>
                )}

                <section className="preflight-card">
                  <h3>{t("build.preflight.requiredTitle")}</h3>
                  <p>{t("build.preflight.requiredDescription")}</p>
                  <ReadonlyList items={preflightState.requiredFiles} />
                </section>

                <section className="preflight-card">
                  <h3>{t("build.preflight.optionalTitle")}</h3>
                  <p>{t("build.preflight.optionalDescription")}</p>
                  <ReadonlyList items={preflightState.optionalFiles} />
                </section>

                <section className="preflight-card">
                  <h3>{t("build.preflight.outputTitle")}</h3>
                  <p>{t("build.preflight.outputDescription")}</p>
                  <PathDisplay path={preflightState.outputDir} />
                </section>
              </div>
            )}

            {buildRun.status === "running" && (
              <Callout tone="neutral">{t("build.runningCallout")}</Callout>
            )}

            {buildRun.status === "failure" && (
              <div className="failure-stack">
                <Callout tone="warning">
                  <strong>{t("build.failure.title")}</strong>
                  <span>{t(buildFailureMessageKey(buildRun.run.error.error_code))}</span>
                  <small>
                    {buildRun.run.error.error_code}: {buildRun.run.error.message}
                  </small>
                </Callout>
                <div className="debug-panel">
                  <h3>{t("build.failure.detailsTitle")}</h3>
                  <pre>{failureDebugDetails}</pre>
                </div>
              </div>
            )}

            {notice && screen === "build" && (
              <Callout tone={notice.tone}>{notice.text}</Callout>
            )}

            <div className="panel-actions">
              <button
                className="primary-button"
                type="button"
                onClick={runBuild}
                disabled={!formValid || buildRun.status === "running"}
              >
                {buildButtonLabel}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => goToScreen("inputs")}
                disabled={buildRun.status === "running"}
              >
                {t("build.secondaryAction")}
              </button>
            </div>
          </section>
        )}

        {screen === "result" && resultData && (
          <section className="panel">
            <header className="panel-header">
              <div>
                <span className="section-kicker">{t("result.kicker")}</span>
                <h2>{t("result.successTitle")}</h2>
                <p>{t("result.successDescription")}</p>
              </div>
              <span className="status-chip status-chip-ready">
                {t("result.statusSuccess")}
              </span>
            </header>

            <section className="delivery-focus-card">
              <div className="delivery-focus-header">
                <div>
                  <h3>{t("result.deliveryCard.title")}</h3>
                  <p>{t("result.deliveryCard.body")}</p>
                </div>
                <span className="status-chip status-chip-ready">
                  {t("result.deliveryCard.status")}
                </span>
              </div>
              <div className="delivery-focus-grid">
                <PathGroup
                  label={t("result.deliveryCard.pdfLabel")}
                  path={deliveryPdfAvailable ? deliveryPdfPath : ""}
                  emptyText={
                    deliveryAssetState.status === "checking"
                      ? t("result.deliveryCard.pdfChecking")
                      : t("result.deliveryCard.pdfMissing")
                  }
                  error={
                    deliveryAssetState.status === "missing"
                      ? t("result.deliveryCard.pdfFallback")
                      : undefined
                  }
                />
                <PathGroup
                  label={t("result.deliveryCard.directoryLabel")}
                  path={resultData.packDir}
                />
              </div>

              {deliveryAssetState.status === "missing" && (
                <Callout tone="warning">
                  <strong>{t("result.pdfFallbackTitle")}</strong>
                  <span>{t("result.pdfFallbackBody")}</span>
                </Callout>
              )}

              <div className="panel-actions delivery-action-row">
                <button
                  className="primary-button"
                  type="button"
                  onClick={handleOpenPdfReport}
                >
                  {deliveryPdfAvailable
                    ? t("result.openPdfAction")
                    : t("result.openMarkdownAction")}
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={handleCopyPdfPath}
                >
                  {deliveryPdfAvailable
                    ? t("result.copyPdfPathAction")
                    : t("result.copyMarkdownPathAction")}
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={handleOpenFolder}
                >
                  {t("result.openFolderAction")}
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={handleCopySaveLocation}
                >
                  {t("result.copySaveLocationAction")}
                </button>
                <button
                  className="tertiary-button"
                  type="button"
                  onClick={() =>
                    setResultDetailsVisible((current) => !current)
                  }
                >
                  {resultDetailsVisible
                    ? t("result.hideDetailsAction")
                    : t("result.showDetailsAction")}
                </button>
              </div>
            </section>

            {resultDetailsVisible && (
              <div className="result-section-stack">
                <section className="inventory-panel result-section-panel">
                  <h3>{t("result.cards.packDir.title")}</h3>
                  <p>{t("result.cards.packDir.body")}</p>
                  <div className="result-path-grid">
                    <PathGroup
                      label={t("result.cards.packDir.title")}
                      path={resultData.packDir}
                    />
                    <PathGroup
                      label={t("result.cards.pdf.title")}
                      path={deliveryPdfAvailable ? deliveryPdfPath : ""}
                      emptyText={t("result.cards.pdf.empty")}
                    />
                    <PathGroup
                      label={t("result.cards.index.title")}
                      path={resultData.indexPath}
                    />
                    <PathGroup
                      label={t("result.cards.report.title")}
                      path={resultData.reportPath}
                    />
                  </div>
                </section>

                <div className="inventory-grid">
                  <div className="inventory-panel result-section-panel">
                    <h3>{t("result.primaryFilesTitle")}</h3>
                    <ul className="path-list">
                      {Object.entries(resultData.primaryFiles).map(([key, value]) => (
                        <li key={key}>
                          <PathGroup
                            label={t(`result.primaryFiles.${key}`)}
                            path={value}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="inventory-panel result-section-panel">
                    <h3>{t("result.supportingFilesTitle")}</h3>
                    <ul className="path-list">
                      {optionalFieldKeys.map((key) => {
                        const supportingKey =
                          key === "publicKey"
                            ? "public_key"
                            : key === "runtimeEvents"
                              ? "runtime_events"
                              : "manifest";
                        const value = resultData.supportingFiles[supportingKey];

                        return (
                          <li key={key}>
                            <PathGroup
                              label={t(`inputs.fields.${key}.label`)}
                              path={value || ""}
                              emptyText={t("result.optionalNotIncluded")}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {notice && screen === "result" && (
              <Callout tone={notice.tone}>{notice.text}</Callout>
            )}
          </section>
        )}

        {screen === "result" && buildRun.status === "failure" && (
          <section className="panel">
            <header className="panel-header">
              <div>
                <span className="section-kicker">{t("result.kicker")}</span>
                <h2>{t("result.failureTitle")}</h2>
                <p>{t(buildFailureMessageKey(buildRun.run.error.error_code))}</p>
              </div>
              <span className="status-chip status-chip-warning">
                {t("result.statusFailure")}
              </span>
            </header>

            <div className="inventory-panel">
              <h3>{t("result.failureDetailsTitle")}</h3>
              <ul>
                <li>
                  <strong>{t("result.errorCodeLabel")}</strong>
                  <span>{buildRun.run.error.error_code}</span>
                </li>
                <li>
                  <strong>{t("result.errorMessageLabel")}</strong>
                  <span>{buildRun.run.error.message}</span>
                </li>
              </ul>
            </div>

            <div className="debug-panel">
              <h3>{t("result.rawDetailsTitle")}</h3>
              <pre>{failureDebugDetails}</pre>
            </div>

            <div className="panel-actions">
              <button className="primary-button" type="button" onClick={runBuild}>
                {t("build.primaryActionRetry")}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => goToScreen("inputs")}
              >
                {t("build.secondaryAction")}
              </button>
            </div>
          </section>
        )}

        {screen === "result" &&
          !resultData &&
          buildRun.status !== "failure" && (
            <section className="panel">
              <header className="panel-header">
                <div>
                  <span className="section-kicker">{t("result.kicker")}</span>
                  <h2>{t("result.emptyTitle")}</h2>
                  <p>{t("result.emptyDescription")}</p>
                </div>
                <span className="status-chip">{t("result.statusEmpty")}</span>
              </header>

              <div className="result-grid">
                <ResultCard
                  title={t("result.cards.packDir.title")}
                  description={t("result.cards.packDir.body")}
                  value={emptyResultPaths.packDir}
                />
                <ResultCard
                  title={t("result.cards.index.title")}
                  description={t("result.cards.index.body")}
                  value={emptyResultPaths.indexPath}
                />
                <ResultCard
                  title={t("result.cards.report.title")}
                  description={t("result.cards.report.body")}
                  value={emptyResultPaths.reportPath}
                />
              </div>

              <div className="inventory-panel">
                <h3>{t("result.inventoryTitle")}</h3>
                <ul>
                  {preflightState.requiredFiles.map((item) => (
                    <li key={item.key}>
                      <PathGroup
                        label={item.label}
                        path={item.path}
                        emptyText={t("common.notSelected")}
                      />
                    </li>
                  ))}
                  {preflightState.optionalFiles.map((item) => (
                    <li key={item.key}>
                      <PathGroup
                        label={item.label}
                        path={item.path}
                        emptyText={t("result.optionalNotIncluded")}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel-actions">
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => goToScreen("build")}
                >
                  {t("result.goToBuildAction")}
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => goToScreen("inputs")}
                >
                  {t("build.secondaryAction")}
                </button>
              </div>
            </section>
          )}
      </main>
    </div>
  );
}

function PathField({
  fieldKey,
  selectedPath,
  required,
  error,
  onPick,
  onClear,
}: {
  fieldKey: FieldKey;
  selectedPath: string;
  required: boolean;
  error?: string;
  onPick: () => void;
  onClear: () => void;
}) {
  const { t } = useI18n();
  const hasValue = Boolean(selectedPath);

  return (
    <article className={error ? "field-card field-card-error" : "field-card"}>
      <div className="field-copy">
        <div className="field-header">
          <h4>{t(`inputs.fields.${fieldKey}.label`)}</h4>
          <span className={required ? "field-badge required" : "field-badge"}>
            {required ? t("common.required") : t("common.optional")}
          </span>
        </div>
        <p>{t(`inputs.fields.${fieldKey}.hint`)}</p>
        {error && <div className="field-error">{error}</div>}
      </div>

      <div className="field-controls">
        {hasValue ? (
          <div className="path-value">
            <strong>{basenameFromPath(selectedPath)}</strong>
            <small>{selectedPath}</small>
          </div>
        ) : (
          <div className="path-placeholder">{t("common.notSelected")}</div>
        )}

        <div className="field-actions">
          <button className="secondary-button" type="button" onClick={onPick}>
            {hasValue ? t("common.replaceFile") : t("common.selectFile")}
          </button>
          {hasValue && (
            <button className="tertiary-button" type="button" onClick={onClear}>
              {t("common.clear")}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function RunStatusCard({
  actionLabel,
  directory,
  directoryLabel,
  sourceLabel,
  statusHint,
  statusLabel,
  title,
  tone,
}: {
  actionLabel: string;
  directory: string;
  directoryLabel?: string;
  sourceLabel?: string;
  statusHint: string;
  statusLabel: string;
  title?: string;
  tone: NoticeTone;
}) {
  const { t } = useI18n();

  return (
    <article className="run-status-card">
      <div className="run-status-card-header">
        <div>
          <h3>{title ?? t("inputs.latestResult.cardTitle")}</h3>
          <p>{sourceLabel ?? t("inputs.latestResult.cardSourceInbox")}</p>
        </div>
        <span
          className={
            tone === "success"
              ? "status-chip status-chip-ready"
              : "status-chip status-chip-warning"
          }
        >
          {statusLabel}
        </span>
      </div>

      <div className="run-status-metadata">
        <div className="run-status-metadata-item">
          <strong>{directoryLabel ?? t("inputs.latestResult.directoryLabel")}</strong>
          <PathDisplay path={directory} />
        </div>
        <div className="run-status-metadata-item">
          <strong>{t("inputs.latestResult.actionLabel")}</strong>
          <span>{actionLabel}</span>
        </div>
      </div>

      <p className="run-status-hint">{statusHint}</p>
    </article>
  );
}

function RecentRunCard({
  directory,
  directoryLabel,
  onSelect,
  onViewDetails,
  reviewPackLabel,
  selectLabel,
  selected,
  sourceLabel,
  statusHint,
  statusLabel,
  timeLabel,
  title,
  tone,
  verificationLabel,
  viewDetailsLabel,
}: {
  directory: string;
  directoryLabel: string;
  onSelect: () => void;
  onViewDetails: () => void;
  reviewPackLabel: string;
  selectLabel: string;
  selected: boolean;
  sourceLabel: string;
  statusHint: string;
  statusLabel: string;
  timeLabel: string;
  title: string;
  tone: NoticeTone;
  verificationLabel: string;
  viewDetailsLabel: string;
}) {
  return (
    <article className={selected ? "recent-run-card selected" : "recent-run-card"}>
      <div className="recent-run-card-header">
        <div>
          <h4>{title}</h4>
          <p>{timeLabel}</p>
        </div>
        <span
          className={
            tone === "success"
              ? "status-chip status-chip-ready"
              : "status-chip status-chip-warning"
          }
        >
          {statusLabel}
        </span>
      </div>

      <div className="recent-run-card-meta">
        <div className="recent-run-card-meta-item">
          <strong>{directoryLabel}</strong>
          <PathDisplay path={directory} />
        </div>
        <div className="recent-run-card-chip-row">
          <span className="status-chip">{sourceLabel}</span>
          <span className="status-chip">{verificationLabel}</span>
          <span className="status-chip">{reviewPackLabel}</span>
        </div>
      </div>

      <p className="run-status-hint">{statusHint}</p>

      <div className="panel-actions">
        <button className="secondary-button" type="button" onClick={onSelect}>
          {selectLabel}
        </button>
        <button className="tertiary-button" type="button" onClick={onViewDetails}>
          {viewDetailsLabel}
        </button>
      </div>
    </article>
  );
}

function DirectoryField({
  label,
  hint,
  placeholder,
  path,
  error,
  onPick,
  onClear,
}: {
  label: string;
  hint: string;
  placeholder: string;
  path: string;
  error?: string;
  onPick: () => void;
  onClear: () => void;
}) {
  const { t } = useI18n();
  const hasValue = Boolean(path);

  return (
    <div className={error ? "output-card field-card-error" : "output-card"}>
      <div className="field-copy">
        <strong>{label}</strong>
        <small>{hint}</small>
        {error && <div className="field-error">{error}</div>}
      </div>

      {hasValue ? (
        <PathDisplay path={path} />
      ) : (
        <div className="path-placeholder">{placeholder}</div>
      )}

      <div className="field-actions">
        <button className="secondary-button" type="button" onClick={onPick}>
          {hasValue ? t("common.replaceFolder") : t("common.selectFolder")}
        </button>
        {hasValue && (
          <button className="tertiary-button" type="button" onClick={onClear}>
            {t("common.clear")}
          </button>
        )}
      </div>
    </div>
  );
}

function ReadonlyList({ items }: { items: PreflightItem[] }) {
  const { t } = useI18n();

  return (
    <ul className="readonly-list">
      {items.map((item) => (
        <li key={item.key}>
          <PathGroup
            label={item.label}
            path={item.path}
            emptyText={t("common.notProvided")}
          />
        </li>
      ))}
    </ul>
  );
}

function ResultCard({
  description,
  title,
  value,
}: {
  description: string;
  title: string;
  value: string;
}) {
  return (
    <article className="result-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <PathDisplay path={value} />
    </article>
  );
}

function PathGroup({
  label,
  path,
  emptyText,
  error,
}: {
  label: string;
  path: string;
  emptyText?: string;
  error?: string;
}) {
  return (
    <div className="path-group">
      <strong>{label}</strong>
      {path ? (
        <PathDisplay path={path} />
      ) : (
        <span className={error ? "path-empty-error" : undefined}>
          {error || emptyText || ""}
        </span>
      )}
    </div>
  );
}

function PathDisplay({ path }: { path: string }) {
  return (
    <div className="path-value">
      <strong>{basenameFromPath(path)}</strong>
      <code className="path-inline-code">{path}</code>
    </div>
  );
}

function Callout({
  children,
  tone,
}: {
  children: ReactNode;
  tone: NoticeTone;
}) {
  const className =
    tone === "warning"
      ? "callout callout-warning"
      : tone === "success"
        ? "callout callout-success"
        : "callout";

  return <div className={className}>{children}</div>;
}

export default App;
