import { useEffect, useState } from 'react';
import { Cabinet, Record as RecordView, LanguageToggle, Link } from '@portfolio/ui/src';
import C4Diagram from './c4/C4Diagram.jsx';
import { copy } from './records.js';
import { LOCALES, detectLocale, rememberLocale, htmlLangOf, applyMeta } from './i18n.js';

// 整站 = 一个档案库：固定的品牌框 + 循环阵列 + 抽取后的卷宗。
// 没有滚动章节；系统架构是 X-01 的「架构」页，不再单独占一节。
export default function App() {
  const [locale, setLocale] = useState(detectLocale);
  const [openId, setOpenId] = useState(null);
  const t = copy[locale] ?? copy.en;
  const open = openId ? (t.records.find((r) => r.id === openId) ?? null) : null;

  useEffect(() => {
    applyMeta({ ...t.meta, htmlLang: htmlLangOf(locale) });
  }, [locale, t]);

  // 打开卷宗时锁住页面滚动
  useEffect(() => {
    document.body.classList.toggle('is-locked', Boolean(open));
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  // 正文为空的标签页交给可视区渲染（X-01 的「架构」页放 C4 图）
  const renderVisual = (r, tabIndex) =>
    r.tabs[tabIndex]?.body === '' ? <C4Diagram key={locale} locale={locale} /> : null;

  return (
    <main className="site">
      <header className="brand">
        <p className="brand__name">{t.brand.name}</p>
        <p className="brand__line">{t.brand.line1}</p>
        <p className="brand__line">{t.brand.line2}</p>
      </header>

      <div className="rail">
        <LanguageToggle
          value={locale}
          onChange={(next) => {
            rememberLocale(next);
            setLocale(next);
          }}
          options={LOCALES}
          label={t.ui.language}
        />
        <nav className="rail__links" aria-label={t.ui.contact}>
          {t.brand.links.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <Cabinet
        key={locale}
        columns={t.columns}
        records={t.records}
        hint={t.ui.browseHint}
        onOpen={(r) => setOpenId(r.id)}
      />

      {open ? (
        <RecordView
          key={open.id}
          record={open}
          ui={t.ui}
          onClose={() => setOpenId(null)}
          renderVisual={renderVisual}
        />
      ) : null}
    </main>
  );
}
