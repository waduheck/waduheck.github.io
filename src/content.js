// 主页上的文字和数字都在这里改，组件里不写内容。
//
// 数字口径（2026-10-30 从代码/契约实测，不是估算）：
//   180 ops = 契约生成物 openapi.json 里带声明标记的操作数
//   120 write / 44 destructive = 同一文件里每个操作的 write / destructive 标记
//   180 MCP tools = 带 MCP 标记的操作数（与 CLI 命令一一对应）
//   73 oracles = 差分 oracle 文件数，覆盖 10 个业务域
//
// 发布前：产品名、客户名、内网地址、仓库路径都不要写进来；下面的表述已脱敏。
// 旧数字（260 routes / 88 write / 37 irreversible / 54 oracles / 16 modules）
// 与当前契约对不上，已按实测替换，别再改回去。

export const profile = {
  name: 'Yihao (Ethan) Wang',
  // DRAFT：研究方向未最终确定，发出前确认这一句
  tagline:
    'I build reliable LLM agents — contract-defined tool surfaces, executable oracles, ' +
    'and release gates that can actually reject them.',
  links: [
    // TODO：换成一个愿意公开的邮箱（QQ 邮箱会招垃圾邮件，建议单独申请一个）
    // { label: 'Email', href: 'mailto:TODO@example.com' },
    { label: 'GitHub', href: 'https://github.com/waduheck' },
    // TODO：把 CV 放到 public/cv.pdf 之后再打开这一项
    // { label: 'CV', href: 'cv.pdf' },
  ],
};

export const works = [
  {
    title: 'One contract, three tool surfaces',
    body:
      'A single TypeSpec source generates the REST routes, the MCP tool list and the CLI commands for ' +
      'every declared operation. Each operation declares whether it writes, whether it is destructive and ' +
      'which scope it needs, so the surface an agent is allowed to touch is derived from the contract ' +
      'rather than hand-maintained. Hand-written legacy routes are counted separately, so contract drift ' +
      'shows up as a diff instead of a surprise.',
    metric: '180 operations · 14 domains · 120 write · 44 destructive · 180 MCP tools',
  },
  {
    title: 'Differential oracles for a rebuilt ERP',
    body:
      'A production factory ERP was rebuilt from the outside in. For each module the expected behaviour was ' +
      'captured from the reference system with test data and frozen as an executable oracle — inputs, ' +
      'actions, expected numbers, unchanged. "Does the reimplementation behave the same" therefore became a ' +
      'machine-checkable regression, not two screens compared by eye.',
    metric: '73 oracles · 10 domains',
  },
  {
    title: 'An evaluation harness agents cannot edit',
    body:
      'Golden cases plus an explicit ground-truth file drive the assistant and the policy checker; every run ' +
      'writes a per-case report. A prompt or model change is accepted or rejected on measured pass rate, ' +
      'not on a demo that happened to look right.',
    metric: 'policy · assistant · receipt suites, one report per run',
  },
  {
    title: 'Delivery infrastructure',
    body:
      'A modular monolith shipped as one process, deployed by GitOps on k3s with ArgoCD: a release advances ' +
      'by a single image-tag commit and rolls back automatically when the post-deploy check fails. Self-hosted ' +
      'GitHub Actions runners, and a release gate that runs core-path smoke on every version before it ships.',
    metric: '9 apps · 1 commit per release · automatic rollback',
  },
];

export const education = [
  'B.Eng. in Computer Science, Hangzhou Dianzi University, 2026',
];
