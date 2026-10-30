// Storybook 用的固定样例数据：组件不依赖业务内容。
export const workSample = {
  index: '01',
  title: 'One contract, three tool surfaces',
  body:
    'A single TypeSpec source generates the REST routes, the MCP tool list and the CLI commands for every ' +
    'declared operation. Each operation declares whether it writes, whether it is destructive and which ' +
    'scope it needs, so the surface an agent may touch is derived from the contract.',
  stats: [
    { value: '180', label: 'operations' },
    { value: '14', label: 'domains' },
    { value: '120', label: 'write ops' },
    { value: '44', label: 'destructive' },
    { value: '180', label: 'MCP tools' },
  ],
};

export const workSampleShort = {
  index: '02',
  title: 'Differential oracles for a rebuilt ERP',
  body:
    'Expected behaviour was captured from the reference system and frozen as an executable oracle, so ' +
    '"does it behave the same" became a machine-checkable regression.',
  stats: [
    { value: '73', label: 'oracles' },
    { value: '10', label: 'domains' },
  ],
};

export const heroSample = {
  eyebrow: 'Portfolio — 2026',
  name: 'Yihao (Ethan) Wang',
  role: 'Software engineer · LLM agent infrastructure',
  tagline:
    'I build reliable LLM agents: contract-defined tool surfaces, executable oracles, and release gates ' +
    'that can actually reject them.',
  links: [{ label: 'GitHub', href: 'https://github.com/waduheck' }],
};
