import { invoke } from "@tauri-apps/api/core";
import {
  normalizeRunResultDetectionResult,
  type RawRunResultDetectionResult,
  type RunResultDetectionResult,
} from "./runResultDetection";

type RawRunInboxDiscoveryResult = {
  inbox_path: string;
  inbox_exists: boolean;
  latest_complete_result: RawRunResultDetectionResult | null;
  latest_complete_modified_ms: number | null;
  incomplete_directory_count: number;
  scanned_directory_count: number;
};

export type RunInboxDiscoveryResult = {
  inboxPath: string;
  inboxExists: boolean;
  latestCompleteResult: RunResultDetectionResult | null;
  latestCompleteModifiedMs: number | null;
  incompleteDirectoryCount: number;
  scannedDirectoryCount: number;
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
  };
}
