# Manuscript Branch Reconciliation

## Branch A：JSS 历史窄分支

- 标题：
  `Execution Evidence as a Verifiable Workflow Object: A Minimal Profile and Validator for Operation Accountability`
- claim surface：
  最小 profile、JSON Schema、profile-aware validator、受控 examples、单路径 demo、clean rerun 线索。
- examples / tests / demo 口径：
  `1` 个 valid、`3` 个 invalid、`1` 个 metadata-enrichment demo。
- 能否作为当前 SIDS 稿的事实基底：
  可以作为历史窄基底，但必须以当前仓库真实实现是否仍支持这套边界为前提。

## Branch B：当前实现候选分支

- 标题：
  `A Minimal Verifiable Profile for Operation Accountability in FDO-Based Agent Systems`
- claim surface：
  current implementation、2 个 valid context、5 个 invalid、tests、CLI validator、single-path demo，以及 basic / second-context portability。
- examples / tests / demo 口径：
  `2` 个 valid、`5` 个 invalid、tests、command-line entry point、single-path demo。
- 能否作为当前 SIDS 稿的事实基底：
  只有在当前仓库真实实现中能定位到第二个 valid context、额外 invalid examples、对应 tests 和配套叙述时才成立。

## Excluded Branch：Sovereign-pFDO

- 标题：
  `待确认`；但已知属于 Sovereign-pFDO / 协议治理线。
- claim surface：
  DOIP 2.0、BLAKE3、KL Divergence、1.6T distributed fabrics、Digital Territory。
- examples / tests / demo 口径：
  与当前 execution-evidence 稿件无关。
- 能否作为当前 SIDS 稿的事实基底：
  不能。只能作为“不要混入”的排除材料。

## Excluded Branch：代谢 / 熵 / 图表

- 标题：
  `待确认`；但已知属于代谢 / 熵 / 图表线。
- claim surface：
  能量曲线、施密特触发器迟滞、认知熵、PDE 触发下降斜率、Token 命中率 / 自由率。
- examples / tests / demo 口径：
  与当前 execution-evidence 稿件无关。
- 能否作为当前 SIDS 稿的事实基底：
  不能。必须直接排除。

## 暂定判断

- `推荐以 Branch B 作为当前主写作基底`
- 但仅在仓库真实实现支持时成立

本轮核验后的补充判断：

- 当前 workspace 中尚未看到 Branch B 所要求的 `2 valid + 5 invalid + 第二个 valid context` 的 repo 级证据。
- 因此这条“推荐”目前只是条件性推荐，尚不能直接落为 canonical baseline。

## 为什么不能把 A 和 B 混成一篇

1. A 的 examples 边界是 `1 valid + 3 invalid + 1 demo`，B 的边界是 `2 valid + 5 invalid + tests + CLI + demo`，数量口径不同，不能硬拼。
2. A 的场景是单条 metadata enrichment；B 明确多出 retention review 作为第二个 valid context，问题覆盖面不同。
3. A 的 portability 语言是极窄 witness / minimal artifact；B 允许写到 basic / second-context validity，评审预期不同。
4. A 的 clean rerun 证据已绑定到历史 commit 与 `.repro-v0_1-20260407-full`；B 的“current implementation”如果没有 repo 支撑，就会变成虚构统一稿。
5. A 和 B 的标题、claim surface、评估姿态都不同，强行合并会让评审看起来像是“在同一稿里混入两个不同时期的证据面”。
6. 如果把 A 的历史 rerun 与 B 的当前实现口号混写，会同时损害可复现性和可信度。
7. SIDS 稿需要一个单一 canonical baseline；混写会使摘要、场景表、贡献边界和 reviewer defense 同时失焦。

## 当前决策状态

`已初步锁定`

说明：

- 分支对账结构已锁定。
- canonical baseline 仍以后续 repo truth inventory 与 baseline decision 文件为准。
