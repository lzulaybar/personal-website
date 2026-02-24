import React, { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

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
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ contain: 'strict' }}>
    <div className="absolute inset-0 bg-grid grid-drift opacity-[0.04]" />
    <div className="glow-orb glow-orb-1" />
    <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] border border-white/[0.05] rounded-full animate-spin-slow" style={{ transformOrigin: 'center' }}>
      <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent/40 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(92,128,166,0.5)]" />
    </div>
  </div>
);

// SVG Components for abstract visuals
const ArchitectureVisual = () => (
  <div className="layer-container relative w-full h-80 flex items-center justify-center perspective-1000" style={{ contain: 'layout paint' }}>
    <div className="absolute w-48 h-48 border border-white/20 layer-plane bg-bg/90" style={{ transform: 'rotateX(60deg) rotateZ(45deg) translateZ(15px)' }} />
    <div className="absolute w-48 h-48 border border-white/20 layer-plane bg-bg/90" style={{ transform: 'rotateX(60deg) rotateZ(45deg) translateZ(0px)' }} />
    <div className="absolute w-48 h-48 border border-white/20 layer-plane bg-bg/90" style={{ transform: 'rotateX(60deg) rotateZ(45deg) translateZ(-15px)' }} />
    <div className="absolute w-full h-full flex flex-col items-center justify-center gap-12 pointer-events-none">
       <div className="w-1.5 h-1.5 bg-accent rounded-full" />
       <div className="w-1.5 h-1.5 bg-accent rounded-full" />
       <div className="w-1.5 h-1.5 bg-accent rounded-full" />
    </div>
  </div>
);

