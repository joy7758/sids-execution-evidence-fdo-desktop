# Blind Term Mapping Round 4

| 内部真实字符串 | 投稿版安全措辞 |
| --- | --- |
| `agent-evidence validate-profile` | `the reference validator CLI` |
| `agent_evidence/oap.py` | `the reference validator implementation` |
| `execution-evidence-operation-accountability-profile-v0.1` | `the shipped profile` |
| `single-path metadata-enrichment demo` | `one runnable walkthrough` |
| `metadata-enrichment` | `a metadata update operation` |
| `schema_violation` | `a schema-level failure` |
| `unresolved_output_ref` | `an unresolved output reference` |
| `unresolved_evidence_policy_ref` | `a broken evidence-to-policy link` |
| `operation-accountability path` | `the shipped validation path` |
| `examples/minimal-valid-evidence.json` | `the valid example` |
| `examples/invalid-missing-required.json` | `the missing-field invalid example` |
| `examples/invalid-unclosed-reference.json` | `the unresolved-reference invalid example` |
| `examples/invalid-policy-link-broken.json` | `the broken-link invalid example` |
| `tests/test_operation_accountability_profile.py` | `the validator test suite` |
| `demo/expected-output.md` | `the demo output record` |

## 使用原则

- 如果安全措辞不损失事实边界，应优先使用安全措辞。
- 只有当精确字符串对论文主张不可替代时，才考虑保留；当前 round4 主稿中原则上不存在这种必须保留的情况。
- blindability 处理是“去除不必要的唯一标记”，不是篡改事实。
