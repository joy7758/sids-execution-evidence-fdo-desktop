# RESTORE SUBMISSION ENGLISH MODE

正式提交前，按以下机械步骤恢复英文 submission mode：

1. 切回 `main_en_locked.tex`
   - 使用：`07_submission/round8_zhref/en_restore_baseline/main_en_locked.tex`

2. 切回 `refs_en_locked.bib`
   - 使用：`07_submission/round8_zhref/en_restore_baseline/refs_en_locked.bib`

3. 不要用 `refs_working_bilingual_visible.bib`
   - 它只是 working-only 可见试验版

4. safe bilingual bib 也不作为最终提交 bib
   - `refs_working_bilingual_safe.bib` 只是当前工作层

5. 恢复后先检查三件事
   - bibliography 是否已经全部回到英文 canonical title
   - citation key 是否与 working layer 完全一致
   - main.tex 是否已经回到英文 locked submission source

6. 为什么现在不要手工逐条删除中文 subtitle
   - 手工删除最容易造成 title 漂移
   - 也容易误改 entry 字段
   - 当前最稳做法始终是：直接切回英文锁定基底
