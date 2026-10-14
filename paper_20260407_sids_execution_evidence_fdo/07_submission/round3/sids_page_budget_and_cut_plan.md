# SIDS 6 页页数预算与删减计划

## 目标

- 目标：`6` 页正文
- 策略：压缩 scope，不压缩 closure

## 建议字数预算

- 标题 + 摘要：`180–220` 词
- 引言：`550–750` 词
- 方法：`800–1100` 词
- 评估：`450–650` 词
- related work：`300–450` 词
- limitations + conclusion：`250–400` 词

## 图表上限

- 图：最多 `2` 张
- 表：最多 `2` 张

## 主稿必须保留的内容

- logs are not enough 这一问题入口
- single-operation accountability object 的定义
- minimal profile 的 top-level object model
- 四段 validator pipeline
- artifact surface：schema / validator / CLI / examples / demo / tests
- 评估边界：`1 valid + 3 invalid + 1 demo`
- limitation：只有一个 valid context、没有 broad portability、没有 deployment evidence

## 超页时优先删减的内容

- related work 中的细枝末节比较
- 对 FDO/DOIP 背景的长段解释
- 对每个字段的逐项展开说明
- 对 demo 的叙事性细节
- reviewer-facing 语气中重复出现的防守句

## 只能放补充材料、不能进主稿的内容

- branch reconciliation 管理说明
- claim-evidence matrix 全表
- blindness / overclaim 检查日志
- 长版 reviewer attack map
- 大段 status / handoff / acceptance 文档复述

## 本稿压缩原则

- 本稿不是长篇期刊改写，不保留 JSS / TOSEM 风格的大段 related work
- 本稿的赢面来自 closure，不来自 scope
- 如果必须删内容，先删“广”，后保“闭”
