# 核心主张锁文件

## 一句话主张

在 FDO / data spaces 中，agent 介导的一次数据访问或派生操作，需要的不只是可读日志，而是一个最小、可验证、可复现的 execution evidence profile，用来把 operation accountability 变成可独立检查的对象。

## 三条核心贡献

1. 提出一个围绕单次操作 statement 的最小 profile 边界，显式表达 actor、subject、operation、policy、constraints、provenance、evidence 与 validation。
2. 给出一个 profile-aware validator 路径，以 `schema conformance`、`reference closure`、`cross-field consistency` 和 `minimal integrity recomputation` 作为最小可核查条件。
3. 用当前 repo-backed 的 `1` 个 valid、`3` 个 single-failure invalid、CLI validator、测试锚点与单路径 demo 组成可复核的窄工件面，而不是停留在概念性框架描述。

## 三条非主张

1. 本稿不主张通用治理平台、全量 FDO 互操作层或 multi-agent 全覆盖。
2. 本稿不主张 1.6T、BLAKE3、KL、Digital Territory 或任何协议治理扩张叙述。
3. 本稿不主张工业规模部署、大规模 benchmark、second-context portability 已被证明，或形式化加密信任织构。

## 目标读者

- 关注 data spaces / FDO 的研究者与评审
- 关注 provenance、runtime assurance、artifact review 的研究者
- 需要独立检查 agent-mediated operation 证据边界的系统与标准读者

## 评审最可能攻击的 5 个点

1. 攻击点：这只是把日志换了个名字。
   防守句：本稿要求的不只是记录，而是对单次操作形成可闭包、可校验、可重算的 statement，因此与仅供观察的 trace 不同。

2. 攻击点：贡献太小，只是一个 schema 加脚本。
   防守句：本稿刻意把贡献压缩到最小验证边界，目标不是平台扩张，而是给 data visitation 提供一个可独立审查的起点。

3. 攻击点：为什么只有一个 valid 和少量 invalid examples。
   防守句：当前工件是受控验证样品，重点是可复核的规则边界，而不是覆盖全部场景；更广覆盖与第二个 context 目前仍留在后续工作。

4. 攻击点：这和 provenance 已有工作有什么不同。
   防守句：本稿不试图替代通用 provenance 模型，而是把 provenance、policy、evidence 与 validation 绑定成一次 operation accountability 的最小核查对象。

5. 攻击点：这与 data spaces/FDO 的关系不够强。
   防守句：本稿的场景锚点是 agent-mediated data visitation，目标是给对象访问或派生行为提供最小可检查证据边界，而不是提出新的通用 FDO 基础设施。
