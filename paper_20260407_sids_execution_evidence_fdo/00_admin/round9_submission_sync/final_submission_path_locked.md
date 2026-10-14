# Final Submission Path Locked

## 日常工作默认

- tex：
  - `06_draft/round8_studyref_v3/main_study_safe_v3.tex`
- bib：
  - `06_draft/round8_studyref_v3/refs_compile_safe_v3.bib`

## 真正上传前恢复

- tex：
  - `07_submission/round9_submission_sync/main_submission_truth_synced_v1.tex`
- bib：
  - `07_submission/round8_zhref/en_restore_baseline/refs_en_locked.bib`

## 不要再用

- `07_submission/round8_zhref/en_restore_baseline/main_en_locked.tex` 作为最终上传 tex 入口
- `06_draft/round8_zhref/*`
- `06_draft/round8_studyref/*`
- 任何 `visible` / `experimental` bib

## 上传时究竟应该用哪套文件

- 继续工作与外部编译预备：
  - 用默认工作路径
- 真正生成最终 submission PDF：
  - 用 `main_submission_truth_synced_v1.tex` + `refs_en_locked.bib`
