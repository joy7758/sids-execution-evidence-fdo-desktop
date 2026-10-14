# Round 3 写作护栏

## 1. 当前 canonical baseline

当前 canonical baseline 是：

- `Branch A`
- 含义：当前 repo-backed 的最小窄分支
- 可锁定资产：
  - profile specification
  - JSON Schema
  - profile-aware validator
  - command-line entry point
  - tests
  - `1` 个 valid example
  - `3` 个 invalid examples
  - `1` 条 metadata-enrichment single-path demo

## 2. 本轮英文稿可以写的事实

- 当前实现围绕一个 `single-operation accountability object`
- profile 是 `minimal`、`bounded`、`verifiable`
- validator 是 `profile-aware`
- validator 检查：
  - schema conformance
  - reference closure
  - cross-field consistency
  - minimal integrity recomputation
- 仓库存在 schema、validator、CLI、tests、examples、demo 的闭环
- examples 边界是：
  - `1 valid`
  - `3 invalid`
- demo 边界是：
  - metadata enrichment
  - single-path
  - one client note object / one derived output object

## 3. 本轮英文稿绝对不能写的事实

- `2 valid examples`
- `5 invalid examples`
- `retention review`
- `two inputs / one decision output`
- `second-context validity`
- `basic portability`
- `broad portability`
- `industrial-scale deployment`
- `full FDO interoperability layer`
- `general governance platform`
- `multi-agent orchestration`
- `full cryptographic trust fabric`

## 4. 哪些术语尽量少用或替换

- 少用：`platform`
  - 替换：`artifact`, `path`, `package`, `profile`
- 少用：`ecosystem`
  - 替换：`context`, `setting`
- 少用：`framework`
  - 替换：`approach`, `profile`, `validation path`
- 少用：`architecture`
  - 替换：`design`, `object model`, `validator pipeline`
- 少用：`portability`
  - 替换：除非写 limitation，否则尽量不写
- 少用：`standard proposal`
  - 替换：`minimal profile`, `bounded artifact`

## 5. 哪些 external manuscript 只能当语言 donor

- `execution-evidence-jss-20260407b/manuscript/full-draft-jss-clean.md`
- `execution-evidence-jss-20260407b/venue/jss/jss-abstract-250w.md`
- `tse-submission-private/manuscript/jss_witness_archive/jss_witness_main.md`
- `tse-submission-private/archive/legacy_drafts/manuscript/full-draft.md`

使用规则：

- 可以借句式、节奏、段落过渡
- 不可以把其中未被当前 repo 支持的事实搬进英文主稿
- 任何数量、场景、主张都必须先通过 round3 claim-evidence matrix 审计

## 6. 本轮英文稿允许的最大主张边界

- 允许写：
  - minimal verifiable profile
  - profile-aware validator
  - single-operation accountability
  - FDO-based 或 FDO / data-space context
  - schema + validator + examples + demo closure
  - independently checkable artifact
- 不允许写：
  - universal framework
  - platform
  - standard proposal
  - broad portability
  - full ecosystem
  - multi-agent orchestration
  - cryptographic trust fabric

## 7. 本轮写作口号

- not breadth, but closure
- not richer traces, but a checkable accountability object
- not a platform claim, but a bounded artifact claim
