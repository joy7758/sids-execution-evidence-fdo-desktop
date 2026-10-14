# Citation Cleanup Round 4

## round3 中需要清理的问题

| round3 问题 | 出现位置 | round4 处理 |
| --- | --- | --- |
| `[citation pending]` | `06_draft/round3_en/full_shortpaper_en_v2.md` related work 末段 | 删除 placeholder；对应 SLSA 线不进入 round4 主稿 |
| 引用面偏宽 | round3 related work 同时提到 in-toto、SLSA、artifact review | 缩到最小 8 条；保留 in-toto 论文与 ACM artifact policy，删除 SLSA 线 |
| PROV 线略分散 | round3 related work | 保留 `PROV-Overview`、`PROV-DM`、`PROV-Constraints` 作为最小集合 |
| FDO 背景引用略多但还可接受 | round3 intro / related work | 保留 `Kahn & Wilensky`、`DOIP 2.0`、`Soiland-Reyes et al.` 三条 |
| JSON Schema Validation 正式引用缺口 | round3 reference seed pool | 不硬补；round4 文内改为无引句 |
| log management / log analysis 专门引用缺口 | round3 reference seed pool | 不硬补；round4 仅保留无引 framing 句 |

## round4 的引用策略

- submission-facing v3 只保留实际需要的 8 条引用。
- 所有保留引用都能回到本地锁定材料与现成 `.bib` 条目。
- 所有不完整或不必要的候选引用一律移出正文。

## 明确保证

- `full_shortpaper_en_v3.md` 不出现 `[citation pending]`。
- `abstract_en_v3.md` 不放不必要引用。
- `.bib` 中不保留废条目，不编造 DOI，不塞入未使用引用。
