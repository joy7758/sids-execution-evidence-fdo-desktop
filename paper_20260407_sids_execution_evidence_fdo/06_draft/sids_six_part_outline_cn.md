# 六部分论文骨架（中文）

## 1. 问题与缺口

- data spaces / FDO 中的数据访问与派生越来越可能由 agent 介导完成。
- 现有 trace、log、callback history 更偏向运维可观察性，不等于可独立检查的执行证据。
- 对 data visitation 而言，评审者或第三方往往需要知道：谁操作了什么对象、受什么策略约束、产生了什么证据、如何验证。
- 当前缺口不是“没有更多日志”，而是“缺少一个对单次 operation accountability 的最小可核查表达”。
- 本稿把问题限定为一次 visitation/derivation 事件，不扩大到整个平台治理。
- 当前 workspace 可见实现支持最小 profile、validator、受控 examples 与单路径 demo，因此适合作为窄工件论文起点。

## 2. 最小 profile 设计

- 以 `profile` 固定规范身份，把 statement 边界明确锁定在 `v0.1`。
- 以 `actor / subject / operation` 表达谁对哪个对象做了什么。
- 以 `policy / constraints` 表达该操作在何种规则下被允许或限制。
- 以 `provenance` 把 actor、subject、operation 与输入输出引用连起来。
- 以 `evidence` 显式给出 references、artifacts 与最小 integrity 摘要。
- 以 `validation` 指定独立验证入口、方法与状态。
- 设计目标不是字段越多越好，而是保证 statement 足以独立检查。

## 3. 校验模型与 validator

- validator 当前采用分阶段路径：`schema -> references -> consistency -> integrity`。
- `schema conformance` 负责检查字段存在性、类型、枚举和值格式。
- `reference closure` 负责检查 subject/policy/provenance/evidence/validation 的内部引用是否闭合。
- `cross-field consistency` 负责检查 input/output 角色、policy 一致性、provenance 与 operation 对齐。
- `minimal integrity recomputation` 负责重算 references、artifacts 与 statement core 的 digest。
- CLI 入口已固定为 `agent-evidence validate-profile <file>`，输出统一称为 `validation report`。
- 当前可见环境中，`.repro` 路径能跑通 validator 与 demo；旧文档中的 `.venv` 路径在本机此刻不可直接复用。

## 4. 示例与 demo

- 当前可见 examples 集合包含 `1` 个 valid 与 `3` 个 invalid。
- valid example 用于证明最小 profile 在当前规则集下可通过验证。
- 三个 invalid example 分别对应：缺失必填字段、未闭合输出引用、evidence-policy 链接断裂。
- 当前 demo 是单路径 metadata enrichment 场景，不是 benchmark，也不是部署实验。
- demo 会生成输入对象、派生对象、操作日志、最小 profile 证据文件与 validation report。
- 本轮已用 `.repro-v0_1-20260407` / `.repro-v0_1-20260407-full` 对 valid CLI、一个 invalid CLI 和 demo 做了只读复核。
- 第二个有效示例是否存在，目前仍是 `待确认`。

## 5. 评估与限制

- 当前评估只能写成受控工件验证，不应写成大规模实验。
- 可报告的核心指标是：schema conformance、reference closure、cross-field consistency、minimal integrity recomputation、example coverage、rerun reproducibility。
- 当前 example coverage 较小，只支持一个最小成功例、三个失败例和一个 demo。
- 现有测试文件存在，但本轮未在当前环境完整跑通 `pytest`，因为 `.venv` 缺失且 `.repro` 环境未装 `pytest`。
- 当前仓库可支撑“可检查的最小边界”主张，但不足以支撑工业级、跨平台或全场景泛化。
- data-space/FDO 场景图是否已有可直接复用版本，当前仍待确认。

## 6. 讨论与下一步

- 讨论重点应放在“为什么 execution evidence 不是普通日志”，以及这对 data visitation 的意义。
- 需要把 operation accountability 与 provenance、runtime assurance、independent review 更紧密对齐。
- 若后续确认存在第二个有效场景，应优先在真实仓库落地后再进入文稿。
- 若后续补齐 data-space/FDO 场景图，可增强 SIDS 读者的语境感，但不能替代实现证据。
- 若后续要派生 ICDF2C 版本，应从本目录分叉，而不是回写旧稿目录。
- 下一轮写作前，最关键的是锁定 canonical repo path、最终 example 数量和可接受的复现环境说明。
