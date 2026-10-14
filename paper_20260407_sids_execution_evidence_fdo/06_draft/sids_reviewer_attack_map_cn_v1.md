# Reviewer Attack Map v1

| 攻击点 | 风险等级 | 当前可用防守证据 | 仍然薄弱之处 | 建议写法 |
| --- | --- | --- | --- | --- |
| 这不就是日志吗？ | 高 | spec、schema、validator 与 validation report 共同证明它是可检查对象，不是仅供回看的 trace | 评审仍可能觉得“只是把日志重新封装” | 明写“日志服务于观察，profile 服务于单次操作的独立检查”，并用四类校验条件具体化差别 |
| 为什么不是 PROV / SHACL / 一般 provenance？ | 高 | 当前 profile 显式绑定 actor、subject、operation、policy、constraints、provenance、evidence、validation，目标是单操作问责边界 | 目前没有做系统化映射比较，容易被认为在重复已有模型 | 写成“本文不是替代通用 provenance，而是把 provenance 与 policy/evidence/validation 收束到一个最小 statement” |
| 为什么叫 FDO-based？ | 高 | 当前语境确实围绕对象访问、对象派生、对象定位、对象证据来组织；subject/evidence/locator 等字段支持 object-centered 叙事 | 若写得过大，评审会质疑与 full FDO stack 的距离 | 用“FDO-based scene”或“FDO-informed object setting”这类保守表述，不写成 full FDO implementation |
| 你只有有限 example coverage，何来通用性？ | 高 | repo 真值只支持 `1 valid + 3 invalid + 1 demo`，我们可以明确承认 coverage 小 | coverage 小是客观事实，无法硬补 | 直接承认“本文不主张通用性，只主张最小可验证边界”，把 generality 降为 future work |
| 第二个 valid context 是否真的存在于 repo？ | 高 | 本轮 repo truth inventory 已明确未找到 retention review 和第二个 valid example | 外部材料确实提到 Branch B，容易引起追问 | 主文只写当前 repo-backed 基底；把第二 context 只放在 future extension 或 open question 中 |
| 为什么不是标准论文或平台论文？ | 中高 | 当前 spec/schema/validator/examples/demo 明显是窄工件，不足以支撑平台级或标准级雄心 | FDO 语境容易诱发“标准宣言”误解 | 在摘要和引言中反复强调“minimal profile”“single-operation accountability object”“bounded verification path” |
| 为什么没有规模实验？ | 中高 | 本文问题是可检查边界，不是吞吐或部署性能；artifact-review 语言可支持这种小而清楚的工件姿态 | 若写法不谨慎，会被批评为实证太弱 | 明写“evaluation is artifact-bounded”，只报告 examples、validator、demo 的可复核结果，不发明性能数字 |
| 你是否把历史材料混进来了？ | 高 | 已有 branch reconciliation、external facts locked、canonical baseline decision 三份文件把 A/B 分开 | 评审无法看到内部管理文件，只能从正文判断 | 正文中坚持只写 Branch A repo-backed 事实，不把 Branch B 外部事实偷渡成当前实现 |
| tests 存在是否意味着 Branch B 已经成立？ | 中 | `tests/test_operation_accountability_profile.py` 只覆盖一个 valid 与三个 invalid；tests 存在不等于第二 context 已落地 | 容易被误读为“实现比文稿写得更多” | 写成“tests strengthen the current narrow baseline, but do not expand it into a second validated context” |
| FDO 相关性是否只是包装词？ | 中高 | subject/object/policy/evidence/locator 的对象中心组织方式，确实更接近 data visitation than generic logs | 当前 repo 仍缺更强 data-space 图示或对象交换演示 | 避免夸大为 ecosystem-level FDO claims，保持在 object-centered operation accountability 层面 |
