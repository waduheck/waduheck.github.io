import Archive from './Archive.jsx';

const ITEMS = [
  { kind: 'edu', period: '2022.09 — 2026.06', title: '杭州电子科技大学', role: '计算机科学与技术 / 工学学士', note: 'GPA 82.10 / 100' },
  { kind: 'award', period: '2024.08', title: '中国大学生服务外包创新创业大赛', role: '全国二等奖 / 企业命题类', note: '可解释强化学习系统：级联双软决策树蒸馏 + MoCo 动量对比。' },
  { kind: 'award', period: '2024.11', title: '全国大学生数学建模竞赛', role: '浙江省三等奖', note: '本科组，三人队。' },
  { kind: 'work', period: '2025.03', title: '虹软科技 ArcSoft', role: '算法实习生', note: '用 LLM 解析工单流转并自动执行复现脚本。' },
  { kind: 'award', period: '2025', title: '中国大学生服务外包创新创业大赛', role: '东部区域赛三等奖', note: '车辆零部件表面缺陷视觉检测。' },
  { kind: 'work', period: '2026.06 — 2026.08', title: '浙江绿洲制冷设备有限公司', role: '程序员', note: '台州 / 工厂数字化。' },
  { kind: 'work', period: '2026.09 — 至今', title: '元序科技', role: '软件工程师', note: '远程 / 多租户团队协作平台。' },
];

const KINDS = { edu: '教育', award: '奖项', work: '工作' };

export default {
  title: 'Work/Archive',
  component: Archive,
  args: {
    items: ITEMS,
    kinds: KINDS,
    hint: '左右拖动或按 ← → 换档；回车抽取一份，Esc 归位。',
    closeLabel: '归位',
  },
};

export const Array = {};

// 只有两份时阵列仍要首尾相接
export const TwoRecords = { args: { items: [ITEMS[0], ITEMS[6]] } };

// 只有一份时不显示刻度，也不该崩
export const SingleRecord = { args: { items: [ITEMS[6]] } };
