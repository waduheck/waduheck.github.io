import Hero from './Hero.jsx';
import { heroSample } from './fixtures.js';

export default {
  title: 'UI/Hero',
  component: Hero,
  args: heroSample,
  argTypes: {
    links: { control: 'object' },
  },
};

export const Default = {};

// 短标语版：验证 display 字号在更短的行里仍然立得住
export const ShortTagline = {
  args: { tagline: 'Reliable LLM agents, measured.', role: undefined },
};
