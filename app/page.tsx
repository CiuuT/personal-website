import Link from 'next/link';
import LiquidParticleBlob from '../component/LiquidParticleBlob';

const Arrow = () => <span aria-hidden="true">↗</span>;
export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <section className="hero shell" aria-labelledby="intro-title">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> PUBLIC POLICY · TECHNOLOGY · DATA</p><h1 id="intro-title">Chuhang<br />Liu<span className="name-period">.</span></h1><p className="hero-statement">Curious about technology.<br />Committed to public good.</p><p className="hero-description">MPP, Duke University. I work at the intersection of technology, data-driven policy, and social reform—with experience in legal research tools and global education policy.</p><div className="hero-actions"><Link className="button" href="/projects">Explore my work <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/connect">Get in touch <Arrow /></Link></div></div>
        <div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><LiquidParticleBlob /><span className="art-coordinate">01 / IDEAS IN MOTION</span><p className="art-caption">Where ideas connect,<br />possibilities emerge.</p></div>
        <div className="hero-bottom"><span>DUKE UNIVERSITY <span className="muted">/ MASTER OF PUBLIC POLICY</span></span><Link href="/about">A little more about me <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
