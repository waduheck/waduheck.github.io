import Section from './Section.jsx';
import Prose from './Prose.jsx';

export default {
  title: 'UI/Section',
  component: Section,
  args: {
    index: '02',
    title: 'System architecture',
    kicker: 'C4 model of the platform these pieces live in. Click the system box to zoom into containers.',
  },
};

export const WithKicker = {
  render: (args) => (
    <Section {...args}>
      <Prose>Body content sits under the section head.</Prose>
    </Section>
  ),
};

export const NoKicker = {
  args: { kicker: undefined },
  render: (args) => (
    <Section {...args}>
      <Prose>Body content sits under the section head.</Prose>
    </Section>
  ),
};
