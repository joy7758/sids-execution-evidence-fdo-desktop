# Visible Bib Risk Note

`refs_working_bilingual_visible.bib` 不能作为默认 submission 路径，原因如下：

1. 它把中文 subtitle 直接写入 `title` 显示层
2. 这会放大 bibliography 长度
3. 在 IEEE / BibTeX / Overleaf 路径下更容易出现：
   - CJK 渲染问题
   - 行宽与换行不稳定
   - 页数压力增大

## 当前默认路径为什么是 safe bib + reading list

1. safe bib 保留英文 canonical title
2. 中文 subtitle 只放在 `x_zh_title`
3. 人读需求由 `references_working_bilingual.md` 承担
4. 这样能把“阅读层双语”和“提交层纯英”拆开
