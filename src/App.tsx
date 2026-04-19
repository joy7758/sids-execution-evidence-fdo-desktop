import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { open } from "@tauri-apps/plugin-dialog";
import { openPath } from "@tauri-apps/plugin-opener";
import { useMemo, useState, type ReactNode } from "react";
import "./App.css";
import {
  runReviewPackBuild,
  type ReviewPackEngineInput,
  type ReviewPackEngineInvocation,
} from "./lib/reviewPackEngine";
import { useI18n } from "./i18n";

type Screen = "welcome" | "inputs" | "build" | "result";
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

const requiredFieldKeys: RequiredFieldKey[] = ["bundle", "receipt", "summary"];
const optionalFieldKeys: OptionalFieldKey[] = [
  "manifest",
  "publicKey",
  "runtimeEvents",
];
const screenOrder: Screen[] = ["welcome", "inputs", "build", "result"];

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

function App() {
  const { locale, setLocale, t } = useI18n();
  const [screen, setScreen] = useState<Screen>("welcome");
  const [requiredPaths, setRequiredPaths] = useState<RequiredFieldState>(
    emptyRequiredFieldState,
  );
  const [optionalPaths, setOptionalPaths] = useState<OptionalFieldState>(
    emptyOptionalFieldState,
  );
  const [outputDir, setOutputDir] = useState("");
  const [notice, setNotice] = useState<NoticeState>(null);
  const [buildRun, setBuildRun] = useState<BuildRunState>({ status: "idle" });

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
  const selectedOptionalCount = optionalFieldKeys.filter(
    (key) => Boolean(optionalPaths[key]),
  ).length;

  const preflightState = useMemo(
    () => ({
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
    [optionalPaths, outputDir, requiredPaths, t],
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

  function resetBuildFlow() {
    setBuildRun({ status: "idle" });
    setNotice(null);
  }

  function setPanelNotice(tone: NoticeTone, text: string) {
    setNotice({ tone, text });
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

  function goToScreen(target: Screen) {
    if (target === "build" && !formValid) {
      setScreen("inputs");
      setPanelNotice("warning", t("inputs.buildBlockedNotice"));
      return;
    }

    setNotice(null);
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

  async function handleCopyPath() {
    if (!resultData) {
      return;
    }

    try {
      await writeText(resultData.packDir);
      setPanelNotice("success", t("result.copyPathSuccess"));
    } catch {
      setPanelNotice("warning", t("result.copyPathFailed"));
    }
  }

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

            <div className="feature-grid">
              <article className="feature-card">
                <h3>{t("welcome.cards.input.title")}</h3>
                <p>{t("welcome.cards.input.body")}</p>
              </article>
              <article className="feature-card">
                <h3>{t("welcome.cards.output.title")}</h3>
                <p>{t("welcome.cards.output.body")}</p>
              </article>
              <article className="feature-card">
                <h3>{t("welcome.cards.boundary.title")}</h3>
                <p>{t("welcome.cards.boundary.body")}</p>
              </article>
            </div>

            <div className="panel-actions">
              <button
                className="primary-button"
                type="button"
                onClick={() => goToScreen("inputs")}
              >
                {t("welcome.primaryAction")}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => goToScreen("result")}
              >
                {t("welcome.secondaryAction")}
              </button>
            </div>
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
                  {t("inputs.requiredStatus", [
                    String(requiredReadyCount),
                    String(requiredFieldKeys.length),
                  ])}
                </span>
                <span className="status-chip">
                  {t("inputs.optionalStatus", [String(selectedOptionalCount)])}
                </span>
                <span
                  className={
                    formValid ? "status-chip status-chip-ready" : "status-chip"
                  }
                >
                  {t(
                    formValid
                      ? "inputs.formStatusReady"
                      : "inputs.formStatusBlocked",
                  )}
                </span>
              </div>
            </header>

            <div className="input-sections">
              <section className="input-section">
                <h3>{t("inputs.requiredSectionTitle")}</h3>
                <p>{t("inputs.requiredSectionDescription")}</p>
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

              <section className="input-section">
                <h3>{t("inputs.outputSectionTitle")}</h3>
                <p>{t("inputs.outputSectionDescription")}</p>
                <DirectoryField
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
                className="secondary-button"
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

            <div className="build-grid">
              <article
                className={
                  buildRun.status === "failure"
                    ? "build-card build-card-warning"
                    : "build-card active"
                }
              >
                <span>{t("build.cards.review.title")}</span>
                <strong>
                  {buildRun.status === "failure"
                    ? t("build.cards.review.stateNeedsAttention")
                    : buildRun.status === "running"
                      ? t("build.cards.review.stateLocked")
                      : buildRun.status === "success"
                        ? t("build.cards.review.stateConfirmed")
                        : t("build.cards.review.stateReady")}
                </strong>
                <p>{t("build.cards.review.body")}</p>
              </article>
              <article
                className={
                  buildRun.status === "running"
                    ? "build-card active"
                    : buildRun.status === "failure"
                      ? "build-card build-card-warning"
                      : buildRun.status === "success"
                        ? "build-card build-card-success"
                        : "build-card"
                }
              >
                <span>{t("build.cards.engine.title")}</span>
                <strong>
                  {buildRun.status === "running"
                    ? t("build.cards.engine.stateRunning")
                    : buildRun.status === "failure"
                      ? t("build.cards.engine.stateFailed")
                      : buildRun.status === "success"
                        ? t("build.cards.engine.stateReady")
                        : t("build.cards.engine.stateWaiting")}
                </strong>
                <p>{t("build.cards.engine.body")}</p>
              </article>
              <article
                className={
                  buildRun.status === "success"
                    ? "build-card build-card-success"
                    : buildRun.status === "failure"
                      ? "build-card build-card-warning"
                      : "build-card"
                }
              >
                <span>{t("build.cards.result.title")}</span>
                <strong>
                  {buildRun.status === "success"
                    ? t("build.cards.result.stateReady")
                    : buildRun.status === "running"
                      ? t("build.cards.result.statePreparing")
                      : buildRun.status === "failure"
                        ? t("build.cards.result.stateBlocked")
                        : t("build.cards.result.stateReserved")}
                </strong>
                <p>{t("build.cards.result.body")}</p>
              </article>
            </div>

            <div className="summary-strip">
              <span>
                {t("build.summary.requiredFiles", [String(requiredReadyCount)])}
              </span>
              <span>
                {t("build.summary.optionalFiles", [String(selectedOptionalCount)])}
              </span>
              <span>{t("build.summary.outputDirectory")}</span>
            </div>

            <div className="preflight-grid">
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

            {notice && screen === "result" && (
              <Callout tone={notice.tone}>{notice.text}</Callout>
            )}

            <div className="panel-actions">
              <button
                className="primary-button"
                type="button"
                onClick={handleOpenFolder}
              >
                {t("result.openFolderAction")}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={handleCopyPath}
              >
                {t("result.copyPathAction")}
              </button>
            </div>
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

function DirectoryField({
  path,
  error,
  onPick,
  onClear,
}: {
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
        <strong>{t("inputs.outputLabel")}</strong>
        <small>{t("inputs.outputHint")}</small>
        {error && <div className="field-error">{error}</div>}
      </div>

      {hasValue ? (
        <PathDisplay path={path} />
      ) : (
        <div className="path-placeholder">{t("inputs.outputPlaceholder")}</div>
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
}: {
  label: string;
  path: string;
  emptyText?: string;
}) {
  return (
    <div className="path-group">
      <strong>{label}</strong>
      {path ? <PathDisplay path={path} /> : <span>{emptyText}</span>}
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
