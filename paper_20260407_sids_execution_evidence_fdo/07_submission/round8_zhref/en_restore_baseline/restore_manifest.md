# Restore Manifest

## 锁定英文恢复基底的文件与来源

| 锁定文件 | 来源 | 为什么选它 | 提交前怎么用 |
| --- | --- | --- | --- |
| `refs_en_locked.bib` | `07_submission/round8_handoff/final_overleaf_bundle/refs.bib` | 最接近当前上传包的英文参考文献库 | 作为英文 reference layer 锁定库与核对基底 |
| `main_en_locked.tex` | `07_submission/round8_handoff/final_overleaf_bundle/main.tex` | 最接近当前 clean Overleaf upload bundle 的 template source | 直接恢复为提交前的英文主 tex |
| `full_shortpaper_en_locked.md` | `06_draft/round8_frozen/full_shortpaper_en_frozen.md` | 当前 scientific text 的英文冻结快照 | 作为英文正文人工核对基底 |
| `references_in_use_en_locked.md` | `07_submission/round4/references_in_use_round4.md` | 当前最明确的“实际使用最小引用集”清单 | 用于恢复后核对引用集与 citation key |

## 为什么不从更早 round 恢复

- 更早 round 虽然也有英文参考文献，但不如当前 round8 handoff / round8 frozen 更接近现有 submission 基底。
- 直接从更早 round 取文件，会增加 scientific text 与 upload bundle 不一致的风险。

## 提交前恢复原则

1. 优先整文件切回，不做逐条手工回译
2. 恢复 reference layer，不重写正文 scientific content
3. 当前 `main_en_locked.tex` 是最终 submission source 的权威恢复文件
4. `refs_en_locked.bib` 主要用于英文 reference layer 锁定与核对，不要求 final main 必须调用它
5. 恢复后先检查 citation key、一致性和模板可编译性
