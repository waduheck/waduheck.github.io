import Stat from './Stat.jsx';

// 一条作品：左栏标题，右栏正文与量化。不用卡片盒子，用发丝线分条目。
export default function WorkRow({ title, body, stats = [] }) {
  return (
    <article className="item">
      <h3 className="item__title">{title}</h3>
      <div className="item__main">
        <p className="item__body">{body}</p>
        {stats.length ? (
          <div className="item__stats">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
