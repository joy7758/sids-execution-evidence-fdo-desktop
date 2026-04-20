use serde::Serialize;
use std::fs;
use std::path::PathBuf;
use std::time::UNIX_EPOCH;

#[derive(Serialize)]
struct DetectionWarning {
    kind: String,
    selected_path: String,
    candidate_paths: Vec<String>,
}

#[derive(Serialize)]
struct RunResultDetection {
    run_result_directory: String,
    bundle_path: Option<String>,
    receipt_path: Option<String>,
    summary_path: Option<String>,
    manifest_path: Option<String>,
    public_key_path: Option<String>,
    runtime_events_path: Option<String>,
    missing_required_fields: Vec<String>,
    warnings: Vec<DetectionWarning>,
}

#[derive(Serialize)]
struct RunInboxDiscovery {
    inbox_path: String,
    inbox_exists: bool,
    latest_complete_result: Option<RunResultDetection>,
    latest_complete_modified_ms: Option<u64>,
    incomplete_directory_count: usize,
    scanned_directory_count: usize,
}

#[derive(Clone)]
struct Candidate {
    score: usize,
    path: String,
}

#[derive(Copy, Clone)]
enum DetectionKind {
    Bundle,
    Receipt,
    Summary,
    Manifest,
    PublicKey,
    RuntimeEvents,
}

fn candidate_for(kind: DetectionKind, path: &std::path::Path) -> Option<Candidate> {
    let name = path.file_name()?.to_string_lossy().to_lowercase();
    let absolute = path.to_string_lossy().into_owned();

    let score = match kind {
        DetectionKind::Bundle => {
            if !name.ends_with(".json") {
                return None;
            }

            if name == "langchain-evidence.bundle.json" {
                500
            } else if name == "bundle.json" {
                450
            } else if name.contains("evidence") && name.contains("bundle") {
                400
            } else if name.contains("bundle") {
                300
            } else {
                return None;
            }
        }
        DetectionKind::Receipt => {
            if !name.ends_with(".json") {
                return None;
            }

            if name == "receipt.json" {
                500
            } else if name.contains("receipt") {
                300
            } else {
                return None;
            }
        }
        DetectionKind::Summary => {
            if !name.ends_with(".json") {
                return None;
            }

            if name == "summary.json" {
                500
            } else if name.contains("summary") {
                300
            } else {
                return None;
            }
        }
        DetectionKind::Manifest => {
            if !name.ends_with(".json") || !name.contains("manifest") {
                return None;
            }

            if name == "langchain-evidence.manifest.json" {
                500
            } else if name == "manifest.json" {
                450
            } else {
                300
            }
        }
        DetectionKind::PublicKey => {
            if !name.ends_with(".pem") || !name.contains("public") {
                return None;
            }

            if name == "manifest-public.pem" {
                500
            } else {
                300
            }
        }
        DetectionKind::RuntimeEvents => {
            if !name.ends_with(".jsonl") {
                return None;
            }

            if name == "runtime-events.jsonl" {
                500
            } else if name.contains("runtime") && name.contains("event") {
                300
            } else {
                return None;
            }
        }
    };

    Some(Candidate {
        score,
        path: absolute,
    })
}

fn collect_files(root: &std::path::Path, files: &mut Vec<PathBuf>) -> Result<(), String> {
    let entries = fs::read_dir(root)
        .map_err(|error| format!("Could not read directory {}: {}", root.display(), error))?;

    for entry in entries {
        let entry = entry.map_err(|error| {
            format!(
                "Could not inspect a child entry in {}: {}",
                root.display(),
                error
            )
        })?;
        let path = entry.path();

        if path.is_file() {
            files.push(path);
        }
    }

    Ok(())
}

fn modified_time_millis(path: &std::path::Path) -> u64 {
    fs::metadata(path)
        .ok()
        .and_then(|metadata| metadata.modified().ok())
        .and_then(|time| time.duration_since(UNIX_EPOCH).ok())
        .map(|duration| duration.as_millis() as u64)
        .unwrap_or(0)
}

fn kind_key(kind: DetectionKind) -> &'static str {
    match kind {
        DetectionKind::Bundle => "bundle",
        DetectionKind::Receipt => "receipt",
        DetectionKind::Summary => "summary",
        DetectionKind::Manifest => "manifest",
        DetectionKind::PublicKey => "publicKey",
        DetectionKind::RuntimeEvents => "runtimeEvents",
    }
}

fn pick_candidate(
    kind: DetectionKind,
    files: &[PathBuf],
) -> (Option<String>, Option<DetectionWarning>) {
    let mut candidates: Vec<Candidate> = files
        .iter()
        .filter_map(|path| candidate_for(kind, path))
        .collect();

    candidates.sort_by(|left, right| {
        right
            .score
            .cmp(&left.score)
            .then_with(|| left.path.cmp(&right.path))
    });

    if candidates.is_empty() {
        return (None, None);
    }

    let selected = candidates[0].path.clone();
    let warning = if candidates.len() > 1 {
        let candidate_paths = candidates
            .iter()
            .map(|candidate| candidate.path.clone())
            .collect::<Vec<String>>();
        Some(DetectionWarning {
            kind: kind_key(kind).to_string(),
            selected_path: selected.clone(),
            candidate_paths,
        })
    } else {
        None
    };

    (Some(selected), warning)
}

