import '@portfolio/tokens/css';
import '../packages/ui/src/editorial.css';
import '../src/style.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: { expanded: false },
    docs: { toc: true },
  },
  decorators: [
    (Story) => (
      <div className="sb-canvas">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
