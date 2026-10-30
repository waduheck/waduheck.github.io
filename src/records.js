// 整站内容：一个档案库。每条记录 = 阵列里的一张卡 + 抽取后的详情。
// 详情 = 元信息表 + 若干标签页；系统架构不是独立章节，而是 X-01 的「架构」页。
//
// 数字口径（2026-10-30 从代码/契约实测）：
//   180 ops / 120 write / 44 destructive / 180 MCP tools
//   73 oracles / 10 业务域   7 golden cases   9 apps

const links = [
  // TODO：换成一个愿意公开的邮箱
  // { label: 'Email', href: 'mailto:TODO@example.com' },
  { label: 'GitHub', href: 'https://github.com/waduheck' },
];

export const copy = {
  zh: {
    meta: {
      title: '王逸浩 · 档案',
      description:
        '王逸浩（Ethan）——可靠的 LLM Agent：契约定义的工具体系、可执行的 oracle、能真的拦下改动的发布闸门。',
      ogTitle: '王逸浩 · 档案',
      ogDescription: '契约定义的工具体系、差分 oracle、能真的拦下改动的发布闸门。',
      ogLocale: 'zh_CN',
    },

    brand: {
      name: '王逸浩',
      line1: '可靠的 LLM Agent',
      line2: '工具体系 · 评估 · 发布闸门',
      utility: '档案索引',
      saved: '已存',
      links,
    },

    ui: {
      language: '语言',
      contact: '联系方式',
      browseHint: '← → 换档 ／ ENTER 读取 ／ 拖动或横向滑动',
      open: '读取档案',
      back: '返回索引',
      close: '返回',
      total: '共',
    },

    records: [
      {
        id: 'X-01',
        kind: '系统',
        clearance: '在范围内',
        title: '多租户协作平台',
        subtitle: '任务图 / 文档 / 会议 / 台账 / 内嵌 Agent',
        meta: [
          { k: '角色 / ROLE', v: '设计与实现' },
          { k: '形态 / FORM', v: '模块化单体' },
          { k: '规模 / SCALE', v: '18 个业务域模块' },
          { k: '状态 / STATUS', v: '生产运行' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '一套多租户协作平台：聊天、任务图、文档、日历、会议、资金台账，以及内嵌的 Agent。' +
              '所有团队共用一个进程，每个团队只是自己的一份数据库文件——多一个团队几乎不多占资源。' +
              '对照组是「每个团队单独跑一套服务」，一套常驻 1.3–1.8G，团队一多机器就扛不住。',
          },
          { label: '架构', body: '' },
          {
            label: '交付',
            body:
              'k3s + ArgoCD 做 GitOps：推进一次发版就是提交一个镜像 tag，上线后检查不通过自动回滚。' +
              '自建 GitHub Actions runner，9 个应用共用一套发布流程，每个版本上线前必跑核心路径冒烟。',
          },
        ],
      },
      {
        id: 'X-02',
        kind: '作品',
        clearance: '在范围内',
        title: '一份契约，三种工具面',
        subtitle: 'TypeSpec → REST / MCP / CLI',
        meta: [
          { k: '角色 / ROLE', v: '契约与生成链路' },
          { k: '操作 / OPS', v: '180 个，跨 14 个域' },
          { k: '写操作 / WRITE', v: '120 个，其中 44 个有破坏性' },
          { k: '状态 / STATUS', v: '生产运行' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '同一份 TypeSpec 源文件，为每个已声明的操作同时生成 REST 路由、MCP 工具清单和 CLI 命令。' +
              '每个操作都标明是否写、是否有破坏性、需要哪一档权限，所以 Agent 能碰到的面是从契约推导出来的，' +
              '而不是靠人手维护。手写的历史路由单独计数，契约漂移就变成一处能 diff 的差异。',
          },
          {
            label: '细节',
            body:
              '180 个已声明操作里，120 个会写、44 个有破坏性；同一份契约同时产出 180 个 MCP 工具和 180 条 CLI 命令。' +
              '另有 62 条手写历史路由被单独标记，不参与生成，也不计入上面三个数字。',
          },
        ],
      },
      {
        id: 'X-03',
        kind: '作品',
        clearance: '在范围内',
        title: '重建 ERP 的差分 oracle',
        subtitle: '把「像不像」变成可机器判定',
        meta: [
          { k: '角色 / ROLE', v: '差分回归体系' },
          { k: '覆盖 / COVER', v: '73 份 oracle / 10 个业务域' },
          { k: '来源 / SOURCE', v: '参照系统实测，一字不改' },
          { k: '状态 / STATUS', v: '生产运行' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '把一个生产在用的工厂 ERP 从外部重建。每个模块的期望行为都用测试数据从参照系统里录下来，' +
              '冻成可执行的 oracle——输入、动作、期望数字，一字不改。「重建版行为是否一致」于是变成可机器判定的' +
              '回归，而不是两个人对着两块屏幕比。',
          },
          {
            label: '细节',
            body:
              '73 份 oracle 分布在 10 个业务域：生产 24、库存 13、财务 13、物料 9、成品库存 4、商品 3、' +
              '报表 2、MRP 2、裁剪 2、在产品库存 1。每份都记录动作、输入、期望返回值，跑一次就是一次全量对账。',
          },
        ],
      },
      {
        id: 'X-04',
        kind: '作品',
        clearance: '在范围内',
        title: 'Agent 改不动的评估框架',
        subtitle: '黄金用例 + 标准答案 + 逐例报告',
        meta: [
          { k: '角色 / ROLE', v: '评估流水线' },
          { k: '用例 / CASES', v: '7 条黄金用例' },
          { k: '对象 / TARGET', v: '助手 / 策略检查 / 票据' },
          { k: '状态 / STATUS', v: '生产运行' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '黄金用例加一份显式的标准答案文件，驱动助手和策略检查器；每跑一次就写一份逐用例报告。' +
              '提示词或模型一改，是靠实测通过率决定收还是不收，而不是看一次演示碰巧对上了。',
          },
          {
            label: '细节',
            body:
              '标准答案和用例文件与生成代码分开存放，Agent 改业务代码时碰不到评估器本身——' +
              '这是「AI 做完上线就当完成」和「用机器判定它到底做完没有」的分界线。',
          },
        ],
      },
      {
        id: 'X-05',
        kind: '作品',
        clearance: '在范围内',
        title: '交付基础设施',
        subtitle: 'k3s / ArgoCD / 自建 runner',
        meta: [
          { k: '角色 / ROLE', v: 'IDP 与发布链路' },
          { k: '规模 / SCALE', v: '9 个应用，一套流程' },
          { k: '机制 / MECH', v: '一提交一发版，失败自动回滚' },
          { k: '状态 / STATUS', v: '生产运行' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '模块化单体，一个进程发出去，用 k3s + ArgoCD 做 GitOps：推进一次发版就是提交一个镜像 tag，' +
              '上线后的检查不通过会自动回滚。自建的 GitHub Actions runner，加上每个版本上线前必跑核心路径冒烟的发版闸门。',
          },
          {
            label: '细节',
            body:
              '发版闸门本身也出过问题：有一次被 6 个测试留下的空库卡住，原因是只读挂载下 SQLite 建不出 -shm 文件。' +
              '处理是把这 6 个目录原样挪走、核对 sha256，再把检查改成只查登记过的团队。',
          },
        ],
      },
      {
        id: 'X-06',
        kind: '工作',
        clearance: '现行',
        title: '元序科技',
        subtitle: '软件工程师 / 远程',
        meta: [
          { k: '时间 / PERIOD', v: '2026.09 — 至今' },
          { k: '角色 / ROLE', v: '软件工程师' },
          { k: '负责 / SCOPE', v: '平台与交付链路' },
          { k: '状态 / STATUS', v: '进行中' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '远程维护 X-01 那套平台：会议模块、桌面客户端、发布链路，以及契约层的生成与校验。' +
              '同时把「AI 写代码」约束进流程：改动走 PR，过检查才合并，上线前跑冒烟。',
          },
        ],
      },
      {
        id: 'X-07',
        kind: '工作',
        clearance: '已归档',
        title: '浙江绿洲制冷设备有限公司',
        subtitle: '程序员 / 台州',
        meta: [
          { k: '时间 / PERIOD', v: '2026.06 — 2026.08' },
          { k: '角色 / ROLE', v: '程序员' },
          { k: '负责 / SCOPE', v: 'WMS 数据库 / ERP 物料主数据 / 生产报表' },
          { k: '状态 / STATUS', v: '已归档' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '工厂数字化：仓库管理系统的数据库设计与查询、ERP 物料主数据整理、生产与在制金额报表。' +
              '工作里最实在的一课是口径——同一个「在制金额」，财务、计划和车间各有一套算法。',
          },
        ],
      },
      {
        id: 'X-08',
        kind: '工作',
        clearance: '已归档',
        title: '虹软科技 ArcSoft',
        subtitle: '算法实习生',
        meta: [
          { k: '时间 / PERIOD', v: '2025' },
          { k: '角色 / ROLE', v: '算法实习生' },
          { k: '负责 / SCOPE', v: '工单流转解析 / 自动复现脚本' },
          { k: '状态 / STATUS', v: '已归档' },
        ],
        tabs: [
          {
            label: '概述',
            body: '用 LLM 解析工单流转并自动执行复现脚本；实习期内获破格晋升。',
          },
        ],
      },
      {
        id: 'X-09',
        kind: '教育',
        clearance: '已归档',
        title: '杭州电子科技大学',
        subtitle: '计算机科学与技术 / 工学学士',
        meta: [
          { k: '时间 / PERIOD', v: '2022.09 — 2026.06' },
          { k: '学位 / DEGREE', v: '工学学士' },
          { k: '成绩 / GPA', v: '82.10 / 100' },
          { k: '状态 / STATUS', v: '毕业' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '计算机科学与技术。在校期间做过可解释强化学习、三维场景语义编辑、3DCAE 三个项目，' +
              '拿过服务外包大赛全国二等奖。',
          },
        ],
      },
      {
        id: 'X-10',
        kind: '奖项',
        clearance: '已归档',
        title: '竞赛与项目',
        subtitle: '三条记录',
        meta: [
          { k: '最高 / TOP', v: '国家级二等奖' },
          { k: '方向 / FIELD', v: '可解释 RL / 视觉检测 / 建模' },
          { k: '时间 / PERIOD', v: '2024 — 2025' },
          { k: '状态 / STATUS', v: '已归档' },
        ],
        tabs: [
          {
            label: '概述',
            body:
              '2024.08 服务外包创新创业大赛全国二等奖（可解释强化学习系统，算法设计与核心代码）；' +
              '2024.11 全国大学生数学建模竞赛浙江省三等奖；2025 服务外包大赛东部区域赛三等奖（车辆零部件缺陷检测）。',
          },
        ],
      },
    ],
  },

  en: {
    meta: {
      title: 'Yihao (Ethan) Wang — Archive',
      description:
        'Yihao (Ethan) Wang — reliable LLM agents: contract-defined tool surfaces, executable oracles, and release gates that can actually reject them.',
      ogTitle: 'Yihao (Ethan) Wang — Archive',
      ogDescription: 'Contract-defined tool surfaces, differential oracles, and release gates.',
      ogLocale: 'en_US',
    },

    brand: {
      name: 'Yihao (Ethan) Wang',
      line1: 'Reliable LLM agents',
      line2: 'Tool surfaces · evaluation · release gates',
      utility: 'Archive index',
      saved: 'Saved',
      links,
    },

    ui: {
      language: 'Language',
      contact: 'Contact',
      browseHint: '← → to step ／ ENTER to read ／ drag or swipe sideways',
      open: 'Read record',
      back: 'Archive overview',
      close: 'Back',
      total: 'of',
    },

    records: [
      {
        id: 'X-01',
        kind: 'System',
        clearance: 'In scope',
        title: 'Multi-tenant collaboration platform',
        subtitle: 'Task graph / docs / meetings / ledger / embedded agent',
        meta: [
          { k: 'Role / 角色', v: 'Design and implementation' },
          { k: 'Form / 形态', v: 'Modular monolith' },
          { k: 'Scale / 规模', v: '18 domain modules' },
          { k: 'Status / 状态', v: 'In production' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'One multi-tenant platform: chat, task graph, docs, calendar, meetings, ledger and an embedded agent. ' +
              'Every team shares one process and gets its own database file, so another team costs almost nothing. ' +
              'The rejected alternative was one service per team — 1.3–1.8 GB resident each, which does not scale.',
          },
          { label: 'Architecture', body: '' },
          {
            label: 'Delivery',
            body:
              'GitOps on k3s with ArgoCD: a release advances by one image-tag commit and rolls back automatically ' +
              'when the post-deploy check fails. Self-hosted GitHub Actions runners; nine apps share one release ' +
              'path, and every version runs core-path smoke before it ships.',
          },
        ],
      },
      {
        id: 'X-02',
        kind: 'Work',
        clearance: 'In scope',
        title: 'One contract, three tool surfaces',
        subtitle: 'TypeSpec → REST / MCP / CLI',
        meta: [
          { k: 'Role / 角色', v: 'Contract and generation' },
          { k: 'Ops / 操作', v: '180 across 14 domains' },
          { k: 'Write / 写操作', v: '120, of which 44 destructive' },
          { k: 'Status / 状态', v: 'In production' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'A single TypeSpec source generates the REST routes, the MCP tool list and the CLI commands for every ' +
              'declared operation. Each operation states whether it writes, whether it is destructive and which scope ' +
              'it needs, so the surface an agent may touch is derived from the contract instead of being maintained ' +
              'by hand. Hand-written legacy routes are counted separately, which turns drift into a visible diff.',
          },
          {
            label: 'Detail',
            body:
              'Of 180 declared operations, 120 write and 44 are destructive; the same contract emits 180 MCP tools and ' +
              '180 CLI commands. Another 62 hand-written legacy routes are flagged separately and excluded from those counts.',
          },
        ],
      },
      {
        id: 'X-03',
        kind: 'Work',
        clearance: 'In scope',
        title: 'Differential oracles for a rebuilt ERP',
        subtitle: 'Turning "does it behave the same" into a machine check',
        meta: [
          { k: 'Role / 角色', v: 'Differential regression' },
          { k: 'Cover / 覆盖', v: '73 oracles / 10 domains' },
          { k: 'Source / 来源', v: 'Recorded from the reference system, unchanged' },
          { k: 'Status / 状态', v: 'In production' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'A production factory ERP was rebuilt from the outside in. For each module the expected behaviour was ' +
              'captured from the reference system with test data and frozen as an executable oracle — inputs, ' +
              'actions, expected numbers, unchanged. Behavioural parity became a machine-checkable regression ' +
              'instead of two screens compared by eye.',
          },
          {
            label: 'Detail',
            body:
              '73 oracles across 10 domains: production 24, stock 13, finance 13, material 9, goods stock 4, goods 3, ' +
              'reports 2, MRP 2, cutting 2, work-in-progress stock 1. Each records action, input and expected return; ' +
              'one run reconciles everything.',
          },
        ],
      },
      {
        id: 'X-04',
        kind: 'Work',
        clearance: 'In scope',
        title: 'An evaluation harness agents cannot edit',
        subtitle: 'Golden cases + ground truth + per-case reports',
        meta: [
          { k: 'Role / 角色', v: 'Evaluation pipeline' },
          { k: 'Cases / 用例', v: '7 golden cases' },
          { k: 'Target / 对象', v: 'Assistant / policy / receipts' },
          { k: 'Status / 状态', v: 'In production' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'Golden cases plus an explicit ground-truth file drive the assistant and the policy checker; every run ' +
              'writes a per-case report. A prompt or model change is accepted or rejected on measured pass rate, ' +
              'not on a demo that happened to look right.',
          },
          {
            label: 'Detail',
            body:
              'The ground truth and case files live apart from generated code, so an agent editing business logic ' +
              'cannot touch the evaluator itself. That separation is the line between "the AI said it was done" and ' +
              '"a machine decided it was done".',
          },
        ],
      },
      {
        id: 'X-05',
        kind: 'Work',
        clearance: 'In scope',
        title: 'Delivery infrastructure',
        subtitle: 'k3s / ArgoCD / self-hosted runners',
        meta: [
          { k: 'Role / 角色', v: 'IDP and release path' },
          { k: 'Scale / 规模', v: '9 apps, one flow' },
          { k: 'Mech / 机制', v: 'One commit per release, auto rollback' },
          { k: 'Status / 状态', v: 'In production' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'A modular monolith shipped as one process and deployed by GitOps on k3s with ArgoCD: a release ' +
              'advances by a single image-tag commit and rolls back automatically when the post-deploy check fails. ' +
              'Self-hosted runners plus a gate that runs core-path smoke on every version.',
          },
          {
            label: 'Detail',
            body:
              'The gate itself broke once: six empty databases left over from tests blocked releases because SQLite ' +
              'could not create -shm files on a read-only mount. The fix was moving those directories aside with ' +
              'sha256 verification, then narrowing the check to registered teams only.',
          },
        ],
      },
      {
        id: 'X-06',
        kind: 'Work',
        clearance: 'Current',
        title: 'Yuansu Technology',
        subtitle: 'Software engineer / remote',
        meta: [
          { k: 'Period / 时间', v: 'Sep 2026 — present' },
          { k: 'Role / 角色', v: 'Software engineer' },
          { k: 'Scope / 负责', v: 'Platform and delivery path' },
          { k: 'Status / 状态', v: 'Ongoing' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'Remote work on the platform described in X-01: the meetings module, the desktop client, the release ' +
              'path, and contract generation and validation. Also constraining AI-written code into a process: ' +
              'changes go through PRs, checks gate the merge, smoke runs before shipping.',
          },
        ],
      },
      {
        id: 'X-07',
        kind: 'Work',
        clearance: 'Archived',
        title: 'Zhejiang Lvzhou Refrigeration',
        subtitle: 'Programmer / Taizhou',
        meta: [
          { k: 'Period / 时间', v: 'Jun 2026 — Aug 2026' },
          { k: 'Role / 角色', v: 'Programmer' },
          { k: 'Scope / 负责', v: 'WMS database / ERP master data / production reports' },
          { k: 'Status / 状态', v: 'Archived' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'Factory digitalisation: database design and queries for a warehouse system, ERP material master data, ' +
              'and production and work-in-progress reports. The most useful lesson was about definitions — the same ' +
              '"WIP value" had three different formulas depending on who asked.',
          },
        ],
      },
      {
        id: 'X-08',
        kind: 'Work',
        clearance: 'Archived',
        title: 'ArcSoft',
        subtitle: 'Algorithm intern',
        meta: [
          { k: 'Period / 时间', v: '2025' },
          { k: 'Role / 角色', v: 'Algorithm intern' },
          { k: 'Scope / 负责', v: 'Ticket-flow parsing / reproduction scripts' },
          { k: 'Status / 状态', v: 'Archived' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body: 'LLM parsing of ticket flow plus automated reproduction scripts; promoted ahead of schedule.',
          },
        ],
      },
      {
        id: 'X-09',
        kind: 'Education',
        clearance: 'Archived',
        title: 'Hangzhou Dianzi University',
        subtitle: 'Computer Science / B.Eng.',
        meta: [
          { k: 'Period / 时间', v: 'Sep 2022 — Jun 2026' },
          { k: 'Degree / 学位', v: 'B.Eng.' },
          { k: 'GPA / 成绩', v: '82.10 / 100' },
          { k: 'Status / 状态', v: 'Graduated' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'Computer science. Three projects along the way — explainable RL, semantic editing of 3D scenes, and ' +
              '3DCAE — plus a national second prize in the service-outsourcing competition.',
          },
        ],
      },
      {
        id: 'X-10',
        kind: 'Award',
        clearance: 'Archived',
        title: 'Competitions and projects',
        subtitle: 'Three records',
        meta: [
          { k: 'Top / 最高', v: 'National 2nd prize' },
          { k: 'Field / 方向', v: 'Explainable RL / vision inspection / modelling' },
          { k: 'Period / 时间', v: '2024 — 2025' },
          { k: 'Status / 状态', v: 'Archived' },
        ],
        tabs: [
          {
            label: 'Abstract',
            body:
              'Aug 2024: national 2nd prize in the service-outsourcing competition (explainable RL system; algorithm ' +
              'design and core code). Nov 2024: Zhejiang 3rd prize in the national mathematical modelling contest. ' +
              '2025: East China regional 3rd prize for vehicle-part defect inspection.',
          },
        ],
      },
    ],
  },
};
