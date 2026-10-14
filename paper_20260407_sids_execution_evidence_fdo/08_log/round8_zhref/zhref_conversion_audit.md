# Zhref Conversion Audit

| 检查项 | 状态 | 说明 |
| --- | --- | --- |
| scientific claim 未漂移 | 通过 | 中文工作版只改 reference layer，正文 scientific content 没有扩写 |
| Branch A 边界未变化 | 通过 | 仍然只保留 `1 valid + 3 invalid + 1 walkthrough + CLI + tests` |
| 无 Branch B 污染 | 通过 | 未重新混入 `2 valid`、`5 invalid`、`retention review`、`second-context validity` |
| 当前实际使用的引用均已中文化 | 通过 | 8 条实际使用引用全部进入 `references_working_zh.md` 与 `refs_working_zh.bib` |
| 英文恢复基底已保留 | 通过 | `en_restore_baseline/` 已锁定英文 bib、main、正文快照、引用清单 |
| citation key 未破坏 | 通过 | 中文工作版 `.bib` 与英文恢复基底使用完全相同的 8 个 citation key |

## 结论

- 当前 round8_zhref 只切换了 reference language layer。
- scientific base 仍保持冻结。
- 提交前可通过英文恢复基底无损切回 submission 版本。
