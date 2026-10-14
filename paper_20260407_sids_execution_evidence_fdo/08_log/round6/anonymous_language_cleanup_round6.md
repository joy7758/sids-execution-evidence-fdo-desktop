# Anonymous Language Cleanup Round 6

## 扫描范围

- `06_draft/round5_tex/`
- `06_draft/round4_en/`
- `07_submission/round5/`

## 发现项

| 出现位置 | 风险 | round6 改写 |
| --- | --- | --- |
| `06_draft/round5_tex/main.tex` 中 `Anonymous Submission` | 与 single-blind venue 不匹配 | 改为 `AUTHOR_BLOCK_TODO`，并在 round6 明确标注为 uploader blocker |
| 其余 round4 / round5 submission-facing 文本中未发现 `blinded` / `withheld for anonymous review` / `frozen review package` | 低 | 保持删除状态 |

## round6 清理原则

- 不再保留 `anonymous` 作为 final submission posture。
- 但仍保留 hygiene：
  - 不写本地路径
  - 不写 commit hash
  - 不写精确私有实现字符串

## 结论

- round6 需要改写的唯一直接匿名残留，是 round5 `main.tex` 的 author block。
- 其他 blind-specific wording 在当前 submission-facing 文本中已基本清理完毕。
