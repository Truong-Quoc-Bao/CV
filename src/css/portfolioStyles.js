import { THEMES } from '../data/portfolioData';

// ─── CSS ──────────────────────────────────────────────────────────────────────
export const getCSS = (theme, isDark) => {
  const t = THEMES[theme];
  const bg = isDark ? '#020617' : '#f8fafc';
  const bgCard = isDark ? '#0f172a' : '#ffffff';
  const bgStrip = isDark ? '#0a0f1e' : '#f1f5f9';
  const border = isDark ? '#ffffff11' : '#e2e8f0';
  const borderMd = isDark ? '#1e293b' : '#e2e8f0';
  const text1 = isDark ? '#f1f5f9' : '#0f172a';
  const text2 = isDark ? '#94a3b8' : '#475569';
  const text3 = isDark ? '#64748b' : '#94a3b8';
  const text4 = isDark ? '#475569' : '#cbd5e1';
  const navBg = isDark ? '#02061799' : '#ffffffcc';
  const scrollBg = isDark ? '#020617' : '#f1f5f9';
  const skillTagBg = isDark ? `${t.accent}11` : `${t.accent}15`;
  const skillTagBorder = isDark ? `${t.accent}22` : `${t.accent}33`;
  const heroBg = isDark
    ? `radial-gradient(ellipse 80% 60% at 50% -10%, ${t.accent}22 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 50%, ${t.secondary}11 0%, transparent 60%), #020617`
    : `radial-gradient(ellipse 80% 60% at 50% -10%, ${t.accent}18 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 50%, ${t.secondary}0d 0%, transparent 60%), #f8fafc`;

  return `
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body { background:${bg}; color:${text1}; font-family:'Segoe UI',system-ui,-apple-system,sans-serif; overflow-x:hidden; transition: background .4s, color .4s; }
a { text-decoration:none; }
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:${scrollBg}; }
::-webkit-scrollbar-thumb { background:linear-gradient(${t.accent},${
    t.secondary
  }); border-radius:2px; }

@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
@keyframes scanline { 0%{top:-2px} 100%{top:100vh} }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes blinkPulse { 0%,100%{opacity:1;text-shadow:0 0 6px ${
    t.secondary
  }} 50%{opacity:0;text-shadow:none} }
@keyframes particleFloat { 0%{transform:translateY(0) translateX(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-100vh) translateX(var(--drift));opacity:0} }
@keyframes tiltReset { to{transform:perspective(600px) rotateX(0deg) rotateY(0deg)} }
@keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes backTopPulse { 0%,100%{box-shadow:0 0 0 0 ${
    t.accent
  }55} 50%{box-shadow:0 0 0 8px transparent} }
@keyframes tooltipIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
@keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

.text-gradient {
  background: linear-gradient(135deg, ${t.accentLight}, ${t.accent}, ${t.secondary}, ${
    t.accentLight
  });
  background-size:300% 300%;
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  animation: shimmer 4s ease infinite;
}
.reveal { opacity:0; transform:translateY(30px); transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
.reveal.visible { opacity:1; transform:translateY(0); }
.stagger-children .reveal:nth-child(1){transition-delay:.05s}
.stagger-children .reveal:nth-child(2){transition-delay:.1s}
.stagger-children .reveal:nth-child(3){transition-delay:.15s}
.stagger-children .reveal:nth-child(4){transition-delay:.2s}
.stagger-children .reveal:nth-child(5){transition-delay:.25s}
.stagger-children .reveal:nth-child(6){transition-delay:.3s}
.stagger-children .reveal:nth-child(7){transition-delay:.35s}

.scanline { position:fixed; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,${
    t.accent
  }33,transparent); animation:scanline 8s linear infinite; pointer-events:none; z-index:9999; }

.particles-container { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
.particle { position:absolute; border-radius:50%; animation:particleFloat linear infinite; bottom:-10px; }

.nav { position:fixed; top:0; left:0; right:0; z-index:1000; backdrop-filter:blur(20px); background:${navBg}; border-bottom:1px solid ${border}; padding:0 24px; display:flex; align-items:center; height:60px; transition:background .4s; }
.nav-logo { font-weight:900; font-size:18px; letter-spacing:2px; }
.nav-links { display:flex; gap:8px; margin-left:auto; align-items:center; }
.nav-link { font-size:12px; color:${text2}; cursor:pointer; padding:6px 12px; border-radius:8px; border:none; background:transparent; transition:.2s; font-weight:500; }
.nav-link:hover, .nav-link.active { color:${t.accentLight}; background:${t.accent}11; }
.nav-controls { display:flex; align-items:center; gap:8px; margin-left:12px; }

.theme-btn { width:28px; height:28px; border-radius:50%; border:2px solid transparent; cursor:pointer; transition:all .2s; flex-shrink:0; }
.theme-btn:hover { transform:scale(1.15); }
.theme-btn.active { border-color:${text1}; box-shadow:0 0 0 2px ${bg}, 0 0 0 4px ${text1}; }

.dark-toggle { background:none; border:1px solid ${border}; color:${text2}; width:32px; height:32px; border-radius:8px; cursor:pointer; font-size:15px; display:flex; align-items:center; justify-content:center; transition:all .2s; }
.dark-toggle:hover { border-color:${t.accentLight}; color:${t.accentLight}; }

.lang-btn { background:none; border:1px solid ${border}; color:${text2}; padding:4px 10px; border-radius:8px; cursor:pointer; font-size:11px; font-weight:700; letter-spacing:.5px; transition:all .2s; display:flex; align-items:center; gap:4px; }
.lang-btn:hover { border-color:${t.accentLight}; color:${t.accentLight}; }

.section { padding:80px 24px; max-width:1100px; margin:0 auto; position:relative; z-index:1; }
.section-label { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:${
    t.accent
  }; background:${t.accent}11; border:1px solid ${
    t.accent
  }33; padding:6px 16px; border-radius:100px; margin-bottom:16px; }
.section-label .dot { width:6px; height:6px; border-radius:50%; background:${
    t.accent
  }; display:inline-block; }
.section-title { font-size:clamp(28px,4vw,42px); font-weight:900; line-height:1.1; margin-bottom:8px; }
.section-sub { color:${text3}; font-size:15px; margin-bottom:48px; }

.card-glow { border:1px solid ${border}; border-radius:16px; background:linear-gradient(135deg,${bgCard},${
    isDark ? '#1e1b4b11' : '#ede9fe11'
  }); transition:all .3s ease; position:relative; }
.card-glow:hover { border-color:${t.accent}44; box-shadow:0 0 30px ${t.accent}22,inset 0 0 30px ${
    t.accent
  }08; transform:translateY(-4px) perspective(600px); }
.card-glow::before { content:''; position:absolute; inset:-1px; border-radius:17px; background:linear-gradient(135deg,${
    t.accent
  }33,transparent,${t.secondary}33); opacity:0; transition:.3s; z-index:-1; }
.card-glow:hover::before { opacity:1; }

.btn-primary { background:linear-gradient(135deg,${t.accent},${
    t.accentDark
  }); border:none; color:#fff; padding:12px 28px; border-radius:12px; font-weight:700; font-size:14px; cursor:pointer; transition:all .3s; position:relative; overflow:hidden; letter-spacing:.5px; }
.btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,${
    t.secondary
  },${t.accent}); opacity:0; transition:.3s; }
.btn-primary:hover::after { opacity:1; }
.btn-primary span { position:relative; z-index:1; }
.btn-outline { background:transparent; border:1px solid ${t.accent}66; color:${
    t.accentLight
  }; padding:12px 28px; border-radius:12px; font-weight:600; font-size:14px; cursor:pointer; transition:all .3s; }
.btn-outline:hover { background:${t.accent}22; border-color:${t.accent}; }
.copy-btn { background:none; border:1px solid ${borderMd}; color:${text3}; padding:4px 10px; border-radius:6px; font-size:11px; cursor:pointer; transition:.2s; font-family:monospace; white-space:nowrap; }
.copy-btn:hover { border-color:${t.accent}; color:${t.accentLight}; }

.badge { font-size:11px; font-weight:700; padding:4px 10px; border-radius:100px; letter-spacing:.5px; }
.badge-violet { background:${t.accent}22; color:${t.accentLight}; border:1px solid ${t.accent}44; }
.badge-cyan   { background:#06b6d422; color:#67e8f9; border:1px solid #06b6d444; }
.badge-green  { background:#10b98122; color:#6ee7b7; border:1px solid #10b98144; }

.grid-2 { display:grid; grid-template-columns:repeat(auto-fit,minmax(460px,1fr)); gap:24px; }
.grid-3 { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; }

.typewriter-text { color:${t.accentLight}; }
.typewriter-cursor { color:${t.secondary}; animation:blinkPulse 1s step-end infinite; }

.app { background:${bg}; min-height:100vh; transition:background .4s; }
.hero-section { min-height:100vh; display:flex; align-items:center; position:relative; overflow:hidden; padding-top:80px; background:${heroBg}; }
.hero-bg-text { position:absolute; font-size:clamp(80px,15vw,180px); font-weight:900; color:${
    t.accent
  }04; letter-spacing:-5px; top:50%; left:50%; transform:translate(-50%,-50%); white-space:nowrap; pointer-events:none; user-select:none; }
.floating-tag { position:absolute; background:${bgCard}ee; border:1px solid ${
    t.accent
  }44; border-radius:10px; padding:8px 14px; font-size:12px; font-weight:600; color:${
    t.accentLight
  }; backdrop-filter:blur(10px); white-space:nowrap; pointer-events:none; animation:float linear infinite; }
.hero-inner { z-index:1; padding-top:80px; padding-bottom:80px; }
.hero-title { font-size:clamp(40px,7vw,80px); font-weight:900; line-height:1; margin-bottom:16px; letter-spacing:-2px; color:${text1}; }
.hero-subtitle { font-size:clamp(18px,2.5vw,24px); color:${text2}; margin-bottom:8px; font-weight:500; }
.hero-desc { font-size:15px; color:${text3}; max-width:600px; line-height:1.8; margin-bottom:32px; }
.hero-contacts { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
.contact-chip { font-size:13px; color:${text3}; background:${bgCard}; border:1px solid ${borderMd}; padding:6px 14px; border-radius:100px; }
.hero-btns { display:flex; flex-wrap:wrap; gap:12px; }

.stats-strip { background:${bgStrip}; border-top:1px solid ${border}; border-bottom:1px solid ${border}; padding:40px 24px; position:relative; z-index:1; transition:background .4s; }
.stats-grid { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:24px; }
.stat-item { text-align:center; }
.stat-num-row { display:flex; align-items:baseline; justify-content:center; gap:4px; }
.stat-num { font-size:40px; font-weight:900; line-height:1; }
.stat-unit { font-size:14px; color:${t.accent}; font-weight:700; }
.stat-label { font-size:13px; color:${text3}; margin-top:4px; }

.tabs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
.tab-btn { padding:8px 18px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; transition:.2s; letter-spacing:.5px; }
.tab-btn.active { background:${t.accent}; color:#fff; border:1px solid ${t.accent}; }
.tab-btn:not(.active) { background:transparent; color:${text3}; border:1px solid ${borderMd}; }
.tab-btn:not(.active):hover { color:${t.accentLight}; border-color:${t.accent}33; }
.skills-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
.skill-tags { display:flex; flex-wrap:wrap; gap:8px; }
.skill-tag { display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600; color:${
    t.accentLight
  }; background:${skillTagBg}; border:1px solid ${skillTagBorder}; padding:5px 12px; border-radius:100px; transition:.2s; cursor:default; position:relative; }
.skill-tag:hover { background:${t.accent}22; border-color:${t.accent}55; }
.skill-bar-wrap { margin-bottom:12px; position:relative; }
.skill-bar-label { display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; color:${
    isDark ? '#cbd5e1' : '#334155'
  }; font-weight:600; }
.skill-bar-pct { color:${t.accent}; font-weight:700; }
.progress-bar { height:6px; background:${borderMd}; border-radius:3px; overflow:hidden; }
.progress-fill { height:100%; background:linear-gradient(90deg,${t.accent},${
    t.secondary
  }); border-radius:3px; transition:width .8s ease; }

.skill-tooltip { position:absolute; bottom:calc(100% + 6px); left:50%; transform:translateX(-50%); background:${
    isDark ? '#1e293b' : '#0f172a'
  }; color:#f1f5f9; font-size:11px; padding:5px 10px; border-radius:7px; white-space:nowrap; pointer-events:none; z-index:100; animation:tooltipIn .15s ease; border:1px solid ${
    t.accent
  }44; }
.skill-tooltip::after { content:''; position:absolute; top:100%; left:50%; transform:translateX(-50%); border:5px solid transparent; border-top-color:${
    isDark ? '#1e293b' : '#0f172a'
  }; }

.exp-card { padding:32px; }
.exp-header { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:24px; }
.exp-company { font-size:22px; font-weight:900; color:${text1}; }
.exp-role { color:${t.accent}; font-weight:700; font-size:15px; }
.exp-right { text-align:right; }
.exp-location { font-size:12px; color:${text4}; margin-top:6px; }
.exp-items { display:flex; flex-direction:column; gap:14px; }
.exp-item { display:flex; gap:12px; align-items:flex-start; }
.exp-icon { font-size:18px; flex-shrink:0; margin-top:1px; }
.exp-item p { font-size:14px; color:${text2}; line-height:1.7; }

.project-card { padding:28px; display:flex; flex-direction:column; }
.project-top { display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:12px; }
.project-period { font-size:12px; color:${text4}; }
.project-title { font-size:19px; font-weight:800; color:${text1}; margin-bottom:4px; }
.project-meta { font-size:12px; color:${t.accent}; font-weight:600; margin-bottom:12px; }
.project-desc { font-size:13px; color:${text2}; line-height:1.7; margin-bottom:16px; flex:1; }
.tech-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px; }
.tech-tag { font-size:10px; font-weight:700; color:${text3}; background:${borderMd}; border:1px solid ${
    isDark ? '#334155' : '#cbd5e1'
  }; padding:3px 8px; border-radius:100px; }
.highlights-label { font-size:11px; font-weight:700; color:${text4}; letter-spacing:1px; text-transform:uppercase; margin-bottom:6px; }
.highlights { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px; }
.highlight-tag { font-size:11px; color:${t.accentLight}; background:${
    t.accent
  }11; border:1px solid ${t.accent}22; padding:2px 8px; border-radius:100px; }
.demo-cred { background:${isDark ? '#1e1b4b33' : t.accent + '08'}; border:1px solid ${
    t.accent
  }22; border-radius:12px; padding:16px; margin-bottom:16px; }
.cred-title { font-size:11px; font-weight:700; color:${
    t.accent
  }; margin-bottom:10px; text-transform:uppercase; letter-spacing:1px; }
.cred-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.cred-field-label { font-size:10px; color:${text4}; margin-bottom:1px; }
.cred-val { font-size:12px; color:${text1}; font-family:monospace; }
.cred-note { font-size:11px; color:${text3}; font-style:italic; margin-top:8px; }
.project-links { display:flex; gap:12px; padding-top:12px; border-top:1px solid ${borderMd}; }

/* ─── Simulator Styles ─── */
.sim-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:24px; margin-top:24px; }
.sim-visualizer { background:${bgCard}; border:1px solid ${border}; border-radius:16px; padding:24px; display:flex; flex-direction:column; justify-content:space-between; height:360px; position:relative; overflow:hidden; }
.sim-visual-title { font-size:14px; font-weight:700; color:${
    t.accentLight
  }; letter-spacing:1px; text-transform:uppercase; margin-bottom:12px; }
.sim-nodes-row { display:flex; justify-content:space-between; align-items:center; position:relative; margin:auto 0; padding:0 10px; }
.sim-nodes-row::before { content:''; position:absolute; left:20px; right:20px; height:2px; background:${borderMd}; z-index:0; }
.sim-node { width:52px; height:52px; border-radius:50%; background:${bgCard}; border:2px solid ${borderMd}; display:flex; align-items:center; justify-content:center; font-size:20px; z-index:1; transition:all .3s ease; position:relative; }
.sim-node.active { border-color:${t.accent}; box-shadow:0 0 15px ${
    t.accent
  }aa; transform:scale(1.15); background:${t.accent}11; }
.sim-node.success { border-color:${t.secondary}; background:${t.secondary}15; box-shadow:0 0 15px ${
    t.secondary
  }aa; }
.sim-node-label { position:absolute; top:calc(100% + 8px); left:50%; transform:translateX(-50%); font-size:9px; color:${text3}; white-space:nowrap; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; }
.sim-terminal { background:#030712; border:1px solid ${borderMd}; border-radius:16px; font-family: 'Courier New', Courier, monospace; padding:20px; height:340px; overflow-y:auto; display:flex; flex-direction:column; gap:8px; box-shadow: inset 0 0 20px #000; position:relative; }
.sim-terminal::before { content:'● ● ●'; position:absolute; top:6px; left:12px; font-size:10px; color:#4b5563; word-spacing:2px; }
.sim-terminal-content { margin-top:8px; }
.sim-terminal-line { font-size:12px; line-height:1.6; color:#34d399; word-break:break-all; }
.sim-terminal-line.err { color:#f87171; }
.sim-terminal-line.info { color:#60a5fa; }
.sim-terminal-line.sys { color:#9ca3af; }
.sim-controls { margin-bottom:16px; display:flex; flex-direction:column; gap:12px; }
.sim-select { width:100%; padding:12px; border-radius:10px; background:${bgCard}; border:1px solid ${borderMd}; color:${text1}; font-size:13px; font-weight:600; outline:none; cursor:pointer; transition:.2s; }
.sim-select:focus { border-color:${t.accent}; }
.sim-desc-box { font-size:13px; color:${text2}; line-height:1.7; background:${bgStrip}; border:1px solid ${border}; padding:14px; border-radius:10px; }

/* ─── Playgound Styles ─── */
.sim-tabs-nav { display:flex; gap:8px; margin-bottom:12px; border-bottom:1px solid ${borderMd}; padding-bottom:8px; }
.sim-tab-title { font-size:12px; font-weight:700; color:${text3}; cursor:pointer; padding:4px 8px; border-radius:6px; transition:.2s; }
.sim-tab-title.active { color:${t.accentLight}; background:${t.accent}15; }
.sim-db-container { display:flex; flex-direction:column; gap:10px; height:100%; overflow-y:auto; padding-top:4px; }
.sim-db-row { display:flex; justify-content:space-between; align-items:center; background:${bgStrip}; padding:8px 12px; border-radius:8px; border:1px solid ${border}; font-size:12px; }
.sim-db-balance { font-size:18px; font-weight:800; color:${t.secondaryLight}; }
.sim-preset-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:12px; }
.sim-preset-btn { background:transparent; border:1px solid ${borderMd}; color:${text2}; padding:10px; border-radius:10px; font-size:12px; font-weight:600; text-align:left; cursor:pointer; transition:.2s; display:flex; align-items:center; gap:8px; }
.sim-preset-btn:hover:not(:disabled) { border-color:${t.accent}; background:${t.accent}0a; color:${
    t.accentLight
  }; }
.sim-preset-btn:disabled { opacity:0.5; cursor:not-allowed; }

/* ─── Webhub & Push CSS additions ─── */
.sim-input { width:100%; padding:10px 12px; border-radius:8px; background:${bgCard}; border:1px solid ${borderMd}; color:${text1}; font-size:12px; outline:none; transition:.2s; }
.sim-input:focus { border-color:${t.accent}; }
.sim-badge-list { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
.sim-acc-badge { font-size:10px; font-weight:700; color:${t.secondaryLight}; background:${
    t.secondary
  }15; border:1px solid ${t.secondary}33; padding:4px 10px; border-radius:100px; }
.mock-phone-frame { border: 2px solid ${borderMd}; border-radius: 12px; padding: 12px; background: #030712; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 160px; position: relative; width: 100%; overflow: hidden; }
.mock-phone-notification { position: absolute; top: 12px; left: 12px; right: 12px; background: rgba(15, 23, 42, 0.95); border: 1px solid ${
    t.accent
  }44; border-radius: 8px; padding: 8px 12px; font-size: 11px; color: #f1f5f9; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.5); transform: translateY(-10px); animation: fadeSlideUp 0.3s forwards; z-index: 10; }

.goals-card { padding:28px; }
.goals-icon { font-size:28px; margin-bottom:12px; }
.goals-title { font-size:17px; font-weight:800; color:${text1}; margin-bottom:12px; }
.goals-body { font-size:14px; color:${text2}; line-height:1.8; }
.philosophy-quote { font-size:14px; color:${text2}; font-style:italic; line-height:1.8; border-left:2px solid ${
    t.accent
  }; padding-left:16px; margin-bottom:12px; }

.quote-card { background:linear-gradient(135deg,${bgCard},${
    isDark ? '#1e1b4b22' : t.accent + '08'
  }); border:1px solid ${t.accent}22; border-radius:16px; padding:28px; }
.quote-mark { font-size:40px; line-height:1; font-family:Georgia,serif; margin-bottom:8px; }
.quote-text { font-size:14px; color:${text2}; line-height:1.8; font-style:italic; margin-bottom:20px; }
.quote-author { border-top:1px solid ${borderMd}; padding-top:16px; display:flex; align-items:center; gap:12px; }
.quote-avatar { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; }
.quote-name { font-size:13px; font-weight:700; color:${text1}; }
.quote-sub { font-size:11px; color:${text4}; }

.contact-card { padding:24px; text-align:center; }
.contact-icon { font-size:28px; margin-bottom:12px; }
.contact-label { font-size:11px; color:${text4}; font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; }
.contact-val { font-size:13px; color:${text1}; margin-bottom:12px; word-break:break-all; }
.contact-btns { display:flex; justify-content:center; gap:16px; margin-top:40px; }
.footer { text-align:center; margin-top:48px; padding-top:32px; border-top:1px solid ${borderMd}; }
.footer p { font-size:12px; color:${text4}; }

.toast { position:fixed; bottom:24px; right:80px; background:${
    t.accent
  }; color:#fff; padding:12px 20px; border-radius:10px; font-size:13px; font-weight:600; z-index:9999; box-shadow:0 4px 20px ${
    t.accent
  }66; animation:fadeSlideUp .3s ease; }

.back-top { position:fixed; bottom:24px; right:24px; width:44px; height:44px; border-radius:12px; background:${
    t.accent
  }; color:#fff; border:none; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; z-index:1000; transition:all .3s; animation:backTopPulse 2s ease infinite; }
.back-top:hover { background:${t.accentDark}; transform:translateY(-3px); }
.back-top.hidden { opacity:0; pointer-events:none; transform:translateY(10px); }

.tilt-card { transition:transform .15s ease, box-shadow .15s ease; }

.theme-palette { display:flex; gap:6px; align-items:center; }

@media (max-width:768px) {
    /* Chuyển navbar thành Grid 2 tầng gọn gàng */
    .nav {
      display: grid;
      grid-template-areas: 
        "logo controls"
        "links links";
      grid-template-columns: 1fr auto;
      height: auto;
      padding: 8px 16px;
      gap: 8px;
      backdrop-filter: blur(20px);
    }
  
    /* Định vị Logo ở tầng 1 bên trái */
    .nav-logo {
      grid-area: logo;
      font-size: 14px;
      align-self: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  
    /* Định vị Cụm nút bấm ở tầng 1 bên phải */
    .nav-controls {
      grid-area: controls;
      margin-left: 0;
      align-self: center;
      gap: 6px;
    }
  
    /* Tầng 2: Thanh menu trượt ngang bằng cử chỉ vuốt chạm cực mượt */
    .nav-links {
      grid-area: links;
      display: flex;
      overflow-x: auto; /* Cho phép cuộn ngang */
      white-space: nowrap;
      gap: 6px;
      padding: 4px 0 8px 0;
      width: 100%;
      margin-left: 0;
      justify-content: flex-start;
      -webkit-overflow-scrolling: touch; /* Tạo hiệu ứng cuộn mượt trên iOS */
      scrollbar-width: none; /* Ẩn scrollbar trên Firefox */
    }
  
    /* Ẩn thanh cuộn xấu xí trên Chrome/Safari/Opera */
    .nav-links::-webkit-scrollbar {
      display: none; 
    }
  
    /* Tối ưu kích thước các thẻ điều hướng trên mobile */
    .nav-link {
      padding: 6px 10px;
      font-size: 11px;
      flex-shrink: 0; /* Không cho phép co cụm chữ */
      background: ${isDark ? '#1e293b55' : '#f1f5f999'};
      border-radius: 6px;
    }
  
    /* Điều chỉnh khoảng cách phần Hero để không bị Navbar đè lên và căn giữa toàn bộ khối */
    .hero-section {
      padding-top: 110px;
      justify-content: center; /* BỔ SUNG: Căn giữa khối lớn trên trục ngang */
      width: 100%;             /* BỔ SUNG: Đảm bảo phủ hết chiều rộng màn hình */
    }
  
    /* Ẩn bớt các hiệu ứng bay nhảy không cần thiết trên mobile để mượt máy */
    .floating-tag {
      display: none;
    }
  
    .section {
      padding: 50px 16px;
    }
  
    /* Cho phép hiển thị lại bảng màu chuyển đổi trên mobile */
    .theme-palette {
      display: flex !important; 
      gap: 4px;
    }
    
    .theme-btn {
      width: 20px;
      height: 20px;
    }
  
    .lang-btn span {
      display: none; /* Ẩn chữ EN/VI, chỉ giữ lại icon cờ trên mobile cho gọn */
    }

    /* Đảm bảo toàn bộ khung chứa nội dung Hero giãn rộng và căn giữa */
    .hero-inner {
      text-align: center;
      width: 100% !important;
      max-width: 100% !important;
    }
    
    /* Ép các div bọc hiệu ứng Reveal cũng phải căn giữa */
    .hero-inner .reveal {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    
    /* Căn giữa tiêu đề chính và tiêu đề phụ */
    .hero-title {
      text-align: center;
      width: 100%;
    }
  
    .hero-subtitle {
      text-align: center;
      width: 100%;
    }
  
    /* Căn giữa và khống chế chiều rộng mô tả để không bị tràn */
    .hero-desc {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
    }
  
    /* Căn giữa hàng loạt thẻ liên hệ (Contact Chips) */
    .hero-contacts {
      justify-content: center;
      width: 100%;
    }
  
    /* Căn giữa cụm nút kêu gọi hành động (CTA Buttons) */
    .hero-btns {
      justify-content: center;
      width: 100%;
    }

    /* Căn giữa phần tiêu đề đầu (Label, Title, Subtitle) của TẤT CẢ các Section trên mobile */
    .section > .reveal:first-of-type {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
    }
  
    /* Đảm bảo chữ tiêu đề căn giữa */
    .section-title {
      text-align: center;
      width: 100%;
    }
  
    /* Đảm bảo mô tả phụ căn giữa và không bị lệch lề */
    .section-sub {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
      margin-bottom: 32px; /* Thu hẹp khoảng cách dưới tiêu đề trên mobile cho gọn */
    }

    /* 1. ÉP BUỘC khung cha ngoài cùng chuyển sang cột và căn giữa tuyệt đối */
    .hero-section {
      padding-top: 110px;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      width: 100% !important;
      min-height: 100vh;
    }
  
    /* 2. ÉP BUỘC khối nội dung chính giãn rộng 100% và căn giữa tất cả con */
    .hero-inner {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      width: 100% !important;
      max-width: 100% !important;
      padding: 16px !important;
      margin: 0 auto !important;
    }
    
    /* Ép tất cả các thẻ chữ bên trong .hero-inner phải hiển thị căn giữa */
    .hero-inner * {
      text-align: center !important;
    }
    
    /* Ép các div Reveal (bọc hiệu ứng xuất hiện) phải giãn rộng và căn giữa */
    .hero-inner .reveal {
      width: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
    }
    
    /* Căn giữa tiêu đề chính và tiêu đề phụ */
    .hero-title {
      text-align: center !important;
      width: 100% !important;
    }
  
    .hero-subtitle {
      text-align: center !important;
      width: 100% !important;
    }
  
    /* Căn giữa mô tả phụ và khống chế chiều rộng */
    .hero-desc {
      text-align: center !important;
      margin: 0 auto 32px auto !important;
      max-width: 100% !important;
    }
  
    /* Ép cụm thẻ liên hệ (Contact Chips) phải căn giữa màn hình */
    .hero-contacts {
      display: flex !important;
      justify-content: center !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
      width: 100% !important;
    }
  
    /* Ép cụm nút bấm (GitHub, LinkedIn, Copy Email) phải căn giữa đồng đều */
    .hero-btns {
      display: flex !important;
      justify-content: center !important;
      flex-wrap: wrap !important;
      gap: 12px !important;
      width: 100% !important;
    }

    /* Ép các Grid chuyển sang hiển thị 1 cột trên Mobile */
    .grid-2 {
      grid-template-columns: 1fr !important;
    }
    
    .grid-3 {
      grid-template-columns: 1fr !important;
    }
    
    .sim-grid {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }

    /* Thu nhỏ nhẹ padding của các card trên mobile để tiết kiệm diện tích */
    .exp-card, .project-card, .goals-card, .quote-card {
      padding: 20px !important;
    }

    /* Tối ưu hóa trình giả lập trên mobile để các nút tròn không bị tràn */
    .sim-visualizer {
      padding: 16px !important;
      height: auto !important;
      min-height: 320px !important;
    }

    .sim-nodes-row {
      gap: 4px !important;
      justify-content: space-around !important;
      margin: 30px 0 !important;
    }

    .sim-node {
      width: 44px !important;
      height: 44px !important;
      font-size: 16px !important;
    }

    .sim-node-label {
      font-size: 8px !important;
    }
  }
  `;
};
