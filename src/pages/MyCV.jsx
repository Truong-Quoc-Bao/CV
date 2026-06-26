import { useState, useEffect, useRef } from 'react';
import './QuocBaoPortfolio.css';

const SKILLS = {
  frontend: [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript ES6+',
    'Material UI',
    'Tailwind CSS',
    'Responsive Design',
    'HTML/CSS',
  ],
  backend: [
    'Node.js',
    'Express.js',
    'FastAPI (Python)',
    'GraphQL',
    'RESTful APIs',
    'JWT Authentication',
    'WebSocket/Socket.IO',
  ],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Schema Design', 'Multi-currency DB'],
  devops: ['Git/GitHub', 'Docker', 'Postman', 'VS Code', 'GitHub Actions', 'Microservices'],
  automation: ['n8n Workflows', 'RabbitMQ', 'API Gateway', 'Telegram Bot API', 'SePay Integration'],
};

const SKILL_LEVELS = {
  'React.js': 88,
  'Next.js': 85,
  TypeScript: 82,
  'JavaScript ES6+': 90,
  'Material UI': 80,
  'Tailwind CSS': 85,
  'Node.js': 83,
  'Express.js': 85,
  GraphQL: 75,
  'RESTful APIs': 88,
  'JWT Authentication': 82,
  PostgreSQL: 80,
  MongoDB: 72,
  Redis: 70,
  'Prisma ORM': 78,
  Docker: 72,
  'Git/GitHub': 85,
  'GitHub Actions': 65,
  'n8n Workflows': 80,
  'Telegram Bot API': 75,
};

const PROJECTS = [
  {
    id: 0,
    title: 'AI-Assisted Finance Platform',
    period: 'Dec 2025 – May 2026',
    role: 'Project Member',
    type: 'AI · Microservices',
    tagColor: 'badge-cyan',
    github: 'https://github.com/Truong-Quoc-Bao/Manage-Personal-Expenses.git',
    demo: 'https://manage-personal-expenses.vercel.app/',
    tech: [
      'ReactJS (TSX)',
      'Node.js',
      'FastAPI',
      'Prisma ORM',
      'PostgreSQL',
      'Redis',
      'Docker',
      'n8n',
      'Telegram Bot',
    ],
    desc: 'Nền tảng quản lý tài chính cá nhân với AI Assistant tích hợp Google AI APIs, chatbot real-time qua Socket.IO, tự động hóa n8n, thông báo Telegram và đồng bộ giao dịch ngân hàng SePay.',
    arch: 'Microservices Architecture',
    creds: {
      email: 'finance.demo@gmail.com',
      pass: 'demouser123',
      note: 'Trải nghiệm AI Assistant phân tích chi tiêu và tích hợp SePay mock',
    },
    highlights: ['Google AI APIs', 'Socket.IO chatbot', 'n8n automation', 'SePay banking sync'],
  },
  {
    id: 1,
    title: 'Full-Stack Food Ordering App',
    period: 'Sep 2025 – Dec 2025',
    role: 'Lead Developer',
    type: 'Full-Stack · E-commerce',
    tagColor: 'badge-green',
    github: 'https://github.com/Truong-Quoc-Bao/BaDaFuTa.git',
    demo: 'https://ba-da-fu-ta-food.vercel.app',
    tech: [
      'ReactJS',
      'TypeScript',
      'Node.js',
      'Express.js',
      'Prisma ORM',
      'PostgreSQL',
      'Tailwind CSS',
      'Docker',
      'JWT',
      'Socket.IO',
    ],
    desc: 'Ứng dụng đặt đồ ăn trực tuyến lấy cảm hứng ShopeeFood — đầy đủ JWT auth, phân quyền 3 cấp (User/Store/Admin), real-time order tracking qua Socket.IO và tối ưu hóa query PostgreSQL với Prisma ORM.',
    arch: 'Monolithic + Prisma ORM',
    creds: {
      email: 'customer.demo@gmail.com',
      pass: 'customer123',
      note: 'Hoặc Admin: admin.demo@gmail.com / admin123 để xem dashboard doanh thu',
    },
    highlights: [
      'JWT 3-tier auth',
      'Real-time order',
      'Optimized DB schema',
      'Deployed Vercel+Render',
    ],
  },
];

