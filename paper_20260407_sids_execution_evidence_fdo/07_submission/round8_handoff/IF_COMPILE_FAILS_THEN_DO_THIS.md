# IF COMPILE FAILS THEN DO THIS

## 典型问题与第一处理动作

1. `IEEEtran.cls` 找不到
   - 第一动作：确认 `IEEEtran.cls` 是否与 `main.tex` 在同一目录

2. bib 不渲染
   - 第一动作：确认 `refs.bib` 是否与 `main.tex` 在同一目录
   - 然后确认编译流程是否包含 bibliography 处理

3. 图路径错
   - 第一动作：当前默认 source 不依赖外部图文件；若你手动改过图，请恢复 bundle 原状

4. UTF-8 / 特殊字符报错
   - 第一动作：先检查作者块中的特殊字符、长破折号、全角标点

5. 作者块 placeholder 导致格式错误
   - 第一动作：不要手填零散字段，直接复制 `author_block_patch_A.tex` 或 `author_block_patch_B.tex`

6. 引用 key 不存在
   - 第一动作：确认 `main.tex` 与 `refs.bib` 是否来自同一个 round8 bundle，不要混用旧 round 文件
