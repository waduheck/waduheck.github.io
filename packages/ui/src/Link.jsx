// 外链自动加 rel；下划线从左往右长出来，只在这一处用强调色。
export default function Link({ href, className = '', children, ...rest }) {
  const external = /^https?:/i.test(href ?? '');
  return (
    <a
      className={`link ${className}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
      {...rest}
    >
      {children}
    </a>
  );
}
