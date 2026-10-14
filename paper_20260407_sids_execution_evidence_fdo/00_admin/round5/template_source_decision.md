# Template Source Decision

## 搜索结果

当前 workspace 中找到的相关模板或模板候选主要有：

| 路径 | 类型 | 是否可直接用于当前稿 | 风险 |
| --- | --- | --- | --- |
| `/Users/zhangbin/GitHub/verifiable-agent-demo/paper/latex/main.tex` | LaTeX / `acmart` conference source | 否 | 是 ASE 方向 `acmart` 稿，不是 SIDS 模板，且 venue 语义不同 |
| `/Users/zhangbin/GitHub/verifiable-agent-demo/submission/ase2026/artifact_package/paper/latex/main.tex` | LaTeX / `acmart` sample source | 否 | 同上，且带 ASE 具体会议信息 |
| `/Users/zhangbin/GitHub/pFDO-Specification/main.tex` | LaTeX / `IEEEtran` conference-like source | 否，不能直接用 | 是另一条旧线的正文，不匿名，且内容污染风险高；只能作为结构 donor |
| `/Users/zhangbin/GitHub/aro-audit/docs/preprint_arxiv.tex` | LaTeX / preprint source | 否 | 更接近 arXiv 预印本，不适合当前 workshop staging |

## 结论

`当前 workspace 未找到真实 SIDS 模板`

更准确地说：

- 找到了若干 LaTeX 源文件
- 但没有找到能被认定为“当前 SIDS 官方模板”的真实模板包
- 也没有找到明确标注为 SIDS 的 `cls` / `sty` / sample package

## 本轮采用的模板来源

本轮采用：

`基于 workspace 内已有 IEEE-like conference 源结构，构建 round5 staging template package`

具体 donor：

- 主要参考 `/Users/zhangbin/GitHub/pFDO-Specification/main.tex` 的 `IEEEtran` conference 结构
- 只借用结构形式，不借用任何旧论文内容

## 为什么

- 当前没有真实 SIDS 模板，不能假装已经拿到官方文件
- 但 round5 仍需要一个更接近正式投稿的 two-column conference staging 结构来做页数和版面预估
- `IEEEtran` 风格比 `acmart` 更接近“保守 conference staging”目标

## 是否足以做页数/版式预估

- 足以做 `staging-level` 页数和版式预估
- 不足以替代真实 venue 模板验证
- 因此 round5 的 page-fit 结论只能是“预估结论”，不能冒充正式模板下的最终结论
