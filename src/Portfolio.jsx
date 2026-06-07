import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight, ExternalLink, ChevronDown } from 'lucide-react';

/* ─── Fonts & CSS ───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    :root {
      --cream:        #FDF6EC;
      --saffron-pale: #FEF0D6;
      --saffron:      #E07B1A;
      --saffron-dark: #B85E0D;
      --saffron-dim:  #F4C07A;
      --ink:          #1A1108;
      --ink-light:    #3D3020;
      --ink-muted:    #8A7A60;
      --rule:         #EDD9B8;
      --card:         rgba(255,255,255,0.88);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--cream); }
    .serif  { font-family: 'Cormorant Garamond', Georgia, serif; }
    .sans   { font-family: 'DM Sans', system-ui, sans-serif; }
    .nav-item {
      font-family: 'DM Sans', sans-serif; font-size: 0.66rem; font-weight: 500;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--ink-muted); text-decoration: none; cursor: pointer; transition: color 0.2s;
    }
    .nav-item:hover { color: var(--saffron); }
    .tag {
      display: inline-block; font-family: 'DM Sans', sans-serif;
      font-size: 0.58rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
      padding: 3px 10px; border-radius: 2px;
    }
    .tag-j  { background: #FEF3E2; color: var(--saffron-dark); }
    .tag-c  { background: #EEF2FF; color: #3730A3; }
    .tag-b  { background: #F0FDF4; color: #15803D; }
    .tag-s  { background: var(--ink); color: #fff; }
    .tag-pm { background: #F5F0FF; color: #6D28D9; }
    .tag-gh { background: #F0F9FF; color: #0369A1; }
    .pill {
      font-family: 'DM Sans', sans-serif; font-size: 0.68rem; font-weight: 500;
      padding: 5px 13px; border: 1px solid var(--rule); border-radius: 100px;
      color: var(--ink-light); background: rgba(255,255,255,0.7); transition: all 0.2s; cursor: default;
    }
    .pill:hover { border-color: var(--saffron); color: var(--saffron); }
    .pub-row { cursor: pointer; transition: background 0.18s; border-radius: 4px; }
    .pub-row:hover { background: rgba(253,246,236,0.7); }
    .pub-arrow { opacity: 0.35; transition: all 0.2s; }
    .pub-row:hover .pub-arrow { opacity: 1; transform: translate(3px,-3px); }
    .contact-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 0; border-top: 1px solid var(--rule);
      text-decoration: none; transition: padding-left 0.2s;
    }
    .contact-row:hover { padding-left: 8px; }
    .prog-track { height: 3px; border-radius: 2px; background: var(--rule); overflow: hidden; }
    .prog-fill  { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--saffron-dark), var(--saffron)); }
    .proj-card  { transition: transform 0.2s, box-shadow 0.2s; }
    .proj-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(180,90,0,0.10); }
    .ach-row { border-top: 1px solid var(--rule); padding: 14px 0; display: flex; justify-content: space-between; align-items: center; }
  `}</style>
);

/* ─── Droplets ──────────────────────────────────────────────── */
const Droplet = ({ x, delay, size, duration }) => (
  <motion.div
    initial={{ y: -size * 2, opacity: 0, scale: 0.5 }}
    animate={{ y: '108vh', opacity: [0, 0.5, 0.4, 0], scale: [0.5, 1, 1, 0.7] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeIn' }}
    style={{
      position: 'fixed', left: x, top: 0, width: size, height: size * 1.4,
      borderRadius: `${size*0.5}px ${size*0.5}px ${size*0.5}px ${size*0.5}px / ${size*0.6}px ${size*0.6}px ${size*0.5}px ${size*0.5}px`,
      border: '1.5px solid #E07B1A',
      background: 'radial-gradient(circle at 38% 32%, rgba(255,215,130,0.2), rgba(224,123,26,0.05))',
      pointerEvents: 'none', zIndex: 0,
    }}
  />
);
const DropletsLayer = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
    {Array.from({ length: 16 }, (_, i) => (
      <Droplet key={i} x={`${3 + i * 6.2}%`} delay={i * 0.6} size={13 + (i % 5) * 5} duration={8 + (i % 4) * 1.8} />
    ))}
  </div>
);

/* ─── Nav ───────────────────────────────────────────────────── */
const Nav = () => {
  const [show, setShow] = useState(true);
  const [last, setLast] = useState(0);
  useEffect(() => {
    const fn = () => { setShow(window.scrollY < 50 || window.scrollY < last); setLast(window.scrollY); };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, [last]);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const sections = ['about','experience','research','projects','portfolio','ventures','achievements','contact'];
  return (
    <motion.nav animate={{ y: show ? 0 : -70, opacity: show ? 1 : 0 }} transition={{ duration: 0.3 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: '58px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
        background: 'rgba(253,246,236,0.92)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--rule)',
      }}>
      <span className="serif" style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)' }}>Anjan Mahapatra</span>
      <div style={{ display: 'flex', gap: '22px' }}>
        {sections.map(s => <span key={s} className="nav-item" onClick={() => go(s)}>{s}</span>)}
      </div>
    </motion.nav>
  );
};

/* ─── Helpers ───────────────────────────────────────────────── */
const Label = ({ children }) => (
  <p className="sans" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--saffron)', marginBottom: '18px' }}>{children}</p>
);
const Reveal = ({ children, delay = 0, y = 22 }) => (
  <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.72, delay, ease: [0.25,0.1,0.25,1] }}>
    {children}
  </motion.div>
);
const W = ({ children, style }) => (
  <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 44px', position: 'relative', zIndex: 1, ...style }}>{children}</div>
);
const SectionWrap = ({ id, bg, children }) => (
  <section id={id} style={{ borderTop: '1px solid var(--rule)', padding: '96px 0', background: bg || 'transparent', position: 'relative', zIndex: 1 }}>
    {children}
  </section>
);

