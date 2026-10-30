// 所有文案与数字的唯一来源，按语言分组。组件里不写内容。
//
// 数字口径（2026-10-30 从代码/契约实测，不是估算）：
//   180 ops   = 契约生成物 openapi.json 里带声明标记的操作数
//   120 / 44  = 同一文件里每个操作 write / destructive 标记的统计
//   180 MCP   = 带 MCP 标记的操作数（与 CLI 命令一一对应）
//   73 oracles= 差分 oracle 文件数，覆盖 10 个业务域
//   7 cases   = policy 3 + assistant 4 的黄金用例
// 发布前：产品名、客户名、内网地址、仓库路径都不要写进来。

const links = [
  // TODO：换成一个愿意公开的邮箱（建议单独申请，不要用 QQ）
  // { label: 'Email', href: 'mailto:TODO@example.com' },
  { label: 'GitHub', href: 'https://github.com/waduheck' },
  // TODO：CV 放进 public/cv.pdf 之后打开
  // { label: 'CV', href: 'cv.pdf' },
];

export const copy = {
  zh: {
    meta: {
      title: '王逸浩 / 软件工程师',
      description:
        '王逸浩（Ethan）——可靠的 LLM Agent：契约定义的工具体系、可执行的 oracle、能真的拦下改动的发布闸门。',
      ogTitle: '王逸浩 / 软件工程师',
      ogDescription: '契约定义的工具体系、差分 oracle、能真的拦下改动的发布闸门。',
      ogLocale: 'zh_CN',
    },
    profile: {
      eyebrow: '作品集 — 2026',
      name: '王逸浩',
      role: '软件工程师 / LLM Agent 基础设施',
      tagline:
        '我做可靠的 LLM Agent。用一份契约定义它可调用的工具；用可执行的 oracle 和发布闸门，' +
        '决定它写出来的东西能不能上线。',
      links,
    },
    sections: {
      work: {
        index: '01',
        title: '代表作品',
        kicker: '四个都在生产上跑着。下面的数字都是从契约生成物或仓库里读出来的，不是估算。',
      },
      system: {
        index: '02',
        title: '系统架构',
        kicker: '这套作品所在平台的 C4 模型。点中间的方框可以放大看里面的容器。',
      },
      timeline: {
        index: '03',
        title: '时间线',
        kicker: '七份档案，按时间排开，循环的。拖一拖，或者按方向键。',
      },
    },
    works: [
      {
        id: 'contract',
        title: '一份契约，三种工具面',
        body:
          '同一份 TypeSpec 源文件，为每个已声明的操作同时生成 REST 路由、MCP 工具清单和 CLI 命令。每个操作都' +
          '标明是否写、是否有破坏性、需要哪一档权限，所以 Agent 能碰到的面是从契约推导出来的，而不是靠人手维护。' +
          '手写的历史路由单独计数，契约漂移就变成一处能 diff 的差异，而不是惊喜。',
        stats: [
          { value: '180', label: '操作' },
          { value: '14', label: '业务域' },
          { value: '120', label: '写操作' },
          { value: '44', label: '破坏性' },
          { value: '180', label: 'MCP 工具' },
        ],
      },
      {
        id: 'oracles',
        title: '重建 ERP 的差分 oracle',
        body:
          '把一个生产在用的工厂 ERP 从外部重建。每个模块的期望行为都用测试数据从参照系统里录下来，冻成可执行的 ' +
          'oracle——输入、动作、期望数字，一字不改。「重建版行为是否一致」于是变成可机器判定的回归，而不是两个人' +
          '对着两块屏幕比。',
        stats: [
          { value: '73', label: 'oracle' },
          { value: '10', label: '业务域' },
        ],
      },
      {
        id: 'eval',
        title: 'Agent 改不动的评估框架',
        body:
          '黄金用例加一份显式的标准答案文件，驱动助手和策略检查器；每跑一次就写一份逐用例报告。提示词或模型一改，' +
          '是靠实测通过率决定收还是不收，而不是看一次演示碰巧对上了。',
        stats: [
          { value: '7', label: '黄金用例' },
          { value: '3', label: '评估对象' },
          { value: '1', label: '每轮一份报告' },
        ],
      },
      {
        id: 'delivery',
        title: '交付基础设施',
        body:
          '模块化单体，一个进程发出去，用 k3s + ArgoCD 做 GitOps：推进一次发版就是提交一个镜像 tag，上线后的检查' +
          '不通过会自动回滚。自建的 GitHub Actions runner，加上每个版本上线前必跑核心路径冒烟的发版闸门。',
        stats: [
          { value: '9', label: '应用' },
          { value: '1', label: '每次发版一次提交' },
          { value: '自动', label: '检查失败即回滚' },
        ],
      },
    ],
    archive: [
      { kind: 'edu', period: '2022.09 — 2026.06', title: '杭州电子科技大学', role: '计算机科学与技术 / 工学学士', note: 'GPA 82.10 / 100' },
      { kind: 'award', period: '2024.08', title: '服务外包创新创业大赛 / 全国赛', role: '国家级二等奖 / 企业命题类', note: '可解释强化学习系统：级联双软决策树蒸馏 + MoCo 动量对比，Breakout 上策略精度 99%。' },
      { kind: 'award', period: '2024.11', title: '全国大学生数学建模竞赛', role: '浙江省三等奖', note: '本科组，三人队。' },
      { kind: 'work', period: '2025.03', title: '虹软科技 ArcSoft', role: '算法实习生', note: '用 LLM 解析工单流转并自动执行复现脚本；实习期内获破格晋升。' },
      { kind: 'award', period: '2025', title: '服务外包创新创业大赛 / 东部区域赛', role: '三等奖', note: '车辆零部件表面缺陷视觉检测系统。' },
      { kind: 'work', period: '2026.06 — 2026.08', title: '浙江绿洲制冷设备有限公司', role: '程序员', note: '台州 / 工厂数字化：WMS 数据库、ERP 物料主数据、生产与在制报表。' },
      { kind: 'work', period: '2026.09 — 至今', title: '元序科技', role: '软件工程师', note: '远程 / 多租户团队协作平台：任务图、文档、会议、台账，以及内嵌的 Agent。' },
    ],
    archiveKinds: { edu: '教育', award: '奖项', work: '工作' },
    archiveHint: '2022 → 2026 · 左右拖动或按 ← → 换档；回车抽取一份，Esc 归位。',
    archiveClose: '归位',
    footer: '设计令牌驱动 / Storybook 组件库',
    ui: { language: '语言', contact: '联系方式' },
  },

  en: {
    meta: {
      title: 'Yihao (Ethan) Wang — Software engineer',
      description:
        'Yihao (Ethan) Wang — reliable LLM agents: contract-defined tool surfaces, executable oracles, and ' +
        'release gates that can actually reject them.',
      ogTitle: 'Yihao (Ethan) Wang — reliable LLM agents',
      ogDescription:
        'Contract-defined tool surfaces, differential oracles, and release gates that can actually reject them.',
      ogLocale: 'en_US',
    },
    profile: {
      eyebrow: 'Portfolio — 2026',
      name: 'Yihao (Ethan) Wang',
      role: 'Software engineer / LLM agent infrastructure',
      tagline:
        'I build reliable LLM agents. One contract defines the tools an agent may call; executable oracles and ' +
        'release gates decide whether what it wrote is allowed to ship.',
      links,
    },
    sections: {
      work: {
        index: '01',
        title: 'Selected work',
        kicker:
          'Four pieces, all running in production. Every number below is read from the generated contract or ' +
          'the repository, not estimated.',
      },
      system: {
        index: '02',
        title: 'System architecture',
        kicker:
          'C4 model of the platform this work lives in. Click the system box to zoom into its containers.',
      },
      timeline: {
        index: '03',
        title: 'Timeline',
        kicker: 'Seven records in order, looping. Drag them, or use the arrow keys.',
      },
    },
    works: [
      {
        id: 'contract',
        title: 'One contract, three tool surfaces',
        body:
          'A single TypeSpec source generates the REST routes, the MCP tool list and the CLI commands for every ' +
          'declared operation. Each operation states whether it writes, whether it is destructive and which ' +
          'scope it needs, so the surface an agent is allowed to touch is derived from the contract instead of ' +
          'being maintained by hand. Hand-written legacy routes are counted separately, which turns contract ' +
          'drift into a visible diff rather than a surprise.',
        stats: [
          { value: '180', label: 'operations' },
          { value: '14', label: 'domains' },
          { value: '120', label: 'write ops' },
          { value: '44', label: 'destructive' },
          { value: '180', label: 'MCP tools' },
        ],
      },
      {
        id: 'oracles',
        title: 'Differential oracles for a rebuilt ERP',
        body:
          'A production factory ERP was rebuilt from the outside in. For each module the expected behaviour was ' +
          'captured from the reference system with test data and frozen as an executable oracle — inputs, ' +
          'actions, expected numbers, unchanged. "Does the reimplementation behave the same" became a ' +
          'machine-checkable regression instead of two screens compared by eye.',
        stats: [
          { value: '73', label: 'oracles' },
          { value: '10', label: 'domains' },
        ],
      },
      {
        id: 'eval',
        title: 'An evaluation harness agents cannot edit',
        body:
          'Golden cases plus an explicit ground-truth file drive the assistant and the policy checker; every run ' +
          'writes a per-case report. A prompt or model change is accepted or rejected on measured pass rate, ' +
          'not on a demo that happened to look right.',
        stats: [
          { value: '7', label: 'golden cases' },
          { value: '3', label: 'eval targets' },
          { value: '1', label: 'report per run' },
        ],
      },
      {
        id: 'delivery',
        title: 'Delivery infrastructure',
        body:
          'A modular monolith shipped as one process and deployed by GitOps on k3s with ArgoCD: a release ' +
          'advances by a single image-tag commit and rolls back automatically when the post-deploy check fails. ' +
          'Self-hosted GitHub Actions runners, and a release gate that runs core-path smoke on every version ' +
          'before it ships.',
        stats: [
          { value: '9', label: 'apps' },
          { value: '1', label: 'commit per release' },
          { value: 'auto', label: 'rollback on failed check' },
        ],
      },
    ],
    archive: [
      { kind: 'edu', period: 'Sep 2022 — Jun 2026', title: 'Hangzhou Dianzi University', role: 'B.Eng. in Computer Science', note: 'GPA 82.10 / 100' },
      { kind: 'award', period: 'Aug 2024', title: 'Service Outsourcing Competition / national final', role: 'National 2nd prize / corporate track', note: 'Explainable RL system: cascaded soft decision-tree distillation with MoCo momentum contrast; 99% policy accuracy on Breakout.' },
      { kind: 'award', period: 'Nov 2024', title: 'China Undergraduate Mathematical Contest in Modelling', role: 'Zhejiang 3rd prize', note: 'Team of three.' },
      { kind: 'work', period: 'Mar 2025', title: 'ArcSoft', role: 'Algorithm intern', note: 'LLM parsing of ticket flow plus automated reproduction scripts; promoted ahead of schedule.' },
      { kind: 'award', period: '2025', title: 'Service Outsourcing Competition / East China regional', role: '3rd prize', note: 'Surface-defect vision inspection for vehicle parts.' },
      { kind: 'work', period: 'Jun 2026 — Aug 2026', title: 'Zhejiang Lvzhou Refrigeration', role: 'Programmer', note: 'Taizhou / factory digitalisation: WMS database, ERP material master, production reporting.' },
      { kind: 'work', period: 'Sep 2026 — present', title: 'Yuansu Technology', role: 'Software engineer', note: 'Remote / multi-tenant team platform: task graph, docs, meetings, ledger, embedded agent.' },
    ],
    archiveKinds: { edu: 'Education', award: 'Award', work: 'Work' },
    archiveHint: '2022 → 2026 · drag sideways or use ← →; press Enter to pull one out, Esc to put it back.',
    archiveClose: 'put back',
    footer: 'Design tokens / Storybook component library',
    ui: { language: 'Language', contact: 'Contact' },
  },
};
