# Bilingual Tex Mode Decision

## 默认路径

默认路径应为：

- `main_bilingual_safe.tex`

## 原因

1. `main_bilingual_safe.tex` 调用的是 `refs_working_bilingual_safe.bib`
2. safe bib 的 `title` 保持英文 canonical title
3. 中文 subtitle 只放在 `x_zh_title` 中，不直接进入默认 bibliography 显示层
4. 这样更接近 submission-facing bibliographic surface，也更不容易引入 title 漂移

## 为什么 `main_bilingual_visible.tex` 只能是试验路径

1. visible 版把中文 subtitle 直接放进 `title` 显示层
2. 它更适合当前工作阅读，不适合作为默认 submission compile 路径
3. 在 IEEE / BibTeX / Overleaf 路径下，它更可能带来：
   - bibliography 变长
   - CJK 渲染问题
   - 版面不稳定

## 为什么 official IEEE submission path 仍应回到纯英文 locked baseline

1. 英文锁定基底才是当前唯一 submission truth
2. 提交前最稳的动作是切回 `main_en_locked.tex` 与 `refs_en_locked.bib`
3. 不应让 working bib 直接承担最终 submission 责任
