// 一个量化数字：衬线数值在上，小字标签在下。
export default function Stat({ value, label }) {
  return (
    <div className="stat">
      <span className="stat__value metric">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
