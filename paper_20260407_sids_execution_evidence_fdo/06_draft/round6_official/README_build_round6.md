# README Build Round 6

## Current mode

`official-template mode`

## Build command

If a LaTeX toolchain is available, the intended command is:

```bash
pdflatex main.tex
pdflatex main.tex
```

Note:

- `main.tex` uses a manual `thebibliography` section, so `bibtex` is not required for the current source package.
- `IEEEtran.cls` should remain in the same directory as `main.tex`.

## Current machine status

- `latexmk`: missing
- `pdflatex`: missing
- `xelatex`: missing
- `lualatex`: missing
- `bibtex`: missing

## Has compilation succeeded here?

`No`

## Current blocker

- The current machine does not have a TeX toolchain.
- Therefore round6 can produce a complete official-template source package, but it cannot verify the final PDF locally.

## Source of truth

- `full_shortpaper_en_v6_source.md`
- `main.tex`
- `refs.bib`
- `title_abstract_authorblock_en_v6.md`
- `artifact_availability_note_en_v6.md`
