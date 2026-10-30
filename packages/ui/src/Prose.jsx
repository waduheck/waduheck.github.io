// 正文块：宽度受 --size-prose 约束。原站卡片正文只有 238px 是“碎”的主因。
export default function Prose({ as: Tag = 'p', wide = false, className = '', children, ...rest }) {
  return (
    <Tag className={`prose ${wide ? 'prose--wide' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
