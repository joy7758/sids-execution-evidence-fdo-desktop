# Blindability / Searchability Audit

## 已发现的高风险或中风险字符串

| 风险字符串 | 出现位置 | 风险等级 | 为什么可能泄露 | 安全替代表述 | 是否建议在 submission-facing 版本替换 |
| --- | --- | --- | --- | --- | --- |
| `metadata-enrichment` | `06_draft/round3_en/*.md`、`04_tables/round3/*.md` | 中 | 具体场景名偏独特，和本稿主题组合后可被定向搜索 | `a metadata update operation` / `a runnable walkthrough over one operation` | 是 |
| `single-path metadata-enrichment demo` | `06_draft/round3_en/*.md`、`04_tables/round3/table1_artifact_surface_en.md` | 高 | 复合短语较独特，容易成为检索锚点 | `one runnable walkthrough` | 是 |
| `schema_violation` | `06_draft/round3_en/full_shortpaper_en_v2.md`、`06_draft/round3_en/evaluation_en_v2.md`、`04_tables/round3/table2_example_boundary_en.md` | 中 | 精确诊断码不影响主稿论证，但增加唯一性 | `a schema-level failure` | 是 |
| `unresolved_output_ref` | `06_draft/round3_en/full_shortpaper_en_v2.md`、`06_draft/round3_en/evaluation_en_v2.md`、`04_tables/round3/table2_example_boundary_en.md` | 中 | 精确错误码可直接反查实现 | `an unresolved output reference` | 是 |
| `unresolved_evidence_policy_ref` | `06_draft/round3_en/full_shortpaper_en_v2.md`、`06_draft/round3_en/evaluation_en_v2.md`、`04_tables/round3/table2_example_boundary_en.md` | 高 | 该错误码较长且独特，检索风险高 | `a broken evidence-to-policy link` | 是 |
| `operation-accountability path` | `06_draft/round3_en/evaluation_en_v2.md`、`04_tables/round3/table2_example_boundary_en.md` | 中 | 内部实现命名感较强，不是投稿主稿必须暴露的信息 | `the shipped validation path` | 是 |
| `examples/minimal-valid-evidence.json` | `04_tables/round3/table2_example_boundary_en.md` | 高 | 真实文件名可直接反查仓库 | `the valid example` | 是 |
| `examples/invalid-missing-required.json` | `04_tables/round3/table2_example_boundary_en.md` | 高 | 真实文件名可直接反查仓库 | `the missing-field invalid example` | 是 |
| `examples/invalid-unclosed-reference.json` | `04_tables/round3/table2_example_boundary_en.md` | 高 | 真实文件名可直接反查仓库 | `the unresolved-reference invalid example` | 是 |
| `examples/invalid-policy-link-broken.json` | `04_tables/round3/table2_example_boundary_en.md` | 高 | 真实文件名可直接反查仓库 | `the broken-link invalid example` | 是 |
| `demo/expected-output.md` | `04_tables/round3/table2_example_boundary_en.md` | 高 | 精确路径属于内部工件定位线索 | `the demo output record` | 是 |
| `tests/test_operation_accountability_profile.py` | `04_tables/round3/table2_example_boundary_en.md` | 高 | 精确测试文件名可直接反查私有或半私有实现表面 | `the validator test suite` | 是 |

## 高风险但当前 round3 submission-facing 文件中未出现的字符串

| 风险字符串 | 出现位置 | 风险等级 | 为什么可能泄露 | 安全替代表述 | 是否建议在 submission-facing 版本替换 |
| --- | --- | --- | --- | --- | --- |
| `agent-evidence validate-profile` | 未出现 | 高 | 精确 CLI 串可直接作为搜索引擎查询词 | `the reference validator CLI` | 是，保持不出现 |
| `agent_evidence/oap.py` | 未出现 | 高 | 精确模块路径可直接定位实现 | `the reference validator implementation` | 是，保持不出现 |
| `execution-evidence-operation-accountability-profile-v0.1` | 未出现 | 高 | 精确 profile 全名极易反查历史材料 | `the shipped profile` | 是，保持不出现 |
| commit hash | 未出现 | 高 | commit 哈希可直接反查仓库历史 | `a fixed implementation snapshot` | 是，保持不出现 |
| `DOI` / `Zenodo` / frozen archive 表述 | 未出现 | 高 | 会把评审引向可逆向定位的公开材料或历史稿线 | 不写；若必须写则延后到 camera-ready | 是，保持不出现 |

## 审计结论

- round3 的主要 blindability 风险不在作者名或本地路径，而在 submission-facing 英文表格与评估段落中的精确实现字符串。
- round4 应统一改成“描述性但不失真”的安全措辞。
- v3 主稿应避免精确命令、精确文件名、精确错误码、精确 demo 名称，只保留对验证边界真正必要的信息。
