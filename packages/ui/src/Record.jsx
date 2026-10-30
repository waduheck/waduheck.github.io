import { useEffect, useState } from 'react';

// 档案详情：左半是可视区（架构图 / 标本牌），右半是卷宗。
// 卷宗结构：编号与密级 → 标题 → 副题与类型 → 分隔线 → 元信息表 → 标签页 → 正文。
// 参考 Rhine Lab 的《抽取、解密与阅读》。

export default function Record({ record, ui, onClose, renderVisual }) {
  const [tab, setTab] = useState(0);

  useEffect(() => setTab(0), [record.id]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const current = record.tabs[tab];
  const visual = renderVisual?.(record, tab) ?? null;

  return (
    <section className="record" role="dialog" aria-modal="true" aria-label={record.title}>
      <div className="record__left">
        <button type="button" className="record__back" onClick={onClose}>
          <span aria-hidden="true">←</span> {ui.back} <kbd>ESC</kbd>
        </button>

        <div className="record__visual">
          {visual ?? (
            <div className="specimen">
              <span className="specimen__kind">{record.kind}</span>
              <span className="specimen__id">{record.id}</span>
              <span className="specimen__title">{record.subtitle}</span>
            </div>
          )}
        </div>
      </div>

      <div className="record__right">
        <p className="record__meta">
          <span>FILE {record.id}</span>
          <span>{record.clearance}</span>
        </p>

        <h2 className="record__title">{record.title}</h2>
        <p className="record__sub">
          <span>{record.subtitle}</span>
          <em>{record.kind}</em>
        </p>

        <hr className="record__rule" />

        <dl className="metatable">
          {record.meta.map((m) => (
            <div className="metatable__cell" key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>

        {record.tabs.length > 1 ? (
          <div className="tabs" role="tablist" aria-label={ui.tabsLabel}>
            {record.tabs.map((x, i) => (
              <button
                key={x.label}
                type="button"
                role="tab"
                aria-selected={i === tab}
                className={`tabs__tab${i === tab ? ' is-on' : ''}`}
                onClick={() => setTab(i)}
              >
                <span className="tabs__idx">{String(i + 1).padStart(2, '0')}</span>
                {x.label}
              </button>
            ))}
          </div>
        ) : null}

        <div className="record__body" role="tabpanel">
          {current.body ? <p>{current.body}</p> : null}
        </div>

        <p className="record__foot">
          <span>{record.id}</span>
          <span>{record.clearance}</span>
        </p>
      </div>
    </section>
  );
}
