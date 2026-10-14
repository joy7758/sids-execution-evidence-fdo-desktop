# Repo Truth Inventory Round 2

核验范围：

- `/Users/zhangbin/GitHub`
- 重点以 `agent-evidence` 为主
- 只读搜索，不修改代码

判定口径：

- `与 Branch A 是否匹配`：看是否支持 `1 valid + 3 invalid + 1 demo + CLI` 这条历史窄分支
- `与 Branch B 是否匹配`：看是否支持 `2 valid + 5 invalid + second valid context + tests + CLI + demo`

| 路径 | 类别 | 是否真实存在 | 与 Branch A 是否匹配 | 与 Branch B 是否匹配 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `/Users/zhangbin/GitHub/agent-evidence/spec/execution-evidence-operation-accountability-profile-v0.1.md` | spec | 是 | 是 | 部分匹配 | 证明最小 profile 存在，但不证明 B 所需第二 context |
| `/Users/zhangbin/GitHub/agent-evidence/schema/execution-evidence-operation-accountability-profile-v0.1.schema.json` | schema | 是 | 是 | 部分匹配 | 证明 schema 存在，但不证明 `2 valid + 5 invalid` |
| `/Users/zhangbin/GitHub/agent-evidence/agent_evidence/oap.py` | validator | 是 | 是 | 部分匹配 | validator 存在，B 所需更大 examples 集未见 |
| `/Users/zhangbin/GitHub/agent-evidence/agent_evidence/cli/main.py` | cli | 是 | 是 | 部分匹配 | `validate-profile` 命令真实存在 |
| `/Users/zhangbin/GitHub/agent-evidence/pyproject.toml` | packaging | 是 | 是 | 部分匹配 | 包元数据与 CLI script 真实存在，`dev` 依赖含 `pytest` |
| `/Users/zhangbin/GitHub/agent-evidence/examples/minimal-valid-evidence.json` | example | 是 | 是 | 部分匹配 | 当前唯一可见 OAP valid example |
| `/Users/zhangbin/GitHub/agent-evidence/examples/invalid-missing-required.json` | invalid | 是 | 是 | 部分匹配 | Branch B 若成立，还应再看到更多 invalid |
| `/Users/zhangbin/GitHub/agent-evidence/examples/invalid-unclosed-reference.json` | invalid | 是 | 是 | 部分匹配 | 同上 |
| `/Users/zhangbin/GitHub/agent-evidence/examples/invalid-policy-link-broken.json` | invalid | 是 | 是 | 部分匹配 | 同上 |
| `/Users/zhangbin/GitHub/agent-evidence/examples/README.md` | doc | 是 | 是 | 否 | README 只列出 `1 valid + 3 invalid` |
| `/Users/zhangbin/GitHub/agent-evidence/demo/run_operation_accountability_demo.py` | demo | 是 | 是 | 部分匹配 | single-path demo 真实存在，但仍只有 metadata enrichment |
| `/Users/zhangbin/GitHub/agent-evidence/demo/README.md` | doc | 是 | 是 | 否 | 只说明单条 metadata enrichment demo |
| `/Users/zhangbin/GitHub/agent-evidence/demo/scenario.md` | doc | 是 | 是 | 否 | 场景明确是 one client note 的 metadata enrichment |
| `/Users/zhangbin/GitHub/agent-evidence/demo/expected-output.md` | doc | 是 | 是 | 否 | 只记录 `1 valid + 3 invalid + demo` 的预期输出 |
| `/Users/zhangbin/GitHub/agent-evidence/tests/test_operation_accountability_profile.py` | test | 是 | 是 | 部分匹配 | 测试存在，但只覆盖一个 valid 与三个 invalid |
| `/Users/zhangbin/GitHub/agent-evidence/tests/test_cli.py` | test | 是 | 是 | 部分匹配 | CLI 测试存在，但不支持第二个 valid context 的结论 |
| `/Users/zhangbin/GitHub/agent-evidence/docs/ACCEPTANCE-CHECKLIST.md` | doc | 是 | 是 | 否 | 明写 `1 个 valid + 3 个 invalid`，并写“当前只保留单链路 metadata enrichment 场景，不另开第二条主线” |
| `/Users/zhangbin/GitHub/agent-evidence/docs/STATUS.md` | doc | 是 | 是 | 否 | 当前状态文档仍以 `1 valid + 3 invalid + demo` 为主 |
| `/Users/zhangbin/GitHub/agent-evidence/submission/final-handoff.md` | doc | 是 | 是 | 否 | 直接写明 `1 个 valid + 3 个 invalid 样例` 与一条 metadata enrichment demo |
| `/Users/zhangbin/GitHub/agent-evidence/.repro-v0_1-20260407-full/` | packaging | 是 | 是 | 部分匹配 | 历史 clean rerun 环境资产存在，但不能推出 Branch B |
| `/Users/zhangbin/GitHub/agent-evidence/.repro-v0_1-20260407/` | packaging | 是 | 是 | 部分匹配 | 同上 |
| `/Users/zhangbin/GitHub/agent-evidence/tests/fixtures/agent_evidence_profile/valid/live-automaton-bundle/manifest.json` | test fixture | 是 | 否 | 否 | 属于 AEP bundle 线，不是 OAP valid example，不计入本稿 examples 数量 |
| `/Users/zhangbin/GitHub/agent-evidence/tests/fixtures/agent_evidence_profile/valid/live-automaton-runtime-root-bundle/manifest.json` | test fixture | 是 | 否 | 否 | 同上 |
| `/Users/zhangbin/GitHub/agent-evidence/tests/fixtures/agent_evidence_profile/invalid/live-automaton-tampered-bundle/manifest.json` | test fixture | 是 | 否 | 否 | 同上 |
| `/Users/zhangbin/GitHub/agent-evidence/tests/fixtures/agent_evidence_profile/invalid/live-automaton-runtime-root-tampered-bundle/manifest.json` | test fixture | 是 | 否 | 否 | 同上 |
| `/Users/zhangbin/GitHub/execution-evidence-jss-20260407b/manuscript/full-draft-jss-clean.md` | doc | 是 | 是 | 否 | JSS 窄分支文稿，与 Branch A 对齐 |
| `/Users/zhangbin/GitHub/execution-evidence-jss-20260407b/submission/_export_build/execution-evidence-jss-manuscript-final.html` | doc | 是 | 是 | 否 | 明确写 `1 valid + 3 invalid + 1 demo` |
| `/Users/zhangbin/GitHub/tse-submission-private/manuscript/tse_flagship/tse_flagship_main.md` | doc | 是 | 是 | 否 | 仍围绕一个 valid、三个 invalid 与一个 demo 的 bounded surface |
| `/Users/zhangbin/GitHub/hongyan-exec-one/registry/policies/retention.v0.1.yaml` | unrelated policy | 是 | 否 | 否 | 仅有 retention 命名，不是 Branch B 所述 retention review valid context |

