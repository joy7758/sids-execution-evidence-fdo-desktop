# From Logs to a Checkable Accountability Object: A Minimal Validation Path for One Agent Operation

## Abstract

Agent-mediated data operations in FDO and data-space settings are often observable through logs and traces, but observability alone does not yield an independently checkable account of one operation. This paper presents a minimal execution-evidence profile for a single-operation accountability object. The current implementation is intentionally narrow: it includes a profile specification, a JSON Schema, a profile-aware validator, a command-line validation entry point, one valid example, three controlled invalid examples, test anchors, and one single-path metadata-enrichment demo. The profile is centered on one operation statement rather than on a larger system surface or a general governance layer. The validator checks four bounded properties of the shipped artifact: schema conformance, reference closure, cross-field consistency, and minimal integrity recomputation. The examples and demo turn those checks into an inspectable closure that another party can exercise without reconstructing a larger runtime. The contribution is therefore not broader trace capture or richer runtime telemetry. It is a small, bounded, and runnable accountability artifact for one operation in an FDO-based context.

## 1. Introduction

Agent-mediated operations are becoming a practical part of FDO and data-space settings. Objects may be read, transformed, enriched, or re-emitted under explicit policy conditions, yet the external review surface for those actions often remains weak. System operators may have traces, logs, and internal runtime records, but an outside reviewer still faces a harder question: can one concrete operation be inspected later as a bounded and independently checkable object?

This paper addresses that question at a deliberately small scale. We do not start from a larger system surface, a registry design, or a broad interoperability layer. We start from one operation. The core problem is not that current systems fail to record events. The problem is that the recorded material is usually not organized as a compact accountability object for one action. A trace may help an engineer debug a run, but it may still leave a reviewer to reconstruct who acted, on which object, under which policy, through which evidence links, and by what validation path.

That distinction matters in FDO and data-space settings because operations are object-centered. A reviewer may need to know not only that an agent produced runtime output, but also that one subject object was acted on, that the governing policy and constraints were explicit, that input and output references closed correctly, and that the resulting evidence object remained internally consistent. These are accountability questions rather than observability questions. They require a representation that is small enough to inspect directly and precise enough to validate automatically.

We therefore frame execution evidence not as richer logging, but as a checkable accountability object for one operation. The object is intentionally narrow. It is not a full provenance family, not a general trust infrastructure, and not a broad governance layer. Instead, it is a minimal profile for one operation accountability statement. Its role is to capture the smallest set of fields and relations needed to make one operation inspectable in a stable way.

The motivation for a minimal profile is practical as well as conceptual. A larger and more open model would immediately weaken the paper's main claim, which is bounded independent checking. The current profile is therefore designed as a closed, reviewable object with explicit top-level sections and explicit link rules. The profile is paired with a JSON Schema and a profile-aware validator so that the accountability statement is not merely declared but exercised. The validator checks four bounded properties of the shipped artifact: schema conformance, reference closure, cross-field consistency, and minimal integrity recomputation. Together, these checks define the current verification boundary.

This validator-aware path is central to the paper. The contribution is not a passive schema that others might interpret differently. The contribution is a small executable closure: a profile, a schema, a validator, controlled examples, and a runnable demo. In the current repo-backed baseline, the example boundary is intentionally small. There is one valid example and three controlled invalid examples, each aligned with one main failure class. The demo follows the same design choice by showing one metadata-enrichment walkthrough rather than a family of scenarios.

This narrowness is methodological. A broader scope would immediately invite claims about cross-setting validity, deployment, or multi-agent coverage that the current implementation does not support. By keeping the boundary to one repo-backed valid context and three controlled invalid examples, the paper can make a more defensible claim: one operation in an FDO-based setting can be expressed as a bounded accountability object and checked through a concrete validation path.

The paper therefore makes a small engineering contribution with a clear review surface. It contributes a minimal execution-evidence profile for one operation accountability statement, a schema and validator path that make that statement checkable, and a shipped artifact closure consisting of one valid example, three invalid examples, test anchors, and one single-path metadata-enrichment demo. It does not claim validated transfer across additional runtimes or settings, deployment evidence, full FDO interoperability, or broader governance coverage. Its value lies in closure rather than breadth: not richer traces, but a checkable accountability object for one operation.

## 2. Method

### 2.1 Design goal

