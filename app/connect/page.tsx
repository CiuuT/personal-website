import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Connect — Chuhang Liu' };
const Arrow = () => <span aria-hidden="true">↗</span>;

export default function ConnectPage() {
  return (
    <main id="main-content" className="subpage subpage-connect">
      <section id="contact" className="contact-section shell section-grid" aria-labelledby="contact-title"><p className="section-label"><span>03</span> CONNECT</p><div><p className="eyebrow">GOOD CONVERSATIONS START SOMEWHERE.</p><h1 id="contact-title">Let’s connect<span className="name-period">.</span></h1><p className="body-copy">Have a question, a shared interest, or an idea to explore?<br />I’d be glad to hear from you.</p><a className="email-link" href="mailto:chuhang.liu@duke.edu">chuhang.liu@duke.edu <Arrow /></a></div></section>
      <div className="page-next shell"><Link className="text-link" href="/about">More about me <Arrow /></Link></div>
    </main>
  );
}
