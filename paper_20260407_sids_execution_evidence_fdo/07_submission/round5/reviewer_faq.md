# Reviewer FAQ

## Why is this not just logging?

Logs preserve runtime history, but they do not automatically yield one compact object that another party can inspect later. This paper focuses on that narrower review problem. The contribution is a profile that packages actor, subject, operation, policy, evidence, and validation relations into one bounded statement. That statement is not only stored; it is checked by the same validation path used by the shipped examples and walkthrough. The point is therefore not richer telemetry. The point is a smaller object that can be loaded, checked, and interpreted without reconstructing a larger runtime.

## Why FDO and data-space settings?

The paper is written for an object-centered setting in which operations happen over identifiable digital objects under explicit rule surfaces. That makes FDO and data-space settings a natural problem context. The paper does not claim to redefine those larger lines of work. It uses them as the environment in which the accountability gap becomes concrete. In that environment, a reviewer often needs to know not only that an operation happened, but also which object was acted on and how the operation can be checked later. The paper therefore uses FDO and data-space language as a problem setting, not as a scope-expansion device.

## Why is one repo-backed valid context still publishable?

Because the paper does not sell breadth. It sells closure. The current artifact boundary includes one passing case, three controlled failing cases, tests, a reusable validation interface, and one runnable walkthrough. That is enough to support a narrow engineering claim about one operation-centered accountability object. A workshop paper can be valuable when the contribution is inspectable and reproducible even if the covered scenario family is still small. The paper is careful not to claim more than that boundary supports.

## Why not use only PROV / provenance?

PROV gives a broader conceptual vocabulary for entities, activities, agents, and validity conditions. That is useful background, and the paper explicitly acknowledges that lineage. The present contribution, however, is narrower than a general provenance model. It focuses on one operation statement with one fixed validation path and one bounded artifact surface. In other words, the paper uses provenance ideas as context, but it is not trying to replace a general provenance family with a larger new model. It is defining a smaller review object for a specific accountability task.

## Why is minimality a strength here?

Minimality is what makes the claim testable. Once the object becomes too open-ended, later review depends on interpretation rather than checking. By keeping the profile small and the validation stages explicit, the paper ties the object model, rule surface, and exercise path together. That makes failures easier to interpret and positive results easier to reproduce. The result is a submission that can be assessed directly against shipped evidence instead of against aspirational scope.

## Why does SIDS care?

SIDS readers care about inspectable system behavior in digital and data-intensive settings. This paper addresses a concrete review problem inside that space: how to make one agent-mediated operation independently checkable after execution. The contribution is small, but it is sharply engineered and grounded in a data-space and digital-object setting. It gives the workshop a bounded artifact that can be critiqued on its own terms. That is a useful workshop contribution even without a larger deployment story.

## What exactly is checked by the validator?

The validator applies four checks. First, it verifies schema conformance so the statement has the required structure. Second, it verifies reference closure so local identifiers resolve where the profile expects them. Third, it verifies cross-field consistency so linked sections agree on inputs, outputs, and policy relations. Fourth, it performs bounded integrity recomputation over the shipped digest surface. The result is a machine-readable report and a pass or fail outcome that can be exercised through the same reference CLI used by the current artifact boundary.

## What is explicitly not claimed?

The paper does not claim coverage beyond the current repo-backed context. It does not claim that one positive case and three negative cases settle a larger scenario family. It does not claim a larger system layer, a deployment study, or an external release package. It also does not claim that the current artifact answers every accountability question that could matter in a larger runtime. The submission is intentionally narrower: one checkable operation object, one validation path, and one inspectable artifact closure.
