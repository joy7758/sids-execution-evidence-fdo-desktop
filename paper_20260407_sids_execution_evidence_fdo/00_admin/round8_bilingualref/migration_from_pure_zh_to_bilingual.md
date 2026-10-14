# Migration From Pure ZH To Bilingual

## 迁移意义

从纯中文工作版迁移到双语工作版，核心目的是把：

- 当前中文阅读需求
- 提交前英文恢复稳定性

拆成两个互不污染的层次。

## 为什么要迁移

1. 纯中文 `title` 更容易让英文回切时产生漂移
2. 当前工程已经明确“不逐条删中文，而是切回英文锁定基底”
3. 双语模式更符合这一恢复策略

## 当前默认路径

- 默认工作 bib：
  - `06_draft/round8_bilingualref/refs_working_bilingual_safe.bib`
- 默认工作 tex：
  - `06_draft/round8_bilingualref/main_bilingual_safe.tex`
- submission truth：
  - `07_submission/round8_zhref/en_restore_baseline/refs_en_locked.bib`
  - `07_submission/round8_zhref/en_restore_baseline/main_en_locked.tex`
