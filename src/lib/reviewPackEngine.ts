import { Command } from "@tauri-apps/plugin-shell";
import type { ReviewPackOutputDirectorySource } from "./reviewPackOutputDirectory";

const REVIEW_PACK_ENGINE_SIDECAR = "binaries/ae-review-pack-engine";

export type ReviewPackEngineInput = {
  bundlePath: string;
  receiptPath: string;
  summaryPath: string;
  outputDir: string;
  outputDirSource?: ReviewPackOutputDirectorySource;
  manifestPath?: string;
  publicKeyPath?: string;
  runtimeEventsPath?: string;
};

export type ReviewPackEngineSuccess = {
  ok: true;
  pack_dir: string;
  index_path: string;
  report_path: string;
  primary_files: {
    bundle: string;
    receipt: string;
    summary: string;
  };
  supporting_files: Partial<
    Record<"manifest" | "public_key" | "runtime_events" | "private_key", string>
  >;
};

export type ReviewPackEngineError = {
  ok: false;
  error_code: string;
  message: string;
  details?: unknown;
};

export type ReviewPackEngineInvocation =
  | {
      status: "success";
      result: ReviewPackEngineSuccess;
      stdout: string;
      stderr: string;
      exitCode: number;
      command: string[];
      reviewPackOutputDir: string;
      reviewPackOutputDirSource: ReviewPackOutputDirectorySource | null;
    }
  | {
      status: "failure";
      error: ReviewPackEngineError;
      stdout: string;
      stderr: string;
      exitCode: number | null;
      command: string[];
      reviewPackOutputDir: string;
      reviewPackOutputDirSource: ReviewPackOutputDirectorySource | null;
    };

function buildArgs(input: ReviewPackEngineInput): string[] {
  const args = [
    "build-review-pack",
    "--bundle-path",
    input.bundlePath,
    "--receipt-path",
    input.receiptPath,
    "--summary-path",
    input.summaryPath,
    "--output-dir",
    input.outputDir,
  ];

  if (input.manifestPath) {
    args.push("--manifest-path", input.manifestPath);
  }

  if (input.publicKeyPath) {
    args.push("--public-key-path", input.publicKeyPath);
  }

  if (input.runtimeEventsPath) {
    args.push("--runtime-events-path", input.runtimeEventsPath);
  }

  return args;
}

function tryParseJson(text: string): unknown | null {
  const trimmed = text.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

function isSuccessPayload(value: unknown): value is ReviewPackEngineSuccess {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;
  return (
    payload.ok === true &&
    typeof payload.pack_dir === "string" &&
    typeof payload.index_path === "string" &&
    typeof payload.report_path === "string" &&
    payload.primary_files !== null &&
    typeof payload.primary_files === "object" &&
    payload.supporting_files !== null &&
    typeof payload.supporting_files === "object"
  );
}

function isErrorPayload(value: unknown): value is ReviewPackEngineError {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;
  return (
    payload.ok === false &&
    typeof payload.error_code === "string" &&
    typeof payload.message === "string"
  );
}

function normalizeLaunchError(error: unknown): ReviewPackEngineError {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();

  if (
    lower.includes("not found") ||
    lower.includes("no such file") ||
    lower.includes("could not locate") ||
    lower.includes("spawn") ||
    lower.includes("failed to create process")
  ) {
    return {
      ok: false,
      error_code: "AE_REVIEW_PACK_ENGINE_NOT_FOUND",
      message: "Review Pack engine was not found on this machine.",
      details: { raw_error: message },
    };
  }

  if (lower.includes("denied") || lower.includes("permission")) {
    return {
      ok: false,
      error_code: "AE_REVIEW_PACK_ENGINE_PERMISSION_DENIED",
      message: "The desktop app was not allowed to execute the local Review Pack engine.",
      details: { raw_error: message },
    };
  }

  return {
    ok: false,
    error_code: "AE_REVIEW_PACK_ENGINE_EXECUTION_FAILED",
    message: "The desktop app could not start the local Review Pack engine.",
    details: { raw_error: message },
  };
}

function enrichErrorDetails(
  error: ReviewPackEngineError,
  input: ReviewPackEngineInput,
): ReviewPackEngineError {
  return {
    ...error,
    details: {
      ...(error.details !== null &&
      typeof error.details === "object" &&
      !Array.isArray(error.details)
        ? (error.details as Record<string, unknown>)
        : { raw_details: error.details ?? null }),
      review_pack_output_dir: input.outputDir,
      review_pack_output_dir_source: input.outputDirSource ?? null,
    },
  };
}

function normalizeUnexpectedResponse(params: {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  input: ReviewPackEngineInput;
}): ReviewPackEngineError {
  return {
    ok: false,
    error_code: "AE_REVIEW_PACK_ENGINE_INVALID_RESPONSE",
    message: "The local Review Pack engine returned an unexpected response.",
    details: {
      exit_code: params.exitCode,
      stdout: params.stdout,
      stderr: params.stderr,
      review_pack_output_dir: params.input.outputDir,
      review_pack_output_dir_source: params.input.outputDirSource ?? null,
    },
  };
}

export async function runReviewPackBuild(
  input: ReviewPackEngineInput,
): Promise<ReviewPackEngineInvocation> {
  const args = buildArgs(input);

  try {
    const output = await Command.sidecar(REVIEW_PACK_ENGINE_SIDECAR, args).execute();
    const stdout = output.stdout.trim();
    const stderr = output.stderr.trim();
    const parsed = tryParseJson(stdout) ?? tryParseJson(stderr);

    if (isSuccessPayload(parsed)) {
      return {
        status: "success",
        result: parsed,
        stdout,
        stderr,
        exitCode: output.code ?? 0,
        command: [REVIEW_PACK_ENGINE_SIDECAR, ...args],
        reviewPackOutputDir: input.outputDir,
        reviewPackOutputDirSource: input.outputDirSource ?? null,
      };
    }

    if (isErrorPayload(parsed)) {
      return {
        status: "failure",
        error: enrichErrorDetails(parsed, input),
        stdout,
        stderr,
        exitCode: output.code,
        command: [REVIEW_PACK_ENGINE_SIDECAR, ...args],
        reviewPackOutputDir: input.outputDir,
        reviewPackOutputDirSource: input.outputDirSource ?? null,
      };
    }

    return {
      status: "failure",
      error: normalizeUnexpectedResponse({
        stdout,
        stderr,
        exitCode: output.code,
        input,
      }),
      stdout,
      stderr,
      exitCode: output.code,
      command: [REVIEW_PACK_ENGINE_SIDECAR, ...args],
      reviewPackOutputDir: input.outputDir,
      reviewPackOutputDirSource: input.outputDirSource ?? null,
    };
  } catch (error) {
    return {
      status: "failure",
      error: enrichErrorDetails(normalizeLaunchError(error), input),
      stdout: "",
      stderr: "",
      exitCode: null,
      command: ["ae-review-pack-engine", ...args],
      reviewPackOutputDir: input.outputDir,
      reviewPackOutputDirSource: input.outputDirSource ?? null,
    };
  }
}
