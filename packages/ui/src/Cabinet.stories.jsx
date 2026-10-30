import Cabinet from './Cabinet.jsx';

const COLUMNS = [
  { key: 'system', label: '系统' },
  { key: 'work', label: '作品' },
  { key: 'job', label: '工作' },
  { key: 'edu', label: '教育' },
  { key: 'award', label: '奖项' },
];

const RECORDS = [
  { id: 'X-01', col: 'system', title: '多租户协作平台', subtitle: '任务图 / 文档 / 会议' },
  { id: 'X-02', col: 'work', title: '一份契约，三种工具面', subtitle: 'TypeSpec → REST / MCP / CLI' },
  { id: 'X-03', col: 'work', title: '重建 ERP 的差分 oracle', subtitle: '机器判定像不像' },
  { id: 'X-04', col: 'work', title: 'Agent 改不动的评估框架', subtitle: '黄金用例 + 标准答案' },
  { id: 'X-05', col: 'work', title: '交付基础设施', subtitle: 'k3s / ArgoCD' },
  { id: 'X-06', col: 'job', title: '元序科技', subtitle: '软件工程师' },
  { id: 'X-07', col: 'job', title: '浙江绿洲制冷', subtitle: '程序员' },
  { id: 'X-08', col: 'job', title: '虹软科技 ArcSoft', subtitle: '算法实习生' },
  { id: 'X-09', col: 'edu', title: '杭州电子科技大学', subtitle: '计算机 / 工学学士' },
  { id: 'X-10', col: 'award', title: '竞赛与项目', subtitle: '三条记录' },
];

export default {
  title: 'Site/Cabinet',
  component: Cabinet,
  args: {
    columns: COLUMNS,
    records: RECORDS,
    hint: '点任意一张档案直接读取 ／ ESC 返回',
    onOpen: () => {},
  },
};

export const FiveDrawers = {};

// 只有两列时抽屉自动等分
export const TwoDrawers = {
  args: { columns: COLUMNS.slice(0, 2), records: RECORDS.filter((r) => r.col === 'system' || r.col === 'work') },
};
