# Single-Blind Implications Round 6

## 为什么 round3/round4 的 blindability 工作现在降级为 hygiene

- 因为当前 venue 明确是 `single-blind`，不是 double-blind。
- 因此，作者身份不再需要在最终提交版中被系统性隐藏。
- round3/round4 做的 blindability 工作仍然有价值，但价值从“硬提交姿态”变成了“卫生控制与可发现性风险控制”。
- 仍值得保留的部分包括：
  - 不写本地绝对路径
  - 不写 commit hash
  - 不写精确内部命令串
  - 不写半成品 artifact 标识
  - 不写不必要的唯一可搜索字符串

## 哪些 anonymous wording 现在必须从 final submission 版本删除

- `anonymous review version`
- `blinded review package`
- `frozen review package`
- `withheld for anonymous review`
- `public archive identifiers withheld for anonymous review`
- `anonymous submission`
- `blinded artifact surface`

## 为什么这些词现在必须删除

- 它们会让最终投稿版看起来仍在按 double-blind 逻辑准备。
- 它们会与 venue 的 single-blind 要求直接不匹配。
- 它们还会把评审注意力拉向并不存在的 artifact release/withholding 叙述。

## 哪些 searchability 风险仍值得保留为 hygiene

- 本地路径
- 精确 CLI 串
- 精确包名 / 模块名
- 精确 profile 全名
- commit hash
- 旧 venue 名称
- 独特 demo 名称
- 精确文件名与目录名

## round6 的执行含义

- final submission 版本应删除 anonymous/blinded wording。
- 但 final submission 版本仍然不应引入不必要的私有实现字符串。
- 这意味着 round6 不是“彻底放弃 hygiene”，而是“从 blind posture 切换为 single-blind hygiene”。
