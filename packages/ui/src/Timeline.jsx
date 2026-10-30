// 时间轴：横轴是年份，纵向按事项展开（类甘特）。左栏文字，右栏条形/点。
// 只有起止都确定的才画条；只知道起始的画点；进行中的条一直画到今天。
// 手机上隐藏绘图区，退化成左侧的清单（同一份 DOM，不重复渲染）。

const monthIndex = (d) => {
  const [y, m] = d.split('-').map(Number);
  return y * 12 + (m - 1);
};

function buildDomain(items, awards) {
  const starts = [...items.map((i) => i.from), ...awards.map((a) => a.at)].filter(Boolean);
  const minMonth = Math.min(...starts.map(monthIndex));
  const maxMonth = Math.max(
    monthIndex(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`),
    ...items.filter((i) => i.to).map((i) => monthIndex(i.to)),
    ...awards.map((a) => monthIndex(a.at)),
  );
  const startIdx = Math.floor(minMonth / 12) * 12;
  const endIdx = (Math.floor(maxMonth / 12) + 1) * 12;
  return { startIdx, endIdx, total: endIdx - startIdx };
}

function pct(idx, { startIdx, total }) {
  return ((idx - startIdx) / total) * 100;
}

export default function Timeline({ items = [], awardsLabel, awards = [], nowLabel = '' }) {
  if (!items.length) return null;
  const domain = buildDomain(items, awards);

  const ticks = [];
  for (let y = domain.startIdx / 12; y <= (domain.endIdx - 1) / 12; y += 1) {
    ticks.push({ y, left: pct(y * 12, domain) });
  }

  const nowIdx = monthIndex(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
  );

  return (
    <div className="gantt">
      <div className="gantt__axis" aria-hidden="true">
        <span className="gantt__rule" />
        {ticks.map((t) => (
          <span key={t.y} className="gantt__tick" style={{ left: `${t.left}%` }}>
            {t.y}
          </span>
        ))}
      </div>

      <ol className="gantt__rows">
        {items.map((it) => {
          const from = pct(monthIndex(it.from), domain);
          const hasSpan = Boolean(it.to || it.current);
          // 只知道起始的事项没有 to，不能提前算 monthIndex(it.to)
          const toIdx = it.current ? nowIdx + 1 : it.to ? monthIndex(it.to) + 1 : null;
          const to = hasSpan ? pct(toIdx, domain) : null;
          return (
            <li className="grow" key={`${it.from}-${it.title}`} data-current={it.current ? '' : undefined}>
              <div className="grow__label">
                <span className="grow__period">{it.period}</span>
                <p className="grow__title">{it.title}</p>
                {it.role ? <p className="grow__role">{it.role}</p> : null}
                {it.note ? <p className="grow__note">{it.note}</p> : null}
              </div>

              <div className="grow__plot">
                {hasSpan ? (
                  <span
                    className={`grow__bar${it.current ? ' is-current' : ''}`}
                    style={{ left: `${from}%`, width: `${Math.max(to - from, 0)}%` }}
                  />
                ) : (
                  <span className="grow__dot" style={{ left: `${from}%` }} />
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {awards.length ? (
        <div className="gantt__awards">
          {awardsLabel ? <p className="gantt__awards-caption label">{awardsLabel}</p> : null}
          {awards.map((a) => (
            <div className="grow" key={a.text}>
              <div className="grow__label">
                <span className="grow__period">{a.period}</span>
                <p className="grow__note">{a.text}</p>
              </div>
              <div className="grow__plot">
                <span className="grow__dot grow__dot--award" style={{ left: `${pct(monthIndex(a.at), domain)}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {nowLabel ? <span className="gantt__sr">{nowLabel}</span> : null}
    </div>
  );
}
