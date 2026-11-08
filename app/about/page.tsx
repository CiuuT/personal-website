import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About — Chuhang Liu' };

export default function AboutPage() {
  return (
    <main id="main-content" className="subpage subpage-about">
      <section id="about" className="about-section shell section-grid" aria-labelledby="about-title"><p className="section-label"><span>01</span> ABOUT</p><div><h1 id="about-title">Making sense of complexity.<br /><span className="muted">Looking for ways forward.</span></h1><p className="body-copy">I hold a Master of Public Policy from Duke University’s Sanford School of Public Policy and a BA in Sociology from Penn State. My training brings together social policy, economic development, and quantitative research.</p><p className="body-copy">At Duke Law, I developed research workflows using large language models. At UNICEF, I organized policy evidence for safer learning environments. I’m interested in turning complex information into resources people can use.</p><div className="interest-list" aria-label="Areas of interest"><span>Public policy</span><span>Technology & society</span><span>Data-driven decisions</span></div></div></section>
      <div className="page-next shell"><Link className="text-link" href="/projects">Explore my projects</Link></div>
    </main>
  );
}