const AIVisual = () => (
  <div className="relative w-full h-80 flex items-center justify-center" style={{ contain: 'layout paint' }}>
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
  <div className="relative w-full h-80 flex flex-col items-center justify-center gap-6" style={{ contain: 'layout paint' }}>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="w-56 h-8 border border-white/20 flex items-center px-4 transition-transform duration-700 hover:translate-x-4 bg-bg">
        <div className="w-2 h-2 bg-accent/50" />
        <div className="ml-auto text-[10px] font-mono text-white/30">L{i}</div>
      </div>
    ))}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-48 bg-white/10 -z-10" />
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-gray-300 font-sans selection:bg-accent/30 relative">
      <SideNav />
      <BackgroundEffects />
      
      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden z-10">
        <Reveal className="max-w-5xl relative">
          <div className="absolute -left-8 md:-left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          <h1 className="text-5xl md:text-[5.5rem] font-light tracking-tight text-white mb-8 leading-[1.1]">
            Engineering Leader.<br />AI & Distributed Platforms.
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mb-8">
            <h2 className="text-lg md:text-xl font-mono text-accent bg-accent/10 px-4 py-2 border border-accent/20 inline-block">
              Leandro Manuel Zulaybar — Staff+ / Engineering Manager
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl leading-relaxed">
            I architect production AI systems, scale distributed platforms, and build engineering organizations that deliver reliable software.
          </p>
          
          <div className="flex flex-wrap gap-6 font-mono text-xs tracking-[0.15em] uppercase mb-12">
            <a href="#systems" className="px-6 py-3 bg-white text-bg hover:bg-gray-200 transition-colors interactive">
              View Architecture
            </a>
            <a href="#contact" className="px-6 py-3 border border-white/20 text-white hover:bg-white/5 transition-colors interactive">
              Let's Talk Scale
            </a>
          </div>
          <div className="flex flex-wrap gap-8 font-mono text-xs tracking-[0.15em] uppercase">
            <a href="https://drive.google.com/file/d/1l_RwHayHuwvLvjz5FcC493Jup1lUfemg/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors interactive">
              <span className="w-6 h-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
              <span className="smooth-underline">Resume</span>
            </a>
            <a href="mailto:leandro.zulaybar@gmail.com" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors interactive">
              <span className="w-6 h-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
              <span className="smooth-underline">Email</span>
            </a>
            <a href="https://www.linkedin.com/in/anjo-zulaybar/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors interactive">
              <span className="w-6 h-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
              <span className="smooth-underline">LinkedIn</span>
            </a>
            <a href="https://github.com/lzulaybar" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors interactive">
              <span className="w-6 h-[1px] bg-white/20 group-hover:bg-accent transition-colors" />
              <span className="smooth-underline">GitHub</span>
            </a>
          </div>
        </Reveal>
        
        <div className="absolute bottom-12 left-8 md:left-24 flex items-center gap-4 animate-pulse opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Scroll</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="relative py-24 px-8 md:px-24 z-10 border-t border-white/5">
        <Reveal className="max-w-4xl">
          <div className="text-2xl md:text-4xl leading-snug text-gray-300 font-light mb-8">
            I architect scalable systems and lead engineering teams that deliver reliably under pressure.
          </div>
          <div className="text-base md:text-lg leading-relaxed text-gray-500 max-w-3xl">
            Over 14+ years, I’ve transitioned from building high-availability messaging systems to leading engineering organizations of up to 19 engineers. My focus is on designing distributed platforms that handle massive scale, integrating production-ready AI workflows, and cultivating engineering cultures obsessed with reliability and execution.
          </div>
        </Reveal>
      </section>

      {/* Where I Add Leverage */}
      <section className="relative py-32 px-8 md:px-24 border-t border-white/5 z-10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-2xl font-light text-white">Where I Add Leverage</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 reveal-stagger">
              <div>
                <h3 className="text-xl text-white mb-4">Series B–C Scaling</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Transitioning from MVP architecture to robust, distributed platforms capable of handling enterprise load and strict compliance requirements.</p>
              </div>
              <div>
                <h3 className="text-xl text-white mb-4">AI Transformation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Moving beyond LLM prototypes to deploying secure, observable, and cost-efficient production AI systems integrated into core business workflows.</p>
              </div>
              <div>
                <h3 className="text-xl text-white mb-4">Engineering Turnarounds</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Standardizing CI/CD, enforcing cloud governance, and rebuilding engineering culture around reliability, velocity, and SLA discipline.</p>
              </div>
            </div>
          </Reveal>
        </div>
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
            <h2 className="text-3xl md:text-5xl font-light text-white mb-8">Systems Architecture</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-6 leading-relaxed max-w-2xl">
              Establishing architectural direction, defining system boundaries, and enforcing API governance to ensure long-term scalability.
            </p>
            <div className="space-y-8 mb-12 reveal-stagger">
              <div>
                <h4 className="text-white font-medium mb-2 text-lg">Domain Modeling & Service Boundaries</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Defined decoupled microservices using API-first design (REST & GraphQL), enforcing long-term scalability discipline across BioTech, Telco, and SaaS.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2 text-lg">High-Throughput Distributed Platforms</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Established architectural direction for robust core platforms leveraging FastAPI and Django to process high-throughput transactional data with strict data integrity.</p>
              </div>
            </div>
            <div className="p-6 border border-accent/20 bg-accent/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent/50 group-hover:bg-accent transition-colors duration-500" />
              <p className="text-sm text-gray-300 relative z-10">
                <span className="text-accent font-mono mr-3 text-xs tracking-[0.15em]">IMPACT //</span>
                Reduced time-to-market by <span className="text-white font-medium">30%</span> through decisive system design and centralized API governance.
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
            <h2 className="text-3xl md:text-5xl font-light text-white mb-8">Production AI</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-6 leading-relaxed max-w-2xl">
              Designing and operating production-grade RAG systems and orchestration layers under load, enforcing observability and cost discipline.
            </p>
            <div className="space-y-8 mb-12 reveal-stagger">
              <div>
                <h4 className="text-white font-medium mb-2 text-lg">Enterprise RAG & Vector Infrastructure</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Deployed production Retrieval-Augmented Generation workflows and Qdrant vector databases to securely unlock proprietary enterprise knowledge at scale.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2 text-lg">LLM Orchestration & Cost Controls</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Operated MCP workflows and LangChain/Vertex AI integrations under load, enforcing strict observability, token efficiency, and reliability.</p>
              </div>
            </div>
            <div className="p-6 border border-accent/20 bg-accent/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent/50 group-hover:bg-accent transition-colors duration-500" />
              <p className="text-sm text-gray-300 relative z-10">
                <span className="text-accent font-mono mr-3 text-xs tracking-[0.15em]">IMPACT //</span>
                Deployed production RAG and orchestration pipelines processing enterprise data daily with observability and cost controls.
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
            <h2 className="text-3xl md:text-5xl font-light text-white mb-8">Infrastructure & Reliability</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-6 leading-relaxed max-w-2xl">
              Owning 99.9% uptime through cloud governance, Kubernetes standardization, and SLA/SLO discipline.
            </p>
            <div className="space-y-8 mb-12 reveal-stagger">
              <div>
                <h4 className="text-white font-medium mb-2 text-lg">Cloud Governance & Platform Standardization</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Standardized AWS and GCP deployments using Docker and Kubernetes, unifying CI/CD pipelines to ensure consistent, secure, and rapid delivery.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2 text-lg">Incident Response & Uptime Ownership</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Enforced post-mortem discipline and comprehensive Datadog monitoring to proactively detect anomalies, leading rapid incident resolution.</p>
              </div>
            </div>
            <div className="p-6 border border-accent/20 bg-accent/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent/50 group-hover:bg-accent transition-colors duration-500" />
              <p className="text-sm text-gray-300 relative z-10">
                <span className="text-accent font-mono mr-3 text-xs tracking-[0.15em]">IMPACT //</span>
                Standardized Kubernetes architecture and CI/CD pipelines to improve delivery reliability by <span className="text-white font-medium">25%</span>.
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
            <h2 className="text-3xl md:text-5xl font-light text-white mb-8">Engineering Leadership</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-2xl leading-relaxed">
              Scaling teams, owning roadmaps, and driving cross-functional alignment to deliver organizational impact.
            </p>
            <p className="text-md text-gray-300 mb-16 max-w-2xl leading-relaxed">
              Accountable for architectural integrity, AI platform evolution, and engineering execution across product lines.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">
              <div className="border-t border-white/10 pt-6">
                <div className="text-4xl md:text-5xl font-light text-white mb-3">19</div>
                <div className="text-sm font-mono text-gray-500">Engineers Led<br/><span className="text-xs opacity-70">(5 Leads, 14 Staff)</span></div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="text-4xl md:text-5xl font-light text-white mb-3">15%</div>
                <div className="text-sm font-mono text-gray-500">Reduced<br/>Turnover</div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="text-4xl md:text-5xl font-light text-white mb-3">6</div>
                <div className="text-sm font-mono text-gray-500">Major Platforms<br/>Delivered</div>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-500 reveal-stagger">
              <div>
                <h4 className="text-white font-medium mb-3 text-lg">Team Scaling & Hiring Authority</h4>
                <p className="leading-relaxed">Owned hiring pipelines, structured performance reviews, and established mentorship programs to elevate engineering standards and reduce turnover.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3 text-lg">Platform-Level Decision Making</h4>
                <p className="leading-relaxed">Managed Agile/Scrum processes, roadmap execution, and cross-functional alignment to ensure predictable, high-quality releases aligned with business goals.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>



      {/* Selected Systems */}
      <section id="systems" className="relative py-32 px-8 md:px-24 border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-2xl font-light text-white">Architectural Case Studies</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Enterprise Cloud Infrastructure Consolidation & Governance",
                  problem: "Infrastructure sprawl across multiple products resulted in oversized compute specs, abandoned projects, and an unoptimized GCP spend of ~$40,000/month.",
                  constraints: "Required zero-downtime migration for active production services while untangling isolated Kubernetes clusters, databases, and fragmented CI/CD pipelines.",
                  architecture: "Consolidated fragmented infrastructure into a single multi-tenant GKE cluster. Enforced logical isolation via Kubernetes namespaces, strict RBAC, and resource quotas.",
                  decisions: "Decommissioned orphaned projects, consolidated databases, right-sized compute nodes, and standardized CI/CD deployment paths with automated scaling policies.",
                  results: "Reduced monthly GCP expenditure from ~$40,000 to ~$8,000 (an 80% reduction). Improved system performance through optimized resource utilization and established deployment consistency across all teams.",
                  lessons: "Infrastructure sprawl is an organizational anti-pattern; centralized governance with namespace-level isolation provides better security and cost control than physical cluster separation.",
                  stack: "GCP, GKE, Kubernetes, Docker, CI/CD"
                },
                {
                  title: "Enterprise Medical AI Triage Platform",
                  problem: "High volume of patient intake requests overwhelming clinical staff, leading to delayed triaging and response times.",
                  constraints: "Strict HIPAA compliance, zero data retention in third-party LLM APIs, and high accuracy requirements.",
                  architecture: "Deployed a localized RAG pipeline using Qdrant for vector search and an open-weight LLM fine-tuned for medical entity extraction. Built on FastAPI with strict role-based access control (RBAC).",
                  decisions: "Chose localized inference over managed cloud LLMs to satisfy compliance. Implemented strict role-based access controls at the vector level.",
                  results: "Automated initial triage routing for 80% of incoming requests, reducing average patient wait time by 45 minutes.",
                  lessons: "Localized inference is mandatory for strict compliance; optimizing embedding models for medical terminology yielded higher accuracy than scaling the LLM size.",
                  stack: "Python, FastAPI, Qdrant, React, Local LLMs"
                },
                {
                  title: "School / Student Management System",
                  problem: "Legacy monolithic system crashed during peak enrollment periods due to database locks and inefficient querying.",
                  constraints: "Zero data loss requirement, seamless migration during the academic year, and limited infrastructure budget.",
                  architecture: "Migrated to a decoupled microservices architecture using Django and PostgreSQL. Implemented read-replicas and Redis caching.",
                  decisions: "Separated read and write workloads at the database layer to handle the 90/10 read/write split during enrollment spikes.",
                  results: "Successfully handled 300% traffic surges during enrollment with zero downtime. Reduced page load times from 8s to under 800ms.",
                  lessons: "Database connection pooling and read-replicas resolved burst scaling more effectively than application-level horizontal scaling.",
                  stack: "Django, PostgreSQL, Redis, React, GCP"
                },
                {
                  title: "LLM Marketing Intelligence Engine",
                  problem: "Marketing teams spent days manually analyzing fragmented campaign data across multiple platforms to generate insights.",
                  constraints: "High API rate limits, unpredictable burst traffic, and strict cost controls per query.",
                  architecture: "Built an orchestration layer using Kubernetes and LangChain to queue, batch, and route data extraction requests to Vertex AI.",
                  decisions: "Implemented a Redis-backed priority queue to manage rate limits and ensure critical requests bypassed batching delays.",
                  results: "Processed 500k+ daily data points reliably. Reduced report generation time from 3 days to 15 minutes while optimizing compute costs by 20%.",
                  lessons: "Token-level observability and request batching are mandatory for managing production LLM costs at scale.",
                  stack: "Kubernetes, Vertex AI, LangChain, Redis, Python"
                }
              ].map((sys, i) => (
                <div key={i} className="group border-t border-white/10 pt-12 pb-12 hover:bg-white/[0.01] transition-all duration-500 relative interactive -mx-8 px-8">
                  <div className="absolute left-0 top-0 w-[2px] h-0 bg-accent group-hover:h-full transition-all duration-500" />
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                    <div className="lg:col-span-4">
                      <div className="font-mono text-xs text-accent tracking-[0.2em] mb-4">0{i + 1} // SYSTEM</div>
                      <h4 className="text-2xl text-white mb-4 group-hover:text-accent transition-colors duration-300">
                        {sys.title}
                      </h4>
                      <div className="font-mono text-xs text-gray-500 mt-auto pt-4 border-t border-white/5 inline-block">
                        <span className="text-white/30 mr-2">STACK:</span> {sys.stack}
                      </div>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="text-sm font-medium text-white mb-2">Problem</h5>
                        <p className="text-gray-400 text-sm leading-relaxed">{sys.problem}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white mb-2">Constraints</h5>
                        <p className="text-gray-400 text-sm leading-relaxed">{sys.constraints}</p>
                      </div>
                      <div className="md:col-span-2 border-t border-white/5 pt-6 mt-2">
                        <h5 className="text-sm font-medium text-white mb-2">Architecture & Decisions</h5>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{sys.architecture}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{sys.decisions}</p>
                      </div>
                      <div className="md:col-span-2 p-5 bg-accent/[0.03] border border-accent/10 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-xs font-mono text-accent tracking-[0.1em] mb-2 uppercase">Results</h5>
                            <p className="text-white font-medium text-sm">{sys.results}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-mono text-accent tracking-[0.1em] mb-2 uppercase">Lessons Learned</h5>
                            <p className="text-gray-400 text-sm">{sys.lessons}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership Trajectory */}
      <section className="relative py-32 px-8 md:px-24 border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-16">Leadership Trajectory</h2>
            <div className="relative border-l border-white/10 ml-4 space-y-12">
              {[
                { role: "Head of Technology / Engineering Manager", impact: "Accountable for architectural integrity, AI platform evolution, and engineering execution across product lines." },
                { role: "Backend Engineering Manager", impact: "Scaled backend teams, enforced API governance, and optimized cloud infrastructure." },
                { role: "Lead Developer", impact: "Architected core distributed systems and established CI/CD automation." },
                { role: "Software Engineer", impact: "Built high-availability messaging and data exchange platforms." }
              ].map((exp, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute left-[-5px] top-2.5 w-2 h-2 bg-bg border border-accent rounded-full group-hover:bg-accent transition-colors duration-300 z-10" />
                  <div className="absolute left-[-1px] top-4 w-[1px] h-0 bg-accent/50 group-hover:h-[calc(100%+3rem)] transition-all duration-500 -z-0" />
                  <h4 className="text-lg text-white mb-2 group-hover:text-accent transition-colors">{exp.role}</h4>
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

      {/* Architectural Patterns */}
      <section className="relative py-32 px-8 md:px-24 border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-2xl font-light text-white">Architectural & Platform Patterns</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 reveal-stagger">
              {[
                "API-First Governance & Service Boundaries",
                "LLM Orchestration & Tool Calling Pipelines",
                "Vector Search Infrastructure & RAG",
                "CI/CD Standardization & Deployment Automation",
                "Incident Response Loops & SLO Enforcement",
                "Engineering Hiring & Team Topologies"
              ].map((pattern, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <span className="w-4 h-[1px] bg-accent/50 mt-2 group-hover:w-6 transition-all" /> 
                  <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors">{pattern}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-32 px-8 md:px-24 border-t border-white/5 z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Ready to scale your platform?</h2>
            <p className="text-lg text-gray-400 mb-12">
              Let's talk about architecture, AI integration, and engineering leadership.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:leandro.zulaybar@gmail.com" className="px-8 py-4 bg-white text-bg hover:bg-gray-200 transition-colors font-mono text-sm tracking-widest uppercase interactive w-full sm:w-auto">
                Email Me
              </a>
              <a href="https://www.linkedin.com/in/anjo-zulaybar/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/20 text-white hover:bg-white/5 transition-colors font-mono text-sm tracking-widest uppercase interactive w-full sm:w-auto">
                Connect on LinkedIn
              </a>
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
