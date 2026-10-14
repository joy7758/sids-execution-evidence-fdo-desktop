# Why Bilingual Is Safer

双语工作模式比“纯中文 title 工作版，提交前再逐条回切英文”更稳，原因如下：

1. `citation key` 完全不变
   - 双语模式不需要改 key，也不需要重新映射正文引用。

2. title 漂移风险更低
   - canonical 英文 title 直接保留在默认工作 bib 里。
   - 中文只作为 subtitle annotation，不会把唯一 title 字段整体替换掉。

3. 提交前恢复动作更机械
   - 不需要逐条删除中文。
   - 只需要切回英文锁定 bib 与英文锁定 tex/source。

4. 更适合当前已有英文恢复基底
   - 当前工程已经保留了 `refs_en_locked.bib`、`main_en_locked.tex` 等英文恢复基底。
   - 双语模式与这套恢复机制天然兼容。

5. 不要手工逐条删改 bib
   - 手工逐条删中文最容易误伤 title、note、type 或 citation key。
   - 双语模式的核心就是“切文件”，不是“删字段”。

6. 当前中文阅读体验更好
   - 人读清单可以直接显示“英文标题 + 中文字幕”。
   - visible bilingual 版也可以做工作试验，但不默认走 submission path。
