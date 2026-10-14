## 2. Method

### 2.1 Design goal

The method goal is deliberately narrow: define a minimal and verifiable representation for one operation accountability statement in an FDO-based agent setting. The design does not aim to model an entire workflow family, a registry, or a deployment environment. It aims to make one operation inspectable through a bounded object plus a bounded validation path.

This choice leads to an operation-centered design. Instead of treating runtime evidence as an open-ended trace transcript, the method organizes the evidence surface around one operation and the minimum context required to review it later. That context includes the acting entity, the subject object, the governing policy, the referenced constraints, the provenance links, the evidence payload, and the validation metadata. The result is a compact object that can be inspected directly and checked automatically.

### 2.2 Object model

The current profile defines one top-level JSON object with the following sections:

- `profile`
- `statement_id`
- `timestamp`
- `actor`
- `subject`
- `operation`
- `policy`
- `constraints`
- `provenance`
- `evidence`
- `validation`

Each section serves one bounded role. `profile` fixes the profile identity and version. `statement_id` and `timestamp` identify the statement instance. `actor` captures who executed the operation. `subject` identifies the primary object acted on. `operation` records the action, its inputs and outputs, and its result. `policy` and `constraints` describe the governing rule surface. `provenance` binds actor, subject, operation, and input/output references into one explicit linkage layer. `evidence` contains the references, artifacts, and integrity digests emitted by the operation. `validation` records how the statement is to be checked.

The method keeps this surface intentionally small. The profile allows one optional field, `operation.description`, but otherwise constrains the structure tightly. This is important because the current contribution depends on bounded reviewability. The object is meant to be small enough that a reviewer can inspect it without reconstructing a much larger runtime context.

### 2.3 Operation-centered relationships

The design is centered on the operation rather than on a platform view. The operation links outward to the subject, policy, inputs, and outputs. The policy links to named constraints. Provenance mirrors the actor, subject, and operation linkage and repeats the input/output references so that these links can be checked for consistency rather than inferred informally. Evidence binds the operation to the emitted references and artifacts. Validation binds the statement to the evidence object, the provenance object, the policy object, and the validator identity.

This arrangement supports a bounded accountability question: can a later reviewer determine that one operation statement is internally coherent? The method does not attempt to answer larger questions such as whether the whole runtime was complete, whether every possible policy was modeled, or whether a larger workflow graph was globally consistent. Those questions are outside the present scope.

### 2.4 Schema contract

The shipped JSON Schema provides the structural contract for the profile. At this layer, the method enforces required fields, fixed profile identifiers, field types, value formats, and restricted enums. Examples include the fixed profile name and version, the required presence of actor and subject identifiers, the requirement that evidence digests use the expected string pattern, and the requirement that validation status stay within a limited set.

Schema-level checking matters because it separates field shape from deeper semantic relations. A statement that fails the schema cannot enter the later validation stages. This staged design keeps the current path reviewable: the validator first asks whether the object is even well formed as the current profile, and only then asks whether the internal links and integrity fields hold.

### 2.5 Validation stages

The profile-aware validator implements four stages.

First, schema conformance checks whether the JSON instance satisfies the shipped schema. This stage detects missing required fields, disallowed structure, invalid enum values, and malformed digest fields.

Second, reference closure checks whether internal references resolve. The current implementation verifies, among other conditions, that `operation.subject_ref` resolves to `subject.id`, that policy references resolve to the declared policy, that constraint references resolve to named constraints, and that operation input and output references resolve to evidence references.

Third, cross-field consistency checks whether multiple parts of the object agree. The current validator verifies that operation input references point to references labeled as inputs, that output references point to references labeled as outputs, that provenance input/output lists match the operation input/output lists, and that policy linkage remains aligned across operation, evidence, and validation.

Fourth, minimal integrity recomputation checks whether the current integrity fields match the canonical recomputation of the references array, the artifacts array, and the statement core. This stage is intentionally bounded. It does not claim full cryptographic trust infrastructure. It only checks the limited digest surface defined by the current artifact.

### 2.6 CLI behavior and report surface

The current implementation exposes this validation path through a command-line entry point. The command reads one profile JSON file and returns a machine-readable JSON report. On success, the report marks the object as passing with zero issues. On failure, the report records one or more issues with explicit stage and code information, and the command exits non-zero.

This report surface matters because it turns the profile from a descriptive format into a reviewer-facing exercise path. A profile that cannot be checked is only a declaration. A profile that yields a stable report becomes an inspectable artifact. The present method therefore treats the validation report as part of the accountability closure rather than as a secondary convenience.

### 2.7 Current artifact boundary

The current repo-backed boundary is intentionally small. It includes one valid example, three controlled invalid examples, test anchors, and one single-path metadata-enrichment demo. The valid example represents the passing path for the current profile. Each invalid example is designed to break one main rule class: required-field completeness, reference closure, or evidence-policy linkage. The demo shows a single end-to-end walkthrough in which one source object is loaded, one constrained operation is applied, one accountability statement is emitted, and one validation report is produced.

This boundary is methodologically important. It keeps the contribution aligned with what the current artifact can actually support. The method does not claim broader scenario coverage, additional validated contexts, or validated transfer across additional runtimes or settings. It claims that one operation-centered accountability object can be specified, validated, and rerun as a small executable closure.
