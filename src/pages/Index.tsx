import { useState, useEffect, useRef } from "react";
import workflowImg from "@/assets/workflow.png";
import {
  ArrowRight, Play, Database, Plug, Brain, CheckCircle2, Shield, TrendingUp,
  Users, Cpu, Code2, Settings2, Activity, Layers, GitBranch, Zap,
  BarChart3, Terminal, Network, Plus, Minus, Star, Webhook, AlertTriangle
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

.btn-primary {
  height: 48px; background: var(--cyan); color: #000; font-weight: 700;
  font-family: 'DM Sans', sans-serif; font-size: 15px; border: none;
  border-radius: 12px; padding: 0 32px; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  animation: pulse-glow 2.6s ease-in-out infinite;
  transition: transform .2s ease; white-space: nowrap;
}
.btn-primary:hover { transform: scale(1.03); }

.btn-ghost {
  height: 48px; background: transparent; color: var(--cyan);
  border: 1.5px solid var(--cyan); border-radius: 12px; padding: 0 32px;
  cursor: pointer; font-weight: 700; font-family: 'DM Sans', sans-serif;
  font-size: 15px; display: inline-flex; align-items: center;
  justify-content: center; gap: 8px;
  transition: background .25s ease, box-shadow .25s ease; white-space: nowrap;
}
.btn-ghost:hover { background: rgba(0,229,255,.08); box-shadow: 0 0 20px rgba(0,229,255,.15); }

.btn-cta {
  height: 64px; background: var(--cyan); color: #000; font-weight: 700;
  font-family: 'DM Sans', sans-serif; font-size: 19px; border: none;
  border-radius: 12px; padding: 0 52px; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  animation: pulse-glow 2.6s ease-in-out infinite;
  transition: transform .2s ease; white-space: nowrap;
}
.btn-cta:hover { transform: scale(1.03); }

.card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 32px; position: relative; overflow: hidden;
  transition: transform .3s ease, box-shadow .3s ease;
}
.card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--purple));
  opacity: 0; transition: opacity .3s ease;
}
.card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px rgba(0,0,0,.45); }
.card:hover::before { opacity: 1; }

.tag {
  display: inline-block; background: rgba(139,92,246,.18); color: #fff;
  padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;
}

.cyber-grid {
  background-image:
    linear-gradient(rgba(0,229,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,255,.05) 1px, transparent 1px);
  background-size: 44px 44px;
  animation: grid-breathe 5s ease-in-out infinite;
}

.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
.reveal.in { opacity: 1; transform: none; }

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
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes grid-breathe { 0%, 100% { opacity: .035; } 50% { opacity: .07; } }
@keyframes scan { from { top: -4%; } to { top: 104%; } }
@keyframes spin { to { transform: rotate(360deg); } }

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,.75); backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.modal-card {
  background: #131A2A; border: 1px solid #1E293B; border-radius: 20px;
  padding: 48px; width: 100%; max-width: 520px; position: relative;
}
.modal-close {
  position: absolute; top: 16px; right: 16px; width: 48px; height: 48px;
  min-height: 48px; min-width: 48px; border-radius: 50%;
  background: rgba(255,255,255,.06); border: none; cursor: pointer;
  color: #6B7280; font-size: 20px; display: flex; align-items: center;
  justify-content: center; transition: color .2s;
}
.modal-close:hover { color: #fff; }
.modal-input {
  width: 100%; background: #0B0F19; border: 1px solid #1E293B;
  border-radius: 12px; padding: 14px 18px; color: #E5E7EB;
  font-family: 'DM Sans', sans-serif; font-size: 16px; outline: none;
  margin-bottom: 16px; min-height: 48px; transition: border-color .2s ease;
}
.modal-input:focus { border-color: #00E5FF; box-shadow: 0 0 0 3px rgba(0,229,255,.08); }
.modal-input.invalid { border-color: #EF4444; }
.spinner {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid rgba(0,229,255,.3); border-top-color: #00E5FF;
  animation: spin .7s linear infinite; flex-shrink: 0;
}


.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
  transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease;
  border-bottom: 1px solid transparent;
}
.nav.solid {
  background: rgba(11,15,25,.96); backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px); border-bottom-color: var(--border);
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-logo .dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--cyan);
  animation: blink 2s ease infinite; flex-shrink: 0;
}
.nav-logo span {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 18px;
  color: var(--white); letter-spacing: 4px;
}
.nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
.nav-links a {
  color: var(--text); text-decoration: none; font-size: 15px; font-weight: 500;
  transition: color .2s ease;
}
.nav-links a:hover { color: var(--cyan); }

/* HERO */
.hero {
  position: relative; overflow: hidden; padding-top: 120px; min-height: 100vh;
  display: flex; align-items: center;
}
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 40px; align-items: center; }
.hero-pill {
  display: inline-flex; align-items: center; gap: 10px;
  border: 1px solid rgba(0,229,255,.28); background: rgba(0,229,255,.06);
  border-radius: 40px; padding: 8px 22px; margin-bottom: 28px;
  opacity: 0; animation: slide-up .6s ease .1s forwards;
}
.hero-pill .pill-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cyan); animation: blink 2s ease infinite; }
.hero-h1 {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 54px;
  line-height: 1.08; color: var(--white); margin-bottom: 28px;
  opacity: 0; animation: slide-up .7s ease .2s forwards;
}
.hero-sub {
  font-size: 20px; color: var(--text); margin-bottom: 36px; max-width: 520px;
  opacity: 0; animation: slide-up .7s ease .35s forwards;
}
.hero-btns {
  display: flex; flex-direction: row; gap: 16px; flex-wrap: wrap; margin-bottom: 48px;
  opacity: 0; animation: slide-up .7s ease .5s forwards;
}
.hero-metrics {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  opacity: 0; animation: slide-up .7s ease .65s forwards;
}
.hero-metric {
  border-left: 2px solid rgba(0,229,255,.3); padding-left: 13px;
}
.hero-metric .val { font-family: 'Syncopate', sans-serif; font-size: 28px; color: var(--cyan); font-weight: 700; }
.hero-metric .lbl { font-size: 12px; color: var(--muted); }

