# Sentence Surgery Plan Round 4

| round3 部位 | 处理动作 | round4 策略 |
| --- | --- | --- |
| Abstract | 压缩 | 保留 4 句骨架：问题、artifact surface、validation checks、bounded claim；删除多余防御句 |
| Introduction 开头两段 | 合并 | 把 FDO/data-space 问题与“logs are not enough”收成更短的两段，不再层层铺垫 |
| Introduction 中“不是平台/不是大系统”相关句 | 删除或合并 | 只保留一次主要 scope boundary 句，不再重复否定 portability/deployment/ecosystem |
| Introduction 末段 | 压缩 | 用更硬的工程句式写贡献与边界，删除修辞性总结 |
| Methods 的设计动机段 | 压缩 | 少写自我辩护，多写 object model 与 validation path 本身 |
| Methods 的字段说明段 | 保留并紧缩 | 保留 top-level fields，但减少“为什么不是更大模型”的对照句 |
| Methods 的 validation stages | 保留 | 这是主稿核心，保留四阶段，但每阶段一句到两句即可 |
| Methods 的 CLI/report 段 | 保留并紧缩 | 只保留 machine-readable report、non-zero on failure、examples/walkthrough 共享同一路径 |
| Evaluation 的 artifact surface 清单 | 合并 | 把 `1 valid + 3 invalid + tests + CLI + walkthrough` 压成一段或短列表 |
| Evaluation 的 invalid cases | 保留但抽象 | 不再使用精确错误码，改写成三类描述性 failure classes |
| Evaluation 的 limitation 段 | 重写 | 改成 `What this evaluation establishes` / `What it does not establish` 两个短小节，回到 current artifact boundary |
| Related Work | 大幅压缩 | 只保留 digital objects、PROV、logs/traces、artifact verification 四个定位段 |
| Conclusion | 合并并缩短 | 把 limitation 与 conclusion 合成更短结尾，突出 `inspectable closure` |

## 总体裁剪目标

- 从 round3 的草稿语气转成 workshop submission 语气。
- 从 2600+ 词压到 2100--2350 词。
- 删除所有不必要的唯一字符串与大词否定清单。
- 保留真正的审稿抓手：一个 operation-centered object、四阶段 validator、一个 repo-backed 正例、三个受控反例、一条 walkthrough。
