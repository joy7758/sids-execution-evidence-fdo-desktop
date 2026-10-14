# Table 1. Artifact Surface

| Artifact element | Current status | Role in the paper | Claim it can support | Claim it cannot support |
| --- | --- | --- | --- | --- |
| Profile specification | Present | Defines scope, object model, field relationships, and compliance conditions | The paper contributes a minimal operation-centered profile | A general governance platform |
| JSON Schema | Present | Makes the profile checkable as a concrete data contract | The artifact supports schema-level validation | Full semantic interoperability |
| Validator | Present | Implements staged checks over the shipped profile | The artifact supports bounded validation behavior | Broad cross-framework validation |
| CLI entry point | Present | Exposes the validator as a runnable review path | The artifact can be exercised from the command line | Deployment-scale operational evidence |
| 1 valid example | Present | Demonstrates one passing profile instance | One valid path is repo-backed | Multiple validated contexts |
| 3 invalid examples | Present | Demonstrate three controlled failure classes | Failure classes are diagnosable within the current boundary | Five invalid examples or broad coverage |
| Tests | Present | Anchor consistency across schema, examples, validator, and CLI | The current path has regression anchors | Exhaustive correctness |
| Single-path demo | Present | Shows one end-to-end metadata-enrichment walkthrough | The artifact forms a small inspectable closure | Platform-level orchestration or portability claims |
