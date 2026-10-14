| Item | Current repo-backed status | Role in paper | Supports | Does not support |
| --- | --- | --- | --- | --- |
| Profile specification | Present | Defines the object model and scope boundary | A minimal operation-centered profile | Broader system-level claims |
| JSON Schema | Present | Provides the structural contract | Checkable field-level conformance | Broader semantic or inter-system claims |
| Reference validator CLI | Present | Exposes the validation path to reviewers | Independently exercisable validation | Claims based on internal-only tooling |
| Example suite | Present as `1 valid + 3 invalid` | Anchors one passing path and three controlled failure classes | A bounded example surface | Broader scenario coverage |
| Tests | Present | Check alignment among schema, validator behavior, and CLI exposure | A repeatable artifact boundary | Exhaustive coverage claims |
| Runnable walkthrough | Present as one case | Shows the same validation path on a single end-to-end case | Inspectable closure for one operation context | Broader workflow or deployment claims |
