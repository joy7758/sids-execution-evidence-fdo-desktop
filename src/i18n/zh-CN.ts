const zhCN = {
  shell: {
    badge: "Review Pack Desktop v0.1",
    title: "Review Pack Desktop",
    subtitle: "不用命令行，直接把三件套整理成审阅包。",
    languageLabel: "语言",
    locale: {
      zhCN: "中文",
      en: "EN",
    },
    stepNavigationLabel: "页面导航",
  },
  steps: {
    welcome: {
      label: "欢迎",
      hint: "先看这版正式客户软件要解决什么问题。",
    },
    inputs: {
      label: "输入文件",
      hint: "选择 bundle、receipt、summary 和输出目录。",
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
    kicker: "正式客户版路径",
    title: "先把现有三件套整理成一个审阅包",
    description:
      "这版桌面壳只做一件事：帮助客户在不敲命令行的前提下，选择证据包文件、校验结果文件和摘要文件，进入稳定的 Review Pack 流程。",
    primaryAction: "开始生成审阅包",
    secondaryAction: "查看结果页",
    cards: {
      input: {
        title: "输入保持简单",
        body: "只接 bundle、receipt、summary。manifest、公钥和 runtime events 仍然只是可选辅助文件。",
      },
      output: {
        title: "输出边界不变",
        body: "主输出仍然是 bundle、receipt、summary。Review Pack 只是建立在三件套之上的桌面层。",
      },
      boundary: {
        title: "先不做大平台",
        body: "这版不做跑模型、不做 provider 管理、不做云同步，只把正式客户版的桌面壳立起来。",
      },
    },
  },
  inputs: {
    kicker: "输入准备",
    title: "选择生成审阅包需要的文件",
    description:
      "D2 把输入页升级为真实桌面表单：可直接选择文件和输出目录，并在继续前完成必填校验。",
    requiredStatus: "已准备 {0}/{1} 个必填文件",
    optionalStatus: "已附加 {0} 个可选文件",
    formStatusReady: "可以进入生成页",
    formStatusBlocked: "仍有必填项未完成",
    requiredSectionTitle: "必填文件",
    requiredSectionDescription: "这三个文件构成当前正式客户版 v0.1 的主输入面。",
    optionalSectionTitle: "可选辅助文件",
    optionalSectionDescription: "辅助文件保留为 supporting，不会被提升成新的主输出。",
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
  build: {
    kicker: "生成前预检",
    title: "核对输入，然后交给本地引擎生成审阅包",
    description:
      "D5 已把生成页接到本地 sidecar：先看预检摘要，再点击主按钮生成 Review Pack。",
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
      requiredFiles: "必填文件：{0} 个",
      optionalFiles: "可选辅助文件：{0} 个",
      outputDirectory: "输出目录：已选择",
    },
    preflight: {
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
