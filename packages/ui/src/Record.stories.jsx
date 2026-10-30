import Record from './Record.jsx';

const RECORD = {
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
    { label: '概述', body: '同一份 TypeSpec 源文件，为每个已声明的操作同时生成 REST 路由、MCP 工具清单和 CLI 命令。每个操作都标明是否写、是否有破坏性、需要哪一档权限。' },
    { label: '细节', body: '180 个已声明操作里，120 个会写、44 个有破坏性；另有 62 条手写历史路由被单独标记。' },
  ],
};

const UI = { back: '返回索引', total: '共', tabsLabel: '标签页' };

export default {
  title: 'Site/Record',
  component: Record,
  args: { record: RECORD, ui: UI, onClose: () => {} },
};

export const Abstract = {};

// 正文为空的标签页会交给 renderVisual（真实站点里是 C4 图）
export const WithVisual = {
  args: {
    record: {
      ...RECORD,
      tabs: [{ label: '概述', body: '看右边的可视区。' }, { label: '架构', body: '' }],
    },
    renderVisual: (r, i) =>
      r.tabs[i].body === '' ? (
        <div style={{ padding: 'var(--space-8)', border: '1px solid var(--line)' }}>C4 diagram mounts here</div>
      ) : null,
  },
};
