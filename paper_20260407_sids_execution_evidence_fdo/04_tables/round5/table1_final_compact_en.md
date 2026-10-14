| item | current repo-backed status | role in paper | supports | does not support |
| --- | --- | --- | --- | --- |
| Profile specification | Present | Defines the object model and scope boundary | A minimal operation-centered profile | Broader system-level claims |
| JSON Schema | Present | Provides the structural contract | Checkable field-level conformance | Broader semantic or inter-system claims |
| Reference validator CLI | Present | Exposes the validation path to reviewers | Independently exercisable validation | Claims based on internal-only tooling |
| One valid example | Present | Anchors the passing path | A positive witness for the current artifact boundary | Broader scenario coverage |
| Three invalid examples | Present | Anchor controlled failure classes | Diagnosable rule-bound failures | A complete failure taxonomy |
| Tests | Present | Check alignment among schema, validator behavior, and CLI exposure | A repeatable artifact boundary | Exhaustive coverage claims |
| One runnable walkthrough | Present | Shows the same validation path on one end-to-end case | Inspectable closure for one operation context | Broader workflow or deployment claims |