fn detect_run_result_directory_internal(
    directory_path: &std::path::Path,
) -> Result<RunResultDetection, String> {
    let mut files = Vec::new();
    collect_files(directory_path, &mut files)?;

    let (bundle_path, bundle_warning) = pick_candidate(DetectionKind::Bundle, &files);
    let (receipt_path, receipt_warning) = pick_candidate(DetectionKind::Receipt, &files);
    let (summary_path, summary_warning) = pick_candidate(DetectionKind::Summary, &files);
    let (manifest_path, manifest_warning) = pick_candidate(DetectionKind::Manifest, &files);
    let (public_key_path, public_key_warning) = pick_candidate(DetectionKind::PublicKey, &files);
    let (runtime_events_path, runtime_events_warning) =
        pick_candidate(DetectionKind::RuntimeEvents, &files);

    let mut warnings = Vec::new();
    for warning in [
        bundle_warning,
        receipt_warning,
        summary_warning,
        manifest_warning,
        public_key_warning,
        runtime_events_warning,
    ] {
        if let Some(warning) = warning {
            warnings.push(warning);
        }
    }

    let mut missing_required_fields = Vec::new();
    if bundle_path.is_none() {
        missing_required_fields.push("bundle".to_string());
    }
    if receipt_path.is_none() {
        missing_required_fields.push("receipt".to_string());
    }
    if summary_path.is_none() {
        missing_required_fields.push("summary".to_string());
    }

    Ok(RunResultDetection {
        run_result_directory: directory_path.to_string_lossy().into_owned(),
        bundle_path,
        receipt_path,
        summary_path,
        manifest_path,
        public_key_path,
        runtime_events_path,
        missing_required_fields,
        warnings,
    })
}

fn default_run_inbox_path() -> Result<PathBuf, String> {
    let home = std::env::var_os("HOME").ok_or_else(|| "HOME was not available".to_string())?;
    Ok(PathBuf::from(home).join("AgentEvidence").join("runs"))
}

#[tauri::command]
fn detect_run_result_directory(directory: String) -> Result<RunResultDetection, String> {
    let directory_path = PathBuf::from(&directory);
    if !directory_path.exists() {
        return Err(format!(
            "Run result directory was not found: {}",
            directory_path.display()
        ));
    }

    if !directory_path.is_dir() {
        return Err(format!(
            "Selected path is not a directory: {}",
            directory_path.display()
        ));
    }

    detect_run_result_directory_internal(&directory_path)
}

#[tauri::command]
fn discover_run_inbox() -> Result<RunInboxDiscovery, String> {
    let inbox_path = default_run_inbox_path()?;
    let inbox_path_string = inbox_path.to_string_lossy().into_owned();

    if !inbox_path.exists() {
        return Ok(RunInboxDiscovery {
            inbox_path: inbox_path_string,
            inbox_exists: false,
            latest_complete_result: None,
            latest_complete_modified_ms: None,
            incomplete_directory_count: 0,
            scanned_directory_count: 0,
        });
    }

    if !inbox_path.is_dir() {
        return Err(format!(
            "Run inbox path is not a directory: {}",
            inbox_path.display()
        ));
    }

    let entries = fs::read_dir(&inbox_path).map_err(|error| {
        format!(
            "Could not inspect run inbox {}: {}",
            inbox_path.display(),
            error
        )
    })?;

    let mut latest_complete_result = None;
    let mut latest_complete_modified_ms = None;
    let mut incomplete_directory_count = 0usize;
    let mut scanned_directory_count = 0usize;

    for entry in entries {
        let entry = entry.map_err(|error| {
            format!(
                "Could not inspect a child entry in run inbox {}: {}",
                inbox_path.display(),
                error
            )
        })?;

        let candidate_path = entry.path();
        if !candidate_path.is_dir() {
            continue;
        }

        scanned_directory_count += 1;

        let Ok(detection) = detect_run_result_directory_internal(&candidate_path) else {
            continue;
        };
        let modified_ms = modified_time_millis(&candidate_path);

        if detection.missing_required_fields.is_empty() {
            let should_replace = latest_complete_modified_ms
                .map(|current| modified_ms >= current)
                .unwrap_or(true);

            if should_replace {
                latest_complete_modified_ms = Some(modified_ms);
                latest_complete_result = Some(detection);
            }
        } else {
            incomplete_directory_count += 1;
        }
    }

    Ok(RunInboxDiscovery {
        inbox_path: inbox_path_string,
        inbox_exists: true,
        latest_complete_result,
        latest_complete_modified_ms,
        incomplete_directory_count,
        scanned_directory_count,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            detect_run_result_directory,
            discover_run_inbox
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
