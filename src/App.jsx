import { useEffect, useState } from 'react';
import {
  Hero,
  Section,
  WorkRow,
  WorkCard,
  Prose,
  Reveal,
  Label,
  LanguageToggle,
} from '@portfolio/ui/src';
import C4Diagram from './c4/C4Diagram.jsx';
import { copy } from './content.js';
import { LOCALES, detectLocale, rememberLocale, htmlLangOf, applyMeta } from './i18n.js';

// 两种布局共用同一套组件与令牌，只有编排不同：
//   A（默认）= 对账表：发丝线 + 序号 + 量化条，没有盒子
//   B       = 不对称块：7/5 → 5/7 的 bento 节奏，首块放大主数值
// 参数 ?v=b 切换，用于现场对比；定稿后删掉输的一方。
const variant = new URLSearchParams(window.location.search).get('v') === 'b' ? 'b' : 'a';
const pad = (n) => String(n + 1).padStart(2, '0');

function Works({ works }) {
  if (variant === 'b') {
    return (
      <div className="works--bento">
        {works.map((w, i) => (
          <Reveal key={w.id} delay={i * 70}>
            <WorkCard {...w} index={pad(i)} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    );
  }
  return (
    <div className="works--ledger">
      {works.map((w, i) => (
        <Reveal key={w.id} delay={i * 70}>
          <WorkRow {...w} index={pad(i)} />
        </Reveal>
      ))}
    </div>
  );
}

export default function App() {
  // 首次渲染前就定好语言，避免先闪一下中文再跳成英文
  const [locale, setLocale] = useState(detectLocale);
  const t = copy[locale] ?? copy.en;

  useEffect(() => {
    applyMeta({ ...t.meta, htmlLang: htmlLangOf(locale) });
  }, [locale, t]);

  const changeLocale = (next) => {
    rememberLocale(next);
    setLocale(next);
  };

  return (
    <main className="page">
      <Hero
        {...t.profile}
        actions={
          <LanguageToggle
            value={locale}
            onChange={changeLocale}
            options={LOCALES}
            label={t.ui.language}
          />
        }
        contactLabel={t.ui.contact}
      />

      <Section
        id="work"
        index={t.sections.work.index}
        title={t.sections.work.title}
        kicker={t.sections.work.kicker}
      >
        <Works works={t.works} />
      </Section>

      <Section
        id="system"
        index={t.sections.system.index}
        title={t.sections.system.title}
        kicker={t.sections.system.kicker}
      >
        {/* key 让切换语言时整张图重建，避免残留上一语言的标签 */}
        <C4Diagram key={locale} locale={locale} />
      </Section>

      <Section id="education" index={t.sections.education.index} title={t.sections.education.title}>
        <div className="edu">
          {t.education.map((e) => (
            <Reveal key={e.degree} className="edu__item">
              <h3 className="edu__degree">{e.degree}</h3>
              <Prose className="edu__meta">
                {e.school} · {e.year}
              </Prose>
            </Reveal>
          ))}
        </div>
      </Section>

      <footer className="foot">
        <Label>{t.footer}</Label>
      </footer>
    </main>
  );
}
