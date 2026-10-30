// 数字必须等宽 + tabular-nums，否则滚动时会跳。
export default function Metric({ as: Tag = 'span', className = '', children, ...rest }) {
  return (
    <Tag className={`metric ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
