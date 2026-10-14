# Overleaf Handoff

## 导入哪个 zip

- 导入：`overleaf_import_bundle.zip`

## 打开哪个 main.tex

- 打开：`main.tex`

## 导入后先填哪些地方

1. author block
   - `AUTHOR NAME HERE`
   - `AFFILIATION HERE`
   - `COUNTRY HERE`
   - `EMAIL HERE`
2. 若需要在 PDF 或 submission system 中同步填写：
   - funding statement
   - conflict statement

## 编译后先检查什么

1. PDF 是否成功生成
2. 实际页数是否 `<= 6`
3. Fig 2 是否正常显示
4. Fig 1 是否正常显示
5. 参考文献是否渲染完整

## 若超页，按什么顺序删

1. 压 related work
2. 压 limits/conclusion
3. 压 intro 中重复 framing
4. 缩短 figure captions
5. 若仍不够，再删 Fig 1

## 说明

- Fig 2（validator path）优先级最高
- 当前包保持 Branch A 事实边界
- 当前包不包含 Branch B 内容
