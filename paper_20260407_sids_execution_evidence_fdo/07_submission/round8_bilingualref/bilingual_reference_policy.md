# Bilingual Reference Policy

## 当前模式

当前采用：`英文 canonical bib + 双语 working bib + 英文 submission restore baseline`

## 统一规则

1. citation key
   - 完全不变

2. 作者名
   - 保留原文拼写
   - 不翻作者名

3. 标题
   - canonical 英文标题必须完整保留
   - 中文 subtitle 只作为 annotation
   - 不确定时写 `中文暂译`

4. 默认安全工作 bib（safe bib）规则
   - `title` 字段保持纯英文 canonical title
   - 中文 subtitle 放入辅助字段：
     - `x_zh_title = {...}`
   - 不要求 bib style 渲染该字段

5. 可见双语显示版（visible bilingual）规则
   - 仅用于工作阅读
   - 不作为默认 submission compile 路径
   - `title` 可写成：
     - `English Title【中文暂译：...】`
   - 必须明确标记为 `WORKING ONLY`

6. DOI / URL / year / volume / pages
   - 全部保持原样

7. 机构 / 期刊 / 会议名
   - 默认保留原文
   - 若确有必要，只在人读清单中补中文说明
   - 不为中文化而破坏 canonical bibliographic surface

8. 提交前恢复
   - 不手工逐条删中文
   - 直接切回英文锁定 bib 与英文锁定 tex/source
