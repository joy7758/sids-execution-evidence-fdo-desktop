# Local Compile Attempt

## 使用的输入

- main:
  - `07_submission/round11_submit_pack/SIDS2026_SUBMISSION_FINAL/BUNDLES/overleaf_bundle_submission_final_v2.zip`
- 实际编译入口：
  - bundle 内 `main.tex`
- bibliography:
  - bundle 内 `refs_en_locked.bib`

## 使用的编译器

- `tectonic 0.15.0`
- 平台：
  - `aarch64-apple-darwin`

## 编译过程摘要

1. 下载独立 `tectonic` 二进制
2. 解包 round11 最终 Overleaf bundle
3. 首次编译因 `out/` 目录未创建而终止
4. 第二次编译因缓存中的 `dehypht-x-2022-03-16.pat` 文件损坏而失败
5. 清理 `tectonic` 用户缓存后重新编译
6. 编译成功，生成 PDF

## 编译结果

- `local compile = successful`
- 输出 PDF：
  - `07_submission/round11_submit_pack/SIDS2026_final_submission.pdf`