const EXPERIENCE_ITEMS = [
  {
    icon: '⚡',
    text: 'Phát triển responsive web interfaces với Next.js (App Router) và Material UI cho inventory management platform',
  },
  {
    icon: '🔗',
    text: 'Tích hợp GraphQL APIs và internal microservices — xử lý business data đa module',
  },
  {
    icon: '🛠️',
    text: 'Xây dựng 3 Express.js API endpoints đồng bộ kho hàng, kiểm soát concurrent stock updates',
  },
  {
    icon: '🗄️',
    text: 'Thiết kế PostgreSQL schema: 2 normalized tables hỗ trợ multi-currency tracking',
  },
  {
    icon: '🤖',
    text: 'Build n8n automation workflows thu thập, xử lý, đồng bộ dữ liệu giữa internal và external systems',
  },
  {
    icon: '📱',
    text: 'Phát triển AI-powered Telegram support & consultation workflows cho customer service',
  },
  {
    icon: '🐳',
    text: 'Làm việc với Dockerized services, Git workflows, Agile meetings và code reviews',
  },
];

const TESTIMONIALS = [
  {
    text: 'Bảo thể hiện khả năng thích ứng công nghệ mới cực kì nhanh. Cậu ấy chủ động tìm tòi, giải quyết bài toán tương tranh dữ liệu tồn kho bằng Express.js một cách triệt để.',
    name: 'Tech Lead — FADO GLOBAL',
    sub: 'Người hướng dẫn thực tập',
    avatar: '👨‍💼',
    color: '#7c3aed',
  },
  {
    text: 'Đồ án và các dự án môn học của Bảo luôn đạt mức hoàn thiện cao về cấu trúc cơ sở dữ liệu. Em có tư duy hệ thống mạch lạc và khả năng tự nghiên cứu, làm việc nhóm rất tốt.',
    name: 'Giảng viên hướng dẫn',
    sub: 'Khoa CNTT — Đại học Sài Gòn',
    avatar: '👩‍🏫',
    color: '#06b6d4',
  },
];

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 8,
    drift: `${(Math.random() - 0.5) * 200}px`,
    color: Math.random() > 0.5 ? '#7c3aed' : '#06b6d4',
    opacity: Math.random() * 0.4 + 0.1,
  }));
  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            background: p.color,
            opacity: p.opacity,
            '--drift': p.drift,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
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

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
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

// ─── Copy button ──────────────────────────────────────────────────────────────
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

