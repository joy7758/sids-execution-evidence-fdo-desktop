# 智能体运行监测、留痕与审阅交付平台试点交付包

## 交付包用途

这份交付包用于中国政企、国企或内网试点前的产品说明和样例演示。它帮助试点用户快速理解：

- 平台能自动发现智能体运行结果
- 平台会展示证据完整性、校验回执、审阅交付和政策检查项
- 平台能生成审阅包，并把 PDF 报告作为第一交付物
- 当前版本的边界在哪里，哪些能力还没有承诺

## 文件结构

- `01-product-one-pager.md`：产品一页说明
- `02-platform-boundaries.md`：平台能力边界
- `03-sample-run-result.md`：运行样例包说明
- `04-sample-review-pack.md`：审阅包样例说明
- `05-minimal-trial-guide.md`：最小试用手册
- `06-feedback-template.md`：反馈模板
- `07-pilot-acceptance-checklist.md`：试点验收清单
- `samples/run-result/`：运行结果样例目录
- `samples/review-pack/`：审阅包样例目录

## 样例路径

运行结果样例：

- `samples/run-result/langchain-evidence.bundle.json`
- `samples/run-result/receipt.json`
- `samples/run-result/summary.json`
- `samples/run-result/langchain-evidence.manifest.json`
- `samples/run-result/manifest-public.pem`
- `samples/run-result/runtime-events.jsonl`

审阅包样例：

- `samples/review-pack/index.json`
- `samples/review-pack/primary/bundle.json`
- `samples/review-pack/primary/receipt.json`
- `samples/review-pack/primary/summary.json`
- `samples/review-pack/review/report.md`
- `samples/review-pack/review/report.pdf`
- `samples/review-pack/supporting/manifest.json`
- `samples/review-pack/supporting/manifest-public.pem`
- `samples/review-pack/supporting/runtime-events.jsonl`

## 安全边界

样例中不包含私钥文件。`manifest-private.pem` 只存在于本地生成过程，不进入交付包。

## 推荐试用顺序

1. 阅读 `01-product-one-pager.md`
2. 阅读 `02-platform-boundaries.md`
3. 打开桌面端，导入 `samples/run-result/`
4. 生成审阅包
5. 对比 `samples/review-pack/`
6. 打开 `samples/review-pack/review/report.pdf`
7. 按 `06-feedback-template.md` 填写反馈
8. 按 `07-pilot-acceptance-checklist.md` 做试点验收
