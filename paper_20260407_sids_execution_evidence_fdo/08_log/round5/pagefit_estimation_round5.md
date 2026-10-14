# Page-Fit Estimation Round 5

## 基线

- `full_shortpaper_en_v4_source.md` 当前总词数：约 `2235`
- `main.tex` 采用 IEEE-like two-column staging 结构
- 当前计划保留：
  - `2` 张单栏图
  - `1` 张单栏紧凑表
  - `6` 个 section（Abstract, Introduction, Method, Evaluation, Related Work, Limits and Conclusion）

## 当前判断

`临界`

## 原因

1. 正文字数本身已被压到 workshop 级安全区，但不是非常松。
2. `2 图 + 1 表` 在 two-column conference 版式里是可行的，但 float 摆放会明显影响页数。
3. 当前本机无法编译 PDF，因此无法拿到真实页数，只能做 staging 估计。
4. 在保守估计下，正文大概率可以压进 6 页附近，但浮动体和参考文献长度可能把版面推到边缘。

## 当前大致安全区

- 若真实模板接近常见 IEEE two-column conference 密度，则当前正文有希望落在 `5.x` 到 `6.0` 页附近。
- 当前最主要的页数风险不是正文段落，而是：
  - 两张图的高度
  - 紧凑表的列宽
  - 参考文献在真实模板中的行距与换行

## 关于 `2 图 + 1 表` 是否现实

- 现实，但偏紧。
- 如果真实模板更紧，第一优先压缩对象不应是研究内容本身，而应是表格与 caption。
- 若后续真实模板比当前 staging 更紧，最先考虑的配置变化应是：
  - 维持 `2 图 + 1 表` 但进一步压 caption 和表列文字
  - 若仍超页，则降到 `2 图 + 0 表`
  - 再不够时，再考虑 `1 图 + 1 表`

## 结论

- 当前 page-fit 不能判“稳过”，也不能判“明显超页”。
- 最准确的 staging 结论是：`临界，但有较大概率通过；最终仍需真实模板编译验证。`
