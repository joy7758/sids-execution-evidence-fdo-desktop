# Tex Truth Decision

`生成新的 synced submission truth tex`

## 原因

1. `main_study_safe_v3.tex` 与 `main_en_locked.tex` 的 scientific text 实质等价，不需要重写科学内容。
2. 当前真正需要同步的是 submission path：
   - `main_study_safe_v3.tex` 走 bib 文件调用
   - `main_en_locked.tex` 仍是内嵌 `thebibliography`
3. 现有 reference architecture 已经明确：
   - 默认工作层是 compile-safe 英文 bib
   - submission truth bib 是英文 locked bib
4. 因此需要一个新的 submission truth tex，使 tex 与 bib 真正成套：
   - 不覆盖旧 `main_en_locked.tex`
   - 只新增 `main_submission_truth_synced_v1.tex`

## 本轮结论

- 当前唯一推荐的 submission truth tex 将切换为：
  - `07_submission/round9_submission_sync/main_submission_truth_synced_v1.tex`
