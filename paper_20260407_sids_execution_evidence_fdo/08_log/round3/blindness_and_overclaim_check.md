# Blindness And Overclaim Check

## Blindness check

| 检查项 | 发现位置 | 风险等级 | 修正建议 | 说明 |
| --- | --- | --- | --- | --- |
| 作者身份暴露 | 未发现；已检索 `06_draft/round3_en/`、`04_tables/round3/`、`05_figures/round3/` 中的作者名、私有命名与身份线索 | 低 | 保持当前状态；后续不要在英文主稿、图注、表注中加入个人名、机构私有缩写或仓库昵称 | 当前 submission-facing 文件未出现作者身份暴露 |
| 私有路径暴露 | 未发现；已检索 `06_draft/round3_en/`、`04_tables/round3/`、`05_figures/round3/` 中的 `/Users/...`、`GitHub` 等路径痕迹 | 低 | 保持当前状态；后续若加入命令示例或 artifact 附录，避免贴入本地绝对路径 | 当前 submission-facing 文件未出现私有本地路径 |
| 历史 venue 痕迹 | 未发现于 submission-facing 文件；但 `07_submission/round3/sids_page_budget_and_cut_plan.md:50` 出现 `JSS / TOSEM`，属于内部策划文件 | 低 | 严格保持该类内容只留在中文内部管理文件，不要迁入英文正文与图表 | 当前英文主稿、英文表格、图文件均未出现历史 venue 痕迹 |
| 历史分支痕迹 | 未发现于 submission-facing 文件；未出现 `Sovereign-pFDO`、`execution-evidence-jss`、commit 哈希等痕迹 | 低 | 保持当前状态；后续不要把 branch reconciliation 语言复制到英文主稿 | 当前盲审面干净 |

## Overclaim check

| 检查项 | 发现位置 | 风险等级 | 修正建议 | 说明 |
| --- | --- | --- | --- | --- |
| 误写为 `2 valid / 5 invalid` | 未发现；已检索 `06_draft/round3_en/`、`04_tables/round3/`、`05_figures/round3/` | 低 | 保持当前状态；后续所有数字继续锁定为 `1 valid + 3 invalid + 1 demo` | 当前最关键事实边界未越线 |
| 误写 `retention review` / 第二个 valid context | 未发现 `retention review`；submission-facing 文件已改写为 `one repo-backed valid context` 与 `additional validated contexts` 的否定表述 | 低 | 后续继续避免出现具体“第二个 context”措辞；优先用“beyond the current repo-backed context” | 已完成一次收口，当前风险可控 |
| 否定句中仍带较大范围词汇 | `06_draft/round3_en/full_shortpaper_en_v2.md:106,124`；`06_draft/round3_en/limits_conclusion_en_v2.md:5,7,9`；`06_draft/round3_en/intro_en_v2.md:21,23` | 中 | 在后续精修时，优先把 limitation 句压回“current repo-backed boundary”；只保留最必要的非主张说明 | 这些句子是安全的否定句，但会把评审视线带向 portability / deployment / interoperability 等更大问题 |
| “平台/治理层”词汇残留 | `04_tables/round3/table1_artifact_surface_en.md:5` 中 `A general governance platform`；`06_draft/round3_en/abstract_en_v2.md:1` 与主稿中仍有 `general governance layer/system` 的否定性表述 | 低 | 表格中可以保留为“cannot support”对照项；正文中若需继续收口，可进一步统一为 `broader system-level claim` | 当前未把自己写成平台论文，但术语仍需克制 |
| `deployment evidence` / `full FDO interoperability` 等大词 | `06_draft/round3_en/full_shortpaper_en_v2.md:23,106,124`；`06_draft/round3_en/limits_conclusion_en_v2.md:7,9` | 中 | 保留在 limitation 段落即可，不要扩散到标题、摘要首句、方法主叙述； 若版面紧张，优先删减这类大词否定句 | 这些词是为划边界而出现，不是事实主张，但出现次数偏多 |
| 多 agent / 大规模运行语义 | `06_draft/round3_en/full_shortpaper_en_v2.md:106`；`06_draft/round3_en/evaluation_en_v2.md:58` | 中 | 保留一次即可，避免重复；更推荐改成“outside the current artifact boundary” | 当前是 limitation 句，不构成事实越线，但重复会放大“大系统论文”联想 |

## 总结

- 盲审面目前基本干净：submission-facing 文件未发现作者身份、私有路径、历史 venue 或历史分支痕迹。
- 事实越界面目前可控：未发现 `2 valid`、`5 invalid`、`retention review` 等 Branch B 事实串入。
- 当前最大风险不是“写错事实”，而是 limitation 句中过多提及更大范围术语，可能让评审把注意力拉向本稿并未主张的范围。
