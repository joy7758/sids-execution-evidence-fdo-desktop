# Why Study Fields Must Not Touch Title

## 为什么 `title` 不能加入注音

1. `title` 是 bibliography compile-facing surface 的核心字段
2. 一旦把注音写进 `title`，就会直接进入 IEEE bibliography 显示层
3. 这会带来：
   - 版面变长
   - CJK 渲染不稳定
   - 与 submission truth 偏离

## 为什么 `title` 不能变成中英混排

1. submission truth 仍然是纯英文 locked bib
2. 中英混排 title 只适合作为 working-only visible 层
3. 默认工作 bib 应尽量保持与 submission path 同形

## 为什么注音必须走辅助字段或人读清单

1. 辅助字段不会污染 canonical bibliographic surface
2. 人读清单更适合承载学习信息
3. 这样能把：
   - bibliography 真值
   - 学习注音信息
   - 提交前恢复动作
   分层处理

## 为什么这样才能保证切回 submission 时零扰动

1. 不需要手工删注音
2. 不需要手工重写 title
3. 只要切回英文 locked baseline，即可恢复 submission truth
