# 材料盘点

## 1. 指定输入文件盘点

当前要求复制的四个指定输入文件均未在 workspace 内找到，因此以下判断全部以“文件缺失”前提成立；凡无法核实正文的部分，一律标记为 `待确认`。

| 文件名 | 当前状态 | 文件主题 | 可复用内容 | 不可复用内容 | 本项目角色 | 原因 |
| --- | --- | --- | --- | --- | --- | --- |
| `JSSOFTWARE-S-26-00981 (1).pdf` | 未找到 | `待确认`；仅文件名显示可能与 JSS 投稿有关 | `待确认` | 在未见正文前，任何摘要、例子数量、实验表述都不可复用 | `secondary（暂定）` | 若其确为 execution-evidence 旧稿，可用于做差分；当前不可直接引用 |
| `64540033_File000000_1564567044.pdf` | 未找到 | `待确认` | `待确认` | 全部正文结论均不可复用 | `excluded（当前轮次）` | 文件名无法判断主题，且当前缺件，不能进入本轮事实基础 |
| `Sovereign-pFDO Submission Package Ready (1).docx` | 未找到 | `待确认`；文件名明确指向 Sovereign-pFDO 投稿包 | 仅可作为 B 线对照提醒，正文待确认 | 任何 BLAKE3 / KL / 1.6T / Digital Territory 主张均不可混入本稿 | `excluded` | 即便后续找到，也只可作为“不要混入”的对照材料 |
| `论文问题撰写指导.txt` | 未找到 | `待确认`；可能是写作流程或审稿问题清单 | 可作为写作提醒，待确认 | 不能充当事实来源或实现证据 | `secondary（暂定）` | 若后续提供，可辅助组织文稿，但不构成本稿实证基础 |

## 2. 工作区可见材料的替代性盘点

由于指定输入文件缺失，本轮只能依据当前 workspace 中可见的真实仓库与文稿做分流判断。

### A. 执行证据 / 最小 profile / validator / demo 主线

结论：`本项目主线`

当前可见的核心材料：

- `agent-evidence/`
- `execution-evidence-jss-20260407b/`
- `tse-submission-private/`

判断：

- `agent-evidence/` 中可见真实实现资产，包括最小 profile spec、JSON Schema、`agent_evidence/oap.py` validator、CLI 入口、`examples/`、`demo/` 和相关测试。
- `execution-evidence-jss-20260407b/` 是一套已成形的旧文稿包，适合用于提炼边界语言，但不能直接充当 SIDS 新稿目录。
- `tse-submission-private/` 是更大问题定义线的文稿仓；它可以帮助识别哪些叙述过宽，但不应直接移植为 SIDS 新稿主体。

### B. Sovereign-pFDO 协议治理 / BLAKE3 / KL / 1.6T / Digital Territory 线

结论：`仅可作为背景词汇或“不要混入”的对照材料`

当前可见的代表性材料：

- `pFDO-Specification/README.md`
- `pFDO-Specification/docs/paper/merged_paper.tex`
- `Kinetic-Robotics-FDO-Sovereignty/`

判断：

- 该线明显承载 1.6T、BLAKE3、KL、物理层治理、协议扩展等主张。
- 这些内容与本稿的“最小、可验证、可复现”的窄贡献边界不兼容。
- 在新稿中最多只保留“不要把 FDO/data spaces 讨论自动扩张成协议治理平台”的提醒，不可把这条线偷渡进贡献部分。

### C. 代谢 / 熵 / 图表线

结论：`直接排除，不得混入`

当前可见的代表性材料：

- `AASP-Core/schemas/aasp_ontology.jsonld`
- `pFDO-Specification/docs/paper/merged_paper.tex` 中的 metabolism / entropy / 图表段落
- 与 dashboard / chart / entropy 相关的仓库与脚本

判断：

- 该线围绕 digital metabolism、entropy control、图表和相关理论指标展开。
- 这与当前新稿要表达的 operation accountability 与 execution evidence profile 不属于同一个研究问题。
- 本轮新工程必须将此线完全排除。

## 3. Discrepancy Note

当前可见 workspace 中，`agent-evidence/` 的真实实现状态是：

- `1` 个 valid example：`examples/minimal-valid-evidence.json`
- `3` 个 invalid examples：
  - `examples/invalid-missing-required.json`
  - `examples/invalid-unclosed-reference.json`
  - `examples/invalid-policy-link-broken.json`
- `1` 条 demo 路径：`demo/run_operation_accountability_demo.py`
- 存在 CLI：`agent-evidence validate-profile <file>`
- 存在测试文件：`tests/test_operation_accountability_profile.py`

与此对应，当前可见的 JSS/TSE 相关旧文稿文本也主要写成 `1 valid + 3 invalid + 1 demo`。

已锁定的外部事实还指出存在另一条“当前实现候选分支”，其口径为 `2 valid + 5 invalid + tests/CLI/demo`，并包含第二个 valid context：retention review。但本轮在当前 workspace 可见范围内未定位到与这一口径相匹配的 repo 级实现资产，因此它目前只能作为外部候选分支，不构成当前 canonical baseline。

本项目结论：

- 新稿不能直接沿旧稿数字抄写。
- 任何 examples/tests/demo 的数量表述都必须以后续确认的仓库真实实现为准。
- 当前 canonical baseline 已回落到 repo-backed 的 Branch A：`1 valid + 3 invalid + 1 demo`，另有 tests 与 CLI supporting surface。
- 在拿到 repo 级第二 valid context 之前，任何 `2 valid + 5 invalid` 叙述都不能进入 SIDS v1 主稿。

## 4. 当前基底结论

- 外部候选主写作分支：Branch B
- 当前 repo-backed canonical baseline：Branch A
- 原因：Branch B 的第二个 valid context 与额外 invalid examples 尚未在 repo 中落地到可见主线
