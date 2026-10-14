# Why Sidecar Is Safer Than Study Fields In Bib

## 为什么 compile-facing bib 不应含中文学习字段

1. 即使是未知字段，BibTeX 工具链也可能遇到编码或处理差异
2. 当前工程仍然是 overleaf-only handoff，本地没有编译真值
3. compile-facing 路径越接近最终 submission path 越稳

## 为什么 sidecar 更稳

1. 纯英文 bib 可以最大限度接近 submission truth
2. 学习信息完全外移后，不会污染 bibliography surface
3. 恢复 submission 时不需要处理学习字段

## 为什么这样切回 submission 几乎零扰动

1. `refs_compile_safe_v3.bib` 已经是纯英文 canonical 镜像
2. sidecar 文件只是人读学习层
3. 正式提交前只需切回英文 locked baseline，不需要删改学习信息
