# 仓库实现资产盘点

盘点原则：

- 先识别真实状态，不照旧文稿抄。
- 先盘点，不修改代码。
- 只记录与新稿直接相关或必须排除的资产。

## 1. 资产表

| 路径 | 文件类型 | 与新稿关系 | 是否建议复用 | 备注 |
| --- | --- | --- | --- | --- |
| `/Users/zhangbin/GitHub/agent-evidence/spec/execution-evidence-operation-accountability-profile-v0.1.md` | Markdown spec | A 线核心规范 | 建议复用 | 定义 top-level 字段、compliance 条件与 failure 条件 |
| `/Users/zhangbin/GitHub/agent-evidence/schema/execution-evidence-operation-accountability-profile-v0.1.schema.json` | JSON Schema | A 线核心 schema | 建议复用 | 明确 required 字段、枚举和 digest 格式 |
| `/Users/zhangbin/GitHub/agent-evidence/agent_evidence/oap.py` | Python validator | A 线核心实现 | 建议复用 | 实现 `schema -> references -> consistency -> integrity` 四阶段校验 |
| `/Users/zhangbin/GitHub/agent-evidence/agent_evidence/cli/main.py` | Python CLI | A 线验证入口 | 建议复用 | 已存在 `validate-profile` 命令入口 |
| `/Users/zhangbin/GitHub/agent-evidence/examples/README.md` | Markdown | A 线 examples 目录说明 | 建议复用 | 当前可见 example 集合说明为 `1 valid + 3 invalid` |
| `/Users/zhangbin/GitHub/agent-evidence/examples/minimal-valid-evidence.json` | JSON example | A 线有效样例 | 建议复用 | 本轮已用 `.repro` CLI 复核通过 |
| `/Users/zhangbin/GitHub/agent-evidence/examples/invalid-missing-required.json` | JSON example | A 线失败样例 | 建议复用 | 文件存在；本轮未单独复跑 |
| `/Users/zhangbin/GitHub/agent-evidence/examples/invalid-unclosed-reference.json` | JSON example | A 线失败样例 | 建议复用 | 本轮已用 `.repro` CLI 复核，主错误码为 `unresolved_output_ref` |
| `/Users/zhangbin/GitHub/agent-evidence/examples/invalid-policy-link-broken.json` | JSON example | A 线失败样例 | 建议复用 | 文件存在；本轮未单独复跑 |
| `/Users/zhangbin/GitHub/agent-evidence/demo/run_operation_accountability_demo.py` | Python demo | A 线单路径 demo | 建议复用 | 本轮已用 `.repro` Python 复核通过，输出 `PASS ...` |
| `/Users/zhangbin/GitHub/agent-evidence/demo/artifacts/validation-report.json` | JSON artifact | A 线 demo 输出物 | 谨慎复用 | 属于生成物，可作工作记录，不宜代替源码或 spec |
| `/Users/zhangbin/GitHub/agent-evidence/tests/test_operation_accountability_profile.py` | Python test | A 线测试锚点 | 建议复用 | 覆盖 valid/invalid/CLI smoke test |
| `/Users/zhangbin/GitHub/agent-evidence/docs/STATUS.md` | Markdown | A 线状态说明 | 谨慎复用 | 有价值，但包含旧环境 `.venv` 验证叙述 |
| `/Users/zhangbin/GitHub/agent-evidence/.repro-v0_1-20260407/` | venv 目录 | A 线复现环境资产 | 可复用 | 本轮 validator CLI 可用 |
| `/Users/zhangbin/GitHub/agent-evidence/.repro-v0_1-20260407-full/` | venv 目录 | A 线复现环境资产 | 可复用 | 本轮 demo 可用；`pytest` 缺失 |
| `/Users/zhangbin/GitHub/execution-evidence-jss-20260407b/manuscript/full-draft-jss-clean.md` | Markdown manuscript | A 线旧稿参考 | 谨慎复用 | 可做语言差分，不可直接当新稿目录 |
| `/Users/zhangbin/GitHub/tse-submission-private/manuscript/full-draft.md` | Markdown manuscript | A 线姊妹稿参考 | 谨慎复用 | 问题定义更宽，适合识别非本稿叙述 |
| `/Users/zhangbin/GitHub/execution-evidence-jss-20260407/` | 空目录 | A 线历史路径风险点 | 不建议复用 | 当前可见范围内无文件，不能作为内容来源 |
| `/Users/zhangbin/GitHub/pFDO-Specification/README.md` | Markdown | B 线对照材料 | 不建议复用 | 明显承载 `1.6T` 与物理层 FDO 叙述 |
| `/Users/zhangbin/GitHub/pFDO-Specification/docs/paper/merged_paper.tex` | LaTeX | B/C 线对照材料 | 不建议复用 | 包含 `KL`、metabolism、entropy 与协议治理主张 |
| `/Users/zhangbin/GitHub/AASP-Core/schemas/aasp_ontology.jsonld` | JSON-LD | C 线排除材料 | 不建议复用 | 明确是 `DigitalMetabolism` 语义 |

## 2. 本轮识别到的不一致点

### 2.1 文稿描述与当前环境不一致

- `agent-evidence/docs/STATUS.md` 记录了基于 `.venv` 的验证命令。
- 但当前 workspace 中 `agent-evidence/.venv/` 并不存在，无法直接复跑这些命令。
- 当前可用的是 `.repro-v0_1-20260407` 与 `.repro-v0_1-20260407-full`。

### 2.2 文稿数量描述与当前可见实现边界

- 当前可见实现只支持 `1 valid + 3 invalid + 1 demo`。
- 本轮未在可见 workspace 中找到支持 `2 valid + 5 invalid` 的真实实现资产。
- 因此新稿暂不能写入 `2 valid + 5 invalid`。

### 2.3 “能跑”与“曾经跑过”不是同一件事

- 本轮已复核通过：
  - `.repro-v0_1-20260407/bin/agent-evidence validate-profile examples/minimal-valid-evidence.json`
  - `.repro-v0_1-20260407/bin/agent-evidence validate-profile examples/invalid-unclosed-reference.json`
  - `.repro-v0_1-20260407-full/bin/python demo/run_operation_accountability_demo.py`
- 本轮未完整复核：
  - `pytest` 路径，因为 `.repro-v0_1-20260407-full` 中缺少 `pytest`
  - 其余两个 invalid case 的直接运行结果，虽然文件与测试资产存在

## 3. 对新稿的直接结论

- 新稿事实锚点应优先绑定 `agent-evidence` 的 spec/schema/validator/examples/demo。
- 旧 JSS/TSE 文稿只能做差分参考，不可当作事实来源覆盖真实实现。
- B 线与 C 线材料必须只作为排除对照，不得进入贡献段。
