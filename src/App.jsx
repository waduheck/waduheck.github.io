import { Hero, Section, WorkRow, WorkCard, Prose, Reveal, Label } from '@portfolio/ui/src';
import C4Diagram from './c4/C4Diagram.jsx';
import { profile, works, sections, education } from './content.js';

// 两种布局共用同一套组件与令牌，只有编排不同：
//   A（默认）= 对账表：发丝线 + 序号 + 量化条，没有盒子
//   B       = 不对称块：7/5 → 5/7 的 bento 节奏，首块放大主数值
// 参数 ?v=b 切换，用于现场对比；定稿后删掉输的一方。
const variant = new URLSearchParams(window.location.search).get('v') === 'b' ? 'b' : 'a';
const pad = (n) => String(n + 1).padStart(2, '0');

function Works() {
  if (variant === 'b') {
    return (
      <div className="works--bento">
        {works.map((w, i) => (
          <Reveal key={w.id} delay={i * 70}>
            <WorkCard {...w} index={pad(i)} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    );
  }
  return (
    <div className="works--ledger">
      {works.map((w, i) => (
        <Reveal key={w.id} delay={i * 70}>
          <WorkRow {...w} index={pad(i)} />
        </Reveal>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <main className="page">
      <Hero {...profile} />

      <Section id="work" index={sections.work.index} title={sections.work.title} kicker={sections.work.kicker}>
        <Works />
      </Section>

      <Section
        id="system"
        index={sections.system.index}
        title={sections.system.title}
        kicker={sections.system.kicker}
      >
        <C4Diagram />
      </Section>

      <Section id="education" index={sections.education.index} title={sections.education.title}>
        <div className="edu">
          {education.map((e) => (
            <Reveal key={e.degree} className="edu__item">
              <h3 className="edu__degree">{e.degree}</h3>
              <Prose className="edu__meta">
                {e.school} · {e.year}
              </Prose>
            </Reveal>
          ))}
        </div>
      </Section>

      <footer className="foot">
        <Label>Design tokens · Storybook component library</Label>
      </footer>
    </main>
  );
}
