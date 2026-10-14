# Reviewer Attack Map

## 1. Attack
This is just logging.

- why it is dangerous: It attacks the paper's central distinction.
- current defense: The artifact is defined as a bounded accountability object with explicit validation stages, not as a raw trace stream.
- residual weakness: The paper does not include an empirical comparison against logging systems.
- exact wording strategy: Say that logs support observability, while the present artifact supports independently checkable single-operation accountability.

## 2. Attack
Why not just PROV?

- why it is dangerous: It can make the contribution look redundant.
- current defense: The paper positions provenance as one component inside a larger accountability object that also includes policy, evidence, and validation.
- residual weakness: The paper does not offer a formal mapping to PROV.
- exact wording strategy: Say that the paper is adjacent to provenance validation work but does not claim to replace general provenance models.

## 3. Attack
Why FDO-based?

- why it is dangerous: The title may look larger than the evidence.
- current defense: The artifact is object-centered and framed in an FDO/data-space setting.
- residual weakness: The paper does not implement a full FDO stack.
- exact wording strategy: Use “FDO-based setting” or “FDO-informed context,” not “full FDO implementation.”

## 4. Attack
Where is the second context?

- why it is dangerous: External branch materials mention it.
- current defense: The current repo-backed baseline does not claim it.
- residual weakness: Reviewers may suspect silent omission.
- exact wording strategy: State plainly that only one valid context is currently repo-backed.

## 5. Attack
Why only one valid example?

- why it is dangerous: It challenges the paper's adequacy as a research contribution.
- current defense: The artifact is intentionally bounded and uses one positive witness plus three controlled failures.
- residual weakness: Coverage remains small.
- exact wording strategy: Emphasize closure and diagnosable boundaries rather than coverage breadth.

## 6. Attack
This looks too small for a paper.

- why it is dangerous: It can trigger desk-reject instincts.
- current defense: The contribution is not breadth but a small executable closure.
- residual weakness: The paper must stay disciplined and avoid filler.
- exact wording strategy: Present the work as a bounded artifact contribution with a clear review surface.

## 7. Attack
Where is deployment evidence?

- why it is dangerous: Some readers may expect practical validation at scale.
- current defense: The paper explicitly makes no deployment claim.
- residual weakness: The paper may still look under-evaluated to systems reviewers.
- exact wording strategy: Include a clear “What this evaluation does not establish” subsection.

## 8. Attack
Where is the platform-level contribution?

- why it is dangerous: Reviewers may try to read the paper as a platform paper.
- current defense: The spec itself excludes general platform scope.
- residual weakness: FDO vocabulary can invite that expectation.
- exact wording strategy: Repeat “single-operation,” “minimal,” and “bounded” in the title, abstract, and conclusion.

## 9. Attack
Are you mixing manuscript branches?

- why it is dangerous: It raises credibility and novelty concerns.
- current defense: The current short paper only uses repo-backed Branch A facts.
- residual weakness: Some donor phrasings originate in older materials.
- exact wording strategy: Keep all quantities and scenario descriptions strictly aligned with the current repo-backed baseline.

## 10. Attack
Why should SIDS care?

- why it is dangerous: The venue fit may look thin.
- current defense: The paper is anchored in FDO/data-space settings and focuses on independently checkable object-level accountability.
- residual weakness: The artifact remains small.
- exact wording strategy: Lead with data-space accountability needs, not with generic AI runtime validation.

## 11. Attack
Why no broader workflow graph or multi-agent case?

- why it is dangerous: It highlights missing scope.
- current defense: The paper never claims graph-level or orchestration-level coverage.
- residual weakness: Readers may still expect it from the topic area.
- exact wording strategy: State that larger workflow graphs remain future work and outside the current shipped boundary.

## 12. Attack
Why not claim a standard proposal?

- why it is dangerous: Some wording may drift toward standardization.
- current defense: The paper only claims a minimal profile specimen.
- residual weakness: The word “profile” can still sound standard-like.
- exact wording strategy: Use “minimal profile” and “artifact” more often than “proposal” or “standard.”
