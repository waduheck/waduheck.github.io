import Label from './Label.jsx';
import Prose from './Prose.jsx';
import Stat from './Stat.jsx';

// 布局 B「不对称块」：有面、有圆角，首个数值放大当视觉锚点。
export default function WorkCard({ index, title, body, stats = [], featured = false }) {
  const [head, ...rest] = stats;
  return (
    <article className={`wcard ${featured ? 'wcard--featured' : ''}`}>
      <header className="wcard__head">
        <Label className="wcard__index">{index}</Label>
        {featured && head ? <Stat value={head.value} label={head.label} size="lg" /> : null}
      </header>
      <h3 className="wcard__title">{title}</h3>
      <Prose className="wcard__body">{body}</Prose>
      {rest.length || (!featured && head) ? (
        <div className="wcard__stats">
          {(featured ? rest : stats).map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      ) : null}
    </article>
  );
}
