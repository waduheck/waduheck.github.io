import './tokens-showcase.css';

// 令牌总览：设计系统的唯一真源在这里可见。数值全部从 dist/tokens.css 解析出来。
const TYPE = [
  ['display', 'text-display', 'hero 名称'],
  ['title', 'text-title', '章节标题'],
  ['heading', 'text-heading', '卡片标题'],
  ['body', 'text-body', '正文'],
  ['small', 'text-small', '次要正文'],
  ['label', 'text-label', '等宽标签'],
];

const COLOR_GROUPS = [
  ['表面', ['--bg', '--bg-raised', '--card-bg', '--line']],
  ['文字', ['--fg-strong', '--fg', '--fg-muted', '--fg-subtle']],
  ['强调', ['--accent', '--accent-soft', '--focus', '--warn']],
];

const SPACE = ['2', '3', '4', '6', '8', '10', '12', '16', '20', '24', '32'];

const read = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export default {
  title: 'Foundations/Tokens',
  parameters: { layout: 'fullscreen' },
};

export const TypeScale = {
  render: () => (
    <div className="tok">
      <h2 className="tok__h">Type scale</h2>
      <p className="tok__note">
        落差是关键：display 与 heading 相差 4 倍以上。行高在大字号上必须接近 1.0，否则会显得松垮。
      </p>
      {TYPE.map(([name, varName, use]) => (
        <div className="tok__row" key={name}>
          <code className="tok__key">--{varName}</code>
          <span style={{ fontSize: `var(--${varName})`, lineHeight: name === 'display' ? 1 : 1.2 }}>
            Aa 阶段
          </span>
          <span className="tok__use">{use} · {read(`--${varName}`)}</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors = {
  render: () => (
    <div className="tok">
      <h2 className="tok__h">Colour</h2>
      <p className="tok__note">
        没有任何纯黑纯白：底色 #08090B、主文字 neutral-100、次要文字 neutral-300。强调色只出现在序号、链接和焦点环。
      </p>
      {COLOR_GROUPS.map(([group, names]) => (
        <div className="tok__group" key={group}>
          <h3 className="tok__sub">{group}</h3>
          <div className="tok__swatches">
            {names.map((n) => (
              <div className="tok__sw" key={n}>
                <span className="tok__chip" style={{ background: `var(${n})` }} />
                <code>{n}</code>
                <em>{read(n)}</em>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Spacing = {
  render: () => (
    <div className="tok">
      <h2 className="tok__h">Space (4px base)</h2>
      <p className="tok__note">只有这几档。组件里不允许出现魔法数字。</p>
      {SPACE.map((s) => (
        <div className="tok__row" key={s}>
          <code className="tok__key">--space-{s}</code>
          <span className="tok__bar" style={{ width: `var(--space-${s})` }} />
          <span className="tok__use">{read(`--space-${s}`)}</span>
        </div>
      ))}
    </div>
  ),
};

export const Motion = {
  render: () => (
    <div className="tok">
      <h2 className="tok__h">Motion</h2>
      <p className="tok__note">
        时长只保留四档（140 / 260 / 520 / 700ms），缓动三条。hover 展开看对比。
      </p>
      {['--motion-interactive', '--motion-state', '--motion-reveal', '--motion-zoom'].map((n) => (
        <div className="tok__row" key={n}>
          <code className="tok__key">{n}</code>
          <span className="tok__use">{read(n)}</span>
        </div>
      ))}
    </div>
  ),
};
