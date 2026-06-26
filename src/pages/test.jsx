import { useState, useEffect, useRef, useCallback } from 'react';
import { T, THEMES, SKILLS, SKILL_LEVELS, PROJECTS } from './portfolioData';
import { getCSS } from './portfolioStyles';

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles({ theme, mousePos }) {
  const particles = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 8,
      drift: `${(Math.random() - 0.5) * 200}px`,
      color: Math.random() > 0.5 ? THEMES[theme].accent : THEMES[theme].secondary,
      opacity: Math.random() * 0.4 + 0.1,
      baseLeft: Math.random() * 100,
    })),
  ).current;

  return (
    <div className="particles-container">
      {particles.map((p) => {
        const parallax = mousePos ? (p.baseLeft - 50) * 0.03 : 0;
        return (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left + parallax}%`,
              background: p.color,
              opacity: p.opacity,
              '--drift': p.drift,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── TypeWriter ───────────────────────────────────────────────────────────────
function TypeWriter({ texts, speed = 60 }) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = texts[textIdx];
    if (!deleting && charIdx < cur.length) {
      const t = setTimeout(() => {
        setDisplay(cur.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === cur.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => {
        setDisplay(cur.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, textIdx, texts, speed]);

  return (
    <span>
      <span className="typewriter-text">{display}</span>
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

// ─── Reveal ───────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, className = '', style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal${vis ? ' visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

// ─── TiltCard ─────────────────────────────────────────────────────────────────
function TiltCard({ children, className = '', style = {} }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${
      -y * 10
    }deg) translateY(-4px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div
      ref={ref}
      className={`card-glow tilt-card ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

// ─── CopyBtn ──────────────────────────────────────────────────────────────────
function CopyBtn({ value, label }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="copy-btn" onClick={copy}>
      {copied ? '✓ Copied!' : label || 'Copy'}
    </button>
  );
}

// ─── SkillBar with Tooltip ────────────────────────────────────────────────────
function SkillBar({ name, level, delay = 0 }) {
  const [ref, vis] = useReveal();
  const [hovered, setHovered] = useState(false);
  const label = level >= 85 ? '⭐ Expert' : level >= 75 ? '✅ Proficient' : '📈 Intermediate';
  return (
    <div
      ref={ref}
      className="skill-bar-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="skill-tooltip">
          {label} · {level}%
        </div>
      )}
      <div className="skill-bar-label">
        <span>{name}</span>
        <span className="skill-bar-pct">{level}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: vis ? `${level}%` : 0,
            transition: vis ? `width .8s ease ${delay}ms` : 'none',
          }}
        />
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang, isDark, setIsDark, theme, setTheme, t }) {
  const [active, setActive] = useState('hero');
  const sections = ['hero', 'skills', 'experience', 'projects', 'simulator', 'goals', 'testimonials', 'contact'];
  const labels = t.nav;

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.3 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className="nav">
      <span className="nav-logo text-gradient">Trương Quốc Bảo - Portfolial</span>
      <div className="nav-links">
        {sections.map((s) => (
          <button
            key={s}
            className={`nav-link${active === s ? ' active' : ''}`}
            onClick={() => scrollTo(s)}
          >
            {labels[s]}
          </button>
        ))}
      </div>
      <div className="nav-controls">
        <div className="theme-palette">
          {Object.entries(THEMES).map(([key, val]) => (
            <button
              key={key}
              className={`theme-btn${theme === key ? ' active' : ''}`}
              style={{ background: val.accent }}
              onClick={() => setTheme(key)}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </div>
        <button className="lang-btn" onClick={() => setLang((l) => (l === 'vi' ? 'en' : 'vi'))}>
          {lang === 'vi' ? '🇬🇧' : '🇻🇳'}
          <span>{lang === 'vi' ? ' EN' : ' VI'}</span>
        </button>
        <button className="dark-toggle" onClick={() => setIsDark((d) => !d)} title="Toggle theme">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ t, lang }) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-text">DEV</div>
      <div className="floating-tag" style={{ top: '15%', right: '8%', animationDuration: '6s' }}>
        ⚡ Next.js App Router
      </div>
      <div
        className="floating-tag"
        style={{ top: '35%', right: '3%', animationDuration: '5s', animationDelay: '.8s' }}
      >
        🐘 PostgreSQL
      </div>
      <div
        className="floating-tag"
        style={{ bottom: '25%', right: '10%', animationDuration: '7s', animationDelay: '1.5s' }}
      >
        🤖 n8n · GraphQL
      </div>
      <div className="section hero-inner">
        <Reveal>
          <div className="section-label">
            <span className="dot" />
            {t.hero.label}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="hero-title">
            <span>Trương</span>
            <br />
            <span className="text-gradient">Quốc Bảo</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="hero-subtitle">
            <TypeWriter texts={t.typewriterTexts} />
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="hero-desc">
            {t.hero.desc} <strong style={{ color: '#a78bfa' }}>Fado Global</strong>
            {t.hero.desc2}
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="hero-contacts">
            {t.hero.contacts.map((c, i) => (
              <span key={i} className="contact-chip">
                {c}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div className="hero-btns">
            <a href="https://github.com/Truong-Quoc-Bao" target="_blank" rel="noreferrer">
              <button className="btn-primary">
                <span>{t.hero.github}</span>
              </button>
            </a>
            <a
              href="https://www.linkedin.com/in/truong-quoc-bao-tqb19042004/?locale=vi-VN"
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn-outline">LinkedIn →</button>
            </a>
            <CopyBtn value="baotruong.190404@gmail.com" label={t.hero.copyEmail} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsSection({ t }) {
  return (
    <div className="stats-strip">
      <div className="stats-grid stagger-children">
        {t.stats.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="stat-item">
              <div className="stat-num-row">
                <span className="stat-num text-gradient">{s.n}</span>
                <span className="stat-unit">{s.unit}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function SkillsSection({ t }) {
  const [tab, setTab] = useState('frontend');
  return (
    <section id="skills" className="section">
      <Reveal>
        <div className="section-label">💡 {t.skills.label.replace('💡 ', '')}</div>
        <h2 className="section-title">
          {t.skills.title} <span className="text-gradient">{t.skills.titleGrad}</span>
        </h2>
        <p className="section-sub">{t.skills.sub}</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="tabs">
          {Object.keys(SKILLS).map((tk) => (
            <button
              key={tk}
              className={`tab-btn${tab === tk ? ' active' : ''}`}
              onClick={() => setTab(tk)}
            >
              {t.skills.tabs[tk]}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="skills-grid">
        <Reveal delay={200}>
          <div className="skill-tags">
            {SKILLS[tab].map((s, i) => (
              <span key={i} className="skill-tag">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div>
            {SKILLS[tab]
              .filter((s) => SKILL_LEVELS[s])
              .map((s, i) => (
                <SkillBar key={s} name={s} level={SKILL_LEVELS[s]} delay={i * 80} />
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function ExperienceSection({ t }) {
  return (
    <section id="experience" className="section">
      <Reveal>
        <div className="section-label">{t.experience.label}</div>
        <h2 className="section-title">
          {t.experience.title} <span className="text-gradient">{t.experience.titleGrad}</span>
        </h2>
        <p className="section-sub">{t.experience.sub}</p>
      </Reveal>
      <Reveal delay={100}>
        <TiltCard className="exp-card">
          <div className="exp-header">
            <div>
              <h3 className="exp-company">FADO GLOBAL</h3>
              <p className="exp-role">{t.experience.role}</p>
            </div>
            <div className="exp-right">
              <span className="badge badge-violet">Dec 2025 – Apr 2026</span>
              <div className="exp-location">{t.experience.location}</div>
            </div>
          </div>
          <div className="exp-items stagger-children">
            {t.experience.items.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="exp-item">
                  <span className="exp-icon">{item.icon}</span>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </TiltCard>
      </Reveal>
    </section>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
function ProjectCard({ proj, idx, t, lang }) {
  const [copied, setCopied] = useState('');
  const copy = (val, key) => {
    navigator.clipboard.writeText(val).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };
  const emailVal = typeof proj.creds.email === 'object' ? proj.creds.email[lang] : proj.creds.email;
  const passVal = typeof proj.creds.pass === 'object' ? proj.creds.pass[lang] : proj.creds.pass;
  const noteVal = typeof proj.creds.note === 'object' ? proj.creds.note[lang] : proj.creds.note;
  const descVal = proj.desc[lang];
  return (
    <Reveal delay={idx * 150}>
      <TiltCard className="project-card">
        <div className="project-top">
          <span className={`badge ${proj.tagColor}`}>{proj.type}</span>
          <span className="project-period">{proj.period}</span>
        </div>
        <h3 className="project-title">{proj.title}</h3>
        <div className="project-meta">
          {proj.role} · {proj.arch}
        </div>
        <p className="project-desc">{descVal}</p>
        <div className="tech-tags">
          {proj.tech.map((tt, i) => (
            <span key={i} className="tech-tag">
              {tt}
            </span>
          ))}
        </div>
        <div className="highlights-label">{t.projects.highlights}</div>
        <div className="highlights">
          {proj.highlights.map((h, i) => (
            <span key={i} className="highlight-tag">
              ✓ {h}
            </span>
          ))}
        </div>
        <div className="demo-cred">
          <div className="cred-title">{t.projects.demoTitle}</div>
          <div className="cred-row">
            <div>
              <div className="cred-field-label">{t.projects.emailLabel}</div>
              <code className="cred-val">{emailVal}</code>
            </div>
            <button className="copy-btn" onClick={() => copy(emailVal, 'email')}>
              {copied === 'email' ? '✓' : 'Copy'}
            </button>
          </div>
          <div className="cred-row">
            <div>
              <div className="cred-field-label">{t.projects.passLabel}</div>
              <code className="cred-val">{passVal}</code>
            </div>
            <button className="copy-btn" onClick={() => copy(passVal, 'pass')}>
              {copied === 'pass' ? '✓' : 'Copy'}
            </button>
          </div>
          <p className="cred-note">💡 {noteVal}</p>
        </div>
        <div className="project-links">
          <a href={proj.github} target="_blank" rel="noreferrer">
            <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 12 }}>
              ⚡ GitHub
            </button>
          </a>
          <a href={proj.demo} target="_blank" rel="noreferrer">
            <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>
              <span>🚀 Live Demo →</span>
            </button>
          </a>
        </div>
      </TiltCard>
    </Reveal>
  );
}

function ProjectsSection({ t, lang }) {
  return (
    <section id="projects" className="section">
      <Reveal>
        <div className="section-label">{t.projects.label}</div>
        <h2 className="section-title">
          {t.projects.title} <span className="text-gradient">{t.projects.titleGrad}</span>
        </h2>
        <p className="section-sub">{t.projects.sub}</p>
      </Reveal>
      <div className="grid-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} proj={p} idx={i} t={t} lang={lang} />
        ))}
      </div>
    </section>
  );
}

// ─── SimulatorSection ─────────────────────────────────────────────────────────
function SimulatorSection({ t }) {
  const [flow, setFlow] = useState(0);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [logs, setLogs] = useState([]);
  const terminalEndRef = useRef(null);

  const flowsConfig = [
    {
      nodes: [
        { label: 'SePay Webhook', icon: '🏦' },
        { label: 'Gemini AI', icon: '🧠' },
        { label: 'Microservice API', icon: '⚙️' },
        { label: 'Proactive Health', icon: '📊' },
        { label: 'Web Push', icon: '📲' }
      ],
      steps: [
        { node: 0, text: '📥 [BẮT ĐẦU] POST /webhook/bank-transfer - Payload nhận từ SePay...', type: 'info' },
        { node: 0, text: '🔍 Kiểm tra chữ ký xác thực WEBHOOK_SECRET & requireUserId...', type: 'sys' },
        { node: 1, text: '🧠 GEMINI AI: Đang làm sạch chuỗi content và phân loại danh mục tự động...', type: 'sys' },
        { node: 1, text: '💡 GEMINI AI: Trả về JSON: {"clean_name": "Nguyen Van A chuyển khoản", "category_name": "Lương"}', type: 'info' },
        { node: 2, text: '⚙️ SERVICE CLIENT: Tìm/tạo tài khoản mặc định và category qua API...', type: 'sys' },
        { node: 2, text: '⚙️ SERVICE CLIENT: Gọi createTransactionApi(). Transaction event phát ra...', type: 'sys' },
        { node: 3, text: '📊 PROACTIVE AI: Thực thi hàm getProactiveContext() để phân tích ví tiền...', type: 'sys' },
        { node: 3, text: '📊 PROACTIVE AI: Số dư an toàn. TB đốt tiền: 120k/ngày. daysToEmpty = 25 ngày.', type: 'info' },
        { node: 4, text: '📲 WEB PUSH: Gọi sendPushNotification(). Kích hoạt VAPID Keys...', type: 'sys' },
        { node: -1, text: ' Ting Ting! Money Guard thông báo: Nhận 2,000,000đ từ "Nguyen Van A". Đã ghi sổ!', type: 'ok' }
      ]
    },
    {
      nodes: [
        { label: 'User Chat', icon: '💬' },
        { label: 'Gemini Engine', icon: '🧠' },
        { label: 'Tag Extractor', icon: '🔎' },
        { label: 'CRUD Service', icon: '✏️' },
        { label: 'Socket Broadcast', icon: '📡' }
      ],
      steps: [
        { node: 0, text: '💬 USER INPUT: "Xóa hộ tao món cafe 50k vừa nãy đi Bảo"', type: 'info' },
        { node: 0, text: '🛡️ CHỐT CHẶN: Kiểm tra double-submit dựa trên lastUserMessage trong 3s...', type: 'sys' },
        { node: 1, text: '🧠 GEMINI ENGINE: Bắt đầu sinh phản hồi chat kèm phân tích ý định...', type: 'sys' },
        { node: 1, text: '🧠 GEMINI ENGINE: Sinh thành công. Trả về tag lệnh: <delete_transaction>{"id": 412}</delete_transaction>', type: 'info' },
        { node: 2, text: '🔎 TAG EXTRACTOR: Chạy Regex bóc tách nội dung XML tag...', type: 'sys' },
        { node: 2, text: '🔎 TAG EXTRACTOR: Trích xuất thành công JSON payload: { id: 412 }', type: 'info' },
        { node: 3, text: '✏️ CRUD SERVICE: Gọi deleteTransactionApi(currentUserId, 412)...', type: 'sys' },
        { node: 3, text: '✏️ CRUD SERVICE: API phản hồi 200 OK. Giao dịch đã xóa khỏi DB.', type: 'info' },
        { node: 4, text: '📡 SOCKET BROADCAST: Bắn sự kiện "money-guard-sync" về phía Client...', type: 'sys' },
        { node: -1, text: '🎉 SUCCESS: Ảo thuật đồng bộ xong! Giao diện Web tự động cập nhật giảm 50,000đ.', type: 'ok' }
      ]
    }
  ];

  const currentConfig = flowsConfig[flow];

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const runSimulation = () => {
    if (running) return;
    setRunning(true);
    setLogs([]);
    setStep(-1);

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < currentConfig.steps.length) {
        const nextStepData = currentConfig.steps[currentStep];
        setStep(nextStepData.node);
        setLogs((prev) => [...prev, nextStepData]);
        currentStep++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 1200);
  };

  const handleFlowChange = (e) => {
    setFlow(Number(e.target.value));
    setLogs([]);
    setStep(-1);
    setRunning(false);
  };

  return (
    <section id="simulator" className="section">
      <Reveal>
        <div className="section-label">{t.simulator.label}</div>
        <h2 className="section-title">
          {t.simulator.title} <span className="text-gradient">{t.simulator.titleGrad}</span>
        </h2>
        <p className="section-sub">{t.simulator.sub}</p>
      </Reveal>

      <div className="sim-grid">
        <Reveal delay={100}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="sim-controls">
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6, color: 'var(--text-4)' }}>
                {t.simulator.selectFlow}
              </label>
              <select className="sim-select" onChange={handleFlowChange} value={flow} disabled={running}>
                {t.simulator.flows.map((f, i) => (
                  <option key={i} value={i}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sim-desc-box">
              {t.simulator.flows[flow].desc}
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button className="btn-primary" onClick={runSimulation} disabled={running} style={{ padding: '10px 24px', fontSize: 13 }}>
                <span>{running ? t.simulator.running : t.simulator.runBtn}</span>
              </button>
              <button className="btn-outline" onClick={() => { setLogs([]); setStep(-1); setRunning(false); }} disabled={running} style={{ padding: '10px 24px', fontSize: 13 }}>
                {t.simulator.resetBtn}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="sim-visualizer">
              <div className="sim-visual-title">Nodes Routing Map</div>
              <div className="sim-nodes-row">
                {currentConfig.nodes.map((n, i) => {
                  const isActive = step === i;
                  const isDone = !running && step !== -1 && logs.some(l => l.node === i);
                  return (
                    <div key={i} className={`sim-node${isActive ? ' active' : ''}${isDone ? ' success' : ''}`}>
                      {n.icon}
                      <span className="sim-node-label">{n.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sim-terminal">
              <div className="sim-terminal-content">
                {logs.map((l, i) => (
                  <div key={i} className={`sim-terminal-line ${l.type === 'ok' ? '' : l.type === 'err' ? 'err' : l.type === 'sys' ? 'sys' : 'info'}`}>
                    {`> `}{l.text}
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="sim-terminal-line sys" style={{ fontStyle: 'italic' }}>
                    * Output Console Idle. Click "Trigger Workflow" to start simulation...
                  </div>
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Goals ────────────────────────────────────────────────────────────────────
function ObjectivesSection({ t }) {
  return (
    <section id="goals" className="section">
      <Reveal>
        <div className="section-label">{t.goals.label}</div>
        <h2 className="section-title">
          {t.goals.title} <span className="text-gradient">{t.goals.titleGrad}</span>
        </h2>
        <p className="section-sub">{t.goals.sub}</p>
      </Reveal>
      <div className="grid-2">
        {t.goals.cards.map((c, i) => (
          <Reveal key={i} delay={i * 100}>
            <TiltCard className="goals-card">
              <div className="goals-icon">{c.icon}</div>
              <h3 className="goals-title">{c.title}</h3>
              <div className="goals-body">
                {c.isArch ? (
                  <>{c.body}</>
                ) : c.isEdu ? (
                  <>
                    <p style={{ color: '#a78bfa', fontWeight: 700, marginBottom: 4 }}>
                      Đại học Sài Gòn — TP. Hồ Chí Minh
                    </p>
                    <p style={{ marginBottom: 8 }}>Cử nhân Công nghệ thông tin · 2022 – 2026</p>
                    Web Programming · Database Systems · Software Engineering · OOP Design ·
                    Full-Stack Web Dev · Software Testing
                  </>
                ) : c.isPhilo ? (
                  <>
                    <blockquote className="philosophy-quote">
                      "Clean code is not just code that works; it's code that is easily read,
                      extended, and maintained by others."
                    </blockquote>
                    <p style={{ fontSize: 13, marginBottom: 12 }}>
                      Ưu tiên tính tối giản, bảo mật dữ liệu và hiệu năng vận hành ổn định của hệ
                      thống.
                    </p>
                    <span className="badge badge-cyan">🇬🇧 English CEFR B1</span>
                    <span className="badge badge-violet" style={{ marginLeft: 8 }}>
                      🇻🇳 Vietnamese Native
                    </span>
                  </>
                ) : (
                  c.body
                )}
              </div>
              {c.tags.length > 0 && (
                <div className="skill-tags" style={{ marginTop: 16 }}>
                  {c.tags.map((tag, j) => (
                    <span key={j} className="skill-tag" style={{ fontSize: 11 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection({ t }) {
  return (
    <section id="testimonials" className="section">
      <Reveal>
        <div className="section-label">{t.testimonials.label}</div>
        <h2 className="section-title">
          {t.testimonials.title} <span className="text-gradient">{t.testimonials.titleGrad}</span>
        </h2>
        <p className="section-sub">{t.testimonials.sub}</p>
      </Reveal>
      <div className="grid-2">
        {t.testimonials.items.map((item, i) => (
          <Reveal key={i} delay={i * 150}>
            <div className="quote-card">
              <div className="quote-mark" style={{ color: item.color }}>
                "
              </div>
              <p className="quote-text">{item.text}</p>
              <div className="quote-author">
                <div
                  className="quote-avatar"
                  style={{ background: `${item.color}22`, border: `2px solid ${item.color}44` }}
                >
                  {item.avatar}
                </div>
                <div>
                  <div className="quote-name">{item.name}</div>
                  <div className="quote-sub">{item.sub}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection({ t }) {
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };
  return (
    <section id="contact" className="section">
      {toast && <div className="toast">✓ {toast}</div>}
      <Reveal>
        <div className="section-label">{t.contact.label}</div>
        <h2 className="section-title">
          {t.contact.title} <span className="text-gradient">{t.contact.titleGrad}</span>
        </h2>
        <p className="section-sub">{t.contact.sub}</p>
      </Reveal>
      <div className="grid-3">
        {t.contact.items.map((c, i) => (
          <Reveal key={i} delay={i * 100}>
            <TiltCard className="contact-card">
              <div className="contact-icon">{c.icon}</div>
              <div className="contact-label">{c.label}</div>
              <div className="contact-val">{c.val}</div>
              {c.copy && (
                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(c.val).catch(() => {});
                    showToast(`${t.contact.copied} ${c.label}!`);
                  }}
                >
                  Copy
                </button>
              )}
            </TiltCard>
          </Reveal>
        ))}
      </div>
      <Reveal delay={300}>
        <div className="contact-btns">
          <a href="https://github.com/Truong-Quoc-Bao" target="_blank" rel="noreferrer">
            <button className="btn-primary">
              <span>⚡ GitHub</span>
            </button>
          </a>
          <a
            href="https://www.linkedin.com/in/truong-quoc-bao-tqb19042004/?locale=vi-VN"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn-outline">LinkedIn</button>
          </a>
        </div>
      </Reveal>
      <Reveal delay={400}>
        <div className="footer">
          <p>{t.contact.footer}</p>
          <p style={{ fontSize: 11, marginTop: 4 }}>{t.contact.footer2}</p>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Back to Top ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <button
      className={`back-top${show ? '' : ' hidden'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
    >
      ↑
    </button>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('vi');
  const [isDark, setIsDark] = useState(true);
  const [theme, setTheme] = useState('violet');
  const [mousePos, setMousePos] = useState(null);
  const tr = T[lang];

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const styleEl =
      document.getElementById('qb-dynamic-style') ||
      (() => {
        const el = document.createElement('style');
        el.id = 'qb-dynamic-style';
        document.head.appendChild(el);
        return el;
      })();
    styleEl.textContent = getCSS(theme, isDark);
  }, [theme, isDark]);

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      <div className="scanline" />
      <Particles theme={theme} mousePos={mousePos} />
      <Nav
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        theme={theme}
        setTheme={setTheme}
        t={tr}
      />
      <HeroSection t={tr} lang={lang} />
      <StatsSection t={tr} />
      <SkillsSection t={tr} />
      <ExperienceSection t={tr} />
      <ProjectsSection t={tr} lang={lang} />
      <SimulatorSection t={tr} />
      <ObjectivesSection t={tr} />
      <TestimonialsSection t={tr} />
      <ContactSection t={tr} />
      <BackToTop />
    </div>
  );
}