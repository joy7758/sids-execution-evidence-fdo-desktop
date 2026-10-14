## 3. Evaluation

### 3.1 Evaluation goal

The evaluation is intentionally artifact-bounded. Its purpose is not to demonstrate throughput, deployment readiness, or validity across multiple runtimes or institutional settings. Its purpose is to show that the current shipped artifact exposes a bounded validation surface with one passing path, three diagnosable failure paths, and one runnable demo path.

Within that boundary, the evaluation asks three practical questions:

1. Does the valid example pass the current validation path?
2. Do the invalid examples fail in diagnosable ways that correspond to distinct rule classes?
3. Does the demo exercise the same profile and validator path end to end?

### 3.2 Artifact surface under evaluation

The evaluated surface is limited to the current repo-backed baseline:

- one profile specification
- one JSON Schema
- one profile-aware validator
- one command-line validation entry point
- one valid example
- three invalid examples
- tests for the operation-accountability path
- one single-path metadata-enrichment demo

The evaluation therefore focuses on closure rather than breadth. It asks whether the shipped pieces line up with each other and whether a reviewer can exercise the bounded path directly.

### 3.3 Valid path

The valid example serves as the positive witness for the current artifact. The expected result is a passing validation report with `ok: true` and zero issues. This path matters because it shows that the current profile can be instantiated as a coherent object rather than only as a list of requirements.

In the current artifact, the valid example is also aligned with the demo scenario. Both are centered on metadata enrichment under an explicit policy boundary. This does not mean that the paper validates multiple contexts. It means that the positive witness and the runnable walkthrough are intentionally kept close enough to support one small inspectable closure.

### 3.4 Controlled failure classes

The three invalid examples are designed as controlled failure cases rather than as a broad negative suite.

The first invalid example removes a required validation field and is expected to produce a schema-level failure. The primary diagnostic label is `schema_violation`.

The second invalid example breaks reference closure by pointing an output reference to an unresolved identifier. The expected primary diagnostic label is `unresolved_output_ref`.

The third invalid example breaks the evidence-to-policy linkage. The expected primary diagnostic label is `unresolved_evidence_policy_ref`.

Together, these cases do not establish exhaustive correctness. They establish that the current validator can distinguish three important failure surfaces inside the current profile boundary and report them in a machine-readable way.

### 3.5 Demo path

The demo provides one end-to-end witness path. It loads one source object, applies one constrained metadata-enrichment operation, emits one accountability statement, validates it, and writes artifacts for review. The expected end state is a passing summary line together with generated artifact files, including a validation report.

This demo is not treated as a benchmark and not treated as a deployment study. Its role in the evaluation is narrower: it shows that the same profile and validator path can be exercised on a single runnable walkthrough instead of only on static example files.

### 3.6 Test anchors and CLI behavior

The current artifact also includes tests for the operation-accountability path and the command-line entry point. These tests help anchor the claim that schema, examples, validator behavior, and CLI exposure are aligned within the shipped boundary. The CLI behavior is especially important because the validation path is not merely an internal helper; it is the public exercise surface for the current artifact. The command returns a JSON report on success and failure, and it exits non-zero when validation fails.

### 3.7 What this evaluation does not establish

This evaluation does not establish coverage beyond the current repo-backed context. It does not establish additional validated contexts. It does not establish full FDO interoperability, deployment readiness, or broad workflow coverage. It does not show a multi-agent setting, rich orchestration graph, or industrial-scale operation. It also does not claim that three invalid cases are sufficient for a general failure taxonomy.

What it does establish is smaller and more defensible: the current artifact supports one repo-backed valid path, three controlled failure paths with diagnosable labels, one runnable demo, and one command-line validation path that another party can inspect and exercise. For this paper, that bounded closure is the evaluation target.
