# 项目定位

## 1. 目标 venue

- 第一目标：`SIDS 2026`

定位说明：

- 本稿优先按 data spaces / FDO / agent-mediated data visitation 的问题语言组织。
- 不按 JSS 的软件工件投稿语言原样平移。
- 不按 TSE 的“大问题定义论文”结构扩写。

## 2. 一句话核心命题

本稿主张把 agent 在 FDO / data spaces 语境中的一次数据访问或派生操作，从“事后可看日志”改写为“可独立核查的 execution evidence statement”，从而把讨论焦点落在可验证的 operation accountability，而不是泛化的 AI 治理口号。

## 3. 本稿允许主张的贡献边界

只允许围绕以下点展开：

- 最小 profile
- profile-aware validation
- schema conformance
- reference closure
- cross-field consistency
- minimal integrity
- controlled examples
- CLI validator
- demo / rerun path
- 可验证、可复现、可独立检查的窄贡献

进一步收束：

- 问题对象是一次受约束的 agent-mediated operation，而不是整个平台
- 证据对象是一个最小 statement，而不是全域 registry
- 评估边界是 examples + validator + demo，而不是规模化部署

## 4. 明确非主张

以下内容不在本稿主张范围内：

- `1.6T / trillion-level concurrency`
- `general governance platform`
- `full FDO interoperability layer`
- `multi-agent 全覆盖`
- `formal cryptographic trust fabric`
- `industrial-scale deployment`
- `metabolism / entropy 理论`
- `BLAKE3 / KL 驱动的协议治理主张`

## 5. 当前工作锚点

本轮可见的真实实现锚点主要来自：

- `agent-evidence/spec/execution-evidence-operation-accountability-profile-v0.1.md`
- `agent-evidence/schema/execution-evidence-operation-accountability-profile-v0.1.schema.json`
- `agent-evidence/agent_evidence/oap.py`
- `agent-evidence/examples/`
- `agent-evidence/demo/run_operation_accountability_demo.py`

因此，本稿的写作边界必须服从现有实现，而不是让实现去配合旧文稿想象。

## 6. 当前 canonical baseline

当前 canonical baseline 选定为：

- `Branch A：JSS 历史窄分支对应、且当前 repo 仍支持的最小事实基底`

这意味着：

- 当前可写 examples 边界是 `1 valid + 3 invalid`
- 当前可写 demo 边界是 `1` 条 metadata enrichment 单链路 demo
- 当前可写 supporting surface 包括：spec、schema、validator、CLI、tests、demo
- 当前不可写：第二个 valid context、retention review、`2 valid + 5 invalid`、basic / second-context portability
