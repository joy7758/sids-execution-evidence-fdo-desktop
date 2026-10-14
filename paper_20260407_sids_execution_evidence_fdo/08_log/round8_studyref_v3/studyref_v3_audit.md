# Studyref V3 Audit

| 检查项 | 状态 | 说明 |
| --- | --- | --- |
| scientific text 未改 | 通过 | 当前只净化 reference layer |
| Branch A 边界未变 | 通过 | 仍然只保留 `1 valid + 3 invalid + 1 walkthrough + CLI + tests` |
| citation key 未变 | 通过 | compile-safe、sidecar、submission truth key 一致 |
| compile-safe bib 已纯英文 | 通过 | `refs_compile_safe_v3.bib` 不含中文学习字段 |
| compile-safe bib 已保留 canonical fields | 通过 | 逐条镜像 `refs_en_locked.bib` |
| 学习信息已全部外移 | 通过 | 中文标题、注音、义项全部在 sidecar 文件中 |
| submission truth 仍明确指向英文 locked bib | 通过 | 仍指向 `07_submission/round8_zhref/en_restore_baseline/refs_en_locked.bib` |

## 结论

- 当前已经从 v2 升级到 v3。
- 当前默认 compile-safe 路径比 v2 更接近最终 submission path。
