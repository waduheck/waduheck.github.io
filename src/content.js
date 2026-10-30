// 页面文案与数字的唯一来源。组件里不写内容。
//
// 数字口径（2026-10-30 从代码/契约实测，不是估算）：
//   180 ops   = 契约生成物 openapi.json 里带声明标记的操作数
//   120 / 44  = 同一文件里每个操作 write / destructive 标记的统计
//   180 MCP   = 带 MCP 标记的操作数（与 CLI 命令一一对应）
//   73 oracles= 差分 oracle 文件数，覆盖 10 个业务域
//   7 cases   = policy 3 + assistant 4 的黄金用例
// 发布前：产品名、客户名、内网地址、仓库路径都不要写进来。

export const profile = {
  eyebrow: 'Portfolio — 2026',
  name: 'Yihao (Ethan) Wang',
  role: 'Software engineer · LLM agent infrastructure',
  tagline:
    'I build reliable LLM agents. One contract defines the tools an agent may call; executable oracles and ' +
    'release gates decide whether what it wrote is allowed to ship.',
  links: [
    // TODO：换成一个愿意公开的邮箱（建议单独申请，不要用 QQ）
    // { label: 'Email', href: 'mailto:TODO@example.com' },
    { label: 'GitHub', href: 'https://github.com/waduheck' },
    // TODO：CV 放进 public/cv.pdf 之后打开
    // { label: 'CV', href: 'cv.pdf' },
  ],
};

export const sections = {
  work: {
    index: '01',
    title: 'Selected work',
    kicker:
      'Four pieces, all running in production. Every number below is read from the generated contract or the ' +
      'repository, not estimated.',
  },
  system: {
    index: '02',
    title: 'System architecture',
    kicker: 'C4 model of the platform this work lives in. Click the system box to zoom into its containers.',
  },
  education: {
    index: '03',
    title: 'Education',
  },
};

export const works = [
  {
    id: 'contract',
    title: 'One contract, three tool surfaces',
    body:
      'A single TypeSpec source generates the REST routes, the MCP tool list and the CLI commands for every ' +
      'declared operation. Each operation states whether it writes, whether it is destructive and which scope ' +
      'it needs, so the surface an agent is allowed to touch is derived from the contract instead of being ' +
      'maintained by hand. Hand-written legacy routes are counted separately, which turns contract drift into ' +
      'a visible diff rather than a surprise.',
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
      'captured from the reference system with test data and frozen as an executable oracle — inputs, actions, ' +
      'expected numbers, unchanged. "Does the reimplementation behave the same" became a machine-checkable ' +
      'regression instead of two screens compared by eye.',
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
      'writes a per-case report. A prompt or model change is accepted or rejected on measured pass rate, not on ' +
      'a demo that happened to look right.',
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
      'A modular monolith shipped as one process and deployed by GitOps on k3s with ArgoCD: a release advances ' +
      'by a single image-tag commit and rolls back automatically when the post-deploy check fails. Self-hosted ' +
      'GitHub Actions runners, and a release gate that runs core-path smoke on every version before it ships.',
    stats: [
      { value: '9', label: 'apps' },
      { value: '1', label: 'commit per release' },
      { value: 'auto', label: 'rollback on failed check' },
    ],
  },
];

export const education = [
  { degree: 'B.Eng. in Computer Science', school: 'Hangzhou Dianzi University', year: '2026' },
];
