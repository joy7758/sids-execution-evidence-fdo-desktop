# 审阅包样例说明

## 样例目录

审阅包样例位于：

- `samples/review-pack/`

## 生成方式

该样例由运行结果样例生成，输入来自：

- `samples/run-result/langchain-evidence.bundle.json`
- `samples/run-result/receipt.json`
- `samples/run-result/summary.json`
- `samples/run-result/langchain-evidence.manifest.json`
- `samples/run-result/manifest-public.pem`
- `samples/run-result/runtime-events.jsonl`

## 包含内容

主文件：

- `primary/bundle.json`
- `primary/receipt.json`
- `primary/summary.json`

审阅输出：

- `review/report.md`
- `review/report.pdf`

附属文件：

- `supporting/manifest.json`
- `supporting/manifest-public.pem`
- `supporting/runtime-events.jsonl`

索引文件：

- `index.json`

## 中文报告样例

Markdown 报告位于：

- `samples/review-pack/review/report.md`

报告第一眼应为中文，例如：

- 审阅报告
- 总体状态
- 交付物清单
- 校验结果
- 问题摘要
- 证据引用
- 审阅备注

## PDF 样例

PDF 报告位于：

- `samples/review-pack/review/report.pdf`

桌面端结果页应把 PDF 作为第一交付物。Markdown 保留为技术或中间格式。
