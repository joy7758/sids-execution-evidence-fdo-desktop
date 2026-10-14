# Final Upload Readiness Audit

| 检查项 | 状态 | 说明 |
| --- | --- | --- |
| official venue facts locked | done | round6 已按官方 CFP 锁定 single-blind、6 pages、IEEE template、关键日期 |
| template mode locked | done | 当前 mode = `official-template mode` |
| final manuscript source ready | done | round6 final source、main.tex、refs.bib、portal pack 已生成 |
| author metadata locked | blocker | name / affiliation / country 跨本地材料仍有变体，当前仅能给出 `AUTHOR_BLOCK_TODO` |
| PDF built | blocker | 本机无 TeX 工具链，未生成 final PDF |
| page count acceptable | partial | 仅有未编译估计，无真实页数 |
| references consistent | done | round6 main.tex 与 refs.bib 保持最小引用集一致 |
| figure/table config locked | done | 最终配置锁定为 `2 图 + 0 表` |
| portal pack ready | partial | 文本已生成，但 author / funding / conflict 仍需作者确认 |
| branch contamination clean | done | 未发现 Branch B 污染 |
| single-blind consistency clean | partial | 匿名措辞已清理，但 author block 尚未恢复 |

## 最终总判断

`almost ready`

## 为什么不是 ready to upload

1. 没有 final PDF
2. 没有 PDF 页数真值
3. author block 尚未最终锁定

## 为什么也不是 not ready

1. official venue facts 已锁定
2. official template 主资产已拿到
3. final source package 已成型
4. portal pack 已基本成型
5. branch contamination / overclaim 已清理到较稳定状态
