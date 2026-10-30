import Label from './Label.jsx';
import Prose from './Prose.jsx';
import Stat from './Stat.jsx';

// 布局 A「对账表」：没有卡片盒子，靠发丝线和留白分隔。
export default function WorkRow({ index, title, body, stats = [] }) {
  return (
    <article className="row">
      <Label className="row__index">{index}</Label>
      <div className="row__main">
        <h3 className="row__title">{title}</h3>
        <Prose className="row__body">{body}</Prose>
        {stats.length ? (
          <div className="row__stats">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
