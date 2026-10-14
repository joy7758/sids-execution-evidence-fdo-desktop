# Default Path Audit

| 检查项 | 状态 | 说明 |
| --- | --- | --- |
| 当前默认路径是否唯一 | 通过 | 默认工作层已锁定为 `main_study_safe_v3.tex` + `refs_compile_safe_v3.bib` |
| compile-safe 默认 bib 是否纯英文 | 通过 | `refs_compile_safe_v3.bib` 为纯英文 canonical bibliographic surface |
| submission truth 是否仍明确指向 locked 英文 bib | 通过 | 仍明确指向 `main_en_locked.tex` + `refs_en_locked.bib` |
| 旧 zhref / studyref v2 是否已降级 | 通过 | `round8_zhref/*` 与 `round8_studyref/*` 已明确降级为 snapshot |
| visible / experimental bib 是否已降级 | 通过 | 当前只保留为 experimental only，不再参与默认 compile |
| 5 个术语是否已统一 | 通过 | `term_decisions_v1.md`、`study_terminology_glossary_v2.md`、`reference_study_map_v3.md` 已同步 |

## 结论

- 当前默认路径已经封口。
- 后续不应再把旧 reference architecture 重新拉回默认路径。
