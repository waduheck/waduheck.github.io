import Label from './Label.jsx';

// 章节：左轨道放序号，右侧放标题与导语，正文在下面。
// 左侧轨道是整页的竖向基准线——所有章节共用同一条。
export default function Section({ id, index, kicker, title, className = '', children }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section__rail">
        {index ? <span className="section__index">{index}</span> : null}
      </div>
      <div className="section__main">
        <header className="section__head">
          <h2 className="section__title">{title}</h2>
          {kicker ? <p className="section__kicker">{kicker}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
