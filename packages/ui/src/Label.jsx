// 等宽小标签：序号、章节眉标、字段名。字距拉开，全大写由 CSS 处理。
export default function Label({ as: Tag = 'span', className = '', children, ...rest }) {
  return (
    <Tag className={`label ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
