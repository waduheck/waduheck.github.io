import Label from './Label.jsx';
import Link from './Link.jsx';

// 第一屏：3 秒内读完“是谁 / 做什么 / 去哪看”。display 字号近 1.0 行高。
// actions：右上角的操作位（语言切换等），与眉标同一行。
export default function Hero({
  name,
  role,
  tagline,
  links = [],
  eyebrow,
  actions,
  contactLabel = 'Contact',
}) {
  return (
    <header className="hero">
      {eyebrow || actions ? (
        <div className="hero__top">
          {eyebrow ? <Label className="hero__eyebrow">{eyebrow}</Label> : <span />}
          {actions ? <div className="hero__actions">{actions}</div> : null}
        </div>
      ) : null}
      <h1 className="hero__name">{name}</h1>
      {role ? <p className="hero__role">{role}</p> : null}
      {tagline ? <p className="hero__tagline">{tagline}</p> : null}
      {links.length ? (
        <nav className="hero__links" aria-label={contactLabel}>
          {links.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
