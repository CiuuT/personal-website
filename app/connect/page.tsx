import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Connect — Chuhang Liu' };

export default function ConnectPage() {
  return (
    <main id="main-content" className="subpage subpage-connect">
      <section id="contact" className="contact-section shell section-grid" aria-labelledby="contact-title">
        <p className="section-label"><span>03</span> CONNECT</p>
        <div>
          <p className="eyebrow">GOOD CONVERSATIONS START SOMEWHERE.</p>
          <h1 id="contact-title">Let’s connect<span className="name-period">.</span></h1>
          <p className="body-copy">Have a question, a shared interest, or an idea to explore?<br />I’d be glad to hear from you.</p>
          <div className="contact-links">
            <a className="email-link" href="mailto:liuchuhang777@outlook.com">liuchuhang777@outlook.com</a>
            <a className="text-link linkedin-link" href="https://www.linkedin.com/in/chuhang-liu/" target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </section>
      <div className="page-next shell"><Link className="text-link" href="/about">More about me</Link></div>
    </main>
  );
}
