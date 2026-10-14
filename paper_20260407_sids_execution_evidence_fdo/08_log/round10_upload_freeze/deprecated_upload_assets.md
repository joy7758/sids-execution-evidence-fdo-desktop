# Deprecated Upload Assets

| 路径 | 当前状态 | 为什么不能继续给作者作为默认上传包 | 若需追溯时才看什么 |
| --- | --- | --- | --- |
| `07_submission/round6/` | deprecated | 仍处在 round6 的 single-blind 过渡阶段，submission truth 尚未完成 round9 sync | 查看官方模板接入起点 |
| `07_submission/round7_upload/` | deprecated | 仍是 overleaf-only handoff 阶段的中间上传包，truth 路径未收口到 round9 synced truth | 查看早期 uploader 文本与 handoff 卡 |
| `07_submission/round8_handoff/` | deprecated | 这是外部 handoff 包，不是最终唯一作者上传包 | 查看早期 author choice / handoff 历史 |
| `07_submission/round8_zhref/` | snapshot | 这是中文 reference working 模式快照，不应再作为上传入口 | 查看中文 reference working 历史 |
| `07_submission/round8_bilingualref/` | snapshot | 这是 bilingual reference 过渡层，不是最终上传层 | 查看 bilingual reference 演化 |
| `07_submission/round8_studyref/` | snapshot | 这是 study fields in bib 的过渡层，不应再作为默认上传层 | 查看 study mode 过渡历史 |
| `07_submission/round9_submission_sync/overleaf_bundle_working_default_round9.zip` | deprecated | 这是默认工作 bundle，不是最终 submission truth bundle | 继续工作或外部试编译时才看 |
| `07_submission/round9_submission_sync/overleaf_bundle_submission_truth_round9.zip` | deprecated-as-direct-entry | 已被复制进 round10 final kit；作者不应再直接回 round9 目录找包 | 若需追溯 round9 sync 过程时才看 |
| `07_submission/round9_submission_sync/portal_*.txt` | deprecated-as-direct-entry | 已被复制进 round10 final kit 的 `PORTAL_COPY_PACK/` | 若需追溯 portal sync 过程时才看 |
| `07_submission/round9_submission_sync/main_submission_truth_synced_v1.tex` | deprecated-as-direct-entry | 已被复制进 round10 final kit 的 `SOURCE_TRUTH/` | 若需追溯 truth sync 过程时才看 |

## 选用当前版本的原因

- `author_choice_card.md` 选 `round8_handoff` 版本：
  - 这是当前最完整、最清楚的 A/B author block 选择卡。
- `funding_conflict_fill_once.txt` 选 `round8_handoff` 版本：
  - 内容最简、最直接，适合最终作者填写。
- `HUMAN_LAST_MILE_CARD.md` 选 `round9_submission_sync` 版本：
  - 这是唯一已经与 synced submission truth 路径对齐的人类操作卡。
