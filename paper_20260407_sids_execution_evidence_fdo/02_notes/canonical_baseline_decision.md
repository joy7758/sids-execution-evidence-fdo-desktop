# Canonical Baseline Decision

## 最终选定基底

`Branch A：JSS 历史窄分支`

当前在 SIDS 新稿中的工作定义：

- 不是直接沿用 JSS 旧稿目录
- 而是采用“Branch A 所代表、且当前 repo 仍真实支持”的最小事实基底

## 证据

1. `agent-evidence/examples/README.md` 只列出 `1` 个 valid 与 `3` 个 invalid。
2. `agent-evidence/docs/ACCEPTANCE-CHECKLIST.md` 明写：
   - `1 个 valid + 3 个 invalid`
   - 当前只保留单链路 metadata enrichment 场景，不另开第二条主线。
3. `agent-evidence/demo/scenario.md` 只描述一个 metadata enrichment 场景，没有第二个 valid context。
4. `agent-evidence/submission/final-handoff.md` 直接写明：
   - `1 个 valid + 3 个 invalid 样例`
   - 一条 metadata enrichment 单链路 demo。
5. `agent-evidence/agent_evidence/cli/main.py` 中 `validate-profile` 入口真实存在。
6. `agent-evidence/tests/test_operation_accountability_profile.py` 与 `tests/test_cli.py` 真实存在，但覆盖面仍围绕当前可见的一个 valid 与三个 invalid。
7. 本轮 workspace 搜索未定位到第二个 valid example、retention review 场景或额外两个 invalid examples。

## 不选另一个分支的原因

### 不选 Branch B 作为 canonical baseline

1. Branch B 的决定性条件是 `2 valid + 5 invalid + second valid context`，当前 repo 未给出对应 examples 资产。
2. `retention review`、`two inputs / one decision output` 这两个 B 线关键词在当前可见 repo 中没有落到 OAP 主线文件。
3. 当前 demo 文档、scenario 文档、acceptance checklist 和 final handoff 都一致指向单条 metadata enrichment 主线。
4. 虽然 repo 里存在 tests、CLI、packaging，这些只说明 supporting surface 更完整，不足以自动把 baseline 升级为 Branch B。
5. 如果现在按 B 写，就会把外部事实与 repo 真值混成一篇“虚构统一稿”，违反本轮原则。

## 对 SIDS 写作的直接影响

1. 摘要、引言、贡献边界、场景矩阵都必须以 `1 valid + 3 invalid + 1 demo + CLI + tests` 为真实基底。
2. 当前不能写第二个 valid context，也不能写 retention review 已在 repo 中落地。
3. 当前不能写 `basic / second-context portability` 作为 repo-backed 结论。
4. 可以写 tests 与 CLI 真实存在，但它们服务于当前更窄的基底，而不是更大覆盖面。
5. SIDS 语言仍然可以转向 data spaces / FDO / operation accountability，但证据面必须保持 Branch A 的窄边界。

## 还缺什么

- 第二个 valid example 的真实文件路径
- 额外两个 invalid examples 的真实文件路径
- retention review 场景的 schema / example / demo / test 证据
- basic / second-context portability 的 repo-backed 文本或实现说明
- 若要切换到 Branch B，需要一次新的 repo truth inventory，而不是沿用本轮结论

## 最终判定

当前 canonical baseline = `Branch A`

附加说明：

- 当前 repo 不是 A/B 完全统一状态。
- 更准确地说，它是“Branch A 为主、tests/CLI/packaging 较完整”的实现状态。
- 因此另一分支本轮只能作为历史外部候选材料保留，不能进入当前 SIDS v1 中文稿的事实主干。
