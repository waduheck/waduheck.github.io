import Reveal from './Reveal.jsx';
import Prose from './Prose.jsx';

export default {
  title: 'UI/Reveal',
  component: Reveal,
};

// 刷新故事面板即可看到错开入场；delay 由 --d 驱动
export const Stagger = {
  render: () => (
    <div>
      {[0, 1, 2, 3].map((i) => (
        <Reveal key={i} delay={i * 70} style={{ paddingBlock: 'var(--space-4)' }}>
          <Prose>Item {i + 1} — delay {i * 70}ms</Prose>
        </Reveal>
      ))}
    </div>
  ),
};
