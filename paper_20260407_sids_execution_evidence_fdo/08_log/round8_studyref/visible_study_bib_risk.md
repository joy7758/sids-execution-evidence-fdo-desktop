# Visible Study Bib Risk

`refs_working_bilingual_visible_study.bib` 只能作为试验文件。

## 为什么它只能试验

1. 它把中文 subtitle 直接放入 `title`
2. 它还可能在 `note` 中带入学习术语提示
3. 这会让 bibliography 显示层偏离 submission truth

## 为什么它不能默认 compile

1. 会增加 bibliography 行长
2. 会增加 CJK 渲染不稳定风险
3. 会增加页数和换行风险

## 为什么它不能 submission

1. submission truth 仍然是纯英文 locked bib
2. visible study bib 只是工作阅读辅助
3. 它不能作为 canonical source
