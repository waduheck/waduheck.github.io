import Stat from './Stat.jsx';

export default {
  title: 'UI/Stat',
  component: Stat,
  args: { value: '180', label: 'operations' },
};

export const Single = {};
export const Strip = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-10)', flexWrap: 'wrap' }}>
      <Stat value="180" label="operations" />
      <Stat value="14" label="domains" />
      <Stat value="120" label="write ops" />
      <Stat value="44" label="destructive" />
      <Stat value="180" label="MCP tools" />
    </div>
  ),
};
