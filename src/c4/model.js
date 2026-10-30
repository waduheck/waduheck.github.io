// BitOA 的 C4 模型。元素和关系都来自 KKparty/bitlogue 代码（2026-10 核对）。
// 坐标是元素中心点；两层共用同一画布尺寸，缩放动画才能对齐。
// 发布前：客户名、内网地址不要写进来。

export const SIZE = {
  person: { w: 200, h: 96 },
  system: { w: 360, h: 170 },
  container: { w: 230, h: 118 },
  store: { w: 200, h: 100 },
  external: { w: 210, h: 90 },
};

export const typeLine = (e) =>
  ({
    person: '[Person]',
    system: '[Software System]',
    external: '[External System]',
    container: `[Container: ${e.tech}]`,
    store: `[Data Store: ${e.tech}]`,
  })[e.kind];

const people = [
  { id: 'member', kind: 'person', name: 'Team member', desc: 'Chats, plans tasks, joins meetings', x: 330, y: 100 },
  { id: 'agentUser', kind: 'person', name: 'Agent user', desc: 'Uses Claude / Codex on their own machine', x: 880, y: 100 },
];

const externals = [
  { id: 'llm', kind: 'external', name: 'LLM gateway', desc: 'OpenAI-compatible model API', x: 180, y: 760 },
  { id: 'livekit', kind: 'external', name: 'LiveKit', desc: 'Meeting audio / video server', x: 460, y: 760 },
  { id: 'push', kind: 'external', name: 'Push services', desc: 'APNs · FCM · Web Push', x: 740, y: 760 },
  { id: 'aliyun', kind: 'external', name: 'Aliyun', desc: 'Speech-to-text (Bailian) · SMS', x: 1020, y: 760 },
];

export const levels = {
  context: {
    id: 'context',
    title: 'System Context diagram for BitOA',
    subtitle: 'Level 1 · who uses the platform and what it depends on',
    view: [1200, 900],
    elements: [
      ...people,
      {
        id: 'bitoa', kind: 'system', name: 'BitOA', zoom: true,
        desc: 'Team collaboration platform: chat, task graph, docs, calendar, meetings, ledger and an embedded agent',
        x: 600, y: 420,
      },
      ...externals,
    ],
    relations: [
      { from: 'member', to: 'bitoa', label: 'Works in', tech: 'iOS · Android · desktop · web' },
      { from: 'agentUser', to: 'bitoa', label: 'Calls tools', tech: 'MCP' },
      { from: 'member', to: 'livekit', label: 'Streams media', tech: 'WebRTC', via: { x: 345, y: 640 } },
      { from: 'bitoa', to: 'llm', label: 'Runs agent turns', tech: 'OpenAI-compatible', t: 0.82 },
      { from: 'bitoa', to: 'push', label: 'Sends notifications', tech: 'HTTPS', t: 0.55 },
      { from: 'bitoa', to: 'aliyun', label: 'Transcribes, sends SMS', tech: 'HTTPS', t: 0.6 },
    ],
  },

  container: {
    id: 'container',
    title: 'Container diagram for BitOA',
    subtitle: 'Level 2 · the apps and data stores inside the platform, and how they talk',
    view: [1200, 900],
    boundary: { x: 60, y: 175, w: 1080, h: 425, name: 'BitOA', type: '[Software System]' },
    elements: [
      ...people,
      {
        id: 'client', kind: 'container', name: 'Client app', w: 270, h: 130,
        tech: 'React Native · react-native-web · Expo · Tauri 2',
        desc: 'One codebase for iOS, Android, desktop and web',
        x: 330, y: 285,
      },
      {
        id: 'bridge', kind: 'container', name: 'Local MCP bridge', w: 220,
        tech: 'Node · MCP stdio',
        desc: 'Wraps the REST API as MCP tools for local agents',
        x: 1000, y: 285,
      },
      {
        id: 'api', kind: 'container', name: 'API server', w: 380, h: 150,
        tech: 'Node 24 · Fastify 5 · TypeScript',
        desc: 'Modular monolith (chat, tasks, files, fund, team, events). REST, WebSocket, remote MCP endpoint, embedded agent on agent-kit',
        x: 600, y: 480,
      },
      { id: 'db', kind: 'store', name: 'Database', tech: 'SQLite', desc: 'Messages, task graph, ledger', x: 210, y: 480 },
      { id: 'blobs', kind: 'store', name: 'Blob store', tech: 'Filesystem', desc: 'Attachments, meeting recordings', x: 990, y: 480 },
      ...externals,
    ],
    relations: [
      { from: 'member', to: 'client', label: 'Works in', tech: 'iOS · Android · desktop · web' },
      { from: 'agentUser', to: 'api', label: 'Calls tools', tech: 'MCP Streamable HTTP', t: 0.35 },
      { from: 'agentUser', to: 'bridge', label: 'Calls tools', tech: 'MCP · stdio' },
      { from: 'client', to: 'api', label: 'Reads & writes', tech: 'REST + WebSocket' },
      { from: 'bridge', to: 'api', label: 'Forwards calls', tech: 'REST · personal token' },
      { from: 'api', to: 'db', label: 'Reads & writes', tech: 'node:sqlite', lw: 110 },
      { from: 'api', to: 'blobs', label: 'Stores files', tech: 'filesystem', lw: 110 },
      { from: 'client', to: 'livekit', label: 'Streams media', tech: 'WebRTC', via: { x: 400, y: 660 } },
      { from: 'api', to: 'llm', label: 'Runs agent turns', tech: 'OpenAI-compatible', t: 0.82 },
      { from: 'api', to: 'push', label: 'Sends notifications', tech: 'APNs · FCM · Web Push' },
      { from: 'api', to: 'aliyun', label: 'Transcribes, sends SMS', tech: 'HTTPS', t: 0.55 },
    ],
  },
};
