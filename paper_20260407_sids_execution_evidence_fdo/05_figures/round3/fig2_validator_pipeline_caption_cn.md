# Fig 2 图注（中文）

图 2 展示当前 validator 的收敛校验路径：输入 JSON 先过 schema checks，再过 reference closure、cross-field consistency 和 minimal integrity checks，最后输出 JSON report、exit code 与 summary。右侧的 demo path 只是同一 validator 的一个单场景入口，不代表第二 context，也不代表更大工作流。
