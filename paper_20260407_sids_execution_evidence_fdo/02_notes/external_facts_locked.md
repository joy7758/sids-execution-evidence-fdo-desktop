# 外部事实锁定

说明：

- 本文件用于锁定本轮用户直接提供的外部事实。
- 这些事实在本轮不要求再次从 workspace 中回溯原文件。
- 但它们不能自动覆盖仓库真实实现状态；能否进入 canonical baseline，仍以后续 repo 核验为准。

## External Fact A — 历史窄分支（JSS 线）

标题：

`Execution Evidence as a Verifiable Workflow Object: A Minimal Profile and Validator for Operation Accountability`

已知事实：

- 这是一个“窄贡献”稿件。
- 结构核心是：minimal profile + JSON Schema + profile-aware validator + controlled examples + one runnable demo。
- 该分支声称：
  - 1 个 valid example
  - 3 个 invalid examples
  - 1 个 metadata-enrichment demo
- 该分支给出了 clean rerun 线索：
  - commit: `80e7e78ab6cbd9befc24b56fbf9cdffabd99b5de`
  - venv: `.repro-v0_1-20260407-full`
  - CLI: `agent-evidence validate-profile ...`
- 该分支是“历史窄分支候选”，不能直接等同于当前实现全貌。

## External Fact B — 当前实现候选分支（匿名 FDO-based 稿）

标题：

`A Minimal Verifiable Profile for Operation Accountability in FDO-Based Agent Systems`

已知事实：

- 该分支更强调 “current implementation”。
- 该分支声称：
  - 2 个 valid examples
  - 5 个 invalid examples
  - profile specification
  - JSON Schema
  - profile-aware validator
  - command-line entry point
  - tests
  - runnable single-path demo
- 两个 valid context 分别是：
  - metadata enrichment（single input / single output）
  - retention review（two inputs / one decision output）
- 该分支明确限制主张：
  - 只支持 narrow claim
  - 只支持 basic portability / second-context validity
  - 不支持 broad cross-framework validation
  - 不支持 industrial-scale deployment
  - 不支持 large workflow graphs / rich multi-agent coordination / full cryptographic trust infrastructure

## External Fact C — 必须排除的非本稿主线

### 1. `Sovereign-pFDO Submission Package Ready (1)` 属于另一条线

- DOIP 2.0
- BLAKE3
- KL Divergence
- 1.6T distributed fabrics
- Digital Territory
- 该线不能混入当前 SIDS execution-evidence 稿件主叙述。

### 2. `论文问题撰写指导.txt` 属于代谢 / 熵 / 图表线

- 能量曲线
- 施密特触发器迟滞
- 认知熵
- PDE 触发下降斜率
- Token 命中率 / 自由率
- 该线不得混入当前稿件。
