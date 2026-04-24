# 运行样例包说明

## 样例目录

运行样例包位于：

- `samples/run-result/`

## 包含文件

- `langchain-evidence.bundle.json`：证据包文件
- `receipt.json`：校验回执文件
- `summary.json`：摘要文件
- `langchain-evidence.manifest.json`：清单文件
- `manifest-public.pem`：公钥文件
- `runtime-events.jsonl`：运行事件文件

## 不包含文件

本样例包不包含：

- `manifest-private.pem`

私钥默认不进入交付包，也不作为普通输入展示。

## 在桌面端中的使用方式

1. 打开桌面端
2. 选择“导入运行结果”
3. 选择 `samples/run-result/`
4. 确认系统识别出：
   - 证据包文件
   - 校验回执文件
   - 摘要文件
   - 附属文件
5. 进入运行详情或生成审阅包流程

## 预期识别结果

完整样例应显示：

- 证据完整，可生成审阅包
- 运行留痕：已具备
- 校验回执：已具备
- 审阅交付：已具备
- 人工复核：暂不需要
