const zhCN = {
  shell: {
    badge: "Review Pack Desktop v0.1",
    title: "Review Pack Desktop",
    subtitle: "围绕运行结果、证据状态和审阅交付的桌面入口。",
    languageLabel: "语言",
    locale: {
      zhCN: "中文",
      en: "EN",
    },
    stepNavigationLabel: "页面导航",
  },
  steps: {
    welcome: {
      label: "监测首页",
      hint: "先看系统是否已经发现最近一次可用运行结果。",
    },
    inputs: {
      label: "导入结果",
      hint: "导入运行结果目录，自动识别三件套和附属文件。",
    },
    build: {
      label: "生成审阅包",
      hint: "调用本地引擎，查看运行中、成功或失败状态。",
    },
    result: {
      label: "结果",
      hint: "查看审阅包目录、索引文件和审阅报告。",
    },
  },
  common: {
    required: "必填",
    optional: "可选",
    selectFile: "选择文件",
    replaceFile: "重新选择文件",
    selectFolder: "选择文件夹",
    replaceFolder: "重新选择文件夹",
    clear: "清除",
    notSelected: "尚未选择文件",
    notProvided: "本次未附加",
    retry: "重试",
  },
  welcome: {
    kicker: "运行结果收件箱",
    title: "智能体运行监测",
    description:
      "软件会先检查本地运行结果收件箱，尝试自动发现最近一次完整运行结果。找到后，你可以直接进入审阅包流程；找不到时，再手动选择目录或文件。",
    actions: {
      useLatest: "使用最近运行结果",
      chooseDirectory: "选择运行结果目录",
      advancedManual: "高级：手动选择文件",
    },
    discovery: {
      statusLoading: "正在检查收件箱",
      statusFound: "已找到最近一次运行结果",
      statusEmpty: "未找到可用运行结果",
      statusMissing: "尚未发现运行结果收件箱",
      statusFailed: "自动发现失败",
      loadingTitle: "正在检查本地运行结果",
      loadingDescription: "系统正在检查默认收件箱，确认是否存在最近一次完整运行结果。",
      foundTitle: "已找到最近一次运行结果",
      foundDescription: "系统已自动识别本地运行结果，可直接生成审阅包。",
      emptyTitle: "未找到可用运行结果",
      emptyDescription:
        "你可以选择一个运行结果目录，或稍后从自动记录入口生成新的运行结果。",
      emptyDescriptionWithCount:
        "收件箱里已有 {0} 个目录，但暂时没有完整结果。你可以选择一个目录，或稍后再试。",
      missingTitle: "尚未发现运行结果收件箱",
      missingDescription: "默认收件箱为 {0}，你也可以直接选择一个运行结果目录。",
      failedTitle: "暂时无法自动检查收件箱",
    },
    cards: {
      inbox: {
        title: "运行结果收件箱",
        body: "默认收件箱路径固定为 `~/AgentEvidence/runs/`。M1 只扫描这一处，并且只看一级子目录。",
      },
      recentRun: {
        title: "最近一次完整运行",
        body: "如果收件箱里存在完整运行结果，首页会优先把它作为默认入口，而不是先让用户选文件。",
        directoryLabel: "最近运行结果目录",
        empty: "当前还没有可直接使用的完整运行结果。",
      },
    },
  },
  inputs: {
    kicker: "输入准备",
    title: "先导入运行结果目录，再生成审阅包",
    description:
      "默认路径是导入一个运行结果目录并自动识别三件套；如果识别不完整，再切换到高级手动选择修正。",
    modeTitle: "输入方式",
    modes: {
      directory: {
        label: "导入运行结果目录",
        hint: "默认入口。导入一个目录并自动识别。",
      },
      manual: {
        label: "高级手动选择",
        hint: "识别不完整时，再手动修正文件路径。",
      },
    },
    requiredStatus: "已准备 {0}/{1} 个必填文件",
    optionalStatus: "已附加 {0} 个可选文件",
    formStatusReady: "可以进入生成页",
    formStatusBlocked: "仍有必填项未完成",
    requiredSectionTitle: "必填文件",
    requiredSectionDescription: "这三个文件构成当前正式客户版 v0.1 的主输入面。",
    optionalSectionTitle: "可选辅助文件",
    optionalSectionDescription:
      "辅助文件仍然只是 supporting。当前只支持 manifest、公钥和 runtime events；私钥默认不会导入。",
    manualSectionTitle: "高级手动选择",
    manualSectionDescription:
      "当自动识别未完成，或你想替换识别结果时，可以在这里手动选择证据包文件、校验回执文件和摘要文件。",
    manualSectionDirectoryNotice:
      "当前目录识别结果已经带入这里。你可以直接修改不正确或缺失的文件路径。",
    latestResult: {
      title: "最近运行结果已识别",
      description: "当前默认使用系统自动发现的最近一次完整运行结果。技术文件路径默认折叠，需要时再展开查看。",
      cardTitle: "最近运行结果状态",
      cardSourceInbox: "来源：运行结果收件箱",
      directoryLabel: "运行结果目录",
      actionLabel: "下一步",
      nextActionBuild: "继续配置输出位置并生成审阅包",
      nextActionFix: "先修正缺失项，再进入生成页",
      showDetails: "查看识别详情",
      reselectDirectory: "重新选择目录",
      advancedManual: "高级：手动选择文件",
      detectedLabel: "最近运行结果已识别",
    },
    directoryImport: {
      title: "导入运行结果目录",
      description:
        "选择一个运行结果目录后，桌面壳会自动识别证据包文件、校验回执文件、摘要文件，以及可选的附属文件。",
      label: "运行结果目录",
      hint: "选择一个已经导出完成的运行结果目录。",
      placeholder: "尚未选择运行结果目录",
      statusIdle: "等待导入目录",
      statusScanning: "正在自动识别",
      statusReady: "自动识别完成",
      statusIncomplete: "自动识别未完成",
      statusFailed: "目录识别失败",
      directorySelected: "目录已选择",
      scanningNotice: "正在扫描所选目录，并自动识别可用的证据文件。",
      detectedPrimaryTitle: "已识别的主文件",
      detectedPrimaryDescription:
        "这里展示自动识别出的证据包文件、校验回执文件和摘要文件。",
      detectedSupportingTitle: "已识别的附属文件",
      detectedSupportingDescription:
        "这里展示可选附属文件。当前只识别 manifest、公钥和 runtime events；私钥默认不会导入。",
      notDetected: "尚未识别到该文件",
      optionalNotDetected: "当前目录中未识别到该附属文件",
      warningsTitle: "识别提醒",
      multipleCandidates: "发现多个 {0} 候选文件，当前使用 {1}。",
      detectedIncompleteHelp:
        "自动识别未完成。请检查缺失项，或切换到高级手动选择进行修正。",
      useAdvancedAction: "切换到高级手动选择进行修正",
      scanFailedTitle: "目录识别没有完成",
      scanFailed:
        "当前无法从这个目录中识别出完整结果。请检查目录内容，或切换到高级手动选择。",
      detectedReady: "目录识别完成，可以继续到生成页。",
      detectedIncomplete:
        "目录识别到了部分文件，但仍缺少必填项。请先修正后再继续。",
      fixMissingNotice:
        "当前目录识别未完成，请先补齐缺少的文件，或切换到高级手动选择进行修正。",
    },
    outputSectionTitle: "输出目录",
    outputSectionDescription: "生成审阅包之前，先明确要写入的目标目录。",
    outputLabel: "审阅包输出目录",
    outputHint: "选择审阅包保存到哪里。",
    outputPlaceholder: "尚未选择输出目录",
    primaryAction: "继续到生成页",
    secondaryAction: "返回欢迎页",
    buildBlockedNotice: "请先补齐 bundle、receipt、summary 和输出目录，再进入生成页。",
    validationHelp: "继续前请补齐所有必填项。错误会直接显示在对应输入项下方。",
    validation: {
      bundleRequired: "请先选择证据包文件（bundle）。",
      receiptRequired: "请先选择校验结果文件（receipt）。",
      summaryRequired: "请先选择摘要文件（summary）。",
      outputDirRequired: "请选择审阅包输出位置。",
    },
    fields: {
      bundle: {
        label: "证据包文件（bundle）",
        hint: "导出的证据包文件，是审阅包的核心输入之一。",
      },
      receipt: {
        label: "校验结果文件（receipt）",
        hint: "机器可读的校验结果文件，用来承接验证事实。",
      },
      summary: {
        label: "摘要文件（summary）",
        hint: "面向审阅者的摘要文件，用来承接当前的结果概览。",
      },
      manifest: {
        label: "清单文件（manifest）",
        hint: "可选辅助文件。用于补充导出时的清单信息。",
      },
      publicKey: {
        label: "公钥文件（public key）",
        hint: "可选辅助文件。用于线下复核时补充验证材料。",
      },
      runtimeEvents: {
        label: "运行事件文件（runtime events）",
        hint: "可选辅助文件。用于更深层的运行诊断。",
      },
    },
  },
  runStatus: {
    ready: {
      label: "证据完整，可生成审阅包",
      hint: "bundle、receipt 和 summary 已齐全。确认输出位置后即可继续。",
    },
    missingBundle: {
      label: "缺少证据包，需处理",
      hint: "当前还没有识别到证据包文件（bundle），不能继续生成审阅包。",
    },
    missingReceipt: {
      label: "缺少校验回执，需处理",
      hint: "当前还没有识别到校验回执文件（receipt），请先补齐后再继续。",
    },
    missingSummary: {
      label: "缺少摘要，需处理",
      hint: "当前还没有识别到摘要文件（summary），请先补齐后再继续。",
    },
  },
  build: {
    kicker: "生成前预检",
    title: "核对输入，然后交给本地引擎生成审阅包",
    description:
      "先确认当前运行结果来源、输出位置和状态摘要，再点击主按钮生成审阅包。",
    statusIdle: "准备生成",
    statusRunning: "正在生成",
    statusSuccess: "生成成功",
    statusFailure: "生成失败",
    primaryActionIdle: "生成审阅包",
    primaryActionRunning: "正在生成审阅包…",
    primaryActionRetry: "重试生成",
    secondaryAction: "返回输入页",
    runningCallout:
      "正在调用本地 Review Pack 引擎。请保持当前窗口开启，等待结果返回。",
    failure: {
      title: "这次生成没有完成",
      detailsTitle: "机器可读错误详情",
      engineNotFound:
        "本机没有找到 Review Pack 引擎。请先确认 `ae-review-pack-engine` 已安装并可从当前环境执行。",
      permissionDenied:
        "桌面壳当前没有权限启动本地 Review Pack 引擎。请检查本地安装和桌面权限配置。",
      validation:
        "输入文件或输出目录没有通过本地引擎校验。请先修正文件，再重新尝试。",
      execution:
        "本地引擎已启动，但在组装或写出审阅包时失败。请检查错误详情后重试。",
      unexpected:
        "本地引擎返回了非预期结果。请检查错误详情，必要时回到输入页重新选择文件。",
    },
    cards: {
      review: {
        title: "输入检查",
        body: "bundle、receipt、summary 和输出目录已经完成当前阶段校验。",
        stateReady: "已就绪",
        stateLocked: "运行中",
        stateConfirmed: "已确认",
        stateNeedsAttention: "需处理",
      },
      engine: {
        title: "本地引擎",
        body: "桌面壳会调用 `ae-review-pack-engine build-review-pack`，再把结果返回到当前流程。",
        stateWaiting: "待启动",
        stateRunning: "运行中",
        stateReady: "已完成",
        stateFailed: "失败",
      },
      result: {
        title: "结果位",
        body: "成功后会进入结果页，展示 pack 目录、index.json 和 report.md。",
        stateReserved: "已预留",
        statePreparing: "准备中",
        stateReady: "可查看",
        stateBlocked: "未生成",
      },
    },
    summary: {
      runResultDirectorySelected: "运行结果目录：已导入",
      manualSource: "当前来源：高级手动选择",
      requiredFiles: "必填文件：{0} 个",
      optionalFiles: "可选辅助文件：{0} 个",
      outputDirectory: "输出目录：已选择",
      buildAction: "下一步：生成审阅包",
      readyAction: "当前状态：审阅包已生成",
    },
    runCard: {
      title: "当前运行结果",
      directoryLabel: "运行结果来源",
      sourceDirectory: "来源：运行结果目录",
      sourceManual: "来源：高级手动选择",
    },
    outputCard: {
      title: "输出位置",
      description: "生成后的审阅包会写入这里。默认先展示结果摘要，技术路径需要时再展开查看。",
    },
    sourceManualValue: "高级手动选择",
    showDetailsAction: "查看详情",
    hideDetailsAction: "收起详情",
    preflight: {
      sourceDirectoryTitle: "运行结果目录",
      sourceDirectoryDescription: "这里展示本次导入并用于自动识别的运行结果目录。",
      requiredTitle: "必填输入",
      requiredDescription: "这里展示会送入本地引擎的三个主输入文件。",
      optionalTitle: "可选辅助文件",
      optionalDescription: "这里展示本次是否附加 manifest、公钥和 runtime events。",
      outputTitle: "输出目录",
      outputDescription: "这里展示后续生成 Review Pack 时会写入的本地目录。",
    },
  },
  result: {
    kicker: "生成结果",
    statusEmpty: "尚无结果",
    statusSuccess: "生成成功",
    statusFailure: "生成失败",
    emptyTitle: "先完成一次审阅包生成",
    emptyDescription:
      "当前还没有可展示的生成结果。先回到生成页运行一次本地引擎，再回来查看输出。",
    successTitle: "审阅包已经生成完成",
    successDescription:
      "这次生成已经返回稳定结果。你可以直接打开输出目录，或复制审阅包路径给其他人。",
    failureTitle: "本地引擎返回了失败结果",
    failureDetailsTitle: "失败信息",
    errorCodeLabel: "错误代码",
    errorMessageLabel: "错误说明",
    rawDetailsTitle: "原始错误详情",
    inventoryTitle: "当前输入摘要",
    primaryFilesTitle: "主输出文件",
    supportingFilesTitle: "辅助文件",
    primaryFiles: {
      bundle: "证据包文件（bundle）",
      receipt: "校验结果文件（receipt）",
      summary: "摘要文件（summary）",
    },
    optionalNotIncluded: "本次未附加",
    placeholderOutputDirectory: "~/Documents/review-pack-output",
    openFolderAction: "打开文件夹",
    copyPathAction: "复制路径",
    openFolderSuccess: "已尝试打开审阅包目录。",
    openFolderFailed: "当前无法打开审阅包目录，请确认本地文件仍然存在。",
    copyPathSuccess: "已复制审阅包目录路径。",
    copyPathFailed: "当前无法复制路径，请重试。",
    goToBuildAction: "返回生成页",
    cards: {
      packDir: {
        title: "审阅包目录",
        body: "这里显示本次生成后的稳定 pack 目录。",
      },
      index: {
        title: "索引文件（index.json）",
        body: "这里显示 pack index 的路径；它仍然只是 pack index，不是新的主输出。",
      },
      report: {
        title: "审阅报告（report.md）",
        body: "这里显示审阅报告路径；taxonomy 和解释仍然只属于 renderer 层。",
      },
    },
  },
} as const;

export default zhCN;
