# Template Mode Decision Round 6

## 当前 mode

`official-template mode`

## 证据

1. official venue facts 已明确要求使用 IEEE conference proceedings format 与 IEEE 官方模板。
2. 当前 round6 已成功获取官方 IEEE conference LaTeX template ZIP，并已解包到：
   - `07_submission/round6/official_template_raw/`
3. 获取到的官方模板核心资产包括：
   - `IEEE-conference-template-062824.tex`
   - `IEEEtran.cls`
   - 官方模板示例 PDF
4. round6 的 `main.tex` 将直接基于该 official IEEE conference template 结构组织，而不再继续依赖旧 donor 作为最终模板。

## 为什么不是 staging-only mode

- staging-only mode 的前提是没有拿到官方模板，或者拿到了也无法整合。
- 当前至少已经拿到了官方 conference template 主 ZIP，并能据此组织 final `main.tex`。
- 因此 round6 已经不再只是 staging donor 试写。

## 当前 mode 的限制

- 虽然进入了 `official-template mode`，但本机仍然缺少 LaTeX 工具链。
- 因此当前还不能证明：
  - final PDF 已成功生成
  - 实际页数已在官方模板下验证通过
- 也就是说，`official-template mode` 不等于已经 `ready to upload`。

## 对 ready-to-upload 判断的直接影响

- 正面影响：
  - 官方模板来源已锁定
  - final source package 可以按 official template 结构组织
- 负面影响：
  - 若没有 final PDF 和页数实测结果，上传状态仍不能超过 `almost ready`
  - 若 author metadata 仍未完全锁定，single-blind 最终版仍有 uploader blocker

## 结论

- round6 mode = `official-template mode`
- 但当前最终状态仍取决于：
  - PDF 是否生成
  - 6 页是否实测通过
  - 作者信息是否可安全恢复到 author block
