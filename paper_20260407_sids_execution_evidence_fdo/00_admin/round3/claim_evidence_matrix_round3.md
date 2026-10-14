# Claim-to-Evidence Matrix Round 3

说明：

- 本表先登记，再写英文短稿。
- 事实类 claim 必须可回溯到 repo 或已锁定窄分支材料。
- 来自 Branch B 但当前 repo 不支持的说法，一律标为 `禁用`。

| Claim ID | 拟放入章节 | 英文 claim 句子 | claim 类型 | 证据来源类型 | 具体支撑路径或材料 | 当前状态 | 处理意见 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C01 | Abstract / Intro | Agent-mediated data operations in FDO or data-space settings need reviewable accountability surfaces. | framing | repo + inference | `spec/...profile-v0.1.md` scope + current project positioning | 可直接用 | 保持为问题 framing，不写成经验统计 |
| C02 | Intro | Logs and traces help observation, but they do not by themselves yield an independently checkable account of one operation. | framing | JSS narrow manuscript + inference | `execution-evidence-jss-20260407b/...manuscript-final.html`; donor wording only | 需收窄 | 明写为 problem framing，不写成 measured result |
| C03 | Methods | The artifact centers on a single operation accountability statement. | 事实 | repo | `spec/execution-evidence-operation-accountability-profile-v0.1.md` | 可直接用 | 关键词可直接入文 |
| C04 | Methods | The profile is intentionally minimal and bounded. | 事实 | repo | `spec/...profile-v0.1.md` scope | 可直接用 | 保持 minimal/bounded 语言 |
| C05 | Methods | The top-level object includes profile, statement_id, timestamp, actor, subject, operation, policy, constraints, provenance, evidence, and validation. | 事实 | repo | `spec/...profile-v0.1.md`; schema file | 可直接用 | 可作为 object model 句 |
| C06 | Methods | Schema conformance is one explicit validation stage. | 事实 | repo | `agent_evidence/oap.py` | 可直接用 | 可直接写 |
| C07 | Methods | Reference closure is one explicit validation stage. | 事实 | repo | `agent_evidence/oap.py` | 可直接用 | 可直接写 |
| C08 | Methods | Cross-field consistency is one explicit validation stage. | 事实 | repo | `agent_evidence/oap.py` | 可直接用 | 可直接写 |
| C09 | Methods | Minimal integrity recomputation is one explicit validation stage. | 事实 | repo | `agent_evidence/oap.py` | 可直接用 | 可直接写 |
| C10 | Methods / Evaluation | The implementation exposes a command-line validation entry point. | 事实 | repo | `agent_evidence/cli/main.py`; `pyproject.toml` | 可直接用 | 正文可不写具体包名前缀以降低暴露风险 |
| C11 | Evaluation | The current repo-backed example boundary contains one valid example. | 事实 | repo | `examples/README.md`; `minimal-valid-evidence.json` | 可直接用 | 只能写 one valid |
| C12 | Evaluation | The current repo-backed example boundary contains three invalid examples. | 事实 | repo | `examples/README.md`; three invalid JSON files | 可直接用 | 只能写 three invalid |
| C13 | Evaluation | Each invalid example targets one primary failure class. | 事实 | repo | `examples/README.md`; `demo/expected-output.md`; `tests/test_operation_accountability_profile.py` | 可直接用 | 用 “single-failure” 表述 |
| C14 | Evaluation | The valid example is expected to return ok true with zero issues. | 事实 | repo | `tests/test_operation_accountability_profile.py`; `demo/expected-output.md` | 可直接用 | 可放结果描述 |
| C15 | Evaluation | One invalid case fails with schema_violation because a required validation field is missing. | 事实 | repo | `invalid-missing-required.json`; `demo/expected-output.md` | 可直接用 | 可简写 failure mode + diagnostic |
| C16 | Evaluation | One invalid case fails with unresolved_output_ref because an output reference is unclosed. | 事实 | repo | `invalid-unclosed-reference.json`; `demo/expected-output.md` | 可直接用 | 可直接写 |
| C17 | Evaluation | One invalid case fails with unresolved_evidence_policy_ref because the evidence-policy link is broken. | 事实 | repo | `invalid-policy-link-broken.json`; `demo/expected-output.md` | 可直接用 | 可直接写 |
| C18 | Evaluation | The demo is a single-path metadata enrichment walkthrough. | 事实 | repo | `demo/README.md`; `demo/scenario.md`; `final-handoff.md` | 可直接用 | 必须保留 single-path |
| C19 | Evaluation | The demo emits review artifacts and a validation report. | 事实 | repo | `demo/run_operation_accountability_demo.py`; `demo/scenario.md`; `demo/artifacts/validation-report.json` | 可直接用 | 可直接写 |
| C20 | Evaluation | Tests are present for the operation accountability path. | 事实 | repo | `tests/test_operation_accountability_profile.py`; `tests/test_cli.py` | 可直接用 | 不要夸大测试覆盖范围 |
| C21 | Evaluation | The current evaluation surface is intentionally artifact-bounded. | framing | repo + JSS narrow manuscript | `docs/ACCEPTANCE-CHECKLIST.md`; JSS manuscript donor | 可直接用 | 可用于收束评估姿态 |
| C22 | Limitations | The current repo-backed baseline supports only one valid context. | 事实 | repo | `docs/ACCEPTANCE-CHECKLIST.md`; `demo/scenario.md`; repo truth inventory round2 | 可直接用 | limitation 中必须明确写 |
| C23 | Limitations | No claim of broad portability is made. | limitation | repo + canonical decision | `spec/...scope`; `canonical_baseline_decision.md` | 可直接用 | 作为 limitation，而非比较结论 |
| C24 | Limitations | No deployment evidence is claimed. | limitation | JSS narrow manuscript + repo scope | JSS donor wording + current guardrails | 可直接用 | 保持 negative claim |
| C25 | Related Work | This paper is adjacent to provenance validation work rather than a replacement for general provenance models. | comparison | reference audit + inference | `57_reference_source_audit.md`; PROV sources listed there | 可直接用 | 保持定位，不做强比较 |
| C26 | Related Work | This paper is narrower than digital-object or DOIP system lines. | comparison | reference audit + inference | `57_reference_source_audit.md`; DOIP/FDO source seeds | 可直接用 | 用 “narrower than” 而不是 “better than” |
| C27 | Related Work | Artifact-review language is relevant because the contribution is a small executable research object. | comparison | reference audit | `57_reference_source_audit.md` -> `acm2020artifactbadging` | 可直接用 | 可在 evaluation/related work 都用 |
| C28 | Full paper / Cover note | The contribution is a minimal verifiable profile with a validator-aware closure. | framing | repo + donor wording | `spec/...`; JSS donor wording | 可直接用 | 可作为总括句 |
| C29 | Any section | The current implementation includes two valid examples. | 事实 | external donor wording | External Fact B only | 禁用 | repo 不支持，禁止进入英文主稿 |
| C30 | Any section | The current implementation includes five invalid examples. | 事实 | external donor wording | External Fact B only | 禁用 | repo 不支持，禁止进入英文主稿 |
| C31 | Any section | A retention review context is already part of the shipped artifact. | 事实 | external donor wording | External Fact B only | 禁用 | repo 不支持，禁止进入英文主稿 |
| C32 | Any section | The paper demonstrates second-context validity or basic portability. | comparison | external donor wording | External Fact B only | 禁用 | repo 不支持，禁止进入英文主稿 |
| C33 | Any section | The paper supports broad cross-framework validation. | comparison | external donor wording | Branch B wording | 禁用 | 与 current baseline 冲突 |
| C34 | Any section | The paper contributes a governance platform. | comparison | none | none | 禁用 | 与 spec scope 明确冲突 |
| C35 | Any section | The paper provides full FDO interoperability. | comparison | none | none | 禁用 | 与 current artifact surface 冲突 |
| C36 | Any section | The paper provides industrial-scale deployment evidence. | 事实 | none | none | 禁用 | 当前没有任何 deployment evidence |
| C37 | Methods | The validation report is machine-readable JSON. | 事实 | repo | `agent_evidence/cli/main.py`; `oap.py`; `demo/expected-output.md` | 可直接用 | 可直接写 |
| C38 | Evaluation | The validator returns a non-zero exit code on failure. | 事实 | repo | `agent_evidence/cli/main.py` | 可直接用 | 可作为 CLI behavior 句 |
| C39 | Methods / Figures | The design is operation-centered rather than platform-centered. | framing | repo | `spec/...core object model`; figure plan inference | 可直接用 | 可用于 Fig 1 caption 和方法段 |
| C40 | Conclusion | The value of the paper lies in closure rather than breadth. | framing | inference + guardrails | round3 guardrails; current baseline decision | 可直接用 | 可作为结论句，但不写成 empirical claim |
