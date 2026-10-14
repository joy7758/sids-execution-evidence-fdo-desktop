# 最小场景-指标矩阵

说明：

- 本矩阵只使用当前 workspace 中可见的真实 examples / demo / validator 资产。
- 不编造吞吐量、时延、规模化数字。
- `当前证据状态` 允许写成 `已有（本轮已复核）`、`已有（文件存在）` 或 `待确认`，以反映本轮真实核查深度。
- 当前 canonical baseline = `Branch A`，因此矩阵只保留 repo-backed 的 `1 valid + 3 invalid + 1 demo`。

| 场景名称 | 输入/输出对象模式 | 约束/策略 | 证据生成内容 | 验证路径 | 通过/失败条件 | 可报告指标 | 当前证据状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 最小有效 statement | `1` 个输入 note 对象 -> `1` 个派生 note 对象 | `approved-metadata-policy`；只允许批准字段；不改正文 | 最小 profile JSON、`2` 个 reference、`1` 个 artifact、`3` 个 integrity digest、`validation report` | `agent-evidence validate-profile examples/minimal-valid-evidence.json` | `ok: true`，`issue_count: 0` | `schema conformance=pass`；`reference closure=pass`；`cross-field consistency=pass`；`minimal integrity recomputation=pass`；`example coverage=已有唯一 valid`；`rerun reproducibility=.repro 已复核` | 已有（本轮已复核） |
| 缺失必填字段失败 | 与最小有效 statement 同型 | 同上，但故意删掉 `validation.method` | 失败用最小 profile JSON 与 `validation report` | `agent-evidence validate-profile examples/invalid-missing-required.json` | `ok: false`；主错误码 `schema_violation` | `schema conformance=fail`；其余阶段不应继续作为通过项报告；`example coverage=已有 invalid` | 已有（文件存在） |
| 未闭合输出引用失败 | `1` 个输入 ref -> `1` 个不存在的输出 ref | 同上 | 失败用最小 profile JSON 与 `validation report` | `agent-evidence validate-profile examples/invalid-unclosed-reference.json` | `ok: false`；主错误码 `unresolved_output_ref` | `reference closure=fail`；`schema conformance=pass`；`cross-field consistency=未进入通过态`；`example coverage=已有 invalid`；`rerun reproducibility=.repro 已复核` | 已有（本轮已复核） |
| evidence-policy 链接断裂失败 | 输入输出对象模式与有效场景相同 | policy 在 `evidence.policy_ref` 中被故意写坏 | 失败用最小 profile JSON 与 `validation report` | `agent-evidence validate-profile examples/invalid-policy-link-broken.json` | `ok: false`；主错误码 `unresolved_evidence_policy_ref` | `reference closure=fail`；`schema conformance=pass`；`example coverage=已有 invalid` | 已有（文件存在） |
| metadata enrichment demo | `input-object.json` -> `derived-object.json` + `operation-log.json` | `approved-metadata-policy`；新增批准元数据；内容不变 | `minimal-profile-evidence.json`、`validation-report.json`、输入/输出对象与操作日志 | `python demo/run_operation_accountability_demo.py` | 末尾出现 `PASS execution-evidence-operation-accountability-profile@0.1 ...`；并写出工件 | `schema conformance=pass`；`reference closure=pass`；`cross-field consistency=pass`；`minimal integrity recomputation=pass`；`rerun reproducibility=.repro 已复核` | 已有（本轮已复核） |

## 当前矩阵结论

- 当前可见实现支持的是“一个最小有效例、三个受控失败例、一个单路径 demo”。
- `tests/CLI/demo` 作为 supporting surface 是存在的，但“第二个有效例”当前未在可见实现中落地，不能提前写入摘要或贡献段。
- SIDS 新稿若需要更强的场景覆盖，必须先新增真实实现，再更新本矩阵。
