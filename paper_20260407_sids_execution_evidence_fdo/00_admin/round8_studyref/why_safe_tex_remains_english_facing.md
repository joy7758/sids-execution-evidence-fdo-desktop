# Why Safe Tex Remains English Facing

## 为什么学习模式下 main 仍然默认显示英文 bibliography

1. 英文 canonical title 才是当前 submission truth 的 bibliographic surface
2. safe tex 的任务是：
   - 保持编译路径稳定
   - 保持与 submission path 接近
   - 把学习信息外置

## 为什么这是最稳的做法

1. 本机仍然是 overleaf-only handoff
2. compile-facing 路径越稳定越好
3. 若把中文或注音直接塞进 bibliography 显示层，会放大：
   - 渲染风险
   - 版面风险
   - 恢复风险

## 为什么不要为了“看见中文注音”去污染 compile-facing bib

1. 中文与注音更适合放在人读清单里
2. compile-facing bib 应尽量接近 submission truth
3. 这样提交前只需切回英文 locked baseline，不需要处理学习字段