## 本轮总判断

### 1. 当前 repo 中真实可见的 OAP examples 数量

- valid：`1`
  - `examples/minimal-valid-evidence.json`
- invalid：`3`
  - `examples/invalid-missing-required.json`
  - `examples/invalid-unclosed-reference.json`
  - `examples/invalid-policy-link-broken.json`

### 2. 当前 repo 中真实可见的 supporting surface

- profile specification：有
- JSON Schema：有
- profile-aware validator：有
- command-line entry point：有
- tests：有
- runnable single-path demo：有

### 3. 当前 repo 中未找到的 Branch B 关键证据

- 第二个 valid example：未找到
- retention review 场景文件：未找到
- `two inputs / one decision output` 的 valid context：未找到
- 额外两个 invalid examples：未找到
- `2 valid + 5 invalid` 的 repo 级 examples 目录证据：未找到
- basic / second-context portability 的 repo 级当前实现说明：未找到

### 4. 结论

当前 repo 不是 Branch B 已完整落地的状态。

更准确的描述是：

- `Branch A 事实基底清晰`
- `tests / packaging 等 supporting surface 比历史文稿更完整`
- `但 Branch B 所要求的第二个 valid context 与 5 invalid 并未在当前 repo 中显式落地`

因此本轮应判定为：

`以 Branch A 为 repo-backed canonical baseline；Branch B 仅为外部实现候选分支，尚未被当前仓库事实锁定。`
