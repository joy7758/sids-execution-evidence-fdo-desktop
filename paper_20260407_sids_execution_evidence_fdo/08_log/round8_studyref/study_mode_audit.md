# Study Mode Audit

| 检查项 | 状态 | 说明 |
| --- | --- | --- |
| scientific text 未改 | 通过 | 当前只增强学习辅助层 |
| Branch A 边界未变 | 通过 | 仍然锁定 `1 valid + 3 invalid + 1 walkthrough + CLI + tests` |
| citation key 未变 | 通过 | safe v2 / visible study / submission truth key 一致 |
| safe bib v2 已补齐所有 canonical fields | 通过 | 以 `refs_en_locked.bib` 为唯一镜像基底重建 |
| 8 条引用都已有 study fields | 通过 | 每条都含 `x_zh_title / x_study_terms / x_study_gloss` |
| submission truth 仍明确指向英文 locked bib | 通过 | 仍指向 `07_submission/round8_zhref/en_restore_baseline/refs_en_locked.bib` |

## 结论

- 当前已经进入“双语 + 术语注音学习模式”。
- compile-facing 默认路径仍保持英文 canonical bibliography surface。
