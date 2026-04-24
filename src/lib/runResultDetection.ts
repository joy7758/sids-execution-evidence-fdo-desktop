import { invoke } from "@tauri-apps/api/core";

export type DetectionRequiredFieldKey = "bundle" | "receipt" | "summary";
export type DetectionWarningKind =
  | "bundle"
  | "receipt"
  | "summary"
  | "manifest"
  | "publicKey"
  | "runtimeEvents";

export type RawDetectionWarning = {
  kind: DetectionWarningKind;
  selected_path: string;
  candidate_paths: string[];
};

export type DetectionWarning = {
  kind: DetectionWarningKind;
  selectedPath: string;
  candidatePaths: string[];
};

export type RawRunResultDetectionResult = {
  run_result_directory: string;
  bundle_path: string | null;
  receipt_path: string | null;
  summary_path: string | null;
  manifest_path: string | null;
  public_key_path: string | null;
  runtime_events_path: string | null;
  missing_required_fields: DetectionRequiredFieldKey[];
  warnings: RawDetectionWarning[];
};

export type RunResultDetectionResult = {
  runResultDirectory: string;
  bundlePath: string;
  receiptPath: string;
  summaryPath: string;
  manifestPath: string;
  publicKeyPath: string;
  runtimeEventsPath: string;
  missingRequiredFields: DetectionRequiredFieldKey[];
  warnings: DetectionWarning[];
};

function normalizePath(value: string | null | undefined) {
  return value ?? "";
}

export function normalizeRunResultDetectionResult(
  result: RawRunResultDetectionResult,
): RunResultDetectionResult {
  return {
    runResultDirectory: result.run_result_directory,
    bundlePath: normalizePath(result.bundle_path),
    receiptPath: normalizePath(result.receipt_path),
    summaryPath: normalizePath(result.summary_path),
    manifestPath: normalizePath(result.manifest_path),
    publicKeyPath: normalizePath(result.public_key_path),
    runtimeEventsPath: normalizePath(result.runtime_events_path),
    missingRequiredFields: result.missing_required_fields,
    warnings: result.warnings.map((warning) => ({
      kind: warning.kind,
      selectedPath: warning.selected_path,
      candidatePaths: warning.candidate_paths,
    })),
  };
}

export async function detectRunResultDirectory(
  directory: string,
): Promise<RunResultDetectionResult> {
  const result = await invoke<RawRunResultDetectionResult>(
    "detect_run_result_directory",
    {
      directory,
    },
  );

  return normalizeRunResultDetectionResult(result);
}
