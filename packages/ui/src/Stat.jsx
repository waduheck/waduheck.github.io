import Metric from './Metric.jsx';
import Label from './Label.jsx';

// 一条量化成就：大号等宽数值 + 小标签。
// size='lg' 用于主角布局（bento 的第一块），默认用于列表。
export default function Stat({ value, label, size = 'md', tone = 'default' }) {
  return (
    <div className={`stat stat--${size} stat--${tone}`}>
      <Metric className="stat__value">{value}</Metric>
      <Label className="stat__label">{label}</Label>
    </div>
  );
}
