# Tex Truth Diff

## 总判断

- `main_study_safe_v3.tex` 与 `main_en_locked.tex` 的 scientific body 实质等价。
- 当前主要差异不在 scientific text，而在：
  - bibliography 实现方式
  - 文件头 comments / compile notes
- 这类差异会影响“上传时到底该用哪套 tex + bib”这一最终 truth 判定。

| section / component | default work tex 当前内容状态 | submission truth tex 当前内容状态 | 差异类型 | 是否影响最终 submission truth | 处理建议 |
| --- | --- | --- | --- | --- | --- |
| title | 相同 | 相同 | formatting | 否 | 保持一致 |
| abstract | 相同 | 相同 | scientific | 否 | 保持一致 |
| introduction | 相同 | 相同 | scientific | 否 | 保持一致 |
| method | 相同 | 相同 | scientific | 否 | 保持一致 |
| evaluation | 相同 | 相同 | scientific | 否 | 保持一致 |
| related work | 相同 | 相同 | scientific | 否 | 保持一致 |
| limits / conclusion | 相同 | 相同 | scientific | 否 | 保持一致 |
| bibliography target | 调用 `\\bibliography{refs_compile_safe_v3}` | 使用内嵌 `thebibliography`，未调用 `refs_en_locked.bib` | reference-layer | 是 | 生成新的 synced submission truth tex，使 submission truth tex 与英文 locked bib 成套 |
| author block | 相同 placeholder | 相同 placeholder | author-block | 否 | 保持一致；继续等待人工确认 |
| figure / table references | 相同；两张内嵌 figure，无外部表 | 相同；两张内嵌 figure，无外部表 | formatting | 否 | 保持一致 |
| comments / compile notes | working 路径说明 + sidecar 学习说明 | round7 final source 注释 + 无 bib 路径说明 | comments / hygiene | 低 | 在 synced truth tex 中改成 submission-facing 注释 |

## 结论

- 当前两个 tex 文件在科学文本上等价。
- 但现有 `main_en_locked.tex` 不是当前 reference architecture 下的最佳上传入口，因为它没有与 `refs_en_locked.bib` 构成明确的 tex+bib truth 组合。
