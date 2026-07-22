import { useState, useEffect, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Linkedin, ExternalLink, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const phrases = [
    "Finance & Strategy Student",
    "Investment Analyst",
    "M&A Enthusiast",
    "Capital Markets"
  ];

  // Typing effect
  useEffect(() => {
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end of phrase
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#f97316] selection:text-white">
      {/* Background Animation */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">
        {/* Animated Grid */}
        <div className="absolute inset-[-100%] bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid"></div>
        
        {/* Subtle glowing orbs for depth */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#f97316] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#ea580c] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        
        {/* Vignette effect to fade out edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)]"></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 pt-6 px-6 md:px-10 flex justify-between items-start pointer-events-none">
        {/* Logo */}
        <div className="pointer-events-auto">
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="group flex items-center">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#f97316]/50 group-hover:bg-[#f97316]/10 transition-all duration-300 backdrop-blur-md shadow-lg">
              <span className="font-heading font-bold text-white group-hover:text-[#f97316] text-lg tracking-tighter transition-colors">ON</span>
            </div>
          </a>
        </div>

        {/* Floating Pill Nav (Desktop) */}
        <nav className="hidden md:flex pointer-events-auto absolute left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 items-center gap-8 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`font-sans text-sm font-medium transition-all duration-300 relative ${
                activeSection === link.href.substring(1) ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#f97316] rounded-full shadow-[0_0_8px_#f97316]"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right Action */}
        <div className="pointer-events-auto hidden md:block">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="text-sm font-medium text-white/80 hover:text-white border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full transition-all backdrop-blur-md flex items-center gap-2"
          >
            Let's Talk <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-[5.5vw] font-bold font-heading leading-tight mb-6"
            >
              I'm <span className="text-highlight">Owen Nguyen</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-3xl text-white/80 font-medium mb-12 h-10 flex items-center justify-center gap-1"
            >
              <span>{typedText}</span>
              <span className="w-[3px] h-[1.2em] bg-white/80 animate-pulse"></span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-heading font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Contact Me
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
          >
            About Me
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-2/5 flex justify-center"
            >
              <div className="relative w-64 h-80 md:w-full md:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src="/headshot.jpg" 
                  alt="Owen Nguyen" 
                  className="object-cover object-top origin-top w-full h-full transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="pointer-events-none absolute inset-0 left-0 top-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-2/3 space-y-6 text-white/80 text-lg leading-relaxed"
            >
              <p>
                Hi! I’m <span className="text-highlight font-medium">Owen Nguyen</span>, an Economics and Business Analytics student at DePauw University with a strong interest in finance, enterprise growth, and global business. My journey started from wanting to understand how companies improve, grow across markets, and make better strategic and investment decisions.
              </p>
              <p>
                Professionally, I have completed internships in both investment banking and commercial banking, gaining experience in equity analysis, portfolio monitoring, financial modeling, and credit underwriting. Through these experiences, I’ve worked on investment research, financial analysis, data analysis, M&A and supported deal evaluation across different financial institutions.
              </p>
              <p>
                This journey is still unfolding, and I’m always excited to learn from others in the industry. Let’s connect to share ideas about markets, investing, and opportunities in finance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="max-w-5xl mx-auto px-6 py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
          >
            Education
          </motion.h2>

          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-px bg-gradient-to-b from-orange-500/45 via-white/[0.12] to-white/[0.05] shadow-[0_0_48px_-20px_rgba(249,115,22,0.2)] overflow-hidden"
            >
              <div className="rounded-2xl bg-zinc-950/90 backdrop-blur-sm p-6 md:p-8 ring-1 ring-inset ring-white/[0.06]">
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
                  <div className="flex justify-center md:block shrink-0 md:w-[min(100%,11rem)]">
                    <img
                      src="/DPU.png"
                      alt="DePauw University"
                      className="w-36 h-36 md:w-44 md:h-44 object-contain mx-auto md:mx-0"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div className="min-w-0">
                        <h3 className="text-highlight text-2xl md:text-3xl font-heading font-bold tracking-tight">
                          DePauw University
                        </h3>
                        <p className="text-[#a1a1a1] text-sm md:text-base italic mt-1">
                          Greencastle, Indiana
                        </p>
                      </div>
                      <span className="text-[#a1a1a1] text-sm md:text-base shrink-0 md:pt-1">
                        Expected May 2027
                      </span>
                    </div>
                    <p className="text-white font-bold text-lg md:text-xl mt-5">
                      B.A. in Economics and Business Analytics
                    </p>
                    <ul className="mt-6 pl-4 border-l border-white/20 space-y-4">
                      <li className="text-white text-base leading-relaxed pl-5 relative timeline-bullet">
                        <strong>Relevant Coursework:</strong>{' '}
                        Financial Accounting, Managerial Accounting, Corporate Finance, Investment Analysis & Portfolio Management, Econometrics, Money Banking, Business Analytics III, Organizational Behavior Analytics and AI, Tps: Data Visualization in Tableau.
                      </li>
                      <li className="text-white text-base leading-relaxed pl-5 relative timeline-bullet">
                        <strong>Honors & Achievements:</strong>{' '}
                        Dean's List, DePauw Distinguished Scholarship, DePauw Consulting Case Competition 2025 (3rd Place), Top 3 Finalist NCAA Analytics Challenge 2026, Stout’s FLF Valuation Advisory Case Competition (1st Place).
                      </li>
                      <li className="text-white text-base leading-relaxed pl-5 relative timeline-bullet">
                        <strong>Certifications:</strong>{' '}
                        CFA Level 1 Candidate, Securities Industry Essentials (SIE) Exam Passed, Wall Street Prep Financial & Valuation Modeling.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="max-w-5xl mx-auto px-6 py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
          >
            Experience
          </motion.h2>

          <div className="space-y-16">
            {/* Bridge Builder Strategies */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-highlight text-2xl md:text-[2rem] font-heading font-semibold">Finance & Strategy Intern</h3>
                <span className="text-white/60 text-base mt-1 md:mt-0">Jun 2026 - Present</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl text-white font-medium min-w-0">
                  <img
                    src="/BBS Logo.jpg"
                    alt=""
                    className="h-11 w-11 md:h-12 md:w-12 rounded-lg object-contain shrink-0 border border-white/10 bg-white p-1"
                    aria-hidden
                  />
                  <span>Bridge Builder Strategies</span>
                  <span className="text-white/50 text-base font-normal">| Indianapolis, IN</span>
                </div>
              </div>
              
              <ul className="mt-6 pl-5 border-l-2 border-white/10 ml-2 space-y-4">
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Conducted financial health assessment for 2+ nonprofit client engagements (representing over $5M in operating budget), analyzing 3 years of financial statements, 8+ financial ratios, and operational datasets to develop executive-ready recommendations
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Leveraged AI tools such as Claude and ChatGPT to analyze 20 industry reports and nonprofit filings, reducing manual research time by 30% while ensuring accuracy through source verification
                </li>
                 <p className="text-white text-xl font-semibold italic mt-5 mb-3">
                  BRIDGE Project: Strategic Pricing & Revenue Forecasting Framework
                </p>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Analyzed 3 years of historical pricing and financial data across 10 consulting service lines and performed competitive benchmarking analysis to identify pricing inconsistencies and revenue improvement opportunities
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Developed a scenario-based pricing and revenue forecasting model evaluating 7 pricing variables, 3 market penetration scenarios and multiple client segment to estimate revenue growth and support pricing strategy decisions
                </li>
              </ul>
            </motion.div>

            {/* Vietnam-Russia Joint Venture Bank */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-highlight text-2xl md:text-[2rem] font-heading font-semibold">Corporate Finance Intern</h3>
                <span className="text-white/60 text-base mt-1 md:mt-0">May 2025 - Aug 2025</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl text-white font-medium min-w-0">
                  <img
                    src="/vrb.png"
                    alt=""
                    className="h-11 w-11 md:h-12 md:w-12 rounded-lg object-contain shrink-0"
                    aria-hidden
                  />
                  <span>Vietnam-Russia Joint Venture Bank</span>
                  <span className="text-white/50 text-base font-normal">| Hanoi, Vietnam</span>
                </div>
              </div>
              
              <ul className="mt-6 pl-5 border-l-2 border-white/10 ml-2 space-y-4">
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Supported credit approval workflow for 3 foreign-invested manufacturers (~$550K loan facilities), expanding operations into Vietnam by maintaining diligence checklists and consolidating borrower financial statements for credit committee packages
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Built cash flow and repayment capacity analysis models (DSCR, interest coverage) across 5-year loan structures and standardized input templates, improving credit analysis turnaround time by 12%
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Assisted in drafting credit memos and covenant analysis for senior bankers (BM, VP), maintained audit trail for committee submissions and supporting version tracking for materials used in credit approval discussions and syndicated loan processes
                </li>
              </ul>
            </motion.div>

            {/* VPS Securities */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-highlight text-2xl md:text-[2rem] font-heading font-semibold">Investment Advisory & Trading Intern</h3>
                <span className="text-white/60 text-base mt-1 md:mt-0">May 2024 - Aug 2024</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl text-white font-medium min-w-0">
                  <img
                    src="/vps.png"
                    alt=""
                    className="h-11 w-11 md:h-12 md:w-12 rounded-lg object-contain bg-white p-1 shrink-0 border border-white/10"
                    aria-hidden
                  />
                  <span>VPS Securities</span>
                  <span className="text-white/50 text-base font-normal">| Hanoi, Vietnam</span>
                </div>
              </div>
              
              <ul className="mt-6 pl-5 border-l-2 border-white/10 ml-2 space-y-4">
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Supported discretionary portfolio management for two client accounts (~$50K AUM) by producing performance reports, identifying risk exposures, and preparing allocation commentary for advisor portfolio review meetings
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Managed end-to-end production of weekly portfolio reporting packs, maintaining data integrity, version control, and quality control checkpoints across client-facing deliverables in support of portfolio review meetings.
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Built weekly market and earnings digests and standardized three reporting templates for portfolio updates and research notes, improving the update turnaround time by 30% through AI-assisted extraction and synthesis of earnings filings and financial statements.
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-center mb-12"
          >
            Projects & Case Competitions
          </motion.h2>

          <div className="flex md:justify-center gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-8 px-4 -mx-4">
            {/* Harvard M&A Global Case Competition 2026 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-none w-[340px] md:w-[400px] snap-start bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-highlight text-xl font-heading font-semibold">Harvard M&A Global Case Competition 2026</h3>
                  <a href="https://drive.google.com/file/d/1PbO0nRUT8csDDOv5L4w-RdhxvUTqfimM/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#f97316] transition-colors mt-1" aria-label="View Harvard M&A Global Case Project">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-white/60 text-sm mb-4 italic">Thales–Rheinmetall Merger Analysis</p>
                
                <div className="space-y-4 text-white/80 text-[0.95rem] leading-relaxed mb-6">
                  <p><strong>Context:</strong> Evaluated the strategic and financial feasibility of a proposed $91B merger between Thales and Rheinmetall, focusing on their positioning across the European aerospace and defense market..</p>
                  <p><strong>Analysis:</strong> Assessed vertical integration opportunities, operational synergies, and recurring-revenue potential. Developed a cross-selling framework using Rheinmetall’s $76B defense backlog and analyzed modernization and digital-upgrade opportunities. Also performed peer benchmarking and WACC sensitivity analysis to evaluate transaction pricing and financing capacity.</p>
                  <p><strong>Outcome:</strong> Identified potential value from expanded recurring revenue and stronger defense-market positioning, while highlighting key risks related to the acquisition premium, financing constraints, and post-merger integration.</p>
                </div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">M&A</span>
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">Valuation</span>
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">Financial Modeling</span>
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">Company Analysis</span>
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">Strategy Analysis</span>
                </div>
              </div>
            </motion.div>

            
            {/* CFA Research Challenge 2025-2026 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-none w-[340px] md:w-[400px] snap-start bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-highlight text-xl font-heading font-semibold">CFA Research Challenge 2025-2026 (Team Leader)</h3>
                  <a href="https://drive.google.com/file/d/1GlxQrGDDAZhcFEOLiq0zIOmTGWDGv0Gs/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#f97316] transition-colors mt-1" aria-label="View CFA Research Challenge Project">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-white/60 text-sm mb-4 italic">Allegion plc (NYSE: ALLE) Initiation of Coverage</p>
                
                <div className="space-y-4 text-white/80 text-[0.95rem] leading-relaxed mb-6">
                  <p><strong>Context:</strong> Led a five-student DePauw team in the CFA Institute’s global equity research competition, managing the research process and evaluating Allegion’s financial performance, competitive position, industry overview, and long-term growth prospects.</p>
                  <p><strong>Analysis:</strong> Built a valuation supported by financial-statement analysis and long-term operating assumptions. Projected approximately 6% revenue CAGR and margin expansion based on pricing power, operating leverage, digital transformation, and recurring-revenue growth. Conducted peer benchmarking, ESG analysis, and industry research to test the investment thesis and downside risks.</p>
                  <p><strong>Outcome:</strong> Issued a BUY recommendation with a $199 target price, representing 20.6% projected upside, and presented the findings through a professional equity-research report.</p>
                </div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">Equity Research</span>
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">Market Research</span>
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">Valuation</span>
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">Financial Modeling</span>
                  <span className="bg-white/5 text-white/70 px-3 py-1 rounded-full text-xs border border-white/10">ESG</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" className="max-w-5xl mx-auto px-6 py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
          >
            Leadership
          </motion.h2>

          <div className="space-y-16">
            {/* DePauw Consulting Group */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-highlight text-2xl md:text-[2rem] font-heading font-semibold">Co-President</h3>
                <span className="text-white/60 text-base mt-1 md:mt-0">Aug 2025 - Present</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="text-xl text-white font-medium"> DePauw Consulting Group <span className="text-white/50 text-base ml-2 font-normal">| Greencastle, IN</span></div>
              </div>
              
              <ul className="mt-6 pl-5 border-l-2 border-white/10 ml-2 space-y-4">
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Built a pipeline of 10+ alumni networking events, case workshops, and career sessions, connecting 80+ students with consultants, recruiters, and business professionals to expand access to consulting and finance career opportunities.
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Coordinated outreach, event logistics, and follow-up communication with alumni and corporate partners, increasing member engagement by 35% while strengthening the group’s relationship-driven programming and event execution.
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Developed company briefs, research materials, and case preparation resources for 5 student teams, helping members strengthen business problem-solving skills and prepare for consulting-style projects and competitions.
                </li>
              </ul>
            </motion.div>

            {/* DePauw Investment Group */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="text-highlight text-2xl md:text-[2rem] font-heading font-semibold">Portfolio Manager - Industrials Sector</h3>
                <span className="text-white/60 text-base mt-1 md:mt-0">Sep 2025 - Feb 2026</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="text-xl text-white font-medium"> DePauw Investment Group <span className="text-white/50 text-base ml-2 font-normal">| Greencastle, IN</span></div>
              </div>
              
              <ul className="mt-6 pl-5 border-l-2 border-white/10 ml-2 space-y-4">
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Managed an industrial fund with almost $76,000 AUM that included transportation, manufacturing, and technology equities.
                </li>
                <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                  Led a team of 3 analysts in weekly investment discussions, applying DCF and relative valuation frameworks to adjust portfolio strategy, contributing to a 6% increase in portfolio value.
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-center mb-16"
          >
            Skills & Expertise
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <ul className="space-y-6 pl-5 border-l-2 border-white/10 ml-2">
              <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                <strong className="text-white font-semibold">Advanced Excel:</strong> Pivot Tables, XLOOKUP / INDEX-MATCH, SUMIFS, data cleaning, reconciliation templates, sensitivity & scenario tables
              </li>
              <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                <strong className="text-white font-semibold">Financial Analysis:</strong> GAAP, Financial statement analysis (IS/BS/CF), working capital, income tax, depreciation, debt schedules, coverage metrics (DSCR / interest coverage), profitability analysis, risk assessment, basic DCF & comparables, basic LBO modeling
              </li>
              <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                <strong className="text-white font-semibold">Programming & Visualization:</strong> Python (Pandas for data cleaning and analysis), SQL (basic queries), Tableau (dashboard creation), Claude (Claude Code, LLMs)
              </li>
              <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                <strong className="text-white font-semibold">Market Data Tools:</strong> Bloomberg Terminal, Capital IQ, SEC EDGAR, FRED, Yahoo Finance
              </li>
              <li className="text-white/80 text-lg pl-6 relative timeline-bullet">
                <strong className="text-white font-semibold">Interests:</strong> Playing basketball, golf, traveling (have been to 20+ countries), learning new languages and cooking
              </li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg mb-12 max-w-2xl mx-auto"
          >
            Currently seeking opportunities in corporate finance, FP&A, valuation, M&A, and strategy. Available for full-time, part-time roles and internships.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=anhl.nguyenwork%40gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#f97316] text-[#f97316] font-heading font-semibold rounded-full hover:bg-[#f97316] hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(249,115,22,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            >
              <Mail className="mr-2 w-5 h-5" /> Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/owen-nguyen-depauw/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-heading font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <Linkedin className="mr-2 w-5 h-5" /> LinkedIn
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40 mt-12">
       <p>
          &copy; {new Date().getFullYear()} Owen Nguyen. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
