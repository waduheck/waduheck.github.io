import { useState } from 'react';
import { levels, SIZE, typeLine } from './model.js';
import './c4.css';

// 从 a 的中心朝 b 的中心出发，落在 a 的边框外 pad 像素处。
function edge(a, b, pad) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const s = Math.min(a.w / 2 / Math.abs(dx || 1e-6), a.h / 2 / Math.abs(dy || 1e-6));
  const len = Math.hypot(dx, dy);
  return { x: a.x + dx * s + (dx / len) * pad, y: a.y + dy * s + (dy / len) * pad };
}

function Diagram({ lv, onZoom }) {
  const [hover, setHover] = useState(null);
  const els = Object.fromEntries(lv.elements.map((e) => [e.id, { ...SIZE[e.kind], ...e }]));
  const touches = (r) => r.from === hover || r.to === hover;
  const related = hover
    ? new Set([hover, ...lv.relations.filter(touches).flatMap((r) => [r.from, r.to])])
    : null;
  const [W, H] = lv.view;
  const b = lv.boundary;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="c4-svg" role="img" aria-label={lv.title}>
      <defs>
        {['', '-hot'].map((s) => (
          <marker key={s} id={`arr-${lv.id}${s}`} viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className={`c4-head-mark${s}`} />
          </marker>
        ))}
      </defs>

      {b && (
        <g className={`c4-boundary ${hover ? 'dim' : ''}`}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="16" />
          <text x={b.x + 18} y={b.y + b.h - 30} className="bname">{b.name}</text>
          <text x={b.x + 18} y={b.y + b.h - 12} className="btype">{b.type}</text>
        </g>
      )}

      {lv.relations.map((r, i) => {
        // via：可选拐点，让线绕开中间的方框；标签放在拐点上
        const v = r.via;
        const p1 = edge(els[r.from], v ?? els[r.to], 4);
        const p2 = edge(els[r.to], v ?? els[r.from], 6);
        const d = v
          ? `M${p1.x},${p1.y} Q${2 * v.x - (p1.x + p2.x) / 2},${2 * v.y - (p1.y + p2.y) / 2} ${p2.x},${p2.y}`
          : `M${p1.x},${p1.y} L${p2.x},${p2.y}`;
        const t = r.t ?? 0.5;
        const lx = v ? v.x : p1.x + (p2.x - p1.x) * t;
        const ly = v ? v.y : p1.y + (p2.y - p1.y) * t;
        const lw = r.lw ?? 150;
        const hot = hover && touches(r);
        return (
          <g key={i} className={`c4-rel ${hot ? 'hot' : ''} ${hover && !hot ? 'dim' : ''}`}>
            <path d={d} pathLength="1" markerEnd={`url(#arr-${lv.id}${hot ? '-hot' : ''})`} />
            <circle r="4" className="c4-dot">
              <animateMotion dur={`${1.6 + (i % 3) * 0.5}s`} begin={`${(i * 0.37) % 2}s`}
                repeatCount="indefinite" path={d} />
            </circle>
            <foreignObject x={lx - lw / 2} y={ly - 20} width={lw} height="40">
              <div className="c4-label">
                <span>{r.label}</span>
                <small>[{r.tech}]</small>
              </div>
            </foreignObject>
          </g>
        );
      })}

      {Object.values(els).map((e, i) => (
        <g key={e.id}
          className={`c4-node ${e.kind} ${related && !related.has(e.id) ? 'dim' : ''} ${e.zoom ? 'zoomable' : ''}`}
          style={{ '--d': `${i * 70}ms` }}
          onMouseEnter={() => setHover(e.id)}
          onMouseLeave={() => setHover(null)}
          onClick={e.zoom ? onZoom : undefined}>
          {e.kind === 'person' && <circle cx={e.x} cy={e.y - e.h / 2 - 2} r="20" className="c4-person-head" />}
          <foreignObject x={e.x - e.w / 2} y={e.y - e.h / 2} width={e.w} height={e.h}>
            <div className="c4-box">
              <b>{e.name}</b>
              <i>{typeLine(e)}</i>
              <p>{e.desc}</p>
              {e.zoom && <em>click to zoom in ⤢</em>}
            </div>
          </foreignObject>
        </g>
      ))}
    </svg>
  );
}

function Legend() {
  const items = [
    ['person', 'Person'],
    ['system', 'Software system in scope'],
    ['container', 'Container (app / service)'],
    ['store', 'Data store'],
    ['external', 'External system'],
    ['boundary', 'System boundary'],
  ];
  return (
    <div className="c4-legend">
      {items.map(([k, l]) => (
        <span key={k}><i className={`sw ${k}`} />{l}</span>
      ))}
      <span><i className="sw arrow" />Relationship [technology]; moving dots show direction</span>
    </div>
  );
}

export default function C4Diagram() {
  const [level, setLevel] = useState('context');
  const L = levels[level];
  return (
    <section className="c4">
      <div className="c4-head">
        <div>
          <h2>{L.title}</h2>
          <p className="c4-sub">{L.subtitle}</p>
        </div>
        <div className="c4-levels">
          <button className={level === 'context' ? 'sel' : ''} onClick={() => setLevel('context')}>1 · Context</button>
          <button className={level === 'container' ? 'sel' : ''} onClick={() => setLevel('container')}>2 · Containers</button>
          <button disabled title="coming soon">3 · Components</button>
        </div>
      </div>
      <div className="c4-scroll">
        <div className="c4-stage">
          {Object.values(levels).map((lv) => (
            <div key={lv.id} className={`c4-layer ${lv.id} ${level === lv.id ? 'active' : 'inactive'}`}>
              <Diagram lv={lv} onZoom={() => setLevel('container')} />
            </div>
          ))}
        </div>
      </div>
      <Legend />
    </section>
  );
}