/* HERO DASHBOARD */
.dash-wrap { position: relative; display: flex; justify-content: center; align-items: center; }
.dash-glow {
  position: absolute; width: 360px; height: 360px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,255,.12), transparent 70%);
  pointer-events: none;
}
.dash-card {
  background: var(--card); border: 1px solid var(--border); border-radius: 18px;
  padding: 24px; width: 100%; max-width: 440px; position: relative; overflow: hidden;
  animation: float 4s ease-in-out infinite;
}
.dash-bar { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; }
.dash-dot-r { width: 11px; height: 11px; border-radius: 50%; background: #EF4444; }
.dash-dot-y { width: 11px; height: 11px; border-radius: 50%; background: #F59E0B; }
.dash-dot-g { width: 11px; height: 11px; border-radius: 50%; background: #22C55E; }
.dash-url { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--muted); margin-left: auto; }
.dash-blink { width: 8px; height: 8px; border-radius: 50%; background: var(--cyan); animation: blink 2s ease infinite; margin-left: 8px; }
.scan-line {
  position: absolute; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  animation: scan 4s linear infinite; pointer-events: none; opacity: .5;
}
.pipe-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0; border-bottom: 1px solid rgba(30,41,59,.5);
  font-family: 'Space Mono', monospace; font-size: 13px;
}
.pipe-row:last-child { border-bottom: none; }
.pipe-status { display: flex; align-items: center; gap: 8px; font-size: 11px; }
.status-dot { position: relative; }
.status-dot .core { width: 8px; height: 8px; border-radius: 50%; }
.status-dot .ping-ring {
  position: absolute; inset: -4px; border-radius: 50%;
  border: 1px solid var(--cyan); animation: ping 2s infinite; opacity: 0;
}
.throughput-box {
  background: rgba(11,15,25,.6); border-radius: 10px; padding: 16px; margin-top: 16px;
}
.tp-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.tp-label { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--muted); letter-spacing: 1px; }
.tp-val { font-family: 'Space Mono', monospace; font-size: 13px; }
.progress-track { width: 100%; height: 6px; background: rgba(30,41,59,.6); border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
.progress-fill { height: 100%; width: 78%; background: linear-gradient(90deg, var(--cyan), var(--purple)); border-radius: 4px; box-shadow: 0 0 10px rgba(0,229,255,.3); }

.float-badge {
  position: absolute; display: flex; align-items: center; gap: 8px;
  background: rgba(19,26,42,.9); backdrop-filter: blur(10px);
  padding: 10px 16px; border-radius: 12px; font-size: 13px; font-weight: 600;
  color: var(--white); z-index: 2;
}
.float-badge.top-left { top: -10px; left: -20px; border: 1px solid rgba(0,229,255,.25); }
.float-badge.bottom-right { bottom: -10px; right: -20px; border: 1px solid rgba(139,92,246,.25); }

/* TRUST BAR */
.trust-bar {
  background: rgba(19,26,42,.4); border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border); padding: 44px 40px; text-align: center;
}
.trust-text {
  font-family: 'Space Mono', monospace; font-size: 12px; color: var(--muted);
  letter-spacing: 3px; text-transform: uppercase; margin-bottom: 32px;
}
.trust-logos { display: flex; justify-content: center; gap: 52px; flex-wrap: wrap; align-items: center; }
.trust-logo {
  display: flex; align-items: center; gap: 9px; opacity: .38;
}
.trust-logo-mark {
  width: 30px; height: 30px; border-radius: 7px;
  background: linear-gradient(135deg, #2A2A3A, #1A1A2A);
}
.trust-logo-name { font-family: 'Syncopate', sans-serif; font-size: 13px; color: var(--muted); }

/* SECTIONS */
.section { padding: 104px 40px; max-width: 1280px; margin: 0 auto; }
.section-alt { background: rgba(19,26,42,.25); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.section-alt .section { padding: 104px 40px; }
.section-head { text-align: center; margin-bottom: 64px; }
.section-head h2 {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 44px;
  color: var(--white); margin-bottom: 20px; line-height: 1.15;
}
.section-head p { font-size: 19px; color: var(--muted); max-width: 640px; margin: 0 auto; }

.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }

.card-icon {
  width: 54px; height: 54px; border-radius: 14px; display: flex; align-items: center;
  justify-content: center; background: rgba(11,15,25,.6); border: 1px solid var(--border);
  margin-bottom: 20px;
}
.card h3 { font-size: 22px; color: var(--white); font-weight: 700; margin-bottom: 12px; }
.card .card-body { font-size: 17px; line-height: 1.72; margin-bottom: 20px; }
.check-item { display: flex; align-items: center; gap: 10px; font-size: 16px; margin-bottom: 10px; }

/* ROI */
.roi-card {
  background: linear-gradient(135deg, var(--card), var(--bg));
  border: 1px solid var(--border); border-radius: 20px; padding: 56px;
  position: relative; overflow: hidden;
}
.roi-glow {
  position: absolute; top: 0; right: 0; width: 50%; height: 100%;
  background: radial-gradient(circle at 80% 50%, rgba(0,229,255,.06), transparent 70%);
  pointer-events: none;
}
.roi-grid { display: grid; grid-template-columns: 1fr 1.8fr; gap: 48px; align-items: start; }
input[type=range] {
  -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px;
  background: var(--border); outline: none; margin: 16px 0;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 26px; height: 26px; background: #00E5FF;
  border-radius: 50%; cursor: pointer;
  box-shadow: 0 0 14px rgba(0,229,255,.55);
}
input[type=range]::-moz-range-thumb {
  width: 26px; height: 26px; background: #00E5FF; border-radius: 50%;
  cursor: pointer; border: none; box-shadow: 0 0 14px rgba(0,229,255,.55);
}
.savings-box {
  background: rgba(0,229,255,.06); border: 1px solid rgba(0,229,255,.18);
  border-radius: 12px; padding: 20px; margin-top: 20px; text-align: center;
}
.bar-track { width: 100%; height: 14px; border-radius: 7px; overflow: hidden; margin: 8px 0 4px; }

/* INTEGRATIONS */
.tile {
  background: var(--card); border: 1px solid var(--border); border-radius: 16px;
  padding: 28px; text-align: center; transition: transform .3s ease, box-shadow .3s ease;
}
.tile:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,.3); }
.tile-icon {
  width: 54px; height: 54px; border-radius: 14px; display: flex; align-items: center;
  justify-content: center; background: rgba(11,15,25,.6); border: 1px solid var(--border);
  margin: 0 auto 16px;
}
.tile h4 { font-size: 17px; color: var(--white); font-weight: 700; margin-bottom: 6px; }
.tile p { font-size: 13px; color: var(--muted); }

/* CASE STUDIES */
.case-tag-cyan { background: rgba(0,229,255,.1); color: var(--cyan); }
.case-tag-purple { background: rgba(139,92,246,.1); color: var(--purple); }
.before-after {
  border-radius: 10px; padding: 18px 20px; margin-top: 16px;
  background: rgba(11,15,25,.5);
}
.ba-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }

/* PIPELINE */
.toggle-wrap {
  display: inline-flex; background: var(--card); border: 1px solid var(--border);
  border-radius: 13px; padding: 6px; margin-bottom: 48px;
}
.toggle-btn {
  min-height: 48px; padding: 0 28px; border: none; border-radius: 9px;
  cursor: pointer; font-weight: 600; font-size: 15px;
  font-family: 'DM Sans', sans-serif; transition: all .2s ease;
}
.toggle-btn.active { background: rgba(0,229,255,.13); color: var(--cyan); }
.toggle-btn.inactive { background: transparent; color: var(--muted); }
.pipe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; }
.step {
  display: flex; align-items: flex-start; gap: 20px; padding: 14px 16px;
  border-radius: 10px; border-left: 2px solid transparent;
  cursor: pointer; transition: all .22s ease;
}
.step:hover, .step.active { background: rgba(0,229,255,.05); border-left-color: var(--cyan); }
.step-num { font-family: 'Space Mono', monospace; font-size: 30px; color: var(--cyan); font-weight: 700; line-height: 1; }
.step-title { font-size: 17px; color: var(--white); font-weight: 700; }
.step-desc { font-size: 15px; color: var(--muted); }

.view-box { background: rgba(11,15,25,.5); border: 1px solid var(--border); border-radius: 14px; padding: 28px; }
.view-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }

/* TIMELINE */
.tl-wrap { position: relative; padding: 64px 0; }
.tl-track { position: absolute; top: 23px; left: 0; right: 0; height: 2px; background: var(--border); }
.tl-fill {
  position: absolute; top: 23px; left: 0; height: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--purple));
  box-shadow: 0 0 12px rgba(0,229,255,.3); transition: width 1.8s cubic-bezier(.4,0,.2,1);
}
.tl-nodes { display: grid; grid-template-columns: repeat(4, 1fr); position: relative; z-index: 2; }
.tl-node { display: flex; flex-direction: column; align-items: center; text-align: center; }
.tl-circle {
  width: 48px; height: 48px; border-radius: 50%; background: var(--bg);
  border: 2px solid var(--cyan); display: flex; align-items: center; justify-content: center;
  position: relative; margin-bottom: 14px;
}
.tl-ping {
  position: absolute; inset: -5px; border-radius: 50%;
  border: 1px solid rgba(0,229,255,.2); animation: ping 2s infinite;
}
.tl-day { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--cyan); letter-spacing: 1px; margin-bottom: 6px; }
.tl-title { font-size: 16px; color: var(--white); font-weight: 700; max-width: 160px; }

