import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import workflowImg from "@/assets/workflow.png";
import {
  ArrowLeft, ArrowRight, Activity, TrendingUp, Zap, AlertTriangle, CheckCircle2
} from "lucide-react";

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
  overflow-x: hidden;
}

.f-display { font-family: 'Syncopate', sans-serif; font-weight: 700; }
.f-mono { font-family: 'Space Mono', monospace; }
.gradient-text {
  background: linear-gradient(135deg, #00E5FF, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cs-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
  background: rgba(11,15,25,.96); backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.cs-nav-logo {
  display: flex; align-items: center; gap: 10px; text-decoration: none;
}
.cs-nav-logo .dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--cyan);
  animation: blink 2s ease infinite; flex-shrink: 0;
}
.cs-nav-logo span {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 18px;
  color: var(--white); letter-spacing: 4px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.cs-page { min-height: 100vh; padding-top: 68px; }

.cs-hero {
  text-align: center;
  padding: 80px 40px 60px;
  border-bottom: 1px solid var(--border);
  background: rgba(19,26,42,.4);
}

.cs-back {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--cyan); text-decoration: none; font-size: 15px; font-weight: 600;
  margin-bottom: 32px; transition: opacity .2s;
}
.cs-back:hover { opacity: .8; }

.tag {
  display: inline-block; background: rgba(139,92,246,.18); color: #fff;
  padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;
}

.cs-body {
  max-width: 760px; margin: 0 auto; padding: 60px 40px 80px;
}

.card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 32px; position: relative; overflow: hidden;
}

@media (max-width: 767px) {
  .cs-nav { padding: 0 20px; }
  .cs-hero { padding: 60px 24px 40px; }
  .cs-body { padding: 40px 20px 60px; }
}
`;

const CaseStudySalesOutreach = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <nav className="cs-nav">
        <Link to="/" className="cs-nav-logo">
          <span className="dot" />
          <span>AXIOM</span>
        </Link>
      </nav>

      <div className="cs-page">
        <div className="cs-hero">
          <Link to="/" className="cs-back"><ArrowLeft size={16} /> Back to Home</Link>
          <div>
            <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>Featured Case Study</span>
            <h1 className="f-display" style={{ fontSize: isMobile ? 28 : 42, color: "var(--white)", lineHeight: 1.15, marginTop: 12, marginBottom: 16 }}>
              AI Website Analysis &<br /><span className="gradient-text">Automated Sales Outreach</span>
            </h1>
            <p style={{ fontSize: 19, color: "var(--muted)", maxWidth: 620, margin: "0 auto" }}>
              From inbound lead to fully-researched personalised email — in under 10 seconds.
            </p>
          </div>
        </div>

        <div className="cs-body">
          {/* Problem vs Solution Cards */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, marginBottom: 48 }}>
            {/* The Problem */}
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 16, padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AlertTriangle size={16} color="#EF4444" />
                </div>
                <span className="f-mono" style={{ fontSize: 12, color: "#EF4444", textTransform: "uppercase", letterSpacing: 2 }}>THE PROBLEM</span>
              </div>
              <p style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.75, marginBottom: 20 }}>
                Sales teams spend significant time researching new leads before sending outreach emails. For each lead they must:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Visit the company website", "Understand the business model", "Identify operational inefficiencies", "Write a personalised message"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, color: "var(--text)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", flexShrink: 0 }} />
                    {b}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, background: "rgba(239,68,68,.08)", borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>Time per lead</span>
                <span className="f-mono" style={{ fontSize: 20, color: "#EF4444", fontWeight: 700 }}>10–20 min</span>
              </div>
            </div>

            {/* The Solution */}
            <div style={{ background: "rgba(0,229,255,.04)", border: "1px solid rgba(0,229,255,.15)", borderRadius: 16, padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,229,255,.15)", border: "1px solid rgba(0,229,255,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={16} color="#00E5FF" />
                </div>
                <span className="f-mono" style={{ fontSize: 12, color: "#00E5FF", textTransform: "uppercase", letterSpacing: 2 }}>THE SOLUTION</span>
              </div>
              <p style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.75, marginBottom: 20 }}>
                An AI-powered lead intelligence system that automatically analyses a prospect's website and generates a personalised outreach message.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Receives lead submission with website + email",
                  "Retrieves website content automatically",
                  "AI analyses business & identifies opportunities",
                  "Generates personalised 2-sentence pitch",
                  "Stores lead in database",
                  "Sends tailored email instantly",
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "var(--text)", lineHeight: 1.5 }}>
                    <span className="f-mono" style={{ fontSize: 11, color: "var(--cyan)", minWidth: 18, flexShrink: 0, marginTop: 2 }}>0{i + 1}</span>
                    {s}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, background: "rgba(0,229,255,.08)", borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>Time per lead</span>
                <span className="f-mono" style={{ fontSize: 20, color: "#00E5FF", fontWeight: 700 }}>&lt; 10 sec</span>
              </div>
            </div>
          </div>

          {/* Workflow Architecture Diagram */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span className="f-mono" style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 2, whiteSpace: "nowrap" }}>LIVE WORKFLOW ARCHITECTURE</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
            <div style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 16, padding: isMobile ? "16px 8px" : "24px", overflowX: "auto", position: "relative" }}>
              <img src={workflowImg} alt="Live workflow architecture diagram showing the automated lead intake pipeline" style={{ width: "100%", minWidth: 900, height: "auto", display: "block", borderRadius: 8 }} />
            </div>
          </div>

          {/* Results Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            {[
              { icon: <Activity size={22} color="var(--cyan)" />, val: "1,500 hrs", label: "Saved annually", sub: "Zero manual research hours", borderColor: "rgba(0,229,255,.15)", bgColor: "rgba(0,229,255,.07)" },
              { icon: <TrendingUp size={22} color="var(--purple)" />, val: "$60,000", label: "Operational savings", sub: "Reduced sales research workload", borderColor: "rgba(139,92,246,.15)", bgColor: "rgba(139,92,246,.07)" },
              { icon: <Zap size={22} color="var(--cyan)" />, val: "99%", label: "Time reduction", sub: "15 min → under 10 seconds", borderColor: "rgba(0,229,255,.15)", bgColor: "rgba(0,229,255,.07)" },
            ].map((s, i) => (
              <div className="card" key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bgColor, border: `1px solid ${s.borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div className="f-display" style={{ fontSize: 26, color: "var(--cyan)" }}>{s.val}</div>
                  <div style={{ fontSize: 16, color: "var(--white)", fontWeight: 700 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Outcome Callout */}
          <div style={{ background: "linear-gradient(135deg, rgba(0,229,255,.06) 0%, rgba(139,92,246,.06) 100%)", border: "1px solid rgba(0,229,255,.15)", borderRadius: 16, padding: isMobile ? "28px 24px" : "36px 48px", display: "flex", alignItems: "center", gap: 24, flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(0,229,255,.12)", border: "1px solid rgba(0,229,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CheckCircle2 size={24} color="var(--cyan)" />
            </div>
            <div style={{ textAlign: isMobile ? "left" : undefined }}>
              <div className="f-mono" style={{ fontSize: 12, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>KEY OUTCOME</div>
              <p style={{ fontSize: 19, color: "var(--white)", lineHeight: 1.7, fontWeight: 500 }}>
                The system turns every inbound lead into a <strong style={{ color: "#00E5FF" }}>fully researched prospect within seconds</strong>, allowing sales teams to focus on closing deals instead of researching companies.
              </p>
            </div>
          </div>

          {/* Footer nav */}
          <div style={{ marginTop: 56, textAlign: "center" }}>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--cyan)", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudySalesOutreach;
