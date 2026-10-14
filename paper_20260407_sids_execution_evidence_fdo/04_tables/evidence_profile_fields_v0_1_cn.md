# Evidence Profile 字段表 v0.1（中文）

整理依据：

- `agent-evidence/schema/execution-evidence-operation-accountability-profile-v0.1.schema.json`
- `agent-evidence/spec/execution-evidence-operation-accountability-profile-v0.1.md`
- `agent-evidence/agent_evidence/oap.py`
- `agent-evidence/examples/minimal-valid-evidence.json`
- `agent-evidence/demo/run_operation_accountability_demo.py`

当前 canonical baseline：

- `Branch A`
- 当前字段表只声称支持 repo-backed 的单场景最小 profile
- 不把第二个 valid context 或 second-context portability 写成已实现事实

| 顶层字段 | 字段作用 | 是否必需 | 关键引用关系 | 校验要点 | 闭包/一致性要求 |
| --- | --- | --- | --- | --- | --- |
| `profile` | 固定 profile 身份与版本，声明当前 statement 受哪个最小规范约束 | 必需 | 无外部 ref；由 validator 固定识别 | `profile.name` 必须是 `execution-evidence-operation-accountability-profile`；`profile.version` 必须是 `0.1` | 作为整份 statement 的固定边界，不允许漂移到别的 profile |
| `statement_id` | 给单次 operation accountability statement 一个稳定标识 | 必需 | 无显式 ref | 非空字符串 | 当前 schema 只检查存在与非空；稳定命名策略后续可再细化 |
| `timestamp` | 标明 statement 生成时间 | 必需 | 无显式 ref | 必须满足 `date-time` 格式 | 当前不与其他字段做时序约束，但为独立审查保留时间锚点 |
| `actor` | 描述执行者是谁、是什么类型、运行时是什么 | 必需 | `provenance.actor_ref -> actor.id` | `id/type/name/runtime` 全部必需 | provenance 必须回指同一个 actor |
| `subject` | 描述被作用对象是谁，以及其 digest 与 locator | 必需 | `operation.subject_ref`、`provenance.subject_ref`、`evidence.subject_ref` 都必须解析到 `subject.id` | `digest` 必须匹配 `sha256:` 格式；`locator` 必填 | 至少一个 `operation.input_refs` 解析到的 evidence reference，其 `object_id` 必须等于 `subject.id` |
| `operation` | 描述做了什么操作、输入输出引用、结果状态 | 必需 | `subject_ref -> subject.id`；`policy_ref -> policy.id`；`input_refs/output_refs -> evidence.references[].ref_id` | `input_refs` 与 `output_refs` 至少各 1 个；`result.status` 仅允许 `succeeded/failed` | 输入输出 ref 必须闭包；输入 ref 角色必须是 `input`，输出 ref 角色必须是 `output`；provenance 的 I/O 列表必须与之完全一致 |
| `policy` | 描述本次操作受哪个策略约束 | 必需 | `policy.constraint_refs -> constraints[].id`；同时被 `operation`、`evidence`、`validation` 引用 | `id/name/constraint_refs` 必需 | `operation.policy_ref`、`evidence.policy_ref`、`validation.policy_ref` 必须一致 |
| `constraints` | 把 policy 所引用的具体规则项显式列出 | 必需 | 被 `policy.constraint_refs` 引用 | 每个约束对象必须有 `id` 和 `description`；重复 id 会被判错 | 所有 `constraint_refs` 必须可解析；不能出现重复约束 id |
| `provenance` | 把 actor、subject、operation 与 I/O 引用连成最小来源链 | 必需 | `actor_ref -> actor.id`；`operation_ref -> operation.id`；`subject_ref -> subject.id`；`input_refs/output_refs` 与 operation 对齐 | `id/actor_ref/operation_ref/subject_ref/input_refs/output_refs` 必需 | `provenance.input_refs` 必须等于 `operation.input_refs`；`provenance.output_refs` 必须等于 `operation.output_refs` |
| `evidence` | 承载 references、artifacts 与 integrity 摘要，是最小证据主体 | 必需 | `subject_ref -> subject.id`；`operation_ref -> operation.id`；`policy_ref -> policy.id`；`references[].ref_id` 被 operation/provenance 消费 | `references` 与 `artifacts` 至少各 1 个；`ref_id` 不能重复；digest 格式必须合法 | `references_digest`、`artifacts_digest`、`statement_digest` 必须能被 validator 重新计算并匹配 |
| `validation` | 指明独立验证如何发生、由谁执行、当前状态如何 | 必需 | `evidence_ref -> evidence.id`；`provenance_ref -> provenance.id`；`policy_ref -> policy.id` | `validator/method/status` 必需；`status` 仅允许 `verifiable/unverifiable` | 与 evidence/provenance/policy 必须闭包；validator 输出统一被视为 `validation report` |

## 当前可见最小规则摘要

- `schema conformance`：字段存在性、类型、枚举、digest 格式
- `reference closure`：所有内部 ref 必须能解析到本地 id
- `cross-field consistency`：policy、provenance、evidence、operation 之间必须一致
- `minimal integrity`：`references_digest`、`artifacts_digest`、`statement_digest` 必须可重算

## 备注

- 以上是 `v0.1` 的最小字段面，不代表完整 FDO 互操作字段集合。
- 当前字段表支持的是“单次操作 accountability statement”，不是平台级 registry 或多 agent 复合事务。
- 当前 repo 中虽然存在 tests、CLI 与 packaging supporting surface，但字段层面的已验证主线仍只有 metadata enrichment 单场景。
