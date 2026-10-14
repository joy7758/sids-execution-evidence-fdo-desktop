# Build README

## 当前文件用途

- `main.tex`：round5 的 IEEE-like conference staging source
- `refs.bib`：正文实际使用的最小引用集
- `full_shortpaper_en_v4_source.md`：英文母本 source of truth
- `full_shortpaper_en_v4_clean.txt`：纯文本核对版

## 当前推荐编译方式

如果后续机器上具备 LaTeX 工具链，可尝试：

```bash
latexmk -pdf main.tex
```

若不使用 `latexmk`，则可尝试：

```bash
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

## 当前阻塞点

- 本地环境未发现 `latexmk`
- 本地环境未发现 `pdflatex`
- 本地环境未发现 `xelatex` / `lualatex`
- 因此当前只能生成 source package，不能在本机完成 PDF 编译验证

## 额外说明

- 当前 `main.tex` 明确是 `staging only`
- 当前未找到真实 SIDS 官方模板
- 当前版式判断仅用于页数/结构预估，不应冒充正式 venue 源文件
