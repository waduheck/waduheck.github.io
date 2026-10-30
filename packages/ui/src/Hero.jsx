import Label from './Label.jsx';
import Link from './Link.jsx';

// 第一屏：一行细信息（眉标 + 语言切换），下面衬线大名字，再下面是一窄栏导语与链接。
// 名字占满整幅宽度、导语只占右半——这是纸本的版心关系，不是居中堆叠。
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
      <div className="hero__meta">
        {eyebrow ? <Label>{eyebrow}</Label> : <span />}
        {actions ?? null}
      </div>

      <h1 className="hero__name">{name}</h1>

      {role || tagline ? (
        <div className="hero__lede">
          {role ? <p className="hero__role">{role}</p> : null}
          {tagline ? <p className="hero__tagline">{tagline}</p> : null}
        </div>
      ) : null}

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
