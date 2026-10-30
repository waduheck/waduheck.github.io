import Link from './Link.jsx';

export default { title: 'UI/Link', component: Link };

export const External = {
  args: { href: 'https://github.com/waduheck', children: 'GitHub' },
};

export const Internal = {
  args: { href: '#work', children: 'Selected work' },
};

export const InSentence = {
  render: () => (
    <p className="prose prose--wide">
      Numbers come from the generated contract. See <Link href="https://github.com/waduheck">the repo</Link> for
      the rest.
    </p>
  ),
};