/* MOBILE TIMELINE */
.tl-mobile { position: relative; padding-left: 40px; }
.tl-v-track { position: absolute; left: 16px; top: 0; bottom: 0; width: 2px; background: var(--border); }
.tl-v-fill {
  position: absolute; left: 16px; top: 0; width: 2px;
  background: linear-gradient(180deg, var(--cyan), var(--purple));
  transition: height 1.8s cubic-bezier(.4,0,.2,1);
}
.tl-m-node { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 40px; position: relative; }
.tl-m-circle {
  width: 28px; height: 28px; border-radius: 50%; background: var(--bg);
  border: 2px solid var(--cyan); display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; position: absolute; left: -40px;
}

/* HOW IT GETS BUILT */
.phase-num { font-family: 'Space Mono', monospace; font-size: 44px; color: rgba(0,229,255,.08); font-weight: 700; }
.phase-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.phase-tag {
  background: rgba(0,229,255,.06); color: var(--cyan); padding: 4px 12px;
  border-radius: 16px; font-size: 12px; font-weight: 600;
}

/* FAQ */
.faq-item {
  border: 1px solid var(--border); border-radius: 14px; overflow: hidden;
  transition: border-color .3s ease;
}
.faq-item.open { border-color: var(--cyan); }
.faq-btn {
  width: 100%; min-height: 48px; display: flex; justify-content: space-between;
  align-items: center; padding: 18px 24px; background: var(--card); border: none;
  color: var(--white); font-size: 17px; font-weight: 700; cursor: pointer;
  font-family: 'DM Sans', sans-serif; text-align: left;
}
.faq-body {
  max-height: 0; opacity: 0; overflow: hidden; padding: 0 24px;
  background: var(--card); transition: all .35s ease; font-size: 16px;
  line-height: 1.7; color: var(--text);
}
.faq-item.open .faq-body { max-height: 240px; opacity: 1; padding: 0 24px 24px; }

/* PROFILE */
.avatar {
  width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 20px;
  background: linear-gradient(135deg, rgba(0,229,255,.18), rgba(139,92,246,.18));
  border: 2px solid rgba(0,229,255,.28);
  box-shadow: 0 0 32px rgba(0,229,255,.14);
  display: flex; align-items: center; justify-content: center;
}
.stars { display: flex; gap: 4px; justify-content: center; margin-bottom: 12px; }
.stats-row {
  display: flex; gap: 40px; justify-content: center; border-top: 1px solid var(--border);
  padding-top: 28px; margin-top: 28px;
}
.stat-val { font-family: 'Syncopate', sans-serif; font-size: 26px; color: var(--cyan); font-weight: 700; }
.stat-lbl { font-size: 13px; color: var(--muted); }

/* FOOTER */
.footer {
  border-top: 1px solid var(--border); background: rgba(11,15,25,.92);
  padding: 36px 40px; display: flex; justify-content: space-between;
  flex-wrap: wrap; gap: 18px; align-items: center;
}
.footer a { color: var(--muted); text-decoration: none; font-size: 13px; transition: color .2s; }
.footer a:hover { color: var(--text); }

/* STICKY */
.sticky-bar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
  background: rgba(11,15,25,.97); backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px); border-top: 1px solid var(--border);
  padding: 14px 20px;
}
.sticky-bar .btn-primary { width: 100%; height: 52px; }

/* ORB BACKGROUNDS */
.orb-cyan {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,255,.08), transparent 70%);
  pointer-events: none;
}
.orb-purple {
  position: absolute; width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(139,92,246,.08), transparent 70%);
  pointer-events: none;
}

