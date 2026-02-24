import React, { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
        
        outlineRef.current.animate({
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        }, { duration: 500, fill: 'forwards' });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.closest('a') || target.tagName.toLowerCase() === 'button' || target.closest('button') || target.classList.contains('interactive')) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />
    </>
  );
};

const SideNav = () => {
  const sections = [
    { id: 'hero', label: 'Start' },
    { id: 'architecture', label: '01' },
    { id: 'ai', label: '02' },
    { id: 'reliability', label: '03' },
    { id: 'leadership', label: '04' },
    { id: 'build', label: '05' },
  ];

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`text-[10px] font-mono transition-all duration-300 ${
            activeSection === id ? 'text-accent scale-110' : 'text-white/20 hover:text-white/50'
          }`}
        >
          {label}
        </a>
      ))}
    </div>
  );
};

const Reveal = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const ref = useReveal();
  return <div ref={ref} className={`reveal relative z-10 ${className}`}>{children}</div>;
};

const BackgroundEffects = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-grid grid-drift opacity-[0.08]" />
    <div className="glow-orb glow-orb-1" />
    <div className="glow-orb glow-orb-2" />
    <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] border border-white/[0.05] rounded-full animate-spin-slow" style={{ transformOrigin: 'center' }}>
      <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent/40 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(92,128,166,0.5)]" />
    </div>
    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] border border-white/[0.05] rounded-full animate-spin-slow" style={{ transformOrigin: 'center', animationDirection: 'reverse', animationDuration: '40s' }}>
      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-accent/40 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_rgba(92,128,166,0.5)]" />
    </div>
  </div>
);

// SVG Components for abstract visuals
const ArchitectureVisual = () => (
  <div className="layer-container relative w-full h-80 flex items-center justify-center perspective-1000">
    <div className="absolute w-48 h-48 border border-white/20 layer-plane bg-bg/50 backdrop-blur-sm" style={{ transform: 'rotateX(60deg) rotateZ(45deg) translateZ(15px)' }} />
    <div className="absolute w-48 h-48 border border-white/20 layer-plane bg-bg/50 backdrop-blur-sm" style={{ transform: 'rotateX(60deg) rotateZ(45deg) translateZ(0px)' }} />
    <div className="absolute w-48 h-48 border border-white/20 layer-plane bg-bg/50 backdrop-blur-sm" style={{ transform: 'rotateX(60deg) rotateZ(45deg) translateZ(-15px)' }} />
    <div className="absolute w-full h-full flex flex-col items-center justify-center gap-12 pointer-events-none">
       <div className="w-1.5 h-1.5 bg-accent rounded-full" />
       <div className="w-1.5 h-1.5 bg-accent rounded-full" />
       <div className="w-1.5 h-1.5 bg-accent rounded-full" />
    </div>
  </div>
);

