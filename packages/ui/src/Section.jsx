import Label from './Label.jsx';

// 章节：上方一条发丝线 + 等宽眉标 + 标题。段落间距由 --section-gap 统一给。
export default function Section({ id, index, kicker, title, className = '', children }) {
  return (
    <section id={id} className={`section ${className}`}>
      <header className="section__head">
        {index ? <Label className="section__index">{index}</Label> : null}
        <h2 className="section__title">{title}</h2>
        {kicker ? <p className="section__kicker">{kicker}</p> : null}
      </header>
      <div className="section__body">{children}</div>
    </section>
  );
}