// ─── Skill bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, level, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className="skill-bar-wrap">
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
function Nav() {
  const [active, setActive] = useState('hero');
  const sections = ['hero', 'skills', 'experience', 'projects', 'goals', 'testimonials', 'contact'];
  const labels = {
    hero: 'Home',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    goals: 'Goals',
    testimonials: 'Reviews',
    contact: 'Contact',
  };

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
      <span className="nav-logo text-gradient">QB</span>
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
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
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
            Full-Stack Developer Intern
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
            <TypeWriter
              texts={[
                'Backend Engineer & API Builder',
                'Full-Stack Developer Intern',
                'System Design Enthusiast',
                'Automation Workflow Specialist',
              ]}
            />
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="hero-desc">
            Sinh viên năm cuối CNTT – Đại học Sài Gòn. Hoàn thành 4 tháng thực tập tại{' '}
            <strong style={{ color: '#a78bfa' }}>Fado Global</strong>, đóng góp vào internal
            business platforms, GraphQL integrations và automation workflows với n8n.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="hero-contacts">
            {['📍 Cát Lái, Q.2, TP.HCM', '📞 0399 503 025', '✉️ baotruong.190404@gmail.com'].map(
              (t, i) => (
                <span key={i} className="contact-chip">
                  {t}
                </span>
              ),
            )}
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div className="hero-btns">
            <a href="https://github.com/Truong-Quoc-Bao" target="_blank" rel="noreferrer">
              <button className="btn-primary">
                <span>⚡ GitHub Profile</span>
              </button>
            </a>
            <a
              href="https://www.linkedin.com/in/truong-quoc-bao-tqb19042004/?locale=vi-VN"
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn-outline">LinkedIn →</button>
            </a>
            <CopyBtn value="baotruong.190404@gmail.com" label="📧 Copy Email" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { n: '4', unit: 'tháng', label: 'Thực tập tại Fado Global' },
    { n: '2', unit: 'dự án', label: 'Production-level builds' },
    { n: '3', unit: 'APIs', label: 'Express.js endpoints phát triển' },
    { n: '10+', unit: 'công nghệ', label: 'Tech stack thực chiến' },
  ];
  return (
    <div className="stats-strip">
      <div className="stats-grid">
        {stats.map((s, i) => (
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
function SkillsSection() {
  const [tab, setTab] = useState('frontend');
  const tabLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    automation: 'Automation',
  };

  return (
    <section id="skills" className="section">
      <Reveal>
        <div className="section-label">💡 Kỹ năng chuyên môn</div>
        <h2 className="section-title">
          Hộp công nghệ <span className="text-gradient">thực chiến</span>
        </h2>
        <p className="section-sub">Các công nghệ đã và đang sử dụng trong production</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="tabs">
          {Object.keys(SKILLS).map((t) => (
            <button
              key={t}
              className={`tab-btn${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {tabLabels[t]}
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
function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <Reveal>
        <div className="section-label">💼 Kinh nghiệm làm việc</div>
        <h2 className="section-title">
          Thực tập tại <span className="text-gradient">Fado Global</span>
        </h2>
        <p className="section-sub">4 tháng đóng góp vào hệ thống quản lý nội bộ quy mô thực tế</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="card-glow exp-card">
          <div className="exp-header">
            <div>
              <h3 className="exp-company">FADO GLOBAL</h3>
              <p className="exp-role">Full-Stack Developer Intern</p>
            </div>
            <div className="exp-right">
              <span className="badge badge-violet">Dec 2025 – Apr 2026</span>
              <div className="exp-location">TP. Hồ Chí Minh, Việt Nam</div>
            </div>
          </div>
          <div className="exp-items">
            {EXPERIENCE_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="exp-item">
                  <span className="exp-icon">{item.icon}</span>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ proj, idx }) {
  const [copied, setCopied] = useState('');
  const copy = (val, key) => {
    navigator.clipboard.writeText(val).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <Reveal delay={idx * 150}>
      <div className="card-glow project-card">
        <div className="project-top">
          <span className={`badge ${proj.tagColor}`}>{proj.type}</span>
          <span className="project-period">{proj.period}</span>
        </div>
        <h3 className="project-title">{proj.title}</h3>
        <div className="project-meta">
          {proj.role} · {proj.arch}
        </div>
        <p className="project-desc">{proj.desc}</p>
        <div className="tech-tags">
          {proj.tech.map((t, i) => (
            <span key={i} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
        <div className="highlights-label">Điểm nổi bật</div>
        <div className="highlights">
          {proj.highlights.map((h, i) => (
            <span key={i} className="highlight-tag">
              ✓ {h}
            </span>
          ))}
        </div>
        <div className="demo-cred">
          <div className="cred-title">🔑 Tài khoản Demo</div>
          <div className="cred-row">
            <div>
              <div className="cred-field-label">Email</div>
              <code className="cred-val">{proj.creds.email}</code>
            </div>
            <button className="copy-btn" onClick={() => copy(proj.creds.email, 'email')}>
              {copied === 'email' ? '✓' : 'Copy'}
            </button>
          </div>
          <div className="cred-row">
            <div>
              <div className="cred-field-label">Password</div>
              <code className="cred-val">{proj.creds.pass}</code>
            </div>
            <button className="copy-btn" onClick={() => copy(proj.creds.pass, 'pass')}>
              {copied === 'pass' ? '✓' : 'Copy'}
            </button>
          </div>
          <p className="cred-note">💡 {proj.creds.note}</p>
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
      </div>
    </Reveal>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <div className="section-label">🚀 Dự án tiêu biểu</div>
        <h2 className="section-title">
          Sản phẩm kỹ thuật <span className="text-gradient">hoàn thiện</span>
        </h2>
        <p className="section-sub">Các dự án thực chiến với demo và tài khoản dùng thử</p>
      </Reveal>
      <div className="grid-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} proj={p} idx={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Goals & Education ────────────────────────────────────────────────────────
function ObjectivesSection() {
  const cards = [
    {
      icon: '🎯',
      title: 'Ngắn hạn (1–2 năm)',
      body: 'Trở thành Full-Stack hoặc Backend Developer nòng cốt, làm chủ các giải pháp API có tính mở rộng cao và hệ thống microservices trong môi trường production thực tế.',
      tags: ['Scalable APIs', 'Microservices', 'System Design'],
    },
    {
      icon: '🏗️',
      title: 'Dài hạn (5 năm)',
      body: (
        <>
          Hướng tới vị trí <strong style={{ color: '#a78bfa' }}>System Architect</strong> — thiết kế
          kiến trúc hệ thống quy mô lớn, dẫn dắt technical decisions và mentoring các developer trẻ
          trong môi trường agile.
        </>
      ),
      tags: ['System Architect', 'Tech Lead', 'Mentoring'],
    },
    {
      icon: '📚',
      title: 'Học vấn',
      body: (
        <>
          <p style={{ color: '#a78bfa', fontWeight: 700, marginBottom: 4 }}>
            Đại học Sài Gòn — TP. Hồ Chí Minh
          </p>
          <p style={{ color: '#64748b', marginBottom: 8 }}>
            Cử nhân Công nghệ thông tin · 2022 – 2026
          </p>
          Web Programming · Database Systems · Software Engineering · OOP Design · Full-Stack Web
          Dev · Software Testing
        </>
      ),
      tags: [],
    },
    {
      icon: '💬',
      title: 'Phương châm làm việc',
      body: (
        <>
          <blockquote className="philosophy-quote">
            "Clean code is not just code that works; it's code that is easily read, extended, and
            maintained by others."
          </blockquote>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>
            Ưu tiên tính tối giản, bảo mật dữ liệu và hiệu năng vận hành ổn định của hệ thống.
          </p>
          <span className="badge badge-cyan">🇬🇧 English CEFR B1</span>
          <span className="badge badge-violet" style={{ marginLeft: 8 }}>
            🇻🇳 Vietnamese Native
          </span>
        </>
      ),
      tags: [],
    },
  ];

  return (
    <section id="goals" className="section">
      <Reveal>
        <div className="section-label">🎯 Mục tiêu & Định hướng</div>
        <h2 className="section-title">
          Career <span className="text-gradient">Roadmap</span>
        </h2>
        <p className="section-sub">Định hướng phát triển nghề nghiệp rõ ràng, có chiều sâu</p>
      </Reveal>
      <div className="grid-2">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="card-glow goals-card">
              <div className="goals-icon">{c.icon}</div>
              <h3 className="goals-title">{c.title}</h3>
              <div className="goals-body">{c.body}</div>
              {c.tags.length > 0 && (
                <div className="skill-tags" style={{ marginTop: 16 }}>
                  {c.tags.map((t, j) => (
                    <span key={j} className="skill-tag" style={{ fontSize: 11 }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section id="testimonials" className="section">
      <Reveal>
        <div className="section-label">⭐ Phản hồi</div>
        <h2 className="section-title">
          Đánh giá từ <span className="text-gradient">chuyên gia</span>
        </h2>
        <p className="section-sub">Nhận xét từ người hướng dẫn thực tập và giảng viên đại học</p>
      </Reveal>
      <div className="grid-2">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={i} delay={i * 150}>
            <div className="quote-card">
              <div className="quote-mark" style={{ color: t.color }}>
                "
              </div>
              <p className="quote-text">{t.text}</p>
              <div className="quote-author">
                <div
                  className="quote-avatar"
                  style={{ background: `${t.color}22`, border: `2px solid ${t.color}44` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="quote-name">{t.name}</div>
                  <div className="quote-sub">{t.sub}</div>
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
function ContactSection() {
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const contacts = [
    { icon: '📞', label: 'Phone', val: '0399 503 025', copy: true },
    { icon: '✉️', label: 'Email', val: 'baotruong.190404@gmail.com', copy: true },
    { icon: '📍', label: 'Location', val: 'Cát Lái, Quận 2, TP. Hồ Chí Minh', copy: false },
  ];

  return (
    <section id="contact" className="section">
      {toast && <div className="toast">✓ {toast}</div>}
      <Reveal>
        <div className="section-label">📬 Liên hệ</div>
        <h2 className="section-title">
          Sẵn sàng <span className="text-gradient">kết nối</span>
        </h2>
        <p className="section-sub">Hãy liên hệ nếu bạn có cơ hội phù hợp</p>
      </Reveal>
      <div className="grid-3">
        {contacts.map((c, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="card-glow contact-card">
              <div className="contact-icon">{c.icon}</div>
              <div className="contact-label">{c.label}</div>
              <div className="contact-val">{c.val}</div>
              {c.copy && (
                <button
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(c.val).catch(() => {});
                    showToast(`Đã copy ${c.label}!`);
                  }}
                >
                  Copy
                </button>
              )}
            </div>
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
          <a href="https://www.linkedin.com/in/truong-quoc-bao" target="_blank" rel="noreferrer">
            <button className="btn-outline">LinkedIn</button>
          </a>
        </div>
      </Reveal>
      <Reveal delay={400}>
        <div className="footer">
          <p>© 2026 Trương Quốc Bảo — Mọi quyền được bảo lưu.</p>
          <p style={{ fontSize: 11, color: '#1e293b', marginTop: 4 }}>
            Phân phối phi thương mại phục vụ mục đích đánh giá tuyển dụng.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <div className="scanline" />
      <Particles />
      <Nav />
      <HeroSection />
      <StatsSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ObjectivesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
