import Timeline from './Timeline.jsx';

const ITEMS = [
  {
    period: '2022.09 — 2026.06',
    from: '2022-09',
    to: '2026-06',
    title: '杭州电子科技大学',
    role: '计算机科学与技术 · 工学学士',
    note: 'GPA 82.10 / 100',
  },
  {
    period: '2025',
    from: '2025-03',
    title: '虹软科技 ArcSoft',
    role: '算法实习生',
    note: '用 LLM 解析工单流转并自动执行复现脚本；实习期内获破格晋升',
  },
  {
    period: '2026.06 — 2026.08',
    from: '2026-06',
    to: '2026-08',
    title: '浙江绿洲制冷设备有限公司',
    role: '程序员',
    note: '台州 · 工厂数字化：WMS 数据库、ERP 物料主数据、生产与在制报表',
  },
  {
    period: '2026.09 — 至今',
    from: '2026-09',
    current: true,
    title: '元序科技',
    role: '软件工程师',
    note: '远程 · 多租户团队协作平台：任务图、文档、会议、台账，以及内嵌的 Agent',
  },
];

const AWARDS = [
  { at: '2024-08', period: '2024.08', text: '中国大学生服务外包创新创业大赛 · 全国二等奖（企业命题类）' },
  { at: '2024-11', period: '2024.11', text: '全国大学生数学建模竞赛 · 浙江省三等奖' },
  { at: '2025-06', period: '2025', text: '中国大学生服务外包创新创业大赛 · 东部区域赛三等奖' },
];

export default {
  title: 'Work/Timeline',
  component: Timeline,
  args: { items: ITEMS, awardsLabel: '奖项', awards: AWARDS },
};

export const Full = {};

export const NoAwards = { args: { awards: [] } };

// 只有一条：横轴仍然按数据自动定域，不会退化成零宽
export const SingleEntry = { args: { items: [ITEMS[3]], awards: [] } };
