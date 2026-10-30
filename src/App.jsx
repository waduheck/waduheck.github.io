import { useEffect, useState } from 'react';
import { Hero, Section, WorkRow, Reveal, Label, LanguageToggle } from '@portfolio/ui/src';
import C4Diagram from './c4/C4Diagram.jsx';
import { copy } from './content.js';
import { LOCALES, detectLocale, rememberLocale, htmlLangOf, applyMeta } from './i18n.js';

const stagger = (i) => i * 80;

function Works({ works }) {
  return (
    <div className="works">
      {works.map((w, i) => (
        <Reveal key={w.id} delay={stagger(i)}>
          <WorkRow {...w} />
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
        <div className="works">
          {t.education.map((e, i) => (
            <Reveal key={e.degree} delay={stagger(i)}>
              <article className="item">
                <h3 className="item__title">{e.degree}</h3>
                <div className="item__main">
                  <p className="item__body">
                    {e.school} · {e.year}
                  </p>
                </div>
              </article>
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