const AIVisual = () => (
  <div className="relative w-full h-80 flex items-center justify-center">
    <div className="absolute w-32 h-32 border border-white/10 rounded-full" />
    <div className="absolute w-56 h-56 border border-white/5 rounded-full" />
    <div className="w-3 h-3 bg-accent rounded-full node-pulse" />
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${deg}deg)` }}>
        <div className="absolute top-12 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full -translate-x-1/2" />
        <div className="absolute top-[4.5rem] left-1/2 w-[1px] h-10 bg-white/10 -translate-x-1/2" />
      </div>
    ))}
  </div>
);

const ReliabilityVisual = () => (
  <div className="relative w-full h-80 flex flex-col items-center justify-center gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="w-56 h-8 border border-white/20 flex items-center px-4 transition-transform duration-700 hover:translate-x-4 bg-bg">
        <div className="w-2 h-2 bg-accent/50" />
        <div className="ml-auto text-[10px] font-mono text-white/30">L{i}</div>
      </div>
    ))}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-48 bg-white/10 -z-10" />
  </div>
);

const BuildVisual = () => (
  <div className="relative w-full h-80 flex items-center justify-center">
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className={`w-10 h-10 border border-white/10 transition-colors duration-500 ${i % 5 === 0 ? 'bg-accent/20' : 'hover:bg-white/5'}`} />
      ))}
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-gray-300 font-sans selection:bg-accent/30 relative">
      <CustomCursor />
      <SideNav />
      <BackgroundEffects />
      
      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden z-10">
        <Reveal className="max-w-5xl relative">
          <div className="absolute -left-8 md:-left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          <div className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-6">Systems / Architecture / AI</div>
          <h1 className="text-5xl md:text-[6rem] font-light tracking-tight text-white mb-8 leading-[1.1]">
            Leandro Manuel<br />Zulaybar
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mb-12">
            <h2 className="text-xl md:text-2xl font-mono text-accent bg-accent/10 px-4 py-2 border border-accent/20 inline-block">
              Engineering Leader
            </h2>
            <div className="hidden md:block w-16 h-[1px] bg-white/20" />
            <p className="text-xs md:text-sm font-mono text-gray-400 tracking-[0.2em] uppercase flex flex-wrap gap-4">
              <span>AI Systems</span>
              <span className="text-accent/50">•</span>
              <span>Architecture</span>
              <span className="text-accent/50">•</span>
              <span>Reliability</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8 font-mono text-xs tracking-[0.15em] uppercase">
            <a href="#" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
              <span className="w-6 h-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
              Resume
            </a>
            <a href="mailto:hello@example.com" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
              <span className="w-6 h-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
              Email
            </a>
            <a href="#" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
              <span className="w-6 h-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
              LinkedIn
            </a>
            <a href="#" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors">
              <span className="w-6 h-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
              GitHub
            </a>
          </div>
        </Reveal>
        
        <div className="absolute bottom-12 left-8 md:left-24 flex items-center gap-4 animate-pulse opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Scroll</span>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="relative py-24 px-8 md:px-24 z-10 border-t border-white/5">
        <Reveal className="max-w-4xl">
          <div className="text-2xl md:text-4xl leading-snug text-gray-400 font-light mb-8">
            I operate at the intersection of <span className="text-white font-normal">architecture</span>, <span className="text-white font-normal">production AI</span>, <span className="text-white font-normal">infrastructure reliability</span>, and <span className="text-white font-normal">engineering execution</span>.
          </div>
          <div className="text-base md:text-lg leading-relaxed text-gray-500 max-w-3xl">
            Over 14+ years, I’ve designed distributed backend systems, integrated production RAG and LLM workflows, standardized Kubernetes and CI/CD pipelines, and led teams of up to <span className="text-gray-300">19 engineers</span> delivering enterprise platforms at scale.
          </div>
        </Reveal>
      </section>

      {/* 01 Architecture */}
      <section id="architecture" className="relative py-32 px-8 md:px-24 overflow-hidden border-t border-white/5 z-10">
        <div className="oversized-label">ARCHITECTURE</div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-mono text-accent tracking-[0.2em]">SECTION 01</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-8">Systems Architecture</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Designing scalable distributed systems across BioTech, Telco, and SaaS.
            </p>
            <ul className="space-y-4 font-mono text-sm text-gray-500 mb-12">
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Microservices</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> API-first design (REST & GraphQL)</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Domain-driven modeling</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Backend platforms built in FastAPI and Django</li>
            </ul>
            <div className="p-6 border border-accent/20 bg-accent/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent/50 group-hover:bg-accent transition-colors duration-500" />
              <p className="text-sm text-gray-300 relative z-10">
                <span className="text-accent font-mono mr-3 text-xs tracking-[0.15em]">IMPACT //</span>
                Reduced time-to-market by <span className="text-white">30%</span> through strong system design and API governance.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <ArchitectureVisual />
          </Reveal>
        </div>
      </section>

      {/* 02 Production AI */}
      <section id="ai" className="relative py-32 px-8 md:px-24 overflow-hidden border-t border-white/5 z-10">
        <div className="oversized-label">AI</div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal className="md:order-2">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-mono text-accent tracking-[0.2em]">SECTION 02</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-8">Production AI</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              AI systems embedded into real platforms — not isolated demos.
            </p>
            <ul className="space-y-4 font-mono text-sm text-gray-500 mb-12">
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Production RAG architectures</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> MCP workflows</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> LLM + tool orchestration</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Vector search using Qdrant</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> LangChain & Vertex AI integrations</li>
            </ul>
            <div className="p-6 border border-accent/20 bg-accent/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent/50 group-hover:bg-accent transition-colors duration-500" />
              <p className="text-sm text-gray-300 relative z-10">
                <span className="text-accent font-mono mr-3 text-xs tracking-[0.15em]">IMPACT //</span>
                Implemented AI workflows integrated across internal enterprise systems.
              </p>
            </div>
          </Reveal>
          <Reveal className="md:order-1">
            <AIVisual />
          </Reveal>
        </div>
      </section>

      {/* 03 Infrastructure & Reliability */}
      <section id="reliability" className="relative py-32 px-8 md:px-24 overflow-hidden border-t border-white/5 z-10">
        <div className="oversized-label">RELIABILITY</div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-mono text-accent tracking-[0.2em]">SECTION 03</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-8">Infrastructure & Reliability</h2>
            <ul className="space-y-4 font-mono text-sm text-gray-500 mb-12">
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> AWS & GCP cloud architecture</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Docker & Kubernetes standardization</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> CI/CD automation</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Observability & monitoring</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> SLA/SLO ownership</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Incident response leadership</li>
            </ul>
            <div className="p-6 border border-accent/20 bg-accent/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent/50 group-hover:bg-accent transition-colors duration-500" />
              <p className="text-sm text-gray-300 relative z-10">
                <span className="text-accent font-mono mr-3 text-xs tracking-[0.15em]">IMPACT //</span>
                Improved delivery reliability by <span className="text-white">25%</span>.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <ReliabilityVisual />
          </Reveal>
        </div>
      </section>

      {/* 04 Engineering Leadership */}
      <section id="leadership" className="relative py-32 px-8 md:px-24 overflow-hidden border-t border-white/5 z-10">
        <div className="oversized-label">LEADERSHIP</div>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-mono text-accent tracking-[0.2em]">SECTION 04</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-8">Engineering Leadership</h2>
            <p className="text-lg text-gray-400 mb-16">Execution discipline at scale.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-t border-white/10 pt-6">
                <div className="text-4xl font-light text-white mb-3">19</div>
                <div className="text-sm font-mono text-gray-500">Engineers Led (5 Leads, 14 Staff)</div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="text-4xl font-light text-white mb-3">15%</div>
                <div className="text-sm font-mono text-gray-500">Reduced Turnover</div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="text-4xl font-light text-white mb-3">6</div>
                <div className="text-sm font-mono text-gray-500">Major Initiatives Delivered</div>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm text-gray-500">
              <ul className="space-y-4">
                <li className="flex items-center gap-4"><span className="w-4 h-[1px] bg-accent/50" /> Hiring & mentorship</li>
                <li className="flex items-center gap-4"><span className="w-4 h-[1px] bg-accent/50" /> Performance reviews</li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-center gap-4"><span className="w-4 h-[1px] bg-accent/50" /> Agile/Scrum delivery</li>
                <li className="flex items-center gap-4"><span className="w-4 h-[1px] bg-accent/50" /> Roadmap ownership & Cross-team alignment</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 Hands-On Development */}
      <section id="build" className="relative py-32 px-8 md:px-24 overflow-hidden border-t border-white/5 z-10">
        <div className="oversized-label">BUILD</div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xs font-mono text-accent tracking-[0.2em]">SECTION 05</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-8">Hands-On Development</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Leadership without distance from the code.
            </p>
            <ul className="space-y-4 font-mono text-sm text-gray-500">
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Backend development in Python (FastAPI, Django, DRF)</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> GraphQL schema design</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> React & Next.js frontend work</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Database design (PostgreSQL, MongoDB, MySQL)</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Vector databases (Qdrant)</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> LLM integration & tool calling</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> CI/CD pipeline authoring</li>
              <li className="flex items-center gap-4 hover:text-gray-300 transition-colors"><span className="w-4 h-[1px] bg-accent/50" /> Production debugging & performance tuning</li>
            </ul>
          </Reveal>
          <Reveal>
            <BuildVisual />
          </Reveal>
        </div>
      </section>

      {/* Selected Systems */}
      <section className="relative py-32 px-8 md:px-24 border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-16">Selected Systems</h2>
            <div className="space-y-12">
              {[
                {
                  title: "Enterprise Healthcare AI Platform",
                  desc: "Production RAG integration across internal knowledge systems.",
                  role: "Solutions Architect",
                  stack: "Python, Qdrant, FastAPI, React",
                  impact: "Reduced manual search time by 40%."
                },
                {
                  title: "National Education Management Platform",
                  desc: "FastAPI + Next.js cloud-based backend architecture.",
                  role: "Engineering Manager",
                  stack: "FastAPI, Next.js, PostgreSQL, GCP",
                  impact: "Scaled to support 500k+ concurrent users."
                },
                {
                  title: "High-Volume LLM Orchestration Engine",
                  desc: "Infrastructure scaling AI workloads in production.",
                  role: "Lead Architect",
                  stack: "Kubernetes, Vertex AI, Redis",
                  impact: "Processed 1M+ daily inference requests reliably."
                },
                {
                  title: "Laboratory Management API System",
                  desc: "GraphQL + FastAPI backend on GCP.",
                  role: "Backend Lead",
                  stack: "GraphQL, FastAPI, GCP",
                  impact: "Standardized data access across 12 laboratory locations."
                },
                {
                  title: "Bulk AI Processing Platform",
                  desc: "Django + DRF enterprise-scale AI pipeline.",
                  role: "Engineering Manager",
                  stack: "Django, DRF, Celery, AWS",
                  impact: "Automated processing of 50TB+ of unstructured data."
                },
                {
                  title: "Cloud Architecture Standardization Initiative",
                  desc: "Kubernetes, CI/CD, monitoring, cost governance.",
                  role: "Head of Technology",
                  stack: "Kubernetes, Terraform, Datadog",
                  impact: "Reduced cloud spend by 20% while improving uptime."
                },
                {
                  title: "Telecom Data Exchange Platform",
                  desc: "Two-way communication system built with Python & Linux.",
                  role: "Lead Developer",
                  stack: "Python, Linux, RabbitMQ",
                  impact: "Handled 5000+ messages per second with zero data loss."
                },
                {
                  title: "High-Availability Messaging Services",
                  desc: "SMS & IVR systems maintaining 99.9% uptime.",
                  role: "Software Engineer",
                  stack: "Node.js, Redis, AWS",
                  impact: "Maintained 99.9% uptime during peak holiday traffic."
                }
              ].map((sys, i) => (
                <div key={i} className="group border-b border-white/10 pb-8 hover:border-accent/50 transition-all duration-500 relative interactive">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 -mx-8 px-8" />
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 relative z-10">
                    <div className="md:col-span-2 flex gap-4 md:gap-6">
                      <div className="font-mono text-xs text-white/20 mt-1.5 hidden sm:block">0{i + 1}</div>
                      <div>
                        <h4 className="text-xl text-white/90 mb-2 group-hover:text-accent transition-colors duration-300 flex items-center gap-3">
                          {sys.title}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0">→</span>
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{sys.desc}</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs text-gray-500 space-y-2">
                      <div><span className="text-white/40">ROLE:</span> {sys.role}</div>
                      <div><span className="text-white/40">STACK:</span> {sys.stack}</div>
                    </div>
                    <div className="font-mono text-xs text-accent">
                      {sys.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience Evolution */}
      <section className="relative py-32 px-8 md:px-24 border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-16">Experience Evolution</h2>
            <div className="relative border-l border-white/10 ml-4 space-y-12">
              {[
                { role: "Head of Technology / Engineering Manager", impact: "Led strategic architecture and engineering execution across multiple product lines." },
                { role: "Backend Engineering Manager", impact: "Scaled backend teams and standardized API development practices." },
                { role: "Lead Developer", impact: "Architected core distributed systems and mentored junior engineers." },
                { role: "Software Engineer", impact: "Built high-availability messaging and data exchange platforms." }
              ].map((exp, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute left-[-5px] top-2.5 w-2 h-2 bg-bg border border-accent rounded-full group-hover:bg-accent transition-colors duration-300 z-10" />
                  <div className="absolute left-[-1px] top-4 w-[1px] h-0 bg-accent/50 group-hover:h-[calc(100%+3rem)] transition-all duration-500 -z-0" />
                  <h4 className="text-lg text-white/90 mb-2 group-hover:text-white transition-colors">{exp.role}</h4>
                  <p className="text-sm font-mono text-gray-500 group-hover:text-gray-400 transition-colors">{exp.impact}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Impact */}
      <section className="relative py-32 px-8 md:px-24 border-t border-white/5 text-center z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
              {[
                { val: "19", label: "Engineers Led" },
                { val: "30%", label: "Faster Time-to-Market" },
                { val: "25%", label: "Reliability Improvement" },
                { val: "15%", label: "Turnover Reduction" },
                { val: "99.9%", label: "Uptime" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center">
                  <div className="text-4xl md:text-5xl font-light text-white mb-4">{stat.val}</div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stack */}
      <section className="relative py-32 px-8 md:px-24 border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {[
                { category: "Backend", items: ["Python", "FastAPI", "Django", "DRF", "GraphQL"] },
                { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
                { category: "Cloud & DevOps", items: ["AWS", "GCP", "Kubernetes", "Docker", "CI/CD"] },
                { category: "AI / LLM", items: ["LangChain", "Vertex AI", "MCP", "RAG"] },
                { category: "Databases", items: ["PostgreSQL", "MongoDB", "Qdrant", "Redis"] }
              ].map((group, i) => (
                <div key={i}>
                  <h4 className="text-xs font-mono text-white mb-6 uppercase tracking-widest">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, j) => (
                      <span key={j} className="px-3 py-1.5 text-[11px] font-mono text-gray-400 border border-white/10 rounded-full hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center font-mono text-xs text-gray-600 z-10 relative">
        <p>Leandro Manuel Zulaybar &copy; {new Date().getFullYear()}</p>
        <p className="mt-2">Reliability is a feature. Execution quality matters.</p>
      </footer>
    </div>
  );
}
