import Archive from './Archive.jsx';

const ITEMS = [
  { id: 'X-01', kind: '系统', title: '多租户协作平台', subtitle: '任务图 / 文档 / 会议' },
  { id: 'X-02', kind: '作品', title: '一份契约，三种工具面', subtitle: 'TypeSpec → REST / MCP / CLI' },
  { id: 'X-03', kind: '作品', title: '重建 ERP 的差分 oracle', subtitle: '机器判定像不像' },
  { id: 'X-04', kind: '作品', title: 'Agent 改不动的评估框架', subtitle: '黄金用例 + 标准答案' },
  { id: 'X-05', kind: '作品', title: '交付基础设施', subtitle: 'k3s / ArgoCD' },
  { id: 'X-06', kind: '工作', title: '元序科技', subtitle: '软件工程师' },
  { id: 'X-07', kind: '工作', title: '浙江绿洲制冷', subtitle: '程序员' },
  { id: 'X-08', kind: '工作', title: '虹软科技 ArcSoft', subtitle: '算法实习生' },
  { id: 'X-09', kind: '教育', title: '杭州电子科技大学', subtitle: '计算机 / 工学学士' },
  { id: 'X-10', kind: '奖项', title: '竞赛与项目', subtitle: '三条记录' },
];

export default {
  title: 'Site/Archive',
  component: Archive,
  args: {
    items: ITEMS,
    hint: '← → 换档 ／ ENTER 读取 ／ 拖动或横向滑动',
    openLabel: '读取档案',
    onOpen: () => {},
  },
};

export const Browser = {};
export const TwoRecords = { args: { items: ITEMS.slice(0, 2) } };
