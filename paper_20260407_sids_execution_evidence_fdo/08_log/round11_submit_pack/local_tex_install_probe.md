# Local TeX Install Probe

## 系统与包管理器探测

- OS：
  - `Darwin`
- macOS：
  - `ProductVersion 26.3.1`
- `brew`：
  - 未发现
- `apt-get`：
  - 未发现
- `dnf`：
  - 未发现
- `yum`：
  - 未发现
- `pacman`：
  - 未发现

## 当前 TeX 工具探测

- `latexmk`：未发现
- `pdflatex`：未发现
- `xelatex`：未发现
- `lualatex`：未发现
- `bibtex`：未发现

## 标准路径补探测

- `/Library/TeX/texbin`：
  - 未发现可用安装
- `/usr/local` / `/opt/homebrew` / `/Library` 下常见 TeX 二进制：
  - 未发现 `pdflatex` / `latexmk` / `bibtex`

## 初步结论

- 当前机器是 macOS，但没有 Homebrew，也没有任何可用的系统包管理器。
- 当前没有现成可用的 TeX toolchain，也没有发现只是 PATH 缺失的 TeX 安装。
