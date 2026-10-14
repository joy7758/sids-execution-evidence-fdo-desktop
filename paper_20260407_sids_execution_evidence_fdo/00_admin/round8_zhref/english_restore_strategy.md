# English Restore Strategy

## 为什么必须保留英文恢复基底

1. 当前只是把 reference layer 暂时切成中文工作版，不是把 submission 基底改成中文。
2. 正式提交仍应回到英文参考文献层，直接保留锁定英文文件比人工逐条改回更稳。
3. 这样可以保证：
   - scientific text 不漂移
   - citation key 不漂移
   - official-template submission source 不被中文工作层污染

## 提交前必须切回哪些文件

- `refs_en_locked.bib`
- `main_en_locked.tex`
- `full_shortpaper_en_locked.md`
- `references_in_use_en_locked.md`

## 切回时不要动哪些内容

- scientific text 主体
- title
- Branch A 事实边界
- 图表配置
- portal 文本中与 scientific claim 对齐的部分

## 恢复顺序

1. 用 `main_en_locked.tex` 恢复英文 template source
2. 用 `refs_en_locked.bib` 恢复英文 reference layer 锁定库
3. 用 `full_shortpaper_en_locked.md` 恢复英文正文快照
4. 用 `references_in_use_en_locked.md` 对照检查当前实际引用集
5. 恢复后只做一致性检查，不手工逐条翻回英文
