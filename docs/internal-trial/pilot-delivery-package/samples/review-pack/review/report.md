# 审阅报告

## 总体状态
- 结果：`校验通过`
- 回执结论（receipt.ok）：`True`
- 是否需人工复核：`否`
- 重点标签：`校验通过`
- 说明：校验通过，主交付物已经齐备，可直接进入审阅。

## 交付物清单
- 证据包文件（bundle）：`primary/bundle.json`
- 校验回执文件（receipt）：`primary/receipt.json`
- 摘要文件（summary）：`primary/summary.json`
- 清单文件（manifest）：`supporting/manifest.json`
- 公钥文件（public key）：`supporting/manifest-public.pem`
- 运行事件文件（runtime events）：`supporting/runtime-events.jsonl`
- 记录数（summary.record_count）：`8`
- 签名数（summary.signature_count）：`1`
- 建议校验命令（summary.verify_command）：`agent-evidence verify-export --bundle /Users/zhangbin/AgentEvidence/runs/2026-04-25-100000-complete/langchain-evidence.bundle.json --public-key /Users/zhangbin/AgentEvidence/runs/2026-04-25-100000-complete/manifest-public.pem`

## 校验结果
- 回执结论（receipt.ok）：`True`
- 回执格式（receipt.format）：`json`
- 记录数（receipt.record_count）：`8`
- 是否带签名（receipt.signature_present）：`True`
- 签名数量（receipt.signature_count）：`1`
- 必需签名数量（receipt.required_signature_count）：`1`
- 签名校验结果（receipt.signature_verified）：`True`
- 最新链哈希（receipt.latest_chain_hash）：`502429abd457ebff9a5d4537a101f9891e036d15e6b25d7b06f124958feed6b9`

## 问题摘要
- 重点标签：`校验通过`
- 回执未报告问题。

## 证据引用
- 证据包文件（bundle）：`primary/bundle.json`
- 导出格式（bundle.manifest.export_format）：`json`
- 记录数（bundle.manifest.record_count）：`8`
- 交付摘要指纹（bundle.manifest.artifact_digest）：`1faf66856b463950e6918e47cb2af4dc8281b3985c7025b887b3de4503231a32`
- 最新链哈希（bundle.manifest.latest_chain_hash）：`502429abd457ebff9a5d4537a101f9891e036d15e6b25d7b06f124958feed6b9`
- 事件记录数（bundle.records）：`8`
- 签名记录数（bundle.signatures）：`1`
- 记录 0（bundle.record[0]）：`event_id=bdd2fc98-b5f9-4606-becb-68963e33c6ca` `event_type=chain.start`
- 记录 1（bundle.record[1]）：`event_id=224a9fdb-f4a7-43ff-aeec-82d732b14150` `event_type=chain.end`
- 记录 2（bundle.record[2]）：`event_id=34ea7274-660f-4577-bf3c-da7bc7bcb62f` `event_type=tool.start`
- 其余未展开记录：`5`

## 审阅备注
- 占位：请在此补充审阅备注。
- 建议顺序：先查看 `primary/receipt.json`，再查看 `primary/bundle.json`，最后查看 `primary/summary.json`。
