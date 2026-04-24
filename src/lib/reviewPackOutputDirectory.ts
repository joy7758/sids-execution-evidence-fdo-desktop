import { invoke } from "@tauri-apps/api/core";

export type ReviewPackOutputDirectorySource =
  | "user_selected"
  | "env_override"
  | "app_data_dir"
  | "fallback";

type RawReviewPackOutputDirectory = {
  output_dir: string;
  source: ReviewPackOutputDirectorySource;
};

export type ReviewPackOutputDirectory = {
  outputDir: string;
  source: ReviewPackOutputDirectorySource;
};

function normalizeRequestedDir(requestedDir?: string) {
  const trimmed = requestedDir?.trim();
  return trimmed ? trimmed : null;
}

export async function resolveReviewPackOutputDirectory(
  requestedDir?: string,
): Promise<ReviewPackOutputDirectory> {
  const result = await invoke<RawReviewPackOutputDirectory>(
    "resolve_review_pack_output_directory",
    {
      requestedDir: normalizeRequestedDir(requestedDir),
    },
  );

  return {
    outputDir: result.output_dir,
    source: result.source,
  };
}
