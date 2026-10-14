# Table 2. Example Boundary

| Example | Scenario / failure mode | Expected result | Expected primary diagnostic label | Evidence source | Note |
| --- | --- | --- | --- | --- | --- |
| Valid example | Metadata enrichment over one client note object | Passing validation report | `ok: true`, `issue_count: 0` | `examples/minimal-valid-evidence.json`; `tests/test_operation_accountability_profile.py`; `demo/expected-output.md` | The only repo-backed valid context |
| Invalid 1 | Missing required validation field | Failing validation report | `schema_violation` | `examples/invalid-missing-required.json`; `demo/expected-output.md` | Controlled required-field failure |
| Invalid 2 | Unclosed output reference | Failing validation report | `unresolved_output_ref` | `examples/invalid-unclosed-reference.json`; `demo/expected-output.md` | Controlled reference-closure failure |
| Invalid 3 | Broken evidence-policy link | Failing validation report | `unresolved_evidence_policy_ref` | `examples/invalid-policy-link-broken.json`; `demo/expected-output.md` | Controlled policy-link failure |
