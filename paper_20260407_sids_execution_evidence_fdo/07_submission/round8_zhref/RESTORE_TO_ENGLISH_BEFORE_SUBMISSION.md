# RESTORE TO ENGLISH BEFORE SUBMISSION

正式提交前，必须按以下机械步骤切回英文 reference baseline。

## 步骤

1. 恢复英文 bib
   - 使用：`07_submission/round8_zhref/en_restore_baseline/refs_en_locked.bib`
   - 恢复目标：当前工作目录中的英文 reference layer 锁定库

2. 恢复英文 main tex
   - 使用：`07_submission/round8_zhref/en_restore_baseline/main_en_locked.tex`
   - 恢复目标：当前提交工作目录中的 `main.tex`

3. 恢复英文正文快照
   - 使用：`07_submission/round8_zhref/en_restore_baseline/full_shortpaper_en_locked.md`
   - 用途：人工核对当前 scientific text 与英文提交版是否一致

4. 恢复英文 references-in-use 清单
   - 使用：`07_submission/round8_zhref/en_restore_baseline/references_in_use_en_locked.md`
   - 用途：核对 citation key 与实际最小引用集

5. 恢复后先检查三件事
   - 引用条目是否已经全部恢复为英文
   - citation key 是否与中文工作版完全一致
   - PDF / portal 文本中的 reference layer 是否已经回到英文

## 一个重要说明

- 当前 `main_en_locked.tex` 是最接近最终 submission package 的英文恢复主文件。
- `refs_en_locked.bib` 是英文 reference layer 锁定库与核对基底。
- 因此提交前最稳做法是：
  - 先恢复 `main_en_locked.tex`
  - 再用 `refs_en_locked.bib` 做 reference layer 核对
  - 不要求 final submission main 必须继续使用 bib 调用方式

## 为什么不要手工逐条把中文条目改回英文

1. 手工逐条改回会增加 title 漂移风险
2. 手工逐条改回容易误伤 citation key
3. 手工逐条改回会让 submission package 与已锁定英文基底失去一致性

## 最稳做法

- 不做逐条回改
- 直接切回锁定英文基底
- 恢复后只做一致性检查
