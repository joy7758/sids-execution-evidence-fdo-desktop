# Local Pagecount Check

## PDF 输出

- `07_submission/round11_submit_pack/SIDS2026_final_submission.pdf`

## 检查结果

- PDF 实际页数：
  - `3`
- 是否 `<= 6`：
  - `yes`
- 标题：
  - 正常
- 作者块：
  - 正常
- 图：
  - 编译通过，未出现缺图错误
- 参考文献：
  - 已正常生成 `.bbl`

## 备注

- 编译日志中仍有若干 warning：
  - `Overfull \\vbox (1.84889pt too high)`
  - `internal consistency problem when checking if main.bbl changed`
- 这些 warning 未阻止 PDF 生成，也未影响页数约束结论。
