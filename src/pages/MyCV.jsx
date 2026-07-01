import { useState, useEffect, useRef, useCallback } from 'react';
import { T, THEMES, SKILLS, SKILL_LEVELS, PROJECTS } from '../data/portfolioData';
import { getCSS } from '../css/portfolioStyles';

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
  const sections = [
    'hero',
    'skills',
    'experience',
    'projects',
    'simulator',
    'goals',
    'testimonials',
    'contact',
  ];
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
      <span className="nav-logo text-gradient">Trương Quốc Bảo - Portfolio</span>
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

// ─── SimulatorSection (Interactive Playground) ─────────────────────────────────
function SimulatorSection({ t }) {
  const [flow, setFlow] = useState(0);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [logs, setLogs] = useState([]);
  const [simTab, setSimTab] = useState('nodes'); // 'nodes' | 'database' | 'bank' | 'push'
  const terminalEndRef = useRef(null);

  // SePay Iframe Linking states
  const [linkingBank, setLinkingBank] = useState(false);
  const [selectedBank, setSelectedBank] = useState('MBBank');
  const [bankAccNumber, setBankAccNumber] = useState('1904040399');

  // Web Push states
  const [pushMsg, setPushMsg] = useState('🏦 Money Guard: Ví của Bảo vừa biến động giao dịch!');
  const [sendingPush, setSendingPush] = useState(false);
  const [pushPhoneNotification, setPushPhoneNotification] = useState('');

  // Live Mock Database State
  const initialDB = {
    balance: 2500000,
    daysToEmpty: 18,
    accounts: ['Tài khoản mặc định'],
    transactions: [
      {
        id: 101,
        description: 'Mua giày sneaker',
        amount: -850000,
        category: 'Mua sắm',
        date: '2026-06-25',
      },
    ],
    budgets: [{ category: 'Ăn uống', limit: 2000000, spent: 1450000 }],
  };
  const [mockDB, setMockDB] = useState(initialDB);

  // Định nghĩa các Node mạng
  const flowNodes = [
    { label: 'Inbound Message', icon: '💬' },
    { label: 'Gemini Engine', icon: '🧠' },
    { label: 'Tag Extractor', icon: '🔎' },
    { label: 'CRUD Service', icon: '✏️' },
    { label: 'Socket Broadcast', icon: '📡' },
  ];

  // Kịch bản xử lý log & hành động hoàn thành
  const presets = [
    {
      input: 'Tôi vừa ăn bát phở gà hết 65k',
      steps: [
        {
          node: 0,
          text: '📥 [POST /chat] Nhận tin nhắn: "Tôi vừa ăn bát phở gà hết 65k"',
          type: 'info',
        },
        {
          node: 0,
          text: '🛡️ CHỐT CHẶN: Chạy lastUserMessage check trong 3s để né double-submit...',
          type: 'sys',
        },
        {
          node: 1,
          text: '🧠 GEMINI ENGINE: Gọi model "gemini-flash-lite-latest" phân tích cú pháp...',
          type: 'sys',
        },
        {
          node: 1,
          text: '🧠 GEMINI ENGINE: Sinh thẻ lệnh XML: <transaction>{"amount": 65000, "category_name": "Ăn uống", "description": "Ăn phở gà", "transaction_type": "expense"}</transaction>',
          type: 'info',
        },
        {
          node: 2,
          text: '🔎 REGEX EXTRACTOR: Tìm thấy khối XML <transaction>. Bắt đầu phân rã...',
          type: 'sys',
        },
        {
          node: 2,
          text: '🔎 REGEX EXTRACTOR: Khớp JSON payload: { amount: 65000, category: "Ăn uống" }',
          type: 'info',
        },
        {
          node: 3,
          text: '✏️ CRUD SERVICE: Gọi microservices client: createTransactionApi()...',
          type: 'sys',
        },
        {
          node: 3,
          text: '🗄️ POSTGRESQL: Thêm bản ghi transaction thành công vào ai_service.message_history.',
          type: 'sys',
        },
        {
          node: 4,
          text: '📡 SOCKET.IO: Phát sự kiện "money-guard-sync" báo hiệu cho UI đồng bộ...',
          type: 'sys',
        },
        {
          node: -1,
          text: ' Ting Ting! Đã ghi sổ chi tiêu 65,000đ cho "Ăn phở gà" thuộc danh mục "Ăn uống".',
          type: 'ok',
        },
      ],
      onComplete: () => {
        setMockDB((prev) => {
          const nextBal = prev.balance - 65000;
          return {
            ...prev,
            balance: nextWBalance(nextBal),
            daysToEmpty: Math.max(1, Math.floor(nextBal / 125000)),
            transactions: [
              {
                id: Date.now(),
                description: 'Ăn phở gà',
                amount: -65000,
                category: 'Ăn uống',
                date: '2026-06-26',
              },
              ...prev.transactions,
            ],
          };
        });
      },
    },
    {
      input: 'Công ty chuyển khoản lương 15 triệu',
      steps: [
        {
          node: 0,
          text: '📥 [POST /chat] Nhận tin nhắn: "Công ty chuyển khoản lương 15 triệu"',
          type: 'info',
        },
        {
          node: 1,
          text: '🧠 GEMINI ENGINE: Nhận diện chiều giao dịch TIỀN VÀO (isIncome = true)...',
          type: 'sys',
        },
        {
          node: 1,
          text: '🧠 GEMINI ENGINE: Trả về XML: <transaction>{"amount": 15000000, "category_name": "Lương", "description": "Lương tháng", "transaction_type": "income"}</transaction>',
          type: 'info',
        },
        {
          node: 2,
          text: '🔎 REGEX EXTRACTOR: Khớp JSON payload: { amount: 15000000, category_name: "Lương" }',
          type: 'sys',
        },
        {
          node: 3,
          text: '✏️ CRUD SERVICE: Tạo bản ghi Lương qua API. account_service tự cộng balance.',
          type: 'sys',
        },
        {
          node: 4,
          text: '📡 SOCKET.IO: Phát sự kiện đồng bộ "bank_notification" và "money-guard-sync"...',
          type: 'sys',
        },
        {
          node: -1,
          text: ' Ting Ting! Money Guard nhận lương: +15,000,000đ. Sức khỏe tài chính cải thiện rõ rệt!',
          type: 'ok',
        },
      ],
      onComplete: () => {
        setMockDB((prev) => {
          const nextBal = prev.balance + 15000000;
          return {
            ...prev,
            balance: nextWBalance(nextBal),
            daysToEmpty: Math.floor(nextBal / 120000),
            transactions: [
              {
                id: Date.now(),
                description: 'Lương tháng',
                amount: 15000000,
                category: 'Lương',
                date: '2026-06-26',
              },
              ...prev.transactions,
            ],
          };
        });
      },
    },
    {
      input: 'Đặt ngân sách mua sắm là 3 triệu',
      steps: [
        {
          node: 0,
          text: '📥 [POST /chat] Nhận lệnh: "Đặt ngân sách mua sắm là 3 triệu"',
          type: 'info',
        },
        {
          node: 1,
          text: '🧠 GEMINI ENGINE: Ý định: Thiết lập ngân sách (manage_budget)...',
          type: 'sys',
        },
        {
          node: 1,
          text: '🧠 GEMINI ENGINE: Sinh XML: <manage_budget>{"category_name": "Mua sắm", "amount_limit": 3000000}</manage_budget>',
          type: 'info',
        },
        {
          node: 2,
          text: '🔎 REGEX EXTRACTOR: Tìm thấy và trích xuất JSON <manage_budget>...',
          type: 'sys',
        },
        {
          node: 3,
          text: '✏️ CRUD SERVICE: Gọi upsertBudget() để đồng bộ cấu hình qua API budgets_service...',
          type: 'sys',
        },
        {
          node: 4,
          text: '📡 SOCKET.IO: Gửi tín hiệu đồng bộ ngân sách. Trình duyệt reload số liệu.',
          type: 'sys',
        },
        {
          node: -1,
          text: '🎯 THÀCH CÔNG: Đã áp hạn mức 3,000,000đ cho hạng mục "Mua sắm" tháng này.',
          type: 'ok',
        },
      ],
      onComplete: () => {
        setMockDB((prev) => {
          const exists = prev.budgets.some((b) => b.category === 'Mua sắm');
          const nextBudgets = exists
            ? prev.budgets.map((b) => (b.category === 'Mua sắm' ? { ...b, limit: 3000000 } : b))
            : [...prev.budgets, { category: 'Mua sắm', limit: 3000000, spent: 850000 }];
          return { ...prev, budgets: nextBudgets };
        });
      },
    },
    {
      input: 'Xóa giùm tao giao dịch giày sneaker ID 101 đi',
      steps: [
        {
          node: 0,
          text: '📥 [POST /chat] Nhận lệnh: "Xóa giùm tao giao dịch giày sneaker ID 101 đi"',
          type: 'info',
        },
        {
          node: 1,
          text: '🧠 GEMINI ENGINE: Lục tìm ID giao dịch và nhả XML: <delete_transaction>{"id": 101}</delete_transaction>',
          type: 'info',
        },
        {
          node: 2,
          text: '🔎 REGEX EXTRACTOR: Trích xuất lệnh xóa giao dịch ID = 101...',
          type: 'sys',
        },
        {
          node: 3,
          text: '✏️ CRUD SERVICE: Gọi deleteTransactionApi() gửi payload qua microservices...',
          type: 'sys',
        },
        {
          node: 4,
          text: '📡 SOCKET.IO: Phát sự kiện cập nhật. Đã xóa record 101 khỏi PostgreSQL.',
          type: 'sys',
        },
        {
          node: -1,
          text: '🗑️ THÀNH CÔNG: Đã xóa giao dịch giày sneaker. Hoàn lại 850,000đ vào ví.',
          type: 'ok',
        },
      ],
      onComplete: () => {
        setMockDB((prev) => {
          const exists = prev.transactions.some((t) => t.id === 101);
          if (!exists) return prev;
          const nextBal = prev.balance + 850000;
          return {
            ...prev,
            balance: nextWBalance(nextBal),
            daysToEmpty: Math.floor(nextBal / 120000),
            transactions: prev.transactions.filter((t) => t.id !== 101),
          };
        });
      },
    },
  ];

  const currentConfig = presets[flow];
  const nextWBalance = (val) => (Number.isFinite(val) ? val : 0);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const runSimulation = (presetIdx) => {
    if (running || linkingBank || sendingPush) return;
    setFlow(presetIdx);
    setRunning(true);
    setLogs([]);
    setStep(-1);
    setSimTab('nodes');

    const cfg = presets[presetIdx];
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < cfg.steps.length) {
        const nextStepData = cfg.steps[currentStep];
        setStep(nextStepData.node);
        setLogs((prev) => [...prev, nextStepData]);
        currentStep++;
      } else {
        clearInterval(interval);
        cfg.onComplete();
        setRunning(false);
      }
    }, 1100);
  };

  // Giả lập liên kết Bankhub SePay Iframe
  const runBankLinking = () => {
    if (running || linkingBank || sendingPush) return;
    setLinkingBank(true);
    setLogs([]);
    setSimTab('nodes');

    const logsList = [
      {
        node: 0,
        text: '📥 [GET] /create-bank - Yêu cầu khởi tạo Token SePay Bankhub Sandbox...',
        type: 'info',
      },
      {
        node: 1,
        text: '🔑 Got Token: Gửi Basic Auth và nhận access_token thành công.',
        type: 'sys',
      },
      {
        node: 2,
        text: '🔗 LinkToken: Gửi complete_redirect_uri và khởi tạo link liên kết thành công.',
        type: 'sys',
      },
      {
        node: 3,
        text: '🌐 SePay Iframe: Khởi tạo Iframe Bankhub cho client chọn ngân hàng...',
        type: 'info',
      },
      {
        node: 3,
        text: `📩 postMessage: Nhận sự kiện FINISHED_BANK_ACCOUNT_LINK: {"account_number": "${bankAccNumber}", "bank_name": "${selectedBank}"}`,
        type: 'ok',
      },
      {
        node: 4,
        text: `💾 [POST] /save-bank-account - Gọi API createBankAccount() của account_service...`,
        type: 'sys',
      },
      {
        node: -1,
        text: `🎉 THÀNH CÔNG: Đã thêm tài khoản "${selectedBank} - ${bankAccNumber}" vào cơ sở dữ liệu!`,
        type: 'ok',
      },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logsList.length) {
        const nextLog = logsList[currentStep];
        if (nextLog.node !== -1) setStep(nextLog.node);
        setLogs((prev) => [...prev, nextLog]);
        currentStep++;
      } else {
        clearInterval(interval);
        setMockDB((prev) => ({
          ...prev,
          accounts: [...prev.accounts, `${selectedBank} - ${bankAccNumber}`],
        }));
        setLinkingBank(false);
      }
    }, 1000);
  };

  // Giả lập bắn Web Push qua VAPID
  const runWebPushNotification = () => {
    if (running || linkingBank || sendingPush) return;
    setIsScanning(false);
    setSimTab('scan'); // Dùng Tab screen điện thoại để hiển thị Push
    setIsScanning(true); // Sử dụng cờ quét để hiện màn hình Loading của điện thoại
    setLogs([]);

    const pushLogs = [
      {
        node: 0,
        text: `📥 [POST] /subscribe - Đăng ký ServiceWorker VAPID Public Key thành công.`,
        type: 'sys',
      },
      {
        node: 1,
        text: `📲 WebPush: Đang chuẩn bị mã hóa Payload bằng Private VAPID Key...`,
        type: 'sys',
      },
      {
        node: 2,
        text: `📡 Socket.io: Phát tín hiệu "bank_notification" và "money-guard-sync" về trình duyệt...`,
        type: 'info',
      },
      {
        node: 3,
        text: `📲 WebPush: Đang phát thông báo tới tất cả các thiết bị đăng ký hoạt động...`,
        type: 'sys',
      },
      { node: -1, text: `✅ SUCCESS: Phát thông báo đẩy thành công!`, type: 'ok' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < pushLogs.length) {
        const nextLog = pushLogs[currentStep];
        if (nextLog.node !== -1) setStep(nextLog.node);
        setLogs((prev) => [...prev, nextLog]);
        currentStep++;
      } else {
        clearInterval(interval);
        setPushPhoneNotification(pushMsg);
        setIsScanning(false);
        // Tắt thông báo sau 4 giây
        setTimeout(() => setPushPhoneNotification(''), 4000);
      }
    }, 1000);
  };

  const resetMockDB = () => {
    if (running || linkingBank || sendingPush) return;
    setMockDB(initialDB);
    setLogs([]);
    setStep(-1);
    setPushPhoneNotification('');
    setSimTab('nodes');
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
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  color: 'var(--text-4)',
                }}
              >
                {t.simulator.selectFlow}
              </label>

              <div className="sim-preset-grid">
                {t.simulator.flows.map((f, i) => (
                  <button
                    key={i}
                    className="sim-preset-btn"
                    onClick={() => runSimulation(i)}
                    disabled={running || linkingBank || sendingPush}
                  >
                    <span>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sim-desc-box">{t.simulator.flows[flow].desc}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button
                className="btn-outline"
                onClick={resetMockDB}
                disabled={running || linkingBank || sendingPush}
                style={{ padding: '10px 24px', fontSize: 13, width: '100%' }}
              >
                🔄 {t.simulator.resetBtn}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="sim-visualizer">
              <div className="sim-tabs-nav">
                <span
                  className={`sim-tab-title${simTab === 'nodes' ? ' active' : ''}`}
                  onClick={() => setSimTab('nodes')}
                >
                  {t.simulator.flowTitle}
                </span>
                <span
                  className={`sim-tab-title${simTab === 'database' ? ' active' : ''}`}
                  onClick={() => setSimTab('database')}
                >
                  {t.simulator.mockDbTitle}
                </span>
                <span
                  className={`sim-tab-title${simTab === 'bank' ? ' active' : ''}`}
                  onClick={() => setSimTab('bank')}
                >
                  {t.simulator.bankTab}
                </span>
                <span
                  className={`sim-tab-title${simTab === 'push' ? ' active' : ''}`}
                  onClick={() => setSimTab('push')}
                >
                  {t.simulator.pushTab}
                </span>
              </div>

              {simTab === 'nodes' ? (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyStyle: 'center',
                  }}
                >
                  <div className="sim-nodes-row" style={{ marginTop: '40px' }}>
                    {flowNodes.map((n, i) => {
                      const isActive = step === i;
                      const isDone = !running && step !== -1 && logs.some((l) => l.node === i);
                      return (
                        <div
                          key={i}
                          className={`sim-node${isActive ? ' active' : ''}${
                            isDone ? ' success' : ''
                          }`}
                        >
                          {n.icon}
                          <span className="sim-node-label">{n.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : simTab === 'database' ? (
                <div className="sim-db-container">
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                    <div
                      style={{
                        flex: 1,
                        background: 'var(--bg-strip)',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>
                        {t.simulator.dbBalance}
                      </div>
                      <div className="sim-db-balance">{mockDB.balance.toLocaleString()}đ</div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        background: 'var(--bg-strip)',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div style={{ fontSize: '10px', color: 'var(--text-3)' }}>
                        {t.simulator.dbDays}
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#f59e0b' }}>
                        🏥 {mockDB.daysToEmpty} Days
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      overflowY: 'auto',
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--text-4)',
                      }}
                    >
                      📂 {t.simulator.mockDbTitle} (PostgreSQL)
                    </div>
                    {mockDB.transactions.map((tx) => (
                      <div key={tx.id} className="sim-db-row">
                        <span>
                          📝 {tx.description} ({tx.category})
                        </span>
                        <span
                          style={{ fontWeight: 700, color: tx.amount < 0 ? '#f87171' : '#34d399' }}
                        >
                          {tx.amount > 0 ? '+' : ''}
                          {tx.amount.toLocaleString()}đ
                        </span>
                      </div>
                    ))}
                    {mockDB.budgets.map((b, i) => (
                      <div
                        key={i}
                        className="sim-db-row"
                        style={{ borderLeft: '3px solid #7c3aed' }}
                      >
                        <span>🎯 Budget {b.category}</span>
                        <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>
                          Limit: {b.limit.toLocaleString()}đ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : simTab === 'bank' ? (
                <div className="sim-db-container" style={{ gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--text-3)',
                          marginBottom: 4,
                          display: 'block',
                        }}
                      >
                        {t.simulator.bankSelectLabel}
                      </label>
                      <select
                        className="sim-select"
                        style={{ padding: '8px', fontSize: 12 }}
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        disabled={linkingBank}
                      >
                        <option value="MBBank">MBBank</option>
                        <option value="Vietcombank">Vietcombank</option>
                        <option value="Techcombank">Techcombank</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--text-3)',
                          marginBottom: 4,
                          display: 'block',
                        }}
                      >
                        {t.simulator.bankInputLabel}
                      </label>
                      <input
                        className="sim-input"
                        type="text"
                        value={bankAccNumber}
                        onChange={(e) => setBankAccNumber(e.target.value)}
                        disabled={linkingBank}
                      />
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ padding: '8px', width: '100%', fontSize: 12, marginTop: 4 }}
                    onClick={runBankLinking}
                    disabled={linkingBank || running}
                  >
                    <span>{linkingBank ? t.simulator.bankLinking : t.simulator.bankBtn}</span>
                  </button>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--text-4)',
                      marginTop: 4,
                    }}
                  >
                    🏦 Linked Accounts List:
                  </div>
                  <div className="sim-badge-list">
                    {mockDB.accounts.map((acc, i) => (
                      <span key={i} className="sim-acc-badge">
                        💳 {acc}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="sim-db-container" style={{ gap: '8px' }}>
                  <div>
                    <label
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--text-3)',
                        marginBottom: 4,
                        display: 'block',
                      }}
                    >
                      {t.simulator.pushInputLabel}
                    </label>
                    <input
                      className="sim-input"
                      type="text"
                      value={pushMsg}
                      onChange={(e) => setPushMsg(e.target.value)}
                      disabled={sendingPush}
                    />
                  </div>
                  <button
                    className="btn-primary"
                    style={{ padding: '8px', width: '100%', fontSize: 12 }}
                    onClick={runWebPushNotification}
                    disabled={sendingPush || running}
                  >
                    <span>{sendingPush ? t.simulator.pushBtnLoading : t.simulator.pushBtn}</span>
                  </button>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>
                    {t.simulator.pushActiveCount}{' '}
                    <span style={{ color: 'var(--accent)' }}>
                      3 Devices (Chrome / Safari / Firefox)
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--text-4)',
                      }}
                    >
                      {t.simulator.pushPhonePreview}
                    </div>
                    <div className="mock-phone-frame">
                      {isScanning ? (
                        <div style={{ fontSize: 11, color: 'var(--text-3)', fontStyle: 'italic' }}>
                          📲 Processing Web Push request...
                        </div>
                      ) : pushPhoneNotification ? (
                        <div className="mock-phone-notification">
                          <div
                            style={{
                              fontWeight: 'bold',
                              fontSize: 10,
                              color: '#f59e0b',
                              marginBottom: 2,
                            }}
                          >
                            🏦 Money Guard Notification
                          </div>
                          <div>{pushPhoneNotification}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: 11, color: 'var(--text-3)', fontStyle: 'italic' }}>
                          * Mobile phone screen idle. Click "Emit Push" above...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="sim-terminal">
              <div className="sim-terminal-content">
                {logs.map((l, i) => (
                  <div
                    key={i}
                    className={`sim-terminal-line ${
                      l.type === 'ok'
                        ? ''
                        : l.type === 'err'
                        ? 'err'
                        : l.type === 'sys'
                        ? 'sys'
                        : 'info'
                    }`}
                  >
                    {`[MONEY-GUARD-SERVER] > `}
                    {l.text}
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="sim-terminal-line sys" style={{ fontStyle: 'italic' }}>
                    * Console Idle. Click any interactive preset or testing panel to simulate...
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
