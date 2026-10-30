// C4 模型：一个多租户协作平台。元素和关系都来自代码核对（2026-10），已脱敏。
// 结构（坐标、连线、技术栈）只有一份；所有文字按语言查 TEXT。
// 坐标是元素中心点；两层共用同一画布尺寸，缩放动画才能对齐。
// 发布前：产品名、客户名、内网地址、仓库路径都不要写进来。

export const SIZE = {
  person: { w: 200, h: 96 },
  system: { w: 360, h: 170 },
  container: { w: 230, h: 118 },
  store: { w: 200, h: 100 },
  external: { w: 210, h: 90 },
};

const KIND_WORD = {
  en: {
    person: '[Person]',
    system: '[Software System]',
    external: '[External System]',
    container: (t) => `[Container: ${t}]`,
    store: (t) => `[Data Store: ${t}]`,
  },
  zh: {
    person: '[人]',
    system: '[软件系统]',
    external: '[外部系统]',
    container: (t) => `[容器: ${t}]`,
    store: (t) => `[数据存储: ${t}]`,
  },
};

export const typeLine = (e, locale = 'en') => {
  const w = KIND_WORD[locale] ?? KIND_WORD.en;
  const v = w[e.kind];
  return typeof v === 'function' ? v(e.tech) : v;
};

// 结构层：与语言无关
const ELEMENTS = {
  member: { kind: 'person', x: 330, y: 100 },
  agentUser: { kind: 'person', x: 880, y: 100 },
  platform: { kind: 'system', x: 600, y: 420, zoom: true },
  llm: { kind: 'external', x: 180, y: 760 },
  livekit: { kind: 'external', x: 460, y: 760 },
  push: { kind: 'external', x: 740, y: 760 },
  aliyun: { kind: 'external', x: 1020, y: 760 },
  client: {
    kind: 'container',
    x: 330,
    y: 285,
    w: 270,
    h: 130,
    tech: 'React Native · react-native-web · Expo · Tauri 2',
  },
  bridge: { kind: 'container', x: 1000, y: 285, w: 220, tech: 'Node · MCP stdio' },
  api: { kind: 'container', x: 600, y: 480, w: 380, h: 150, tech: 'Node 24 · Fastify 5 · TypeScript' },
  db: { kind: 'store', x: 210, y: 480, tech: 'SQLite' },
  blobs: { kind: 'store', x: 990, y: 480, tech: 'Filesystem' },
};

const CONTEXT_ELEMENTS = ['member', 'agentUser', 'platform', 'llm', 'livekit', 'push', 'aliyun'];
const CONTAINER_ELEMENTS = [
  'member',
  'agentUser',
  'client',
  'bridge',
  'api',
  'db',
  'blobs',
  'llm',
  'livekit',
  'push',
  'aliyun',
];

const CONTEXT_RELATIONS = [
  { from: 'member', to: 'platform', tech: 'iOS · Android · desktop · web' },
  { from: 'agentUser', to: 'platform', tech: 'MCP' },
  { from: 'member', to: 'livekit', tech: 'WebRTC', via: { x: 345, y: 640 } },
  { from: 'platform', to: 'llm', tech: 'OpenAI-compatible', t: 0.82 },
  { from: 'platform', to: 'push', tech: 'HTTPS', t: 0.55 },
  { from: 'platform', to: 'aliyun', tech: 'HTTPS', t: 0.6 },
];

const CONTAINER_RELATIONS = [
  { from: 'member', to: 'client', tech: 'iOS · Android · desktop · web' },
  { from: 'agentUser', to: 'api', tech: 'MCP Streamable HTTP', t: 0.35 },
  { from: 'agentUser', to: 'bridge', tech: 'MCP · stdio' },
  { from: 'client', to: 'api', tech: 'REST + WebSocket' },
  { from: 'bridge', to: 'api', tech: 'REST · personal token' },
  { from: 'api', to: 'db', tech: 'node:sqlite', lw: 110 },
  { from: 'api', to: 'blobs', tech: 'filesystem', lw: 110 },
  { from: 'client', to: 'livekit', tech: 'WebRTC', via: { x: 400, y: 660 } },
  { from: 'api', to: 'llm', tech: 'OpenAI-compatible', t: 0.82 },
  { from: 'api', to: 'push', tech: 'APNs · FCM · Web Push' },
  { from: 'api', to: 'aliyun', tech: 'HTTPS', t: 0.55 },
];