The method goal is deliberately narrow: define a minimal and verifiable representation for one operation accountability statement in an FDO-based agent setting. The design does not aim to model an entire workflow family, a registry, or a deployment environment. It aims to make one operation inspectable through a bounded object plus a bounded validation path.

This choice leads to an operation-centered design. Instead of treating runtime evidence as an open-ended trace transcript, the method organizes the evidence surface around one operation and the minimum context required to review it later. That context includes the acting entity, the subject object, the governing policy, the referenced constraints, the provenance links, the evidence payload, and the validation metadata.

### 2.2 Object model

The current profile defines one top-level JSON object with the following sections: `profile`, `statement_id`, `timestamp`, `actor`, `subject`, `operation`, `policy`, `constraints`, `provenance`, `evidence`, and `validation`.

Each section serves one bounded role. `profile` fixes the profile identity and version. `statement_id` and `timestamp` identify the statement instance. `actor` captures who executed the operation. `subject` identifies the primary object acted on. `operation` records the action, its inputs and outputs, and its result. `policy` and `constraints` describe the governing rule surface. `provenance` binds actor, subject, operation, and input/output references into one explicit linkage layer. `evidence` contains the references, artifacts, and integrity digests emitted by the operation. `validation` records how the statement is to be checked.

The method keeps this surface intentionally small. This is important because the current contribution depends on bounded reviewability. The object is meant to be small enough that a reviewer can inspect it without reconstructing a much larger runtime context.

### 2.3 Operation-centered relationships

The design is centered on the operation rather than on a platform view. The operation links outward to the subject, policy, inputs, and outputs. The policy links to named constraints. Provenance mirrors the actor, subject, and operation linkage and repeats the input/output references so that these links can be checked for consistency rather than inferred informally. Evidence binds the operation to the emitted references and artifacts. Validation binds the statement to the evidence object, the provenance object, the policy object, and the validator identity.

This arrangement supports a bounded accountability question: can a later reviewer determine that one operation statement is internally coherent? The method does not attempt to answer larger questions such as whether the whole runtime was complete, whether every possible policy was modeled, or whether a larger workflow graph was globally consistent.

### 2.4 Schema contract

The shipped JSON Schema provides the structural contract for the profile. At this layer, the method enforces required fields, fixed profile identifiers, field types, value formats, and restricted enums. Examples include the fixed profile name and version, the required presence of actor and subject identifiers, the requirement that evidence digests use the expected string pattern, and the requirement that validation status stay within a limited set.

Schema-level checking matters because it separates field shape from deeper semantic relations. A statement that fails the schema cannot enter the later validation stages. This staged design keeps the current path reviewable: the validator first asks whether the object is even well formed as the current profile, and only then asks whether the internal links and integrity fields hold.

### 2.5 Validation stages

The profile-aware validator implements four stages.

First, schema conformance checks whether the JSON instance satisfies the shipped schema.

Second, reference closure checks whether internal references resolve. The current implementation verifies, among other conditions, that subject, policy, constraint, input, output, evidence, and validation references resolve to the expected local identifiers.

Third, cross-field consistency checks whether multiple parts of the object agree. The current validator verifies that operation input references point to references labeled as inputs, that output references point to references labeled as outputs, that provenance input/output lists match the operation input/output lists, and that policy linkage remains aligned across operation, evidence, and validation.

Fourth, minimal integrity recomputation checks whether the current integrity fields match the canonical recomputation of the references array, the artifacts array, and the statement core. This stage is intentionally bounded. It does not claim full cryptographic trust infrastructure. It only checks the limited digest surface defined by the current artifact.

### 2.6 CLI behavior and report surface

The current implementation exposes this validation path through a command-line entry point. The command reads one profile JSON file and returns a machine-readable JSON report. On success, the report marks the object as passing with zero issues. On failure, the report records one or more issues with explicit stage and code information, and the command exits non-zero.

This report surface matters because it turns the profile from a descriptive format into a reviewer-facing exercise path. A profile that cannot be checked is only a declaration. A profile that yields a stable report becomes an inspectable artifact.

## 3. Evaluation

### 3.1 Evaluation goal

The evaluation is intentionally artifact-bounded. Its purpose is not to demonstrate throughput, deployment readiness, or validity across multiple runtimes or institutional settings. Its purpose is to show that the current shipped artifact exposes a bounded validation surface with one passing path, three diagnosable failure paths, and one runnable demo path.

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

### 3.3 Valid and invalid paths

The valid example serves as the positive witness for the current artifact. The expected result is a passing validation report with `ok: true` and zero issues.

