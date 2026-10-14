# Snapshot And Experimental Demotions

## `round8_zhref/*` -> snapshot

- 当前用途：
  - 纯中文参考文献工作快照
  - 中文工作阶段的历史记录
- 为什么不能默认 compile：
  - reference layer 已经切回更稳的英文 compile-safe 路径
  - 纯中文 bibliographic surface 与当前 submission truth 距离更远
- 未来只在什么情况下查看：
  - 回看中文工作化过程
  - 核对早期中文著录快照

## `round8_studyref/*` -> snapshot

- 当前用途：
  - v2 学习模式快照
  - “study fields 仍在 bib 中”的历史阶段记录
- 为什么不能默认 compile：
  - 其中的 safe v2 bib 仍携带中文学习字段
  - 当前默认 compile-safe 路径已经升级为纯英文 bib + sidecar 学习层
- 未来只在什么情况下查看：
  - 回看 study mode 的演化过程
  - 对比 v2 与 v3 的架构差异

## 所有 `visible` / `experimental` bib -> experimental only

- 当前用途：
  - 中英混排显示试验
  - 阅读体验测试
- 为什么不能默认 compile：
  - 可能引入中英混排、编码、版面或 BibTeX 风险
  - 不够接近最终 submission path
- 未来只在什么情况下查看：
  - 需要测试显示效果时
  - 仅作为 working-only 阅读试验

## 当前结论

- 当前默认工作层只保留：
  - `main_study_safe_v3.tex`
  - `refs_compile_safe_v3.bib`
- 当前 submission truth 只保留：
  - `main_en_locked.tex`
  - `refs_en_locked.bib`