const PubRow = ({ pub, tag, tagClass }) => (
  <div className="pub-row" style={{ borderTop: '1px solid var(--rule)', padding: '24px 4px' }}
    onClick={() => pub.doi && window.open(pub.doi, '_blank')}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '9px' }}>
          <span className={`tag ${tagClass}`}>{tag}</span>
          <span className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>{pub.year}</span>
          {pub.location && <span className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>· {pub.location}</span>}
        </div>
        <h4 className="serif" style={{ fontSize: '1.08rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4, marginBottom: '4px' }}>{pub.title}</h4>
        <p className="sans" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '4px' }}>{pub.authors}</p>
        <p className="sans" style={{ fontSize: '0.72rem', color: 'var(--saffron)', fontWeight: 500, marginBottom: pub.doi ? '6px' : '10px' }}>
          {pub.venue || pub.book} · {pub.publisher}
        </p>
        {pub.doi && <p className="sans" style={{ fontSize: '0.67rem', color: 'var(--ink-muted)', marginBottom: '10px', fontFamily: 'monospace', wordBreak: 'break-all' }}>{pub.doi}</p>}
        <p className="sans" style={{ fontSize: '0.82rem', lineHeight: 1.78, color: 'var(--ink-light)' }}>{pub.desc}</p>
      </div>
      {pub.doi && <ArrowUpRight size={16} className="pub-arrow" style={{ color: 'var(--saffron)', flexShrink: 0, marginTop: '2px' }} />}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {

  /* ── PUBLICATIONS ── */
  const journals = [
    {
      title: 'Suspension Dynamics of Droplets in Acoustic and Gravitational Fields',
      authors: 'Jeyapradhap Thirisangu, Anjan Mahapatra*, Karthick Subramani',
      venue: 'Physical Review Fluids', publisher: 'American Physical Society',
      ref: 'Phys. Rev. Fluids 10, 063602', year: 'June 2025',
      doi: 'https://doi.org/10.1103/PhysRevFluids.10.063602',
      desc: 'Investigates equilibrium and dynamic behavior of droplets suspended at the intersection of acoustic radiation pressure and gravitational force inside a miniature vertical channel. Develops an analytical levitation framework validated through multiphase CFD simulation, revealing novel stable and unstable equilibrium regimes directly relevant to contactless droplet manipulation in lab-on-chip diagnostics.',
    },
    {
      title: 'Droplet Dynamics and Control in Microfluidic Platform for Enhanced System Design',
      authors: 'Anjan Mahapatra*',
      venue: 'Frontiers in Lab on a Chip Technologies', publisher: 'Royal Society of Chemistry',
      year: 'In Press', doi: null,
      desc: 'A comprehensive modeling and review study on active droplet control mechanisms — acoustic, electric, magnetic, and thermal — in microfluidic platforms. Synthesizes unified design principles for high-throughput droplet sorting systems with direct applications in point-of-care diagnostics, drug delivery, and single-cell analysis.',
    },
  ];
  const conferences = [
    {
      title: 'Optimal Transport PINNs: A Data-Efficient Approach to High-Fidelity Turbulence Modeling',
      authors: 'Anjan Mahapatra*, Nikhil Raj',
      venue: '5th Mathematical and Scientific Machine Learning Conference', publisher: 'University of Naples',
      location: 'Naples, Italy', year: 'August 2025',
      doi: 'https://www.researchgate.net/publication/392514084_Optimal_Transport_PINNs_A_Data-Efficient_Approach_to_High-Fidelity_Turbulence_Modeling',
      desc: 'Proposes an optimal transport-based training strategy for Physics-Informed Neural Networks (PINNs) that dramatically improves convergence speed and data efficiency in turbulent flow prediction. Demonstrated significant reduction in training data requirements vs. standard PINN formulations while maintaining competitive accuracy on canonical turbulence benchmarks.',
    },
    {
      title: 'Particle-Fluid Interactions in Acoustically Driven Convection System: A Study on Microbead Dynamics',
      authors: 'Anjan Mahapatra*, S. Muthu Shravan',
      venue: '2nd UK Microfluidic Conference', publisher: 'University of Leeds',
      location: 'Leeds, UK', year: 'June 2025',
      doi: 'https://www.researchgate.net/publication/392513986_Particle-Fluid_Interactions_in_Acoustically_Driven_Convection_System_A_Study_on_Microbead_Dynamics',
      desc: 'Experimental and numerical characterization of microbead trajectories in acoustically driven convective flow fields. Quantifies how acoustic streaming interacts with gravitational settling and particle inertia, providing design guidelines for next-generation acoustic cell-sorting and enrichment devices.',
    },
    {
      title: 'Numerical Investigation of Droplets in a Vertical Minichannel Subjected to Standing Acoustic Waves',
      authors: 'Jeyapradhap Thirisangu, Anjan Mahapatra*, Karthick Subramani',
      venue: '10th International & 50th National Conference on Fluid Mechanics and Fluid Power (FMFP-2023)', publisher: 'IIT Jodhpur',
      location: 'Jodhpur, India', year: 'December 2023',
      doi: 'https://www.researchgate.net/publication/385851746_Numerical_Investigation_of_droplets_in_a_vertical_minichannel_subjected_to_standing_acoustic_waves',
      desc: 'VOF-based numerical simulations capturing deformation, migration, and pressure-node trapping of droplets under standing acoustic wave fields in a vertical channel. Identifies key dimensionless parameters controlling droplet equilibrium positions and stability.',
    },
    {
      title: 'Experimental Investigation on the Influence of Acoustic Radiation Force Direction on Droplet Sorting using BAW',
      authors: 'Jeyapradhap Thirisangu, Anjan Mahapatra*, Karthick Subramani',
      venue: 'ICRAFMN-2023', publisher: 'MIT Bangalore & NIT Uttarakhand',
      location: 'Bangalore, India', year: 'July 2023',
      doi: 'https://www.researchgate.net/publication/385851927_Experimental_investigation_on_the_influence_of_acoustic_radiation_force_direction_on_droplet_sorting_using_BAW',
      desc: 'Experimental investigation using bulk acoustic wave (BAW) transducers to study how orientation and magnitude of acoustic radiation force affect droplet sorting efficiency and purity in microfluidic channels. Provides validated design guidelines for BAW-based high-throughput droplet sorters.',
    },
  ];
  const bookChapters = [
    {
      title: 'Sustainable Green Lubricants',
      authors: 'Anjan Mahapatra*, Prameet Vats, Arun Kumar Bambam, Avinash Kumar, Kishor Kumar Gajrani',
      book: 'Performance Characterization of Lubricants', publisher: 'CRC Press',
      year: 'October 2024', doi: 'https://doi.org/10.1201/9781003535447-2',
      desc: 'Surveys bio-based and renewable lubricant formulations covering base fluid selection, additive chemistry, and tribological performance benchmarks. Evaluates lifecycle environmental impact metrics and outlines industrial adoption pathways for green lubrication in precision manufacturing.',
    },
    {
      title: 'Scientific Machine Learning and Physics-Based Modeling in Manufacturing',
      authors: 'Anjan Mahapatra*, Prameet Vats, Arun Kumar Bambam, Kuldeep Saxena, Kishor Kumar Gajrani',
      book: 'Data-Driven Decision Making in Advanced Manufacturing', publisher: 'ASME',
      year: 'April 2026', doi: 'https://doi.org/10.1115/1.889312_ch2',
      desc: 'Structured overview of scientific ML paradigms — PINNs, neural operators, and hybrid physics-data models — applied to manufacturing process simulation, tool wear prediction, and quality control. Bridges classical physics-based solvers and modern data-driven approaches for industrial deployment.',
    },
    {
      title: 'Nanofluids in Lubrication and Tribology',
      authors: 'Arun Kumar Bambam, Prameet Vats, Anjan Mahapatra*',
      book: 'Fundamentals and Applications of Nanofluids', publisher: 'Elsevier',
      year: 'In Press', doi: null,
      desc: 'Reviews synthesis, characterization, and tribological properties of nanoparticle-enhanced lubricants. Covers nanoscale friction reduction mechanisms and discusses application potential in high-speed machining, bearing systems, and biomedical implant lubrication.',
    },
    {
      title: 'Ethics, Policy, and Governance in Sustainable Manufacturing',
      authors: 'Anjan Mahapatra*, Prameet Vats, Arun Kumar Bambam, Kishor Kumar Gajrani',
      book: 'Human-Centric Smart Manufacturing: Industry 5.0 and Beyond', publisher: 'ASME',
      year: 'In Press', doi: null,
      desc: 'Examines ethical dimensions and governance frameworks required as manufacturing transitions toward autonomous, AI-driven, and human-robot collaborative systems. Discusses policy instruments, regulatory gaps, and organizational responsibilities in the shift to Industry 5.0.',
    },
  ];

  /* ── GITHUB PROJECTS ── */
  const projects = [
    {
      name: 'Recurrent Language Model with LangGraph',
      url: 'https://github.com/start-again-06/Recurrent_Language_Model_Langraph',
      lang: 'Python · FastAPI · LangGraph',
      tags: ['LLM', 'RAG', 'NLP'],
      desc: 'A modular production-ready API backend for a Recurrent Language Model orchestrated through LangGraph. Combines stateful sequential inference with graph-based workflow execution — handling text preprocessing, vector store retrieval, embedding pipelines, and structured JSON output via REST endpoints. Designed for scalable, context-aware, multi-step text generation. Supports RAG workflows, multi-turn dialogue systems, and chained reasoning tasks, all containerized with Docker.',
    },
    {
      name: 'SciML for Financial Market Simulation & RL Trading',
      url: 'https://github.com/start-again-06/SciML-for-Financial-Market-Simulation-and-Reinforcement-Learning-Trading',
      lang: 'Python · PyTorch · Stable Baselines3',
      tags: ['SciML', 'RL', 'FinTech', 'Quant'],
      desc: 'A full-stack Scientific Machine Learning framework for algorithmic trading research. Formulates financial markets as Markov Decision Processes and trains RL agents (PPO, SAC, TD3, A2C, DDPG) to learn adaptive trading strategies. Includes market regime detection (bull/bear/sideways classification), portfolio dynamics modeling, and a rich visualization module covering equity curves, drawdown analysis, return distributions, and action histograms. Directly bridges my CFA knowledge with computational finance research.',
    },
    {
      name: 'RAG Assistant for Financial News',
      url: 'https://github.com/start-again-06/RAG_Assistant_Financial_News',
      lang: 'Python · LangChain · Vector DB',
      tags: ['RAG', 'FinTech', 'LLM'],
      desc: 'A Retrieval-Augmented Generation assistant purpose-built for financial news analysis. Ingests live financial news, chunks and embeds content into a vector store, and enables analysts to query, summarize, and reason over current market events using an LLM backend. Designed to reduce analyst research time and surface non-obvious cross-asset signals from large news corpora.',
    },
    {
      name: 'RustQuant — Quantitative Finance in Rust',
      url: 'https://github.com/start-again-06/RustQuant',
      lang: 'Rust',
      tags: ['Quant Finance', 'Rust', 'Systems'],
      desc: 'A contribution to and fork of the RustQuant quantitative finance library — exploring high-performance financial computation in Rust. Covers option pricing models (Black-Scholes, Monte Carlo), yield curve construction, and risk metric computation. Reflects a deliberate choice to learn Rust for systems-level financial applications where latency and memory safety matter.',
    },
    {
      name: 'MoodMate — Distress Support App for Youngsters',
      url: 'https://github.com/start-again-06/MoodMate---A-distressing-app-for-youngsters',
      lang: 'Python · NLP · Mobile',
      tags: ['Mental Health', 'AI', 'Social Impact'],
      desc: 'An AI-powered mental wellness companion designed specifically for young users experiencing emotional distress. Uses NLP-based mood detection and empathetic response generation to provide coping strategies, journaling prompts, and mood trend tracking. Reflects a belief that technology should address human vulnerability — directly informed by the user research principles from the NextLeap PM Fellowship.',
    },
    {
      name: 'Blockchain Voting System',
      url: 'https://github.com/start-again-06/Blockchain_Voting_System',
      lang: 'Solidity · Web3 · Python',
      tags: ['Blockchain', 'Web3', 'Governance'],
      desc: 'A decentralized, tamper-proof voting system built on blockchain. Implements smart contracts for vote registration, casting, and tallying — ensuring auditability and eliminating single points of failure. Designed with institutional governance use cases in mind: shareholder voting, DAO proposals, and community referendums.',
    },
    {
      name: 'AI-Integrated Dating App',
      url: 'https://github.com/start-again-06/AI-Integrated-Dating-App',
      lang: 'Python · NLP · Recommendation Systems',
      tags: ['AI', 'Consumer', 'Rec Sys'],
      desc: 'A product-thinking-first dating application that integrates AI recommendation systems to improve match quality beyond superficial swiping. Uses semantic compatibility scoring, conversation quality analysis, and behavioral pattern learning to surface better long-term compatibility signals. A consumer product experiment applying ML recommendation system design to social matching.',
    },
    {
      name: 'Travel Agent — Voice-Based AI',
      url: 'https://github.com/start-again-06/Travel_Agent_Voice_Based',
      lang: 'Python · Voice AI · LLM Agents',
      tags: ['Voice AI', 'LLM Agents', 'Consumer'],
      desc: 'A fully voice-driven travel planning agent that interprets natural language requests to research destinations, compare flights and stays, and build complete itineraries — all through conversational interaction. Uses an agentic architecture with tool-calling for real-time data retrieval. A direct prototype for the voice AI capabilities being developed in Arogyavani.',
    },
  ];

  /* ── PRODUCT PORTFOLIO (NextLeap) ── */
  const pmProjects = [
    {
      name: 'Google Maps — Monetisation for Local Businesses',
      type: 'Product Strategy',
      desc: 'Designed a monetisation framework for Google Maps targeting local SMB owners in Tier-2 and Tier-3 Indian cities. Identified the gap between high map traffic and low conversion for local merchants. Proposed a freemium listing upgrade model with performance-based ad bidding, appointment booking integration, and a "Verified Local" trust badge. Modeled revenue impact across user segments and outlined a phased GTM strategy starting with high-intent verticals (restaurants, salons, clinics).',
      skills: ['Monetisation Strategy', 'User Research', 'Competitive Analysis', 'GTM', 'SMB Product'],
    },
    {
      name: 'Swiggy Instamart — Cold Chain & Perishables Expansion',
      type: 'Product Teardown & Opportunity',
      desc: 'Deep-dive teardown of Swiggy Instamart\'s product-ops model, identifying cold chain logistics as the critical constraint limiting expansion into fresh produce, dairy, and meat. Proposed a dark kitchen partnership model for hyperlocal cold storage, a dynamic inventory algorithm for perishable demand forecasting, and a quality assurance feedback loop built into the post-delivery rating flow. Included north star metric definition and success criteria.',
      skills: ['Operations', 'Supply Chain', 'Product Metrics', 'B2C Product', 'Teardown'],
    },
    {
      name: 'LinkedIn — Creator Economy Feature Design',
      type: 'Feature Design',
      desc: 'Identified the underserved creator segment on LinkedIn — professionals who produce high-value content (long-form articles, newsletters, video explainers) but lack monetisation infrastructure. Designed a Creator Hub feature including a tipping system, paid newsletter subscriptions, a follower analytics dashboard, and a brand partnership marketplace. Defined user stories, wireframe logic, and a rollout plan with measurable adoption KPIs.',
      skills: ['Feature Design', 'Creator Economy', 'B2B2C', 'Metrics', 'User Stories'],
    },
    {
      name: 'PhonePe — Merchant Dashboard Redesign',
      type: 'UX + Product Thinking',
      desc: 'Conducted a heuristic evaluation of PhonePe\'s merchant-facing dashboard, identifying key pain points around transaction reconciliation, settlement timing transparency, and dispute resolution workflows. Proposed a redesigned merchant experience with real-time P&L visibility, one-click settlement requests, and an AI-generated weekly business digest. Grounded recommendations in merchant interviews and competitive benchmarking against Razorpay and Stripe.',
      skills: ['UX Research', 'FinTech', 'Merchant Product', 'Heuristic Evaluation', 'P&L Visibility'],
    },
  ];

  /* ── VENTURES ── */
  const ventures = [
    {
      name: 'SmartTaxz', url: 'https://smarttaxz.com/', stage: 'Pre-Series Funding',
      tagline: 'Technology-enabled Tax, Finance & Business Advisory',
      desc: 'SmartTaxz is built to democratize access to high-quality financial and tax advisory for India\'s growing base of freelancers, small businesses, and early-stage startups — segments chronically underserved by traditional CA firms. The platform combines AI-powered document processing, automated compliance workflows, and on-demand expert consultations into a unified interface. Integrating with MCA, GST, and Income Tax portals to provide real-time compliance dashboards and predictive tax planning tools. Currently in pre-series fundraising with early design partners onboarded from the MSME segment.',
      focus: ['TaxTech', 'FinTech', 'SME Compliance', 'Financial Analytics', 'AI Automation'], progress: 90,
    },
    {
      name: 'Arogyavani — Doctor Talks', url: null, stage: 'Product Development',
      tagline: 'AI-powered Healthcare Communication Platform',
      desc: 'Arogyavani addresses a critical gap in India\'s primary healthcare delivery: the breakdown in communication between doctors and patients after a consultation ends. The platform provides clinics and independent practitioners with an AI voice assistant handling appointment scheduling, post-visit follow-ups, prescription reminders, and basic symptom triage — all in regional languages. Built on a lightweight CRM for small clinics, reducing patient drop-off and freeing clinic staff from repetitive phone-based coordination. Pilot clinics onboarded in Tamil Nadu.',
      focus: ['Healthcare AI', 'Voice AI', 'CRM for Clinics', 'Multilingual NLP', 'Patient Engagement'], progress: 70,
    },
  ];

  /* ── ACHIEVEMENTS ── */
  const achievements = [
    { exam: 'XAT 2026',         score: '98.71 Percentile',  year: 'Jan 2026' },
    { exam: 'CAT 2025',         score: '99.09 Percentile',  year: 'Nov 2025' },
    { exam: 'GATE 2025 — DA',   score: 'AIR 2038',          year: 'Feb 2025' },
    { exam: 'GATE 2025 — ME',   score: 'AIR 5346',          year: 'Feb 2025' },
    { exam: 'XAT 2025',         score: '96.33 Percentile',  year: '2025' },
    { exam: 'CAT 2024',         score: '98.08 Percentile',  year: 'Nov 2024' },
    { exam: 'GATE 2024 — ME',   score: 'AIR 4214',          year: 'Feb 2024' },
    { exam: 'GATE 2023 — ME',   score: 'AIR 5098',          year: 'Feb 2023' },
    { exam: 'CAT 2023',         score: '95.46 Percentile',  year: '2023' },
    { exam: 'JEE Advanced',     score: 'AIR 21546',         year: 'Sep 2020' },
    { exam: 'JEE Mains',        score: '97.30 Percentile',  year: '2020' },
    { exam: 'NTSE — CG State',  score: 'State Rank 10',     year: 'Mar 2018' },
    { exam: 'RBI National Quiz (DD)', score: 'State Rank 2', year: '2017' },
    { exam: 'State Vigyan Paheli (CGBSE)', score: 'State Rank 7', year: 'Mar 2016' },
    { exam: 'Bal Vigyan Competition', score: 'State Rank 2', year: '2014' },
  ];

  /* ── ORG GITHUB ── */
  const orgs = [
    {
      name: 'SciML OpenLab',
      url: 'https://github.com/SciML-OpenLab',
      desc: 'An open-source organization focused on Scientific Machine Learning research and tooling. Develops frameworks bridging physics-based modeling with modern ML — covering PINNs, neural operators, and SciML applications in engineering, finance, and climate science.',
      focus: ['PINNs', 'Neural Operators', 'Scientific Computing', 'Open Research'],
    },
    {
      name: 'Curious-Ind',
      url: 'https://github.com/Curious-Ind',
      desc: 'A collaborative open-source initiative exploring AI, product, and engineering experiments at the intersection of curiosity and building. Projects range from LLM tooling and agent frameworks to data-driven product analytics and consumer AI applications.',
      focus: ['LLM Tooling', 'AI Agents', 'Product Analytics', 'Open Source'],
    },
  ];

  /* ── CONTACT ── */
  const contacts = [
    { label: 'Email',          value: 'anjanmahapatra10@gmail.com',   href: 'mailto:anjanmahapatra10@gmail.com' },
    { label: 'LinkedIn',       value: 'anjan-mahapatra-capm',         href: 'https://www.linkedin.com/in/anjan-mahapatra-capm%C2%AE-016347200/' },
    { label: 'ResearchGate',   value: 'Anjan-Mahapatra',              href: 'https://www.researchgate.net/profile/Anjan-Mahapatra' },
    { label: 'Google Scholar', value: 'Scholar Profile',              href: 'https://scholar.google.com/citations?hl=en&user=oHtSCG8AAAAJ' },
    { label: 'ORCID',          value: '0009-0007-9025-5961',          href: 'https://orcid.org/0009-0007-9025-5961' },
    { label: 'GitHub',         value: 'start-again-06',               href: 'https://github.com/start-again-06' },
  ];

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--ink)', minHeight: '100vh' }}>
      <FontLoader />
      <DropletsLayer />
      <Nav />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '110px 0 90px', position: 'relative', zIndex: 1 }}>
        <W>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.25,0.1,0.25,1] }}>
            <Label>Engineer · Product · Researcher · Finance</Label>
            <h1 className="serif" style={{ fontSize: 'clamp(3.8rem,9vw,7.5rem)', fontWeight: 300, lineHeight: 0.97, color: 'var(--ink)', letterSpacing: '-0.015em', marginBottom: '52px' }}>
              Anjan<br />Mahapatra
            </h1>
            <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', marginBottom: '44px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '720px', marginBottom: '48px' }}>
              <p className="sans" style={{ fontSize: '0.92rem', lineHeight: 1.84, color: 'var(--ink-light)' }}>
                I build at the intersection of <strong style={{ color: 'var(--ink)' }}>engineering, product, and research</strong>. Currently driving P&L, strategy, and operations at{' '}
                <span style={{ color: 'var(--saffron)', fontWeight: 500 }}>Tvasta Manufacturing Solutions</span>, while actively building two ventures in FinTech and HealthTech.
              </p>
              <p className="sans" style={{ fontSize: '0.92rem', lineHeight: 1.84, color: 'var(--ink-light)' }}>
                Published researcher in acoustofluidics and scientific ML. CFA Level 1 cleared. FRM Part 1 candidate. Top PM Fellow at NextLeap. Actively exploring roles in <strong style={{ color: 'var(--ink)' }}>Founder's Office</strong> and <strong style={{ color: 'var(--ink)' }}>Product Management</strong>.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {[
                { v: '9', l: 'Publications' },
                { v: '2', l: 'Active Ventures' },
                { v: 'CFA L1', l: 'Cleared' },
                { v: 'FRM', l: 'Part 1 Candidate' },
                { v: 'CAT', l: '99.09 Percentile' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '14px 22px', border: '1px solid var(--rule)', borderRadius: '4px', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(6px)' }}>
                  <p className="sans" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '1px' }}>{s.v}</p>
                  <p className="sans" style={{ fontSize: '0.64rem', color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </W>
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════════ */}
      <SectionWrap id="about">
        <W>
          <Reveal><Label>About Me</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '56px', maxWidth: '560px' }}>
              A generalist who goes deep.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <Reveal delay={0.1}>
              <div>
                <p className="sans" style={{ fontSize: '0.92rem', lineHeight: 1.86, color: 'var(--ink-light)', marginBottom: '20px' }}>
                  My journey began in Mechanical Engineering at <strong style={{ color: 'var(--ink)' }}>IIITDM Kancheepuram</strong>, where I discovered that the most interesting problems sit at the boundary of disciplines. I gravitated toward computational fluid dynamics and acoustics — and then toward machine learning as a tool for solving physics problems that classical methods struggle with.
                </p>
                <p className="sans" style={{ fontSize: '0.92rem', lineHeight: 1.86, color: 'var(--ink-light)', marginBottom: '20px' }}>
                  What defines me is an unusual combination: I can write a paper on Physics-Informed Neural Networks and simultaneously think about product-market fit, P&L structuring, and go-to-market strategy. Research training makes me a better operator — it teaches you to question assumptions, run controlled experiments, and update beliefs based on evidence.
                </p>
                <p className="sans" style={{ fontSize: '0.92rem', lineHeight: 1.86, color: 'var(--ink-light)' }}>
                  I am currently exploring roles in <strong style={{ color: 'var(--saffron-dark)' }}>Founder's Office</strong> and <strong style={{ color: 'var(--saffron-dark)' }}>Product Management</strong> — contexts where cross-disciplinary depth in engineering, research, operations, and finance translates directly into better product and business decisions.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div>
                <p className="sans" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '18px' }}>Core Domains</p>
                {[
                  { l: 'Engineering & Research',  d: 'CFD · Acoustofluidics · Physics-Informed ML · Scientific Computing · CAE' },
                  { l: 'Product Management',       d: 'Strategy · Discovery · Roadmapping · Analytics · GTM · User Research' },
                  { l: 'Finance',                  d: 'CFA L1 · FRM Candidate · Financial Modeling · Risk Analysis · Valuation' },
                  { l: 'P&L & Operations',         d: 'P&L Ownership · Process Optimization · Strategic Planning · Business Development' },
                ].map((d, i) => (
                  <div key={i} style={{ borderTop: '1px solid var(--rule)', padding: '15px 0' }}>
                    <p className="sans" style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '3px' }}>{d.l}</p>
                    <p className="sans" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', lineHeight: 1.6 }}>{d.d}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '20px', marginTop: '4px' }}>
                  <p className="sans" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '12px' }}>Technical Stack</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {['Python', 'Go', 'Rust', 'SQL', 'OpenFOAM', 'ANSYS', 'PyTorch', 'JAX', 'MATLAB', 'System Design'].map(s => (
                      <span key={s} className="pill">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </W>
      </SectionWrap>

      {/* ══ EXPERIENCE ════════════════════════════════════════ */}
      <SectionWrap id="experience" bg="rgba(255,255,255,0.42)">
        <W>
          <Reveal><Label>Experience</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '72px', maxWidth: '480px' }}>
              Where I've worked &amp; led.
            </h2>
          </Reveal>

          {/* Tvasta — expanded with P&L / Strategy / Ops */}
          <Reveal delay={0.07}>
            <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: '44px', marginBottom: '64px' }}>
              <div style={{ paddingTop: '4px' }}>
                <p className="sans" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '5px' }}>Tvasta Manufacturing Solutions</p>
                <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Chennai, India</p>
              </div>
              <div>
                {/* Associate role — deep elaboration */}
                <div style={{ marginBottom: '12px' }}>
                  <h3 className="serif" style={{ fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '3px' }}>Associate</h3>
                  <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Oct 2025 – Present · Full-time</p>
                </div>

                <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.84, color: 'var(--ink-light)', marginBottom: '20px' }}>
                  Tvasta is India's pioneering construction robotics company deploying concrete 3D printing at industrial scale. As Associate, I operate at the intersection of business strategy, financial oversight, and operations — with direct responsibility for initiatives that affect both the top and bottom line.
                </p>

                {/* P&L callout block */}
                <div style={{ background: 'rgba(255,248,237,0.9)', border: '1px solid var(--rule)', borderLeft: '3px solid var(--saffron)', borderRadius: '4px', padding: '20px 24px', marginBottom: '20px' }}>
                  <p className="sans" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--saffron-dark)', marginBottom: '14px' }}>P&L, Strategy & Operations — Key Responsibilities</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { area: 'P&L Ownership', detail: 'Track and manage project-level profitability — monitoring material costs, labour allocation, and margin performance across active construction projects. Build financial models for new project bids, translating engineering specifications into cost structures and pricing proposals for clients.' },
                      { area: 'Strategic Planning', detail: 'Contribute to quarterly and annual strategic planning cycles, identifying new market verticals (affordable housing, industrial construction, infrastructure) and evaluating partnership opportunities with real estate developers and government bodies. Conduct competitive intelligence on global concrete 3D printing players.' },
                      { area: 'Operations Management', detail: 'Oversee day-to-day operational cadence — coordinating between engineering, procurement, and on-site deployment teams to maintain project timelines. Identify bottlenecks in robotic construction workflows and design process interventions that reduce rework cycles and material waste.' },
                      { area: 'AI & Automation Integration', detail: 'Lead the internal deployment of AI-powered tooling — including an LLM-based document assistant for project reporting and a computer vision QC prototype for real-time print quality assessment. Both initiatives target operational cost reduction and faster project delivery.' },
                      { area: 'Business Development', detail: 'Support the company\'s commercial pipeline — preparing client proposals, techno-commercial reports, and presentation decks for institutional and government buyers. Engage directly with stakeholders during pre-sales and technical discussions.' },
                    ].map((r, i) => (
                      <div key={i}>
                        <p className="sans" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '3px' }}>{r.area}</p>
                        <p className="sans" style={{ fontSize: '0.82rem', lineHeight: 1.76, color: 'var(--ink-light)' }}>{r.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '32px' }}>
                  {['P&L Management', 'Strategic Planning', 'Business Operations', 'AI Integration', 'Financial Modeling', 'Process Optimization', 'Business Development', 'Stakeholder Management'].map(s => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', marginBottom: '28px' }} />

                {/* GET role */}
                <div style={{ marginBottom: '10px' }}>
                  <h3 className="serif" style={{ fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '3px' }}>Graduate Engineer Trainee</h3>
                  <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Jun 2024 – Sep 2025 · Full-time</p>
                </div>
                <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.84, color: 'var(--ink-light)', marginBottom: '18px' }}>
                  Joined Tvasta immediately after graduation as part of a structured engineering rotation. Worked across design, process engineering, and operations to understand the full lifecycle of robotic construction — from CAD and simulation to on-site deployment. Contributed to workflow optimization projects that reduced material waste in 3D concrete printing by refining slicing parameters and print path planning. Supported business development activities including client proposals, technical documentation, and competitive benchmarking.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {['Mechanical Engineering', 'Process Optimization', 'CAD/CAE', 'Technical Documentation', 'Operations'].map(s => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', marginBottom: '64px' }} />

          {/* IIITDM */}
          <Reveal delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: '44px', marginBottom: '64px' }}>
              <div style={{ paddingTop: '4px' }}>
                <p className="sans" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '5px' }}>IIITDM Kancheepuram</p>
                <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Chennai, India</p>
              </div>
              <div>
                {[
                  { title: 'Research Intern — Microfluidics & Scientific ML', period: '2023 – 2024', type: 'Research',
                    desc: 'Conducted research under Prof. Karthick Subramani in acoustofluidics, droplet dynamics, and Scientific Machine Learning. Focused on how acoustic radiation forces govern particle and droplet behavior in microfluidic channels — with applications in lab-on-chip diagnostics and drug delivery. On the computational side, developed Physics-Informed Neural Networks (PINNs) using optimal transport methods for high-fidelity turbulence modeling. This body of work produced two journal publications, four international conference presentations (India, UK, Italy), and contributed to multiple book chapters.',
                    skills: ['Acoustofluidics', 'CFD', 'Physics-Informed ML', 'PINNs', 'Scientific Computing', 'Python', 'OpenFOAM'] },
                  { title: 'Senior Undergraduate Teaching Assistant', period: '2023 – 2024', type: 'Academic',
                    desc: 'Selected as Senior TA for Thermal Engineering Practice. Conducted weekly tutorials, designed problem sets, and provided one-on-one mentoring to junior students on thermodynamic concepts and engineering applications.',
                    skills: ['Thermal Engineering', 'Teaching', 'Mentoring', 'Curriculum Design'] },
                ].map((r, ri) => (
                  <div key={ri}>
                    <div style={{ marginBottom: '10px' }}>
                      <h3 className="serif" style={{ fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '3px' }}>{r.title}</h3>
                      <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>{r.period} · {r.type}</p>
                    </div>
                    <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.84, color: 'var(--ink-light)', marginBottom: '18px' }}>{r.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                      {r.skills.map(s => <span key={s} className="pill">{s}</span>)}
                    </div>
                    {ri === 0 && <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '28px 0' }} />}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', marginBottom: '64px' }} />

          {/* NextLeap */}
          <Reveal delay={0.12}>
            <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: '44px' }}>
              <div style={{ paddingTop: '4px' }}>
                <p className="sans" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '5px' }}>NextLeap</p>
                <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Remote</p>
              </div>
              <div>
                <div style={{ marginBottom: '10px' }}>
                  <h3 className="serif" style={{ fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '3px' }}>Top PM Fellow</h3>
                  <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>2024 · Fellowship</p>
                </div>
                <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.84, color: 'var(--ink-light)', marginBottom: '18px' }}>
                  Completed NextLeap's highly selective Product Management Fellowship, ranked among the top cohort participants. Covered end-to-end product thinking — discovery, user research, metrics, prioritization, and GTM strategy. Worked on live PM case studies and product teardowns across B2B SaaS and consumer tech contexts.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {['Product Strategy', 'User Research', 'PRD Writing', 'Metrics & Analytics', 'GTM Strategy', 'Prioritization Frameworks'].map(s => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </W>
      </SectionWrap>

      {/* ══ RESEARCH ══════════════════════════════════════════ */}
      <SectionWrap id="research">
        <W>
          <Reveal><Label>Research &amp; Publications</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px', maxWidth: '600px' }}>
              Published across journals, conferences &amp; books.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.78, color: 'var(--ink-muted)', marginBottom: '68px', maxWidth: '580px' }}>
              Research spanning acoustofluidics, microfluidics, scientific machine learning, and sustainable manufacturing. International presentations at University of Naples, University of Leeds, and IIT Jodhpur. Published through APS, RSC, CRC Press, Elsevier, and ASME.
            </p>
          </Reveal>

          {[
            { label: 'Journal Articles', items: journals, tag: 'Journal', cls: 'tag-j' },
            { label: 'Conference Papers', items: conferences, tag: 'Conference', cls: 'tag-c' },
            { label: 'Book Chapters', items: bookChapters, tag: 'Book Chapter', cls: 'tag-b' },
          ].map((grp, gi) => (
            <Reveal key={gi} delay={0.05 + gi * 0.05}>
              <p className="sans" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: gi > 0 ? '52px 0 4px' : '0 0 4px' }}>{grp.label}</p>
              <div>
                {grp.items.map((p, i) => <PubRow key={i} pub={p} tag={grp.tag} tagClass={grp.cls} />)}
                <div style={{ borderTop: '1px solid var(--rule)' }} />
              </div>
            </Reveal>
          ))}
        </W>
      </SectionWrap>

      {/* ══ GITHUB PROJECTS ═══════════════════════════════════ */}
      <SectionWrap id="projects" bg="rgba(255,255,255,0.42)">
        <W>
          <Reveal><Label>GitHub Projects</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px', maxWidth: '560px' }}>
              Building in public.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.78, color: 'var(--ink-muted)', marginBottom: '56px', maxWidth: '560px' }}>
              Projects spanning quantitative finance, AI agents, voice interfaces, healthcare, and blockchain — each reflecting a deliberate intersection of technical depth and product thinking.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px' }}>
            {projects.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="proj-card" onClick={() => window.open(p.url, '_blank')}
                  style={{ padding: '28px', background: 'rgba(255,255,255,0.9)', border: '1px solid var(--rule)', borderRadius: '6px', cursor: 'pointer', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 className="serif" style={{ fontSize: '1.08rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35, flex: 1, paddingRight: '12px' }}>{p.name}</h3>
                    <ArrowUpRight size={15} style={{ color: 'var(--saffron)', flexShrink: 0, marginTop: '3px' }} />
                  </div>
                  <p className="sans" style={{ fontSize: '0.68rem', color: 'var(--saffron)', fontWeight: 500, marginBottom: '10px', fontFamily: 'monospace' }}>{p.lang}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
                    {p.tags.map(t => <span key={t} className="tag tag-gh">{t}</span>)}
                  </div>
                  <p className="sans" style={{ fontSize: '0.8rem', lineHeight: 1.76, color: 'var(--ink-light)' }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Org repos */}
          <Reveal delay={0.1}>
            <p className="sans" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '20px' }}>Open Source Organizations</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {orgs.map((o, i) => (
                <div key={i} onClick={() => window.open(o.url, '_blank')}
                  className="proj-card"
                  style={{ padding: '24px', background: 'rgba(255,255,255,0.9)', border: '1px solid var(--rule)', borderRadius: '6px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 className="sans" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)' }}>{o.name}</h4>
                    <ArrowUpRight size={14} style={{ color: 'var(--saffron)' }} />
                  </div>
                  <p className="sans" style={{ fontSize: '0.8rem', lineHeight: 1.72, color: 'var(--ink-light)', marginBottom: '12px' }}>{o.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {o.focus.map(f => <span key={f} className="tag tag-gh">{f}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </W>
      </SectionWrap>

      {/* ══ PRODUCT PORTFOLIO ═════════════════════════════════ */}
      <SectionWrap id="portfolio">
        <W>
          <Reveal><Label>Product Portfolio — NextLeap PM Fellowship</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px', maxWidth: '560px' }}>
              Product thinking in practice.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.78, color: 'var(--ink-muted)', marginBottom: '60px', maxWidth: '560px' }}>
              Case studies and product teardowns from the NextLeap PM Fellowship — covering strategy, feature design, operations, and monetisation for real products used by millions.
            </p>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {pmProjects.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ borderTop: '1px solid var(--rule)', padding: '28px 4px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span className="tag tag-pm">{p.type}</span>
                  </div>
                  <h3 className="serif" style={{ fontSize: '1.18rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.35 }}>{p.name}</h3>
                  <p className="sans" style={{ fontSize: '0.86rem', lineHeight: 1.82, color: 'var(--ink-light)', marginBottom: '16px' }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.skills.map(s => <span key={s} className="pill">{s}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid var(--rule)' }} />
          </div>

          <Reveal delay={0.2}>
            <a href="https://nextleap.app/portfolio/anjan-mahapatra" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '32px', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--saffron)', textDecoration: 'none' }}>
              View full NextLeap Portfolio <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </W>
      </SectionWrap>

      {/* ══ VENTURES ══════════════════════════════════════════ */}
      <SectionWrap id="ventures" bg="rgba(255,255,255,0.42)">
        <W>
          <Reveal><Label>Ventures</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px', maxWidth: '480px' }}>
              Building from zero.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.78, color: 'var(--ink-muted)', marginBottom: '60px', maxWidth: '520px' }}>
              Alongside my day job, I am actively building two ventures — one in FinTech, one in HealthTech — both solving real problems observed firsthand in the Indian market.
            </p>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {ventures.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ padding: '40px', background: 'rgba(255,255,255,0.9)', border: '1px solid var(--rule)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '6px' }}>
                    <div>
                      {v.url
                        ? <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <h3 className="serif" style={{ fontSize: '1.7rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {v.name} <ArrowUpRight size={18} style={{ color: 'var(--saffron)', marginTop: '4px' }} />
                            </h3>
                          </a>
                        : <h3 className="serif" style={{ fontSize: '1.7rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '5px' }}>{v.name}</h3>
                      }
                      <p className="sans" style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{v.tagline}</p>
                    </div>
                    <span className="tag tag-s">{v.stage}</span>
                  </div>
                  <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.84, color: 'var(--ink-light)', margin: '20px 0 24px' }}>{v.desc}</p>
                  <div style={{ marginBottom: '24px' }}>
                    <p className="sans" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '10px' }}>Focus Areas</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                      {v.focus.map(f => <span key={f} className="pill">{f}</span>)}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                      <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>Build progress</p>
                      <p className="sans" style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--saffron)' }}>{v.progress}%</p>
                    </div>
                    <div className="prog-track">
                      <motion.div className="prog-fill" initial={{ width: 0 }}
                        whileInView={{ width: `${v.progress}%` }} viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: i * 0.12, ease: 'easeOut' }} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </W>
      </SectionWrap>

      {/* ══ ACHIEVEMENTS ══════════════════════════════════════ */}
      <SectionWrap id="achievements">
        <W>
          <Reveal><Label>Achievements</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px', maxWidth: '500px' }}>
              Competitive examination record.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.78, color: 'var(--ink-muted)', marginBottom: '52px', maxWidth: '540px' }}>
              A consistent track record across national-level competitive examinations spanning management, engineering, and science — from school-level olympiads to postgraduate entrance tests.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
              {achievements.map((a, i) => (
                <div key={i} className="ach-row">
                  <div>
                    <p className="sans" style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px' }}>{a.exam}</p>
                    <p className="sans" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>{a.year}</p>
                  </div>
                  <p className="sans" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--saffron-dark)', textAlign: 'right' }}>{a.score}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--rule)' }} />
          </Reveal>
        </W>
      </SectionWrap>

      {/* ══ CONTACT ═══════════════════════════════════════════ */}
      <SectionWrap id="contact" bg="rgba(255,255,255,0.42)">
        <W>
          <Reveal><Label>Contact</Label></Reveal>
          <Reveal delay={0.05}>
            <h2 className="serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px', maxWidth: '520px' }}>
              Let's build something meaningful.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="sans" style={{ fontSize: '0.92rem', lineHeight: 1.78, color: 'var(--ink-muted)', marginBottom: '52px', maxWidth: '460px' }}>
              Open to conversations about product, AI research, financial systems, or entrepreneurship. Whether you want to collaborate, invest, hire, or exchange ideas — reach out.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ maxWidth: '520px' }}>
              {contacts.map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-row">
                  <div>
                    <p className="sans" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '2px' }}>{c.label}</p>
                    <p className="sans" style={{ fontSize: '0.86rem', fontWeight: 500, color: 'var(--ink)' }}>{c.value}</p>
                  </div>
                  <ArrowUpRight size={15} style={{ color: 'var(--saffron)', flexShrink: 0 }} />
                </a>
              ))}
              <div style={{ borderTop: '1px solid var(--rule)' }} />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="sans" style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '64px' }}>
              &copy; 2025 Anjan Mahapatra. Designed with intention.
            </p>
          </Reveal>
        </W>
      </SectionWrap>
    </div>
  );
}
