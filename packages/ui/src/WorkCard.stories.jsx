import WorkCard from './WorkCard.jsx';
import { workSample, workSampleShort } from './fixtures.js';

export default {
  title: 'Work/Card (layout B — bento)',
  component: WorkCard,
};

export const Default = { args: { ...workSampleShort } };
export const Featured = { args: { ...workSample, featured: true } };

// 四块拼在一起看真正的 bento 节奏（7/5 → 5/7）
export const BentoGrid = {
  render: () => (
    <div className="works--bento">
      <WorkCard {...workSample} featured />
      <WorkCard {...workSampleShort} />
      <WorkCard {...workSampleShort} index="03" title="An evaluation harness agents cannot edit" />
      <WorkCard {...workSample} index="04" title="Delivery infrastructure" />
    </div>
  ),
};
