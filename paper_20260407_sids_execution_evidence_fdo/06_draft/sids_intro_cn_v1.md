# 引言 v1

## 1. data spaces / FDO 下的问题

在数据空间与 FDO 场景中，越来越多的数据访问和对象派生动作正在由 agent 代表参与方执行。对外部评审者来说，关键问题不是平台是否留痕，而是某一次操作能否被独立说明和独立验证。

## 2. 为什么日志不够

日志的问题不在于信息太少，而在于它通常不是围绕单次操作问责边界组织的。execution evidence 要解决的不是“记录更多”，而是把 actor、subject、operation、policy、provenance、evidence 与 validation 收成一个可检查对象。

## 3. 为什么需要 minimal profile

因此，本文选择一条刻意保守的路径：先为单次 operation accountability 定义一个 minimal profile，而不是先讨论平台或全量互操作层。当前仓库真实支持的基线只有一组很窄的资产：spec、JSON Schema、validator、1 个 valid、3 个 single-failure invalid，以及 1 条 metadata enrichment demo。

## 4. 为什么是 validator-aware / profile-aware

仅有 schema 还不够，因为 data visitation 的问责边界不只是字段形状问题。当前实现中的 validator 把检查压缩为四类条件：schema conformance、reference closure、cross-field consistency 和 minimal integrity recomputation，因此本文讨论的是可执行的检查路径，而不只是被动格式。

## 5. 本文的窄贡献边界

本文的贡献因此必须保持克制。我们没有解决通用治理平台、full FDO interoperability layer、broad portability 或大规模部署问题；当前 repo-backed 基底只有一个 valid context，即 metadata enrichment。外部分支材料提到的第二个 valid context 与额外 invalid examples 尚未在当前仓库中锁定为真实实现，因此不能写进本文主叙述。本文真正提供的是一个最小、可验证、可复现的 single-operation accountability object，以及与之配套的 spec、schema、validator、examples、CLI 和 demo 闭环。
