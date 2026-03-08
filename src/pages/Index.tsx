import { useState, useEffect, useRef, useCallback } from "react";
import { Circle } from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Space+Mono:wght@400;700&display=swap');

:root {
  --bg: #0B0F19;
  --card: #131A2A;
  --border: #1E293B;
  --text: #E5E7EB;
  --white: #FFFFFF;
  --cyan: #00E5FF;
  --purple: #8B5CF6;
  --muted: #6B7280;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.f-display { font-family: 'Syncopate', sans-serif; font-weight: 700; }
.f-mono { font-family: 'Space Mono', monospace; }

/* ── BUTTONS ── */
.btn-primary {
  height: 48px;
  background: var(--cyan);
  color: #000;
  font-weight: 700;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  border: none;
  border-radius: 12px;
  padding: 0 32px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: pulse-glow 2.6s ease-in-out infinite;
  transition: transform .2s ease;
  white-space: nowrap;
}
.btn-primary:hover { transform: scale(1.03); }

.btn-ghost {
  height: 48px;
  background: transparent;
  color: var(--cyan);
  border: 1.5px solid var(--cyan);
  border-radius: 12px;
  padding: 0 32px;
  cursor: pointer;
  font-weight: 700;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background .25s ease, box-shadow .25s ease;
  white-space: nowrap;
}
.btn-ghost:hover {
  background: rgba(0,229,255,.08);
  box-shadow: 0 0 20px rgba(0,229,255,.15);
}

.btn-cta {
  height: 64px;
  background: var(--cyan);
  color: #000;
  font-weight: 700;
  font-family: 'DM Sans', sans-serif;
  font-size: 19px;
  border: none;
  border-radius: 12px;
  padding: 0 52px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  animation: pulse-glow 2.6s ease-in-out infinite;
  transition: transform .2s ease;
  white-space: nowrap;
}
.btn-cta:hover { transform: scale(1.03); }

/* ── CARD ── */
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  transition: transform .3s ease, box-shadow .3s ease;
}
.card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--purple));
  opacity: 0;
  transition: opacity .3s ease;
}
.card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px rgba(0,0,0,.45); }
.card:hover::before { opacity: 1; }

/* ── TAG ── */
.tag {
  display: inline-block;
  background: rgba(139,92,246,.18);
  color: #fff;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

/* ── CYBER GRID ── */
.cyber-grid {
  background-image:
    linear-gradient(rgba(0,229,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,.05) 1px, transparent 1px);
  background-size: 44px 44px;
  animation: grid-breathe 5s ease-in-out infinite;
}

/* ── REVEAL ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.reveal.in {
  opacity: 1;
  transform: none;
}

/* ── KEYFRAMES ── */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 15px rgba(0,229,255,.4), 0 0 30px rgba(0,229,255,.15); }
  50% { box-shadow: 0 0 28px rgba(0,229,255,.65), 0 0 55px rgba(0,229,255,.25); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes ping {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.6); opacity: 0; }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes grid-breathe {
  0%, 100% { opacity: .035; }
  50% { opacity: .07; }
}
@keyframes scan {
  from { top: -4%; }
  to { top: 104%; }
}

/* ── NAV ── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease;
  border-bottom: 1px solid transparent;
}
.nav.solid {
  background: rgba(11,15,25,.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--border);
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.nav-logo .dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--cyan);
  animation: blink 2s ease infinite;
  flex-shrink: 0;
}
.nav-logo span {
  font-family: 'Syncopate', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--white);
  letter-spacing: 4px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
}
.nav-links a {
  color: var(--text);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color .2s ease;
}
.nav-links a:hover { color: var(--cyan); }

@media (max-width: 767px) {
  .nav { padding: 0 20px; }
  .nav-links-desktop { display: none !important; }
}
`;

const AxiomSystems = () => {
  const [navSolid, setNavSolid] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [activeTab, setActiveTab] = useState<"business" | "architecture">("business");
  const [activeStep, setActiveStep] = useState(0);
  const [tlPct, setTlPct] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [employees, setEmployees] = useState(3);

  const timelineRef = useRef<HTMLDivElement>(null);

  // Resize
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 24);
      setShowSticky(window.scrollY > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Timeline observer
  useEffect(() => {
    if (!timelineRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTlPct(100);
      },
      { threshold: 0.3 }
    );
    observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav${navSolid ? " solid" : ""}`}>
        <a href="#" className="nav-logo">
          <span className="dot" />
          <span>AXIOM</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {!isMobile && (
            <ul className="nav-links nav-links-desktop">
              <li><a href="#services">Services</a></li>
              <li><a href="#impact">Impact</a></li>
              <li><a href="#pipeline">Pipeline</a></li>
              <li><a href="#timeline">Timeline</a></li>
            </ul>
          )}
          <button className="btn-primary" style={{ fontSize: 14, height: 44, padding: "0 24px" }}>
            Book Free Audit
          </button>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div style={{ height: 68 }} />
    </>
  );
};

export default AxiomSystems;
