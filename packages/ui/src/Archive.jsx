import { useEffect, useRef, useState } from 'react';

// 循环档案阵列：内容序号和物理位置分开，左右走到头接着沿原方向继续。
// 这里是「浏览」层；选中一张按回车，交给上层打开详情（Record）。
// 参考 Rhine Lab 的《循环档案阵列》与《滚动标题》。

const SPACING = 208;
const DEPTH = 132;
const DRAG_THRESHOLD = 8;

// 把索引差折到 [-n/2, n/2)：两端接起来，阵列就没有接缝
const wrapDelta = (v, n) => (((v + n / 2) % n) + n) % n - n / 2;

export default function Archive({ items = [], hint = '', openLabel = '', onOpen }) {
  const n = items.length;
  const [pos, setPos] = useState(0);
  const target = useRef(0);
  const drag = useRef(null);
  const wheelLock = useRef(0);

  // 阻尼跟随：目标位置变，位置追过去
  useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      setPos((p) => {
        const d = target.current - p;
        if (Math.abs(d) < 0.001) return target.current;
        return p + d * Math.min(1, dt * 11);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = (dir) => {
    target.current = Math.round(target.current) + dir;
  };

  const jump = (i) => {
    // 选最近的等价位置，不要绕远路
    const from = Math.round(target.current);
    const base = Math.floor(from / n) * n;
    const candidates = [base + i, base + i - n, base + i + n];
    target.current = candidates.reduce((a, b) => (Math.abs(b - from) < Math.abs(a - from) ? b : a));
  };

  const selected = ((Math.round(pos) % n) + n) % n;
  const current = items[selected];

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, start: target.current, moved: false };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) d.moved = true;
    if (d.moved) target.current = d.start - dx / SPACING;
  };

  const endDrag = () => {
    if (!drag.current) return;
    if (drag.current.moved) target.current = Math.round(target.current);
    drag.current = null;
  };

  const onWheel = (e) => {
    // 只吃横向滚动（触控板横扫 / Shift+滚轮），纵向留给页面
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    const now = performance.now();
    if (now - wheelLock.current < 140) return;
    wheelLock.current = now;
    step(e.deltaX > 0 ? 1 : -1);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen?.(current);
    }
  };

  if (!n) return null;

  return (
    <div className="archive">
      {/* 滚动标题 + 计数 */}
      <div className="archive__head">
        <p className="archive__title" aria-live="polite">
          <span key={selected} className="roll">
            {current.title}
          </span>
        </p>
        <p className="archive__count">
          <span key={`n${selected}`} className="roll">
            {String(selected + 1).padStart(2, '0')}
          </span>
          <span className="archive__total">/ {String(n).padStart(2, '0')}</span>
          <span className="archive__kind">{current.kind}</span>
        </p>
      </div>

      {/* 循环阵列 */}
      <div
        className="archive__stage"
        role="listbox"
        tabIndex={0}
        aria-label={hint}
        aria-activedescendant={`arc-${selected}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
      >
        <div className="archive__track">
          {items.map((it, i) => {
            const d = wrapDelta(i - pos, n);
            const far = Math.abs(d);
            const isSel = far < 0.5;
            return (
              <div
                key={it.id}
                id={`arc-${i}`}
                role="option"
                aria-selected={isSel}
                className={`slab${isSel ? ' is-sel' : ''}`}
                style={{
                  transform:
                    `translate3d(${d * SPACING}px, 0, ${-far * DEPTH}px) ` +
                    `rotateY(${Math.max(-13, Math.min(13, -d * 8))}deg)`,
                  zIndex: 100 - Math.round(far * 10),
                  opacity: far > n / 2 ? 0 : Math.max(0.18, 1 - far * 0.1),
                  pointerEvents: far > 2.6 ? 'none' : 'auto',
                }}
                onClick={() => {
                  if (drag.current?.moved) return;
                  if (!isSel) jump(i);
                  else onOpen?.(it);
                }}
              >
                <div className="slab__body">
                  <span className="slab__kind">{it.kind}</span>
                  <span className="slab__id">{it.id}</span>
                  <span className="slab__name">{it.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 刻度：N 个位置，当前一个实心 */}
      <div className="archive__scale" role="tablist" aria-label="archive positions">
        {items.map((it, i) => (
          <button
            key={`tick-${it.id}`}
            type="button"
            role="tab"
            aria-selected={i === selected}
            aria-label={it.title}
            className={`tick${i === selected ? ' is-on' : ''}`}
            onClick={() => jump(i)}
          />
        ))}
      </div>

      <div className="archive__foot">
        <button type="button" className="archive__open" onClick={() => onOpen?.(current)}>
          {openLabel} <span aria-hidden="true">→</span>
        </button>
        <p className="archive__hint">{hint}</p>
      </div>
    </div>
  );
}
