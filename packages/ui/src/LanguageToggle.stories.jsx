import { useState } from 'react';
import LanguageToggle from './LanguageToggle.jsx';

const OPTIONS = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'EN' },
];

export default {
  title: 'UI/LanguageToggle',
  component: LanguageToggle,
  args: { options: OPTIONS, label: 'Language' },
};

function Stateful({ start = 'zh', ...rest }) {
  const [value, setValue] = useState(start);
  return <LanguageToggle {...rest} value={value} onChange={setValue} />;
}

export const ChineseActive = { render: (args) => <Stateful {...args} start="zh" /> };
export const EnglishActive = { render: (args) => <Stateful {...args} start="en" /> };

// 三个语言时的表现：控件会自动等分，不需要改组件
export const ThreeLocales = {
  render: () => (
    <Stateful
      start="ja"
      label="Language"
      options={[...OPTIONS, { id: 'ja', label: '日本語' }]}
    />
  ),
};
