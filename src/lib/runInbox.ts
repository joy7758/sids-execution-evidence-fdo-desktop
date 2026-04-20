import { invoke } from "@tauri-apps/api/core";
import {
  type DetectionRequiredFieldKey,
  normalizeRunResultDetectionResult,
  type RawRunResultDetectionResult,
  type RunResultDetectionResult,
} from "./runResultDetection";

type RawRunInboxItem = {
  run_id: string;
  source: string;
  modified_ms: number;
  run_result_directory: string;
  evidence_completeness: "complete" | "incomplete";
  verification_status: "hasReceipt" | "missingReceipt";
  review_pack_status: "generated" | "ready" | "needsAttention";
  needs_attention: boolean;
  missing_required_fields: DetectionRequiredFieldKey[];
  detection: RawRunResultDetectionResult;
};

type RawRunInboxDiscoveryResult = {
  inbox_path: string;
  inbox_exists: boolean;
  latest_complete_result: RawRunResultDetectionResult | null;
  latest_complete_modified_ms: number | null;
  incomplete_directory_count: number;
  scanned_directory_count: number;
  recent_runs: RawRunInboxItem[];
};

export type RunInboxItem = {
  runId: string;
  source: string;
  modifiedMs: number;
  runResultDirectory: string;
  evidenceCompleteness: "complete" | "incomplete";
  verificationStatus: "hasReceipt" | "missingReceipt";
  reviewPackStatus: "generated" | "ready" | "needsAttention";
  needsAttention: boolean;
  missingRequiredFields: DetectionRequiredFieldKey[];
  detection: RunResultDetectionResult;
};

export type RunInboxDiscoveryResult = {
  inboxPath: string;
  inboxExists: boolean;
  latestCompleteResult: RunResultDetectionResult | null;
  latestCompleteModifiedMs: number | null;
  incompleteDirectoryCount: number;
  scannedDirectoryCount: number;
  recentRuns: RunInboxItem[];
};

export async function discoverRunInbox(): Promise<RunInboxDiscoveryResult> {
  const result = await invoke<RawRunInboxDiscoveryResult>("discover_run_inbox");

  return {
    inboxPath: result.inbox_path,
    inboxExists: result.inbox_exists,
    latestCompleteResult: result.latest_complete_result
      ? normalizeRunResultDetectionResult(result.latest_complete_result)
      : null,
    latestCompleteModifiedMs: result.latest_complete_modified_ms,
    incompleteDirectoryCount: result.incomplete_directory_count,
    scannedDirectoryCount: result.scanned_directory_count,
    recentRuns: result.recent_runs.map((run) => ({
      runId: run.run_id,
      source: run.source,
      modifiedMs: run.modified_ms,
      runResultDirectory: run.run_result_directory,
      evidenceCompleteness: run.evidence_completeness,
      verificationStatus: run.verification_status,
      reviewPackStatus: run.review_pack_status,
      needsAttention: run.needs_attention,
      missingRequiredFields: run.missing_required_fields,
      detection: normalizeRunResultDetectionResult(run.detection),
    })),
  };
}
