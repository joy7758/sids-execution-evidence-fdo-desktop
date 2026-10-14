# Bib Truth Diff

## 总判断

- `refs_compile_safe_v3.bib` 与 `refs_en_locked.bib` 的逐字 `diff` 为空。
- 当前 8 条实际使用引用在 canonical bibliographic fields 上没有差异。

| citation key | compile-safe bib 是否存在 | submission truth bib 是否存在 | fields 是否一致 | 是否存在 canonical 差异 | 是否影响最终 submission truth | 处理建议 |
| --- | --- | --- | --- | --- | --- | --- |
| `kahn2006framework` | 是 | 是 | 是：`author,title,journal,volume,number,pages,year` | 否 | 否 | 保持现有 submission truth bib |
| `dona2018doip` | 是 | 是 | 是：`author,title,institution,type,year,month` | 否 | 否 | 保持现有 submission truth bib |
| `soilandreyes2024evaluating` | 是 | 是 | 是：`author,title,journal,volume,pages,year` | 否 | 否 | 保持现有 submission truth bib |
| `groth2013provoverview` | 是 | 是 | 是：`author,title,institution,type,year,month,url` | 否 | 否 | 保持现有 submission truth bib |
| `moreau2013provdm` | 是 | 是 | 是：`author,title,institution,type,year,month,url` | 否 | 否 | 保持现有 submission truth bib |
| `cheney2013provconstraints` | 是 | 是 | 是：`author,title,institution,type,year,month,url` | 否 | 否 | 保持现有 submission truth bib |
| `torresarias2019intoto` | 是 | 是 | 是：`author,title,booktitle,pages,year,publisher,url` | 否 | 否 | 保持现有 submission truth bib |
| `acm2020artifactbadging` | 是 | 是 | 是：`author,title,year,note,url` | 否 | 否 | 保持现有 submission truth bib |

## 重点字段复核

- `title`：一致
- `author`：一致
- `journal / booktitle / institution / type`：一致
- `year / month`：一致
- `volume / number / pages`：一致
- `doi`：两边都未新增额外字段；当前 canonical truth 一致
- `url / note / publisher`：一致

## 结论

- 当前 bib truth 不需要重生。
