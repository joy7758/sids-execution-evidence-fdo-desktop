# Safe Bib Field Parity Audit

| citation key | 英文锁定字段数 | 旧 safe bib 是否丢字段 | v2 是否已补齐 | 备注 |
| --- | --- | --- | --- | --- |
| `kahn2006framework` | 7 | 否 | 是 | 相对 `refs_en_locked.bib` 未发现字段缺失；v2 以镜像方式重建并追加 study fields |
| `dona2018doip` | 6 | 否 | 是 | 相对锁定基底未发现字段缺失；v2 保持 month 等字段 |
| `soilandreyes2024evaluating` | 6 | 否 | 是 | 相对锁定基底未发现字段缺失 |
| `groth2013provoverview` | 7 | 否 | 是 | 相对锁定基底未发现字段缺失；保留 url |
| `moreau2013provdm` | 7 | 否 | 是 | 相对锁定基底未发现字段缺失；保留 url |
| `cheney2013provconstraints` | 7 | 否 | 是 | 相对锁定基底未发现字段缺失；保留 url |
| `torresarias2019intoto` | 7 | 否 | 是 | 相对锁定基底未发现字段缺失；保留 publisher 与 url |
| `acm2020artifactbadging` | 5 | 否 | 是 | 相对锁定基底未发现字段缺失；保留 note 与 url |

## 结论

- 本轮对比的唯一 canonical bibliographic base 是 `refs_en_locked.bib`。
- 相对该锁定基底，旧 `refs_working_bilingual_safe.bib` 未发现字段缺失。
- 但旧 safe bib 没有显式完成“canonical 完整镜像 + study fields”这一层的机械锁定。
- 因此 v2 的价值在于：
  - 明确以 canonical base 逐条镜像生成
  - 系统追加 `x_zh_title / x_study_terms / x_study_gloss`
  - 保证之后不在 working bib 上手工来回改字段

## 额外说明

- 若有人期望 DOI 出现在更多条目中，那不是旧 safe bib 相对 `refs_en_locked.bib` 的丢失问题，而是当前英文锁定基底本身未收录该字段。
- 本轮遵守“以英文 locked bib 为唯一 canonical base”的规则，因此不擅自补入锁定基底外的 bibliographic fields。
