# RESTORE SUBMISSION FROM V3 STUDY MODE

正式提交前，按以下机械步骤恢复英文 submission mode：

1. 切回 `main_en_locked.tex`
   - 使用：`07_submission/round8_zhref/en_restore_baseline/main_en_locked.tex`

2. 切回 `refs_en_locked.bib`
   - 使用：`07_submission/round8_zhref/en_restore_baseline/refs_en_locked.bib`

3. 不要使用 `refs_compile_safe_v3.bib` 作为最终 submission bib
   - 它只是当前 compile-safe 工作层

4. 不要使用任何 visible / experimental study bib
   - 包括：
     - `refs_visible_study_experimental.bib`
     - `refs_working_bilingual_visible.bib`
     - `refs_working_bilingual_visible_study.bib`

5. 恢复后检查三件事
   - bibliography 是否全部为英文 canonical title
   - citation key 是否保持不变
   - PDF / portal 是否与 submission truth 一致
