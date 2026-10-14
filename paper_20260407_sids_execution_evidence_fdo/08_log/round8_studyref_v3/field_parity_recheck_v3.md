# Field Parity Recheck V3

| citation key | 英文 locked bib 有哪些字段 | safe v2 是否完整保留 | 缺失字段有哪些 | 是否影响 canonical parity | v3 如何处理 |
| --- | --- | --- | --- | --- | --- |
| `kahn2006framework` | author, title, journal, volume, number, pages, year | 是 | 无 | 否 | v3 直接按 locked bib 纯英文镜像复制 |
| `dona2018doip` | author, title, institution, type, year, month | 是 | 无 | 否 | v3 直接按 locked bib 纯英文镜像复制 |
| `soilandreyes2024evaluating` | author, title, journal, volume, pages, year | 是 | 无 | 否 | v3 直接按 locked bib 纯英文镜像复制 |
| `groth2013provoverview` | author, title, institution, type, year, month, url | 是 | 无 | 否 | v3 直接按 locked bib 纯英文镜像复制 |
| `moreau2013provdm` | author, title, institution, type, year, month, url | 是 | 无 | 否 | v3 直接按 locked bib 纯英文镜像复制 |
| `cheney2013provconstraints` | author, title, institution, type, year, month, url | 是 | 无 | 否 | v3 直接按 locked bib 纯英文镜像复制 |
| `torresarias2019intoto` | author, title, booktitle, pages, year, publisher, url | 是 | 无 | 否 | v3 直接按 locked bib 纯英文镜像复制 |
| `acm2020artifactbadging` | author, title, year, note, url | 是 | 无 | 否 | v3 直接按 locked bib 纯英文镜像复制 |

## 特别检查项

- `doi`
  - 当前英文 locked bib 中：无
  - safe v2 中：无
  - v3 处理：不擅自新增
- `url`
  - 在 4, 5, 6, 7, 8 条中存在
  - safe v2 已保留
  - v3 继续完整保留
- `note`
  - 第 8 条存在
  - safe v2 已保留
  - v3 继续完整保留
- `publisher`
  - 第 7 条存在
  - safe v2 已保留
  - v3 继续完整保留
- `month`
  - 第 2, 4, 5, 6 条存在
  - safe v2 已保留
  - v3 继续完整保留
- `volume / number / pages`
  - 各条按 locked bib 已保留
  - v3 继续完整保留

## 结论

- 相对 `refs_en_locked.bib`，safe v2 没有丢失 canonical 字段。
- 但 safe v2 仍包含中文 study fields，不适合作为最保守的 compile-facing bib。
- v3 通过生成 `refs_compile_safe_v3.bib`，把 compile-facing 路径净化成纯英文 canonical 镜像。
