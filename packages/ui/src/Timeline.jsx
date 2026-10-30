// 时间线：职位与教育。奖项单独一小块，避免和经历混在一起。
export default function Timeline({ items = [], awardsLabel, awards = [] }) {
  return (
    <div className="timeline">
      <ol className="timeline__list">
        {items.map((it) => (
          <li className="tl" key={`${it.period}-${it.title}`} data-current={it.current ? '' : undefined}>
            <span className="tl__period">{it.period}</span>
            <div className="tl__body">
              <p className="tl__title">{it.title}</p>
              {it.role ? <p className="tl__role">{it.role}</p> : null}
              {it.note ? <p className="tl__note">{it.note}</p> : null}
            </div>
          </li>
        ))}
      </ol>

      {awards.length ? (
        <div className="timeline__awards">
          <p className="label">{awardsLabel}</p>
          <ul>
            {awards.map((a) => (
              <li key={a.text}>
                <span className="tl__period">{a.period}</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
