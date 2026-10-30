import { profile, works, education } from './content.js';
import C4Diagram from './c4/C4Diagram.jsx';

// 第一屏：3 秒内看到你是谁、做什么。不要在这里放加载动画。
function Hero() {
  return (
    <header className="hero">
      <h1>{profile.name}</h1>
      <p className="tagline">{profile.tagline}</p>
      <nav className="links">
        {profile.links.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function WorkCard({ title, body, metric }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{body}</p>
      {metric && <p className="metric">{metric}</p>}
      <span className="soon">write-up coming</span>
    </article>
  );
}

export default function App() {
  return (
    <main className="page">
      <Hero />

      <section>
        <h2>Selected Work</h2>
        <div className="cards">
          {works.map((w) => (
            <WorkCard key={w.title} {...w} />
          ))}
        </div>
      </section>

      <C4Diagram />

      <section>
        <h2>Education</h2>
        {education.map((e) => (
          <p key={e}>{e}</p>
        ))}
      </section>
    </main>
  );
}
