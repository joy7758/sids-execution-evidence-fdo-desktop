# Author Metadata Canonical

## Canonical 判定结果

- canonical author name：`Zhang Bin`
- canonical affiliation：`Independent Research Scholar`
- canonical country：`待确认`
- canonical email：`joy7759@gmail.com`

## 证据来源

### 一致支持的主证据簇

1. `execution-evidence-jss-20260407b/venue/jss/jss-title-page.md`
   - `Zhang Bin`
   - `Independent Research Scholar`
   - `joy7759@gmail.com`
2. `execution-evidence-jss-20260407b/venue/jss/jss-cover-letter.md`
   - `Zhang Bin`
   - `Independent Research Scholar`
   - `joy7759@gmail.com`
3. `execution-evidence-jss-20260407b/submission/_export_build/execution-evidence-jss-title-page-final.html`
   - `Zhang Bin`
   - `Independent Research Scholar`
   - `joy7759@gmail.com`

### 冲突或不完全一致的本地材料

1. `tse-submission-private/submission/tse_submission_metadata_current.txt`
   - `Bin Zhang`
   - `Independent Researcher`
   - `Yuncheng, Shanxi, China`
   - `joy7759@gmail.com`
2. `tse-submission-private/submission/tse_cover_letter_current.md`
   - `Bin Zhang`

## 判定说明

- `name / affiliation / email` 的 JSS 窄分支材料至少有两处一致支持，因此可锁定为当前 SIDS 线最接近 Branch A 的 canonical 主证据簇。
- 但 `country` 只有另一条 manuscript 线明确写出，当前缺少第二处一致支持。
- 同时，本地材料存在：
  - `Zhang Bin` vs `Bin Zhang`
  - `Independent Research Scholar` vs `Independent Researcher`
 这两组跨稿线差异。

## 是否可直接进入 submission PDF

`否`

## 原因

1. `country` 尚未被至少两处本地材料一致锁定。
2. 本地 manuscript family 之间仍存在 name order 与 affiliation wording 的变体。
3. 在 single-blind 最终版中，author block 一旦写错，会比继续保留 TODO 风险更高。

## round6 处理建议

- 在 final submission source 中使用 `AUTHOR_BLOCK_TODO`。
- 上传前由作者手动确认：
  - 最终英文姓名顺序
  - 最终 affiliation wording
  - country / city-country 写法
  - email 是否直接放入 PDF