/* RESPONSIVE */
@media (max-width: 767px) {
  .nav { padding: 0 20px; }
  .nav-links-desktop { display: none !important; }
  .hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 0 24px; }
  .hero-h1 { font-size: 36px; }
  .hero-sub { font-size: 18px; }
  .hero-metrics { grid-template-columns: repeat(2, 1fr); }
  .section { padding: 72px 24px; }
  .section-alt .section { padding: 72px 24px; }
  .section-head h2 { font-size: 28px; }
  .grid-3 { grid-template-columns: 1fr; }
  .grid-2 { grid-template-columns: 1fr; }
  .roi-grid { grid-template-columns: 1fr; }
  .roi-card { padding: 32px 24px; }
  .pipe-grid { grid-template-columns: 1fr; }
  .trust-bar { padding: 32px 24px; }
  .trust-logos { gap: 24px; }
  .stats-row { gap: 24px; flex-wrap: wrap; }
  .footer { padding: 28px 24px; flex-direction: column; text-align: center; }
  .tl-nodes { grid-template-columns: 1fr; }
  .float-badge { display: none !important; }
  .modal-card { padding: 32px !important; }
}
`;

/* ── HeroDashboard Component ── */
const HeroDashboard = () => {
  const rows = [
    { name: "Data Ingestion", status: "ACTIVE", color: "var(--cyan)", ping: true },
    { name: "LLM Classifier", status: "PROCESSING", color: "var(--purple)", ping: false },
    { name: "CRM Router", status: "ACTIVE", color: "var(--cyan)", ping: true },
    { name: "Slack Notifier", status: "QUEUED", color: "var(--muted)", ping: false },
  ];
  return (
    <div className="dash-wrap">
      <div className="dash-glow" />
      <div className="dash-card">
        <div className="scan-line" />
        <div className="dash-bar">
          <span className="dash-dot-r" /><span className="dash-dot-y" /><span className="dash-dot-g" />
          <span className="dash-url">axiom.pipeline.live</span>
          <span className="dash-blink" />
        </div>
        {rows.map((r, i) => (
          <div className="pipe-row" key={i}>
            <span style={{ color: "var(--white)" }}>{r.name}</span>
            <span className="pipe-status">
              <span style={{ color: r.color }}>{r.status}</span>
              <span className="status-dot">
                <span className="core" style={{ background: r.color }} />
                {r.ping && <span className="ping-ring" />}
              </span>
            </span>
          </div>
        ))}
        <div className="throughput-box">
          <div className="tp-row">
            <span className="tp-label">THROUGHPUT</span>
            <span className="tp-val" style={{ color: "var(--cyan)" }}>4,218 ops/min</span>
          </div>
          <div className="progress-track"><div className="progress-fill" /></div>
          <div className="tp-row">
            <span className="tp-label">ERROR RATE</span>
            <span className="tp-val" style={{ color: "#22C55E" }}>0.00%</span>
          </div>
        </div>
      </div>
      <div className="float-badge top-left"><Shield size={16} color="var(--cyan)" /> 99.99% uptime</div>
      <div className="float-badge bottom-right"><TrendingUp size={16} color="var(--purple)" /> 2.5x ROI avg</div>
    </div>
  );
};

/* ── Business View ── */
const BusinessView = () => (
  <div>
    <div className="view-box" style={{ marginBottom: 20 }}>
      <div className="view-label" style={{ color: "var(--muted)" }}>BEFORE</div>
      <svg viewBox="0 0 300 80" width="100%" height="80">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={10 + i*5} y1={10 + i*14} x2={290 - i*8} y2={70 - i*12}
            stroke="rgba(239,68,68,.38)" strokeWidth="2" />
        ))}
        <circle cx="15" cy="40" r="8" fill="none" stroke="rgba(239,68,68,.4)" strokeWidth="1.5" />
        <circle cx="285" cy="40" r="8" fill="none" stroke="rgba(239,68,68,.4)" strokeWidth="1.5" />
      </svg>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>Errors · delays · manual touches</p>
    </div>
    <div className="view-box" style={{ border: "1px solid rgba(0,229,255,.15)", boxShadow: "0 0 20px rgba(0,229,255,.05)" }}>
      <div className="view-label" style={{ color: "var(--cyan)" }}>AFTER</div>
      <svg viewBox="0 0 300 80" width="100%" height="80">
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="100%" stopColor="var(--purple)" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <line x1="30" y1="40" x2="270" y2="40" stroke="url(#lineGrad)" strokeWidth="3" filter="url(#glow)" />
        {[100,150,200].map(x => (
          <circle key={x} cx={x} cy={40} r="5" fill="none" stroke="var(--cyan)" strokeWidth="1.5" />
        ))}
      </svg>
      <p style={{ fontSize: 13, color: "var(--cyan)", marginTop: 8 }}>Zero-latency · zero-error · fully automated</p>
    </div>
  </div>
);

/* ── Architecture View ── */
const ArchitectureView = () => {
  const nodes = [
    { x: 12, y: 50, label: "Webhook", color: "var(--cyan)" },
    { x: 30, y: 18, label: "LLM Parse", color: "var(--purple)" },
    { x: 30, y: 82, label: "DB Query", color: "var(--cyan)" },
    { x: 50, y: 50, label: "Classify", color: "var(--purple)" },
    { x: 70, y: 22, label: "CRM", color: "var(--cyan)" },
    { x: 70, y: 78, label: "Slack", color: "var(--purple)" },
    { x: 88, y: 50, label: "Monitor", color: "var(--cyan)" },
  ];
  const edges = [
    [0,1],[0,2],[1,3],[2,3],[3,4],[3,5],[4,6],[5,6]
  ];
  return (
    <div className="view-box" style={{ position: "relative", overflow: "hidden" }}>
      <div className="cyber-grid" style={{ position: "absolute", inset: 0, opacity: .5 }} />
      <svg viewBox="0 0 100 100" width="100%" height="270" style={{ position: "relative" }}>
        {edges.map(([a,b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(0,229,255,.22)" strokeWidth=".5" strokeDasharray="2 2" />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="5" fill={n.color} opacity=".12" />
            <circle cx={n.x} cy={n.y} r="2.5" fill={n.color} />
            <text x={n.x} y={n.y + 9} textAnchor="middle" fill="var(--muted)"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "3.5px" }}>{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ── Audit Modal Component ── */
const AuditModal = ({ onClose, isMobile: mobile }: { onClose: () => void; isMobile: boolean }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; website?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; website?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [submissions, setSubmissions] = useState<number[]>([]);
  const [checkVisible, setCheckVisible] = useState(false);

  const rateLimited = submissions.filter(t => Date.now() - t < 60000).length >= 3;

  useEffect(() => {
    if (!fetchError) return;
    const t = setTimeout(() => setFetchError(false), 8000);
    return () => clearTimeout(t);
  }, [fetchError]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setCheckVisible(true), 50);
      return () => clearTimeout(t);
    }
  }, [success]);

  const validate = () => {
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Please enter a valid email";
    if (!/^https?:\/\//.test(website.trim())) e.website = "Must start with http:// or https://";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, website: true });
    if (!validate()) return;
    if (honeypot) return;
    if (rateLimited) return;

    setLoading(true);
    setFetchError(false);
    setSubmissions(prev => [...prev, Date.now()]);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch("https://tungsten-swift.pikapod.net/webhook-test/lead-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          website: website.trim(),
          source: "axiom-landing-page",
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) { setSuccess(true); } else { setFetchError(true); }
    } catch { setFetchError(true); }
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ padding: "16px 0", textAlign: "center" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%", background: "rgba(0,229,255,.1)",
          border: "2px solid rgba(0,229,255,.3)", display: "flex", alignItems: "center",
          justifyContent: "center", margin: "0 auto 24px",
          boxShadow: "0 0 30px rgba(0,229,255,.2)",
          opacity: checkVisible ? 1 : 0, transform: checkVisible ? "scale(1)" : "scale(.8)",
          transition: "all .4s cubic-bezier(.34,1.56,.64,1)",
        }}>
          <CheckCircle2 size={32} color="#00E5FF" />
        </div>
        <h3 className="f-display" style={{ fontSize: 22, color: "var(--white)", marginBottom: 12 }}>You're on the list.</h3>
        <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, maxWidth: 360, margin: "0 auto 28px" }}>
          We're analysing your website right now. Expect a personalised automation blueprint in your inbox within 24 hours.
        </p>
        <div className="f-mono" style={{ fontSize: 14, textAlign: "center" }}>
          <div style={{ color: "var(--muted)", marginBottom: 4 }}>Confirmation sent to</div>
          <div style={{ color: "var(--cyan)" }}>{email}</div>
        </div>
        <button className="btn-ghost" style={{ width: "100%", marginTop: 24 }} onClick={onClose}>Close</button>
      </div>
    );
  }

  const fieldStyle = (field: "name" | "email" | "website") =>
    `modal-input${touched[field] && errors[field] ? " invalid" : ""}`;

  return (
    <div>
      <span className="tag">Free Automation Audit</span>
      <h3 className="f-display" style={{ fontSize: 26, color: "var(--white)", marginTop: 12 }}>Map Your Operational Bottlenecks</h3>
      <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 32 }}>100% free. No commitment. Walk away with a custom automation blueprint.</p>

      <div>
        <label style={{ display: "block", fontSize: 14, color: "var(--white)", fontWeight: 600, marginBottom: 8 }}>Full Name</label>
        <input className={fieldStyle("name")} placeholder="Your full name" value={name}
          onChange={e => setName(e.target.value)} onBlur={() => { setTouched(p => ({ ...p, name: true })); validate(); }} />
        {touched.name && errors.name && <p style={{ fontSize: 13, color: "#EF4444", marginTop: -10, marginBottom: 12 }}>{errors.name}</p>}
      </div>

      <div>
        <label style={{ display: "block", fontSize: 14, color: "var(--white)", fontWeight: 600, marginBottom: 8 }}>Work Email</label>
        <input className={fieldStyle("email")} placeholder="you@company.com" type="email" value={email}
          onChange={e => setEmail(e.target.value)} onBlur={() => { setTouched(p => ({ ...p, email: true })); validate(); }} />
        {touched.email && errors.email && <p style={{ fontSize: 13, color: "#EF4444", marginTop: -10, marginBottom: 12 }}>{errors.email}</p>}
      </div>

      <div>
        <label style={{ display: "block", fontSize: 14, color: "var(--white)", fontWeight: 600, marginBottom: 8 }}>Company Website</label>
        <input className={fieldStyle("website")} placeholder="https://yourcompany.com" value={website}
          onChange={e => setWebsite(e.target.value)} onBlur={() => { setTouched(p => ({ ...p, website: true })); validate(); }} />
        {touched.website && errors.website && <p style={{ fontSize: 13, color: "#EF4444", marginTop: -10, marginBottom: 12 }}>{errors.website}</p>}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <input name="company_url" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
      </div>

      {fetchError && (
        <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 10, padding: "14px 18px", marginBottom: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <AlertTriangle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 15, color: "var(--white)", fontWeight: 600 }}>Submission failed</div>
            <div style={{ fontSize: 14, color: "var(--muted)" }}>Something went wrong on our end. Please try again, or email us directly at hello@axiomsystems.io</div>
          </div>
        </div>
      )}

      <button className="btn-cta" style={{ width: "100%", height: 56, marginTop: 8, opacity: loading || rateLimited ? .8 : 1 }}
        disabled={loading || rateLimited} onClick={handleSubmit}>
        {loading ? (<><div className="spinner" /> Analysing...</>) : (<>Send My Free Audit Request <ArrowRight size={18} /></>)}
      </button>
      {rateLimited && <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>Too many attempts. Please wait a moment.</p>}
    </div>
  );
};

/* ── MAIN COMPONENT ── */
const AxiomSystems = () => {
  const [navSolid, setNavSolid] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [activeTab, setActiveTab] = useState<"business" | "architecture">("business");
  const [activeStep, setActiveStep] = useState(0);
  const [tlPct, setTlPct] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [employees, setEmployees] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const tlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setShowModal(false); };
      window.addEventListener("keydown", handler);
      return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
    } else { document.body.style.overflow = ""; }
  }, [showModal]);

  const openAudit = () => setShowModal(true);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 24);
      setShowSticky(window.scrollY > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTlPct(100); }, { threshold: 0.3 });
    obs.observe(tlRef.current);
    return () => obs.disconnect();
  }, []);

  const manualCost = employees * 6500 * 12;
  const axiomCost = 10000 + 500 * 12;
  const savings = manualCost - axiomCost;
  const fmt = (n: number) => "$" + n.toLocaleString();

  const faqs = [
    { q: "We handle sensitive client data. Is this secure?", a: "Absolutely. We engineer zero-data-retention pipelines. Your data passes through custom APIs directly into your secure databases. We comply with SOC2 standards and never store your proprietary information on third-party infrastructure." },
    { q: "What happens when an integration API changes or breaks?", a: "APIs change — it's the nature of software. Your $500/month maintenance fee covers 24/7 uptime monitoring. If a third-party API breaks our system alerts us instantly, and we patch the infrastructure before you even notice a disruption." },
    { q: "How long does the $10,000 cover and what exactly is included?", a: "The $10,000 is a one-time architectural build and deployment fee covering complete discovery, coding, testing, and launch over 7 days. Afterward, a flat $500/month retainer covers server hosting, LLM API costs, and dedicated maintenance." },
    { q: "Do we own the system after it's built?", a: "Yes, 100%. You receive complete source code, n8n workflow exports, API documentation, and full admin access to every component. There is zero vendor lock-in — you could maintain it yourself, but most clients keep the retainer for peace of mind." },
  ];

  const steps = [
    { num: "01", title: "Lead submits form", desc: "Webhook fires instantly to the pipeline" },
    { num: "02", title: "LLM enrichment", desc: "AI parses intent, company fit, and urgency" },
    { num: "03", title: "CRM routing", desc: "Lead auto-classified and routed to rep" },
    { num: "04", title: "Slack alert sent", desc: "Sales rep notified with full context" },
    { num: "05", title: "Follow-up queued", desc: "Automated sequence initiated in seconds" },
  ];

  const tlNodes = [
    { Icon: Activity, day: "Day 1", title: "System Audit & Mapping" },
    { Icon: Layers, day: "Day 2–3", title: "Custom Infrastructure Design" },
    { Icon: GitBranch, day: "Day 4–6", title: "API Orchestration & Testing" },
    { Icon: Zap, day: "Day 7", title: "Live Deployment & Training" },
  ];

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav${navSolid ? " solid" : ""}`}>
        <a href="#" className="nav-logo">
          <span className="dot" style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--cyan)", animation: "blink 2s ease infinite", flexShrink: 0 }} />
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
          <button className="btn-primary" style={{ fontSize: 14, padding: "0 24px" }} onClick={openAudit}>Book Free Audit</button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="cyber-grid" style={{ position: "absolute", inset: 0 }} />
        <div className="orb-cyan" style={{ top: "-10%", left: "-10%" }} />
        <div className="orb-purple" style={{ bottom: "-10%", right: "-10%" }} />
        <div className="hero-grid">
          <div>
            <div className="hero-pill">
              <span className="pill-dot" />
              <span className="f-mono" style={{ fontSize: 13, color: "var(--white)" }}>Autonomous Systems Agency</span>
            </div>
            <h1 className="hero-h1">
              Stop competing<br />
              <span className="gradient-text">on headcount.</span><br />
              Automate the<br />
              baseline.
            </h1>
            <p className="hero-sub">
              We build custom LLM pipelines and autonomous systems that save operations teams <strong style={{ color: "var(--white)" }}>100+ hours a week</strong>. Replace manual operations with flawless execution.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={openAudit}>Get a Free Automation Audit <ArrowRight size={18} /></button>
              <button className="btn-ghost"><Play size={18} /> See How It Works</button>
            </div>
            <div className="hero-metrics">
              {[
                { val: "2.5x", lbl: "Average ROI Increase" },
                { val: "7 Days", lbl: "Average Launch Time" },
                { val: "24/7", lbl: "System Uptime" },
                { val: "0", lbl: "Human Errors" },
              ].map((m, i) => (
                <div className="hero-metric" key={i}>
                  <div className="val">{m.val}</div>
                  <div className="lbl">{m.lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <HeroDashboard />
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <div className="trust-bar">
        <div className="trust-text">TRUSTED BY FORWARD-THINKING OPERATIONS TEAMS TO SCALE WITHOUT LIMITS.</div>
        <div className="trust-logos">
          {["NEXUS CO.", "VAULT.IO", "ARCHON", "STRATA", "CORTEX"].map(n => (
            <div className="trust-logo" key={n}>
              <div className="trust-logo-mark" />
              <span className="trust-logo-name">{n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ BOTTLENECK CARDS ═══ */}
      <div id="services" style={{ padding: "104px 0 56px" }}>
        <div className="section">
          <div className="section-head reveal">
            <h2>Every pipeline targets a <span className="gradient-text">specific bottleneck.</span></h2>
            <p>We don't build tech for tech's sake. We engineer specific solutions for the areas where your business bleeds time and capital.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: <Database size={40} color="var(--cyan)" />, title: "Manual Data Entry", body: "Stop paying humans to copy-paste. We route data between systems instantly.", checks: ["Eliminate repetitive data tasks", "Real-time sync across platforms", "Zero reconciliation errors"] },
              { icon: <Plug size={40} color="var(--cyan)" />, title: "Disconnected Systems", body: "Force your CRMs, databases, and communication tools to talk to each other flawlessly.", checks: ["Unified data across all tools", "Custom API bridges & webhooks", "Live bi-directional sync"] },
              { icon: <Brain size={40} color="var(--cyan)" />, title: "Complex Decision Logic", body: "Deploy LLMs to triage emails, categorize leads, and trigger actions based on contextual understanding.", checks: ["AI-powered email triage", "Intelligent lead scoring", "Contextual action triggers"] },
            ].map((c, i) => (
              <div className="card reveal" key={i} style={{ transitionDelay: `${i * 0.1 + 0.08}s` }}>
                <div className="card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <div className="card-body">{c.body}</div>
                {c.checks.map((ck, j) => (
                  <div className="check-item" key={j}><CheckCircle2 size={18} color="var(--cyan)" />{ck}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ROI CALCULATOR ═══ */}
      <div style={{ padding: "0 40px 96px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="roi-card reveal">
          <div className="roi-glow" />
          <div style={{ textAlign: "center", marginBottom: 40, position: "relative" }}>
            <span className="tag">ROI Calculator</span>
            <h3 className="f-display" style={{ fontSize: 28, color: "var(--white)", margin: "16px 0 12px" }}>Calculate Your Operational Leak</h3>
            <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 540, margin: "0 auto" }}>Drag the slider to see how much manual data entry costs you versus an Axiom autonomous system.</p>
          </div>
          <div className="roi-grid" style={{ position: "relative" }}>
            <div>
              <label style={{ fontSize: 16, color: "var(--text)" }}>Data Ops Staff: <span style={{ color: "var(--cyan)", fontWeight: 700 }}>{employees}</span></label>
              <input type="range" min={1} max={10} value={employees} onChange={e => setEmployees(+e.target.value)} />
              <p style={{ fontSize: 13, color: "var(--muted)" }}>Average fully-loaded cost: $6,500/mo per employee</p>
              <div className="savings-box">
                <div style={{ fontSize: 11, color: "var(--cyan)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>YOUR 12-MONTH SAVINGS</div>
                <div className="f-display" style={{ fontSize: 32, color: "var(--cyan)" }}>{fmt(Math.max(0, savings))}</div>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: "var(--muted)" }}>12-Month Human Payroll</span>
                  <span style={{ fontSize: 14, color: "#EF4444", fontWeight: 700 }}>{fmt(manualCost)}</span>
                </div>
                <div className="bar-track" style={{ background: "rgba(239,68,68,.12)" }}>
                  <div style={{ height: "100%", width: "100%", background: "rgba(239,68,68,.5)", borderRadius: 7 }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: "var(--white)" }}>Axiom Autonomous System</span>
                  <span style={{ fontSize: 14, color: "var(--cyan)", fontWeight: 700 }}>{fmt(axiomCost)}</span>
                </div>
                <div className="bar-track" style={{ background: "rgba(0,229,255,.06)" }}>
                  <div style={{ height: "100%", width: `${Math.max(4, (axiomCost / manualCost) * 100)}%`, background: "linear-gradient(90deg, var(--cyan), var(--purple))", borderRadius: 7, boxShadow: "0 0 12px rgba(0,229,255,.3)", transition: "width .4s ease" }} />
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>$10k build + $500/mo maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ INTEGRATIONS ═══ */}
      <div className="section-alt">
        <div className="section">
          <div className="section-head reveal">
            <h2>Built for operations teams <span className="gradient-text">that move at scale.</span></h2>
            <p>Seamlessly integrating with the stack you already rely on.</p>
          </div>
          <div className="grid-3" style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)" }}>
            {[
              { icon: <Users size={26} color="var(--cyan)" />, title: "CRMs", sub: "Salesforce · HubSpot · Pipedrive" },
              { icon: <Database size={26} color="var(--purple)" />, title: "Databases", sub: "Postgres · Supabase · Airtable" },
              { icon: <Cpu size={26} color="var(--cyan)" />, title: "AI Models", sub: "GPT-4o · Claude · Gemini" },
              { icon: <Webhook size={26} color="var(--purple)" />, title: "Webhooks", sub: "Custom triggers & events" },
              { icon: <Code2 size={26} color="var(--cyan)" />, title: "APIs", sub: "REST · GraphQL · gRPC" },
              { icon: <Settings2 size={26} color="var(--purple)" />, title: "Custom", sub: "Any tool in your stack" },
            ].map((t, i) => (
              <div className="tile reveal" key={i} style={{ transitionDelay: `${i * 0.1 + 0.08}s` }}>
                <div className="tile-icon">{t.icon}</div>
                <h4>{t.title}</h4>
                <p>{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CASE STUDIES ═══ */}
      <div id="impact">
        <div className="section">
          <div className="section-head reveal">
            <h2>The <span className="gradient-text">Impact</span> of Automation.</h2>
            <p>Verifiable metrics from recently deployed infrastructures.</p>
          </div>
          <div className="grid-2">
            <div className="card reveal">
              <span className="tag case-tag-cyan" style={{ marginBottom: 16 }}>B2B LEAD GENERATION AGENCY</span>
              <h3 style={{ fontSize: 22, lineHeight: 1.4 }}>Scaled from 10 to 50 active client campaigns without adding a single headcount.</h3>
              <div className="before-after" style={{ borderLeft: "3px solid #EF4444" }}>
                <div className="ba-label" style={{ color: "var(--muted)" }}>BEFORE AXIOM</div>
                <p style={{ fontSize: 15 }}>14 hours/week on manual lead routing and CRM updates across three disjointed tools.</p>
              </div>
              <div className="before-after" style={{ borderLeft: "3px solid var(--cyan)", marginTop: 12 }}>
                <div className="ba-label" style={{ color: "var(--cyan)" }}>AFTER AXIOM</div>
                <p style={{ fontSize: 15 }}>3 seconds per intake. Zero manual touches. 100% automated routing with LLM enrichment.</p>
              </div>
            </div>
            <div className="card reveal" style={{ transitionDelay: ".1s" }}>
              <span className="tag case-tag-purple" style={{ marginBottom: 16 }}>E-COMMERCE OPERATIONS</span>
              <h3 style={{ fontSize: 22, lineHeight: 1.4 }}>Replaced manual inventory triage and support ticket categorisation across 40k SKUs.</h3>
              <div className="before-after" style={{ borderLeft: "3px solid #EF4444" }}>
                <div className="ba-label" style={{ color: "var(--muted)" }}>BEFORE AXIOM</div>
                <p style={{ fontSize: 15 }}>3 Full-Time Employees dedicated to copy-pasting tracking data and routing vendor emails.</p>
              </div>
              <div className="before-after" style={{ borderLeft: "3px solid var(--purple)", marginTop: 12 }}>
                <div className="ba-label" style={{ color: "var(--purple)" }}>AFTER AXIOM</div>
                <p style={{ fontSize: 15 }}>0 FTEs required. LLM automatically parses and routes all vendor emails in under 4 seconds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FEATURED CASE STUDY ═══ */}
      <div style={{ background: "rgba(19,26,42,.4)", borderTop: "1px solid #1E293B", borderBottom: "1px solid #1E293B" }}>
        <div className="section">
          {/* Header */}
          <div className="section-head reveal">
            <span className="tag" style={{ marginBottom: 16 }}>Featured Case Study</span>
            <h2>AI Website Analysis &<br /><span className="gradient-text">Automated Sales Outreach</span></h2>
            <p style={{ maxWidth: 620 }}>From inbound lead to fully-researched personalised email — in under 10 seconds.</p>
          </div>

          {/* Problem vs Solution Cards */}
          <div className="grid-2 reveal" style={{ marginBottom: 48 }}>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 0 }}>
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
          <div className="reveal" style={{ marginBottom: 48 }}>
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
          <div className="grid-3 reveal" style={{ marginBottom: 40, gap: 20 }}>
            {[
              { icon: <Activity size={22} color="var(--cyan)" />, val: "1,500 hrs", label: "Saved annually", sub: "Zero manual research hours", borderColor: "rgba(0,229,255,.15)", bgColor: "rgba(0,229,255,.07)" },
              { icon: <TrendingUp size={22} color="var(--purple)" />, val: "$60,000", label: "Operational savings", sub: "Reduced sales research workload", borderColor: "rgba(139,92,246,.15)", bgColor: "rgba(139,92,246,.07)" },
              { icon: <Zap size={22} color="var(--cyan)" />, val: "99%", label: "Time reduction", sub: "15 min → under 10 seconds", borderColor: "rgba(0,229,255,.15)", bgColor: "rgba(0,229,255,.07)" },
            ].map((s, i) => (
              <div className="card" key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start", transitionDelay: `${i * 0.1 + 0.08}s` }}>
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
          <div className="reveal" style={{ background: "linear-gradient(135deg, rgba(0,229,255,.06) 0%, rgba(139,92,246,.06) 100%)", border: "1px solid rgba(0,229,255,.15)", borderRadius: 16, padding: isMobile ? "28px 24px" : "36px 48px", display: "flex", alignItems: "center", gap: 24, flexDirection: isMobile ? "column" : "row" }}>
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

          {/* ═══ DIVIDER BETWEEN CASE STUDIES ═══ */}
          <div style={{ marginTop: 80, marginBottom: 80, display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #1E293B)" }} />
            <div style={{ background: "#131A2A", border: "1px solid #1E293B", borderRadius: 10, padding: "8px 20px", display: "inline-flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8B5CF6", boxShadow: "0 0 8px rgba(139,92,246,.5)" }} />
              <span className="f-mono" style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: 2 }}>Case Study 02</span>
            </div>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #1E293B, transparent)" }} />
          </div>

          {/* ═══ CASE STUDY 2: AI INSURANCE CLAIM ═══ */}

          {/* Header */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="tag" style={{ background: "rgba(139,92,246,.18)", marginBottom: 16, display: "inline-block" }}>Insurance Automation</span>
            <h3 className="f-display" style={{ fontSize: isMobile ? 26 : 36, color: "var(--white)", lineHeight: 1.15, marginTop: 12, marginBottom: 18 }}>
              AI Insurance Claim<br />
              <span className="gradient-text">Scope-of-Work Generator</span>
            </h3>
            <p style={{ fontSize: 19, color: "var(--muted)", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              From raw inspection data to a fully calculated repair estimate with operations task — in under 10 seconds.
            </p>
          </div>

          {/* Problem vs Solution Cards */}
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, marginBottom: 48 }}>
            {/* Problem Card */}
            <div style={{ background: "rgba(239,68,68,.04)", border: "1px solid rgba(239,68,68,.15)", borderRadius: 16, padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AlertTriangle size={16} color="#EF4444" />
                </div>
                <span className="f-mono" style={{ fontSize: 12, color: "#EF4444", textTransform: "uppercase", letterSpacing: 2 }}>THE PROBLEM</span>
              </div>
              <p style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.75, marginBottom: 20 }}>
                Insurance claims require adjusters to manually calculate repair estimates using property measurements and damage reports. This process usually involves:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Reviewing inspection data", "Calculating repair costs for drywall, flooring & materials", "Logging results in spreadsheets or claim systems", "Creating tasks for operations teams"].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", flexShrink: 0 }} />
                    <span style={{ fontSize: 16, color: "var(--text)" }}>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, background: "rgba(239,68,68,.08)", borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>Time per claim</span>
                <span className="f-mono" style={{ fontSize: 20, color: "#EF4444", fontWeight: 700 }}>10–15 min</span>
              </div>
            </div>

            {/* Solution Card */}
            <div style={{ background: "rgba(139,92,246,.04)", border: "1px solid rgba(139,92,246,.15)", borderRadius: 16, padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={16} color="#8B5CF6" />
                </div>
                <span className="f-mono" style={{ fontSize: 12, color: "#8B5CF6", textTransform: "uppercase", letterSpacing: 2 }}>THE SOLUTION</span>
              </div>
              <p style={{ fontSize: 17, color: "var(--text)", lineHeight: 1.75, marginBottom: 20 }}>
                An AI-powered automation pipeline built in n8n that processes insurance claim data instantly and generates a complete repair estimate with zero manual input.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Receives claim data through a webhook",
                  "Validates the data for accuracy",
                  "AI calculates repair costs using predefined pricing rules",
                  "Logs results into a central claims database",
                  "Automatically creates a task for the operations team"
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span className="f-mono" style={{ fontSize: 11, color: "#8B5CF6", minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
              {/* Failure note */}
              <div style={{ marginTop: 16, background: "rgba(239,68,68,.05)", border: "1px solid rgba(239,68,68,.12)", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <AlertTriangle size={14} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5 }}>If the automation fails, the system sends an alert so the claim can be processed manually.</span>
              </div>
              <div style={{ marginTop: 20, background: "rgba(139,92,246,.08)", borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>Time per claim</span>
                <span className="f-mono" style={{ fontSize: 20, color: "#8B5CF6", fontWeight: 700 }}>&lt; 10 sec</span>
              </div>
            </div>
          </div>

          {/* Workflow Architecture Diagram */}
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span className="f-mono" style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 2 }}>WORKFLOW ARCHITECTURE</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
            <div style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 16, padding: isMobile ? "24px 16px" : 32, overflowX: "auto", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "28px 28px", borderRadius: 16, pointerEvents: "none" }} />
              <img src={workflow2Img} alt="AI Insurance Claim Scope-of-Work Generator — n8n workflow architecture showing Webhook, If, Information Extractor, Groq Chat Model, Edit Fields, Append row in sheet, Create a card, and Send an Email nodes" style={{ width: "100%", minWidth: 900, height: "auto", display: "block", position: "relative" }} />
            </div>
          </div>

          {/* Results Stats Row */}
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            {[
              { icon: <Activity size={22} color="#8B5CF6" />, iconBg: "rgba(139,92,246,.07)", iconBorder: "rgba(139,92,246,.15)", value: "2,400 hrs", color: "#8B5CF6", label: "Saved annually", sub: "Zero manual claim processing" },
              { icon: <TrendingUp size={22} color="var(--cyan)" />, iconBg: "rgba(0,229,255,.07)", iconBorder: "rgba(0,229,255,.15)", value: "$80,000", color: "var(--cyan)", label: "Operational savings", sub: "Reduced claims processing workload" },
              { icon: <Zap size={22} color="#8B5CF6" />, iconBg: "rgba(139,92,246,.07)", iconBorder: "rgba(139,92,246,.15)", value: "97%", color: "#8B5CF6", label: "Time reduction", sub: "15 min → under 10 seconds" }
            ].map((s, i) => (
              <div className="card" key={i} style={{ display: "flex", gap: 18, alignItems: "flex-start", transitionDelay: `${i * 0.1 + 0.08}s` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: s.iconBg, border: `1px solid ${s.iconBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div className="f-display" style={{ fontSize: 26, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 16, color: "var(--white)", fontWeight: 700 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Outcome Callout */}
          <div className="reveal" style={{ background: "linear-gradient(135deg, rgba(139,92,246,.06) 0%, rgba(0,229,255,.06) 100%)", border: "1px solid rgba(139,92,246,.15)", borderRadius: 16, padding: isMobile ? "28px 24px" : "36px 48px", display: "flex", alignItems: "center", gap: 24, flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(139,92,246,.12)", border: "1px solid rgba(139,92,246,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CheckCircle2 size={24} color="#8B5CF6" />
            </div>
            <div style={{ textAlign: isMobile ? "left" : undefined }}>
              <div className="f-mono" style={{ fontSize: 12, color: "#8B5CF6", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>KEY OUTCOME</div>
              <p style={{ fontSize: 19, color: "var(--white)", lineHeight: 1.7, fontWeight: 500 }}>
                The system converts manual claim estimation into a fully automated workflow, allowing insurance teams to process claims faster while maintaining <strong style={{ color: "#8B5CF6" }}>consistent pricing rules.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PIPELINE DIAGRAM ═══ */}
      <div className="section-alt" id="pipeline">
        <div className="section">
          <div className="section-head reveal">
            <h2>Zero-Latency <span className="gradient-text">Lead Intake Pipeline</span></h2>
            <p>See how an automated workflow processes data faster than humanly possible.</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="toggle-wrap">
              <button className={`toggle-btn ${activeTab === "business" ? "active" : "inactive"}`} onClick={() => setActiveTab("business")}>Business View</button>
              <button className={`toggle-btn ${activeTab === "architecture" ? "active" : "inactive"}`} onClick={() => setActiveTab("architecture")}>Architecture View</button>
            </div>
          </div>
          <div className="pipe-grid">
            <div>
              {steps.map((s, i) => (
                <div className={`step${activeStep === i ? " active" : ""}`} key={i} onMouseEnter={() => setActiveStep(i)}>
                  <span className="step-num">{s.num}</span>
                  <div>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {activeTab === "business" ? <BusinessView /> : <ArchitectureView />}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 7-DAY TIMELINE ═══ */}
      <div id="timeline" ref={tlRef}>
        <div className="section">
          <div className="section-head reveal">
            <h2>First message to live system <span className="gradient-text">in 7 days.</span></h2>
          </div>
          {!isMobile ? (
            <div className="tl-wrap">
              <div className="tl-track" />
              <div className="tl-fill" style={{ width: `${tlPct}%` }} />
              <div className="tl-nodes">
                {tlNodes.map((n, i) => (
                  <div className="tl-node" key={i}>
                    <div className="tl-circle">
                      <div className="tl-ping" />
                      <n.Icon size={22} color="var(--cyan)" />
                    </div>
                    <div className="tl-day">{n.day}</div>
                    <div className="tl-title">{n.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="tl-mobile">
              <div className="tl-v-track" />
              <div className="tl-v-fill" style={{ height: `${tlPct}%` }} />
              {tlNodes.map((n, i) => (
                <div className="tl-m-node" key={i}>
                  <div className="tl-m-circle"><n.Icon size={14} color="var(--cyan)" /></div>
                  <div>
                    <div className="tl-day">{n.day}</div>
                    <div className="tl-title">{n.title}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ═══ HOW IT GETS BUILT ═══ */}
      <div className="section-alt">
        <div className="section">
          <div className="section-head reveal">
            <h2><span className="gradient-text">How it gets built.</span></h2>
            <p>Three phases. Zero ambiguity. Full transparency.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: <BarChart3 size={28} color="var(--cyan)" />, num: "01", tag: "Discovery", title: "Audit", body: "We map every manual process, every disconnected tool, and every hour your team wastes on robotic work. The result: a prioritised bottleneck report with clear ROI projections.", tags: ["Process Mapping", "Stack Analysis", "ROI Estimation"] },
              { icon: <Terminal size={28} color="var(--purple)" />, num: "02", tag: "Architecture", title: "Infrastructure", body: "We architect a production system on n8n, custom API layers, and LLM orchestration frameworks designed specifically for your operational demands and scale targets.", tags: ["n8n Workflows", "LLM Pipelines", "API Design"] },
              { icon: <Network size={28} color="var(--cyan)" />, num: "03", tag: "Deployment", title: "Orchestration", body: "We stitch your entire stack — CRMs, databases, AI models, comms — then test under production load before handing over full documentation and a live system you own entirely.", tags: ["Integration Testing", "Load Testing", "Live Handoff"] },
            ].map((c, i) => (
              <div className="card reveal" key={i} style={{ padding: 36, transitionDelay: `${i * 0.1 + 0.08}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div className="card-icon">{c.icon}</div>
                  <span className="phase-num">{c.num}</span>
                </div>
                <span className="tag" style={{ marginBottom: 12 }}>{c.tag}</span>
                <h3 style={{ marginTop: 8 }}>{c.title}</h3>
                <div className="card-body">{c.body}</div>
                <div className="phase-tags">
                  {c.tags.map((t, j) => <span className="phase-tag" key={j}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FAQ ═══ */}
      <div className="section" style={{ maxWidth: 820, margin: "0 auto" }}>
        <div className="section-head reveal">
          <h2>Common <span className="gradient-text">Questions</span></h2>
          <p>Answered directly. No fluff.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map((f, i) => (
            <div className={`faq-item reveal${openFaq === i ? " open" : ""}`} key={i}>
              <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                {openFaq === i ? <Minus size={20} color="var(--cyan)" /> : <Plus size={20} color="var(--muted)" />}
              </button>
              <div className="faq-body">{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ARCHITECT + FINAL CTA ═══ */}
      <div className="section-alt" id="audit">
        <div className="section" style={{ maxWidth: 740, margin: "0 auto", position: "relative" }}>
          <div className="orb-purple" style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", opacity: .4 }} />
          <div className="card reveal" style={{ borderRadius: 22, padding: 48, textAlign: "center", boxShadow: "0 0 50px rgba(0,229,255,.09), 0 0 80px rgba(139,92,246,.06)", position: "relative" }}>
            <div className="avatar"><Users size={42} color="var(--cyan)" /></div>
            <div className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />)}</div>
            <h3 style={{ fontSize: 28, color: "var(--white)", fontWeight: 700, marginBottom: 8 }}>Arun Reddy</h3>
            <span className="tag" style={{ marginBottom: 20 }}>Automation Systems Architect</span>
            <p style={{ fontSize: 18, lineHeight: 1.75, maxWidth: 500, margin: "20px auto 0", color: "var(--text)" }}>
              Specializing in n8n Infrastructure, LLM pipelines & API orchestration. I architect the systems that allow agencies and B2B firms to <strong style={{ color: "var(--white)" }}>scale revenue without scaling headcount</strong>.
            </p>
            <div className="stats-row">
              {[
                 { val: "2", lbl: "Systems Built" },
                 { val: "$0", lbl: "Ops Costs Saved" },
                { val: "99.9%", lbl: "Uptime SLA" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div className="stat-val">{s.val}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 72 }} className="reveal">
            <h2 className="f-display" style={{ fontSize: isMobile ? 32 : 50, color: "var(--white)", marginBottom: 20, lineHeight: 1.12 }}>
              Ready to automate <span className="gradient-text">the baseline?</span>
            </h2>
            <p style={{ fontSize: 19, color: "var(--muted)", maxWidth: 480, margin: "0 auto 36px" }}>
              Stop paying humans to do robotic work. Let's map your operational bottlenecks.
            </p>
            <button className="btn-cta" onClick={openAudit}>Claim Your Free Automation Audit <ArrowRight size={22} /></button>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 20 }}>
              100% Free. No commitment. Walk away with a custom blueprint for your agency.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--cyan)", animation: "blink 2s ease infinite", display: "inline-block" }} />
          <span className="f-display" style={{ fontSize: 14, color: "var(--muted)", letterSpacing: 4 }}>AXIOM SYSTEMS</span>
        </div>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>© 2026 Axiom Systems. All rights reserved.</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a>
        </div>
      </footer>

      {/* ═══ STICKY MOBILE CTA ═══ */}
      {isMobile && showSticky && (
        <div className="sticky-bar">
          <button className="btn-primary" onClick={openAudit}>Get Free Automation Audit <ArrowRight size={18} /></button>
        </div>
      )}

      {/* Bottom spacer when sticky bar is visible */}
      {isMobile && showSticky && <div style={{ height: 80 }} />}

      {/* ═══ AUDIT MODAL ═══ */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" style={{ padding: isMobile ? 32 : 48 }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <AuditModal onClose={() => setShowModal(false)} isMobile={isMobile} />
          </div>
        </div>
      )}
    </>
  );
};

export default AxiomSystems;
