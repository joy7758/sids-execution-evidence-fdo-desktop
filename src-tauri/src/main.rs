// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    let mut args = std::env::args().skip(1);
    if matches!(
        args.next().as_deref(),
        Some("--print-review-pack-output-dir")
    ) {
        match agent_evidence_desktop_lib::resolve_review_pack_output_directory_for_cli(args.next())
        {
            Ok(resolution) => {
                println!(
                    "{}",
                    serde_json::to_string(&resolution)
                        .expect("Review Pack output directory resolution is serializable")
                );
            }
            Err(error) => {
                eprintln!("{error}");
                std::process::exit(1);
            }
        }
        return;
    }

    agent_evidence_desktop_lib::run()
}
