# 与现有稿件的差分

## 1. 可复用内容

- 可复用 `agent-evidence` 中已经稳定的术语：`operation accountability statement`、`validation report`、`agent-evidence validate-profile <file>`。
- 可复用最小 profile 的结构边界：`profile / actor / subject / operation / policy / constraints / provenance / evidence / validation`。
- 可复用 validator 的四类检查维度：`schema conformance`、`reference closure`、`cross-field consistency`、`minimal integrity recomputation`。
- 可复用受控 examples 与单路径 demo 的“窄工件”叙述方式。
- 可复用“execution evidence 不是普通日志”的问题意识，但必须改写成 SIDS 读者可接受的 data spaces / FDO 语言。
- 可复用 tests 与 CLI 真实存在这一事实，但它们只能服务于当前更窄的 Branch A 基底。

## 2. 必须重写内容

- 必须把旧稿偏软件工程或问题定义论文的开场，重写为 data spaces / FDO 中的 agent-mediated data visitation 问题。
- 必须把“operation accountability”与 `data visitation`、`provenance`、`runtime assurance` 对齐，而不是只写“AI runtime verification”。
- 必须把“verifiable workflow object”式表达收束为对一次访问或派生操作的最小可核查 statement，而不是抽象平台对象。
- 必须重写 related work，使其服务于 data spaces/FDO/provenance 语境，而不是围绕 JSS/TSE 的软件验证语境展开。
- 必须重写摘要、引言和结论，避免让审稿人感觉这是“旧稿换 venue 再投”。
- 必须把 Branch B 作为“外部实现候选分支”单独放在背景里，而不是混写进当前事实主干。

## 3. 必须删除的旧叙述

- 所有 `Sovereign-pFDO / Digital Territory / BLAKE3 / KL / 1.6T` 相关主张。
- 所有把本稿写成 `general governance platform`、`registry design`、`full interoperability layer`、`industrial deployment` 的叙述。
- 所有 `metabolism / entropy / 图表` 线材料。
- 任何未在当前真实实现中出现的 examples/tests/demo 数量描述。
- 任何依赖旧 `.venv` 复现实录、但未在当前可见环境再次确认的强结论性表述。
- 任何把第二个 valid context、retention review 或 basic / second-context portability 写成“当前已被 repo 证明”的叙述。

## 4. 新稿必须新增的 venue-fit 语言

- 必须明确说清：`execution evidence` 不是普通日志，因为它要求对一次操作的主体、对象、策略、约束、来源、证据和验证路径形成可独立检查的闭包表达。
- 必须明确说清：本稿面向的是 FDO/data spaces 中由 agent 介导的数据访问、派生、回写或元数据修改场景。
- 必须明确说清：`operation accountability` 不是泛泛问责，而是一次 visitation event 的可核查责任边界。
- 必须明确说清：当前贡献是“最小验证边界”，不是“通用治理框架”。
- 必须明确说清：examples、CLI 与 demo 只是支持独立复核的窄工件，不是规模化实证。

## 5. 三个特别关注点

### 5.1 如何把“execution evidence 不是普通日志”翻译成 SIDS 可接受语言

- 不要只说“日志不够好”。
- 要说日志更多是 operator-facing observability；本稿要补的是 participant-facing independent checkability。
- 在 data spaces 语境中，应强调一次访问或派生动作是否可被第三方独立检查，而不是只能依赖平台内生 trace。

### 5.2 如何把 operation accountability 与 data visitation / provenance / runtime assurance 接起来

- `operation accountability` 是核心问题名。
- `data visitation` 给出场景落点：对象被访问、读取、派生、写回或元数据更新。
- `provenance` 提供最小来源和 I/O 关系。
- `runtime assurance` 负责说明为何需要 validator、consistency 与 integrity recomputation。

### 5.3 如何避免把旧稿写成“换个题目投同一篇”

- 新稿必须先换问题入口，再换评审预期语言，最后再选可复用的技术资产。
- 不可把 JSS/TSE 的段落顺序直接复制进来。
- 新稿的关键词应优先围绕 `data spaces`、`FDO`、`agent-mediated operations`、`data visitation`、`operation accountability`。

## 6. 当前 baseline 对差分的直接影响

- 当前 SIDS v1 只能基于 Branch A 的 repo-backed 事实写作。
- Branch B 仍可作为后续升级方向，但本轮不能把它当成已经实现。
- 因此最重要的差分不是“把 A 扩成 B”，而是“在不越界的前提下，把 A 翻译成更贴近 data spaces/FDO 的 SIDS 语言”。