// 文字层：按语言
const TEXT = {
  en: {
    boundary: 'Team platform',
    boundaryType: '[Software System]',
    zoomHint: 'click to zoom in ⤢',
    buttons: { context: '1 · Context', container: '2 · Containers', components: '3 · Components' },
    levels: {
      context: {
        title: 'System Context diagram — team collaboration platform',
        subtitle: 'Level 1 · who uses the platform and what it depends on',
      },
      container: {
        title: 'Container diagram — team collaboration platform',
        subtitle: 'Level 2 · the apps and data stores inside the platform, and how they talk',
      },
    },
    elements: {
      member: { name: 'Team member', desc: 'Chats, plans tasks, joins meetings' },
      agentUser: { name: 'Agent user', desc: 'Uses Claude / Codex on their own machine' },
      platform: {
        name: 'Team platform',
        desc: 'Team collaboration platform: chat, task graph, docs, calendar, meetings, ledger and an embedded agent',
      },
      llm: { name: 'LLM gateway', desc: 'OpenAI-compatible model API' },
      livekit: { name: 'LiveKit', desc: 'Meeting audio / video server' },
      push: { name: 'Push services', desc: 'APNs · FCM · Web Push' },
      aliyun: { name: 'Aliyun', desc: 'Speech-to-text (Bailian) · SMS' },
      client: { name: 'Client app', desc: 'One codebase for iOS, Android, desktop and web' },
      bridge: { name: 'Local MCP bridge', desc: 'Wraps the REST API as MCP tools for local agents' },
      api: {
        name: 'API server',
        desc: 'Modular monolith (chat, tasks, files, fund, team, events). REST, WebSocket, remote MCP endpoint, embedded agent on agent-kit',
      },
      db: { name: 'Database', desc: 'Messages, task graph, ledger' },
      blobs: { name: 'Blob store', desc: 'Attachments, meeting recordings' },
    },
    relations: {
      'member>platform': 'Works in',
      'agentUser>platform': 'Calls tools',
      'member>livekit': 'Streams media',
      'platform>llm': 'Runs agent turns',
      'platform>push': 'Sends notifications',
      'platform>aliyun': 'Transcribes, sends SMS',
      'member>client': 'Works in',
      'agentUser>api': 'Calls tools',
      'agentUser>bridge': 'Calls tools',
      'client>api': 'Reads & writes',
      'bridge>api': 'Forwards calls',
      'api>db': 'Reads & writes',
      'api>blobs': 'Stores files',
      'client>livekit': 'Streams media',
      'api>llm': 'Runs agent turns',
      'api>push': 'Sends notifications',
      'api>aliyun': 'Transcribes, sends SMS',
    },
    legend: {
      person: 'Person',
      system: 'Software system in scope',
      container: 'Container (app / service)',
      store: 'Data store',
      external: 'External system',
      boundary: 'System boundary',
      relation: 'Relationship [technology]; moving dots show direction',
    },
  },

  zh: {
    boundary: '团队平台',
    boundaryType: '[软件系统]',
    zoomHint: '点击放大 ⤢',
    buttons: { context: '1 · 上下文', container: '2 · 容器', components: '3 · 组件' },
    levels: {
      context: {
        title: '系统上下文图 —— 团队协作平台',
        subtitle: '第 1 层 · 谁在用这个平台，它依赖什么',
      },
      container: {
        title: '容器图 —— 团队协作平台',
        subtitle: '第 2 层 · 平台内部的应用与数据存储，以及它们之间怎么通信',
      },
    },
    elements: {
      member: { name: '团队成员', desc: '聊天、规划任务、参加会议' },
      agentUser: { name: 'Agent 用户', desc: '在自己的电脑上用 Claude / Codex' },
      platform: {
        name: '团队平台',
        desc: '团队协作平台：聊天、任务图、文档、日历、会议、资金台账，内嵌 Agent',
      },
      llm: { name: '模型网关', desc: 'OpenAI 兼容的模型 API' },
      livekit: { name: 'LiveKit', desc: '会议音视频服务器' },
      push: { name: '推送服务', desc: 'APNs · FCM · Web Push' },
      aliyun: { name: '阿里云', desc: '语音转写（百炼）· 短信' },
      client: { name: '客户端', desc: '一套代码覆盖 iOS、Android、桌面和网页' },
      bridge: { name: '本地 MCP 桥', desc: '把 REST API 包成本地 Agent 可用的 MCP 工具' },
      api: {
        name: 'API 服务',
        desc: '模块化单体（聊天、任务、文件、台账、团队、事件）。REST、WebSocket、远程 MCP 端点，内嵌跑在 agent-kit 上的 Agent',
      },
      db: { name: '数据库', desc: '消息、任务图、台账' },
      blobs: { name: '文件存储', desc: '附件、会议录制' },
    },
    relations: {
      'member>platform': '使用',
      'agentUser>platform': '调用工具',
      'member>livekit': '推流',
      'platform>llm': '跑 Agent 轮次',
      'platform>push': '发通知',
      'platform>aliyun': '转写、发短信',
      'member>client': '使用',
      'agentUser>api': '调用工具',
      'agentUser>bridge': '调用工具',
      'client>api': '读写',
      'bridge>api': '转发调用',
      'api>db': '读写',
      'api>blobs': '存文件',
      'client>livekit': '推流',
      'api>llm': '跑 Agent 轮次',
      'api>push': '发通知',
      'api>aliyun': '转写、发短信',
    },
    legend: {
      person: '人',
      system: '范围内的软件系统',
      container: '容器（应用 / 服务）',
      store: '数据存储',
      external: '外部系统',
      boundary: '系统边界',
      relation: '关系 [技术]；移动的点表示方向',
    },
  },
};

const buildElements = (ids, t) =>
  ids.map((id) => ({ id, ...ELEMENTS[id], ...t.elements[id] }));

const buildRelations = (list, t) =>
  list.map((r) => ({ ...r, label: t.relations[`${r.from}>${r.to}`] ?? '' }));

export function getText(locale) {
  return TEXT[locale] ?? TEXT.en;
}

export function getLevels(locale = 'en') {
  const t = getText(locale);
  return {
    context: {
      id: 'context',
      title: t.levels.context.title,
      subtitle: t.levels.context.subtitle,
      view: [1200, 900],
      elements: buildElements(CONTEXT_ELEMENTS, t),
      relations: buildRelations(CONTEXT_RELATIONS, t),
    },
    container: {
      id: 'container',
      title: t.levels.container.title,
      subtitle: t.levels.container.subtitle,
      view: [1200, 900],
      boundary: { x: 60, y: 175, w: 1080, h: 425, name: t.boundary, type: t.boundaryType },
      elements: buildElements(CONTAINER_ELEMENTS, t),
      relations: buildRelations(CONTAINER_RELATIONS, t),
    },
  };
}
