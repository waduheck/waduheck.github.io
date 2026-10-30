// 档案柜：按类别分列，每列一个抽屉，抽屉里一条一张卡。
// 不用左右步进——想读哪条直接点，没有顺序约束。

export default function Cabinet({ columns = [], records = [], hint = '', onOpen }) {
  return (
    <div className="cabinet">
      {hint ? <p className="cabinet__hint">{hint}</p> : null}

      <div className="cabinet__drawers">
        {columns.map((col) => {
          const items = records.filter((r) => r.col === col.key);
          return (
            <section className="drawer" key={col.key}>
              <header className="drawer__head">
                <span className="drawer__name">{col.label}</span>
                <span className="drawer__count">{String(items.length).padStart(2, '0')}</span>
              </header>

              <ul className="drawer__files">
                {items.map((r) => (
                  <li key={r.id}>
                    <button type="button" className="file" onClick={() => onOpen?.(r)}>
                      <span className="file__id">
                        {r.id}
                        <span className="file__go" aria-hidden="true">↗</span>
                      </span>
                      <span className="file__title">{r.title}</span>
                      {r.subtitle ? <span className="file__sub">{r.subtitle}</span> : null}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
