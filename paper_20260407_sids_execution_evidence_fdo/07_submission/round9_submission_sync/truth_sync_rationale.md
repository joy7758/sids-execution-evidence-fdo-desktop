# Truth Sync Rationale

## 为什么生成新的 synced truth

- 生成了新的 synced submission truth tex：
  - `main_submission_truth_synced_v1.tex`

## 为什么不生成新的 synced truth bib

- `refs_compile_safe_v3.bib` 与 `refs_en_locked.bib` 在当前 canonical fields 上完全一致。
- 因此没有必要重生新的 truth bib。

## 新 truth 与旧 truth 的关系

- 旧 `main_en_locked.tex`：
  - 保留为英文 locked baseline 的历史入口
  - 不再作为当前最推荐的最终上传 tex 入口
- 新 `main_submission_truth_synced_v1.tex`：
  - 科学文本与默认工作 tex 对齐
  - bibliography 路径与英文 locked bib 对齐

## 当前之后唯一推荐 submission truth

- tex：
  - `07_submission/round9_submission_sync/main_submission_truth_synced_v1.tex`
- bib：
  - `07_submission/round8_zhref/en_restore_baseline/refs_en_locked.bib`
