import { useEffect, useRef } from 'react';

// 滚动入场：opacity + 轻微上移，按 delay 错开。
// 用户偏好：不加 prefers-reduced-motion 开关，动效是视觉身份的一部分。
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('is-in');
            io.unobserve(el);
          }
        }
      },
      { rootMargin: '-6% 0px -10% 0px', threshold: 0.06 },
    );
    io.observe(el);
    // 兜底：观察器不生效时也不要把内容永久留成透明
    const guard = window.setTimeout(() => el.classList.add('is-in'), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(guard);
    };
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}
