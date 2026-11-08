import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Projects — Chuhang Liu' };

export default function ProjectsPage() {
  return (
    <main id="main-content" className="subpage subpage-projects">
      <section id="projects" className="projects-section shell" aria-labelledby="projects-title"><div className="section-heading"><p className="section-label"><span>02</span> SELECTED WORK</p><h1 id="projects-title">Selected projects<span className="name-period">.</span></h1><p>Research tools and policy knowledge, put into practice.<br />Open a project to explore my contribution.</p></div><div className="project-list">
        <details className="project">
          <summary><span className="project-number" aria-label="Project 1">P.01</span><div className="project-name"><span className="eyebrow">LAW & PUBLIC POLICY</span><h3>China Law & Policy Portal</h3><p>A searchable research portal with AI-assisted metadata extraction.</p></div><span className="project-tag">Knowledge access</span><span className="project-toggle" aria-hidden="true">+</span></summary>
          <div className="project-detail">
            <p className="project-role">Research Assistant · Duke University School of Law<br />Bass Connections · May 2025–May 2026</p>
            <p>I developed a web database for an open-access portal on Chinese law and policy, with workflows for article processing, data cleaning, and LLM-generated summaries.</p>
            <ul className="project-contributions">
              <li>Tested and evaluated multiple LLMs to extract structured metadata, including keywords, research gaps, and legal sources.</li>
              <li>Worked with scholars in law, policy, and data science to design and document workflows for the portal’s future deployment.</li>
            </ul>
            <p>The portal brings together English-language academic research, with keyword, author, and year search and links to source material.</p>
            <a className="text-link" href="https://clpp-website.vercel.app/" target="_blank" rel="noopener noreferrer">Visit the portal<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </details>
        <details className="project">
          <summary><span className="project-number" aria-label="Project 2">P.02</span><div className="project-name"><span className="eyebrow">EDUCATION & SOCIAL IMPACT</span><h3>UNICEF Safe to Learn repository</h3><p>A policy knowledge database spanning 20+ countries and 150+ documents.</p></div><span className="project-tag">Education</span><span className="project-toggle" aria-hidden="true">+</span></summary>
          <div className="project-detail">
            <p className="project-role">Policy & Knowledge Management Intern<br />UNICEF Headquarters · Education Section & Safe to Learn Initiative · May–September 2025</p>
            <p>I built a multi-country knowledge database for the Safe to Learn website, collecting, cleaning, and categorizing 150+ policy and program documents from 20+ countries on preventing violence in schools.</p>
            <ul className="project-contributions">
              <li>Designed data structures and classification methods to support future policy review and global resource-sharing.</li>
              <li>Alongside the repository work, evaluated 10+ Girls’ Education Initiative proposals and prepared analyses and feedback to inform senior-level recommendations to country offices.</li>
            </ul>
            <a className="text-link" href="mailto:liuchuhang777@outlook.com?subject=Safe%20to%20Learn%20repository">Ask me about this work</a>
          </div>
        </details>
      </div><p className="work-note"><span className="status-dot" /> This website is an ongoing experiment, too. Built with curiosity, refined over time.</p></section>
      <div className="page-next shell"><Link className="text-link" href="/connect">Get in touch</Link></div>
    </main>
  );
}
