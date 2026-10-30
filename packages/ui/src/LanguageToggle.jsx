// 语言切换：分段控件。当前语言用强调色，其余保持静默。
// 标签用各自语言书写（中文 / EN），不写成 "Chinese" / "English"。
export default function LanguageToggle({ value, onChange, options = [], label = 'Language' }) {
  return (
    <div className="lang" role="group" aria-label={label}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            lang={o.id}
            className={`lang__btn${on ? ' is-on' : ''}`}
            aria-pressed={on}
            onClick={() => onChange(o.id)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
