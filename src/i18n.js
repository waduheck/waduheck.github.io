// 语言：query > 上次选择 > 浏览器语言 > 默认中文。
// 切换按钮的标签用各自语言书写（中文 / EN），不翻译成 "Chinese"。

export const LOCALES = [
  { id: 'zh', label: '中文', htmlLang: 'zh-CN' },
  { id: 'en', label: 'EN', htmlLang: 'en' },
];

const IDS = LOCALES.map((l) => l.id);
const STORAGE_KEY = 'portfolio.lang';
const DEFAULT = 'zh';

export const isLocale = (v) => IDS.includes(v);

export function detectLocale() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(q)) return q;
  } catch {
    /* URLSearchParams 不可用时忽略 */
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* 隐私模式下 localStorage 可能抛错 */
  }

  const langs =
    (navigator.languages && navigator.languages.length ? navigator.languages : null) ||
    [navigator.language || ''];
  for (const raw of langs) {
    const tag = String(raw).toLowerCase();
    if (tag.startsWith('zh')) return 'zh';
    if (tag.startsWith('en')) return 'en';
  }
  return DEFAULT;
}

export function rememberLocale(locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* 存不住就算了，不影响本次会话 */
  }
}

export function htmlLangOf(locale) {
  return LOCALES.find((l) => l.id === locale)?.htmlLang ?? 'zh-CN';
}

// 标题/描述跟着语言走：分享链接时的预览卡也要对得上
export function applyMeta(meta) {
  document.documentElement.lang = meta.htmlLang;
  document.title = meta.title;
  const set = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', meta.description);
  set('meta[property="og:title"]', 'content', meta.ogTitle);
  set('meta[property="og:description"]', 'content', meta.ogDescription);
  set('meta[property="og:locale"]', 'content', meta.ogLocale);
}
