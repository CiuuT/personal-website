'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/connect', label: 'Connect' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header id="top" className="site-header shell">
      <Link className="wordmark" href="/" aria-label="Chuhang Liu home">CL<span>.</span></Link>
      <nav aria-label="Main navigation">
        {navigation.map(({ href, label }) => (
          <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