The three invalid examples are designed as controlled failure cases rather than as a broad negative suite. One breaks required-field completeness and is expected to produce `schema_violation`. One breaks reference closure and is expected to produce `unresolved_output_ref`. One breaks the evidence-to-policy linkage and is expected to produce `unresolved_evidence_policy_ref`.

Together, these cases do not establish exhaustive correctness. They establish that the current validator can distinguish three important failure surfaces inside the current profile boundary and report them in a machine-readable way.

### 3.4 Demo path and tests

The demo provides one end-to-end witness path. It loads one source object, applies one constrained metadata-enrichment operation, emits one accountability statement, validates it, and writes artifacts for review. Its role is not to benchmark performance. Its role is to show that the same profile and validator path can be exercised on a single runnable walkthrough instead of only on static example files.

The current artifact also includes tests for the operation-accountability path and the command-line entry point. These tests help anchor the claim that schema, examples, validator behavior, and CLI exposure are aligned within the shipped boundary.

### 3.5 What this evaluation does not establish

This evaluation does not establish coverage beyond the current repo-backed context. It does not establish additional validated contexts. It does not establish full FDO interoperability, deployment readiness, or broad workflow coverage. It does not show a multi-agent setting, rich orchestration graph, or industrial-scale operation.

What it does establish is smaller and more defensible: the current artifact supports one repo-backed valid path, three controlled failure paths with diagnosable labels, one runnable demo, and one command-line validation path that another party can inspect and exercise.

## 4. Related Work

Digital-object work provides the broadest background for this paper. The digital object lineage emphasizes persistent object identity, typed object interaction, and machine-handled services rather than unstructured runtime records (Kahn and Wilensky, 2006; DONA Foundation, 2018). More recent FDO discussions continue that object-centered view while operating at a much broader systems level than the present paper (Soiland-Reyes et al., 2024). That background matters here because the current profile is also object-centered. At the same time, this paper does not propose a new object architecture, a new protocol layer, or a full FDO interoperability stack.

The closest methodological comparison comes from provenance and validity work. PROV-DM establishes a general provenance model for entities, activities, and agents, while PROV-Constraints makes explicit that provenance representations can also be subject to validity and constraint-checking conditions (Moreau and Missier, 2013; Cheney et al., 2013). This paper is aligned with that spirit, especially in treating explicit consistency conditions as first-class parts of the artifact. However, it does not attempt to be a general provenance family or a full interchange model.

Logs, traces, and audit trails form another adjacent line. They are essential for runtime observability, debugging, and operational review, but they are not automatically the same as a compact accountability object for one operation. The distinction made in this paper is therefore a scope distinction rather than a rejection of logging.

Finally, the paper is close to artifact-oriented verification and reproducibility norms. Adjacent lines such as in-toto and SLSA show that software artifacts can carry explicit verification surfaces and downstream provenance expectations (Torres-Arias et al., 2019; [citation pending]). The artifact-review perspective is also relevant because the present contribution is meant to be documented, exercisable, and inspectable as a small research object rather than as a large evaluation platform (Association for Computing Machinery, 2020).

## 5. Limitations and Conclusion

The present artifact has clear limitations. Only one valid context is currently repo-backed, namely the metadata-enrichment case used by the shipped example and demo. The paper therefore cannot claim that the same profile has already been validated across multiple contexts.

The current artifact also does not establish validity beyond the current repo-backed context. It provides one validator path, one valid example, three invalid examples, and one demo, but it does not demonstrate that the same object model has been confirmed across multiple frameworks, runtimes, or institutional settings. The work is situated in an FDO-based context, but it does not contribute a full FDO interoperability layer, a registry design, or a protocol implementation strategy. There is also no deployment evidence in the current package.

These limits follow from the paper's main design choice: closure over breadth. By keeping the profile small, the validator staged, the example boundary controlled, and the demo single-path, the artifact becomes easier to inspect and easier to critique. That does not make it a broad solution. It makes it a sharper research object.

Within that smaller boundary, the conclusion is straightforward. Execution evidence for one agent-mediated operation can be represented as a bounded accountability object rather than left implicit in a larger trace surface. A minimal profile, together with a schema, a validator, controlled examples, tests, and a runnable demo, is enough to create a small inspectable closure for that claim. The contribution is therefore not a larger system layer, not richer telemetry, and not a general governance system. It is a narrow but checkable artifact for one operation in an FDO-based setting.
