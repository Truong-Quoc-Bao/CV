// ═══════════════════════════════════════════════════════════
//  data.js  —  Toàn bộ dữ liệu: bản dịch, theme, skills, projects
// ═══════════════════════════════════════════════════════════

// ─── Translations ────────────────────────────────────────────────────────────
export const T = {
  vi: {
    nav: {
      home: 'Trang chủ',
      skills: 'Kỹ năng',
      experience: 'Kinh nghiệm',
      projects: 'Dự án',
      goals: 'Mục tiêu',
      testimonials: 'Đánh giá',
      contact: 'Liên hệ',
    },
    hero: {
      label: 'Full-Stack Developer Intern',
      desc: 'Sinh viên năm cuối CNTT – Đại học Sài Gòn. Hoàn thành 4 tháng thực tập tại',
      desc2:
        ', đóng góp vào internal business platforms, GraphQL integrations và automation workflows với n8n.',
      contacts: ['📍 Cát Lái, Q.2, TP.HCM', '📞 0399 503 025', '✉️ baotruong.190404@gmail.com'],
      github: '⚡ GitHub Profile',
      copyEmail: '📧 Copy Email',
    },
    stats: [
      { n: '4', unit: 'tháng', label: 'Thực tập tại Fado Global' },
      { n: '2', unit: 'dự án', label: 'Production-level builds' },
      { n: '3', unit: 'APIs', label: 'Express.js endpoints phát triển' },
      { n: '10+', unit: 'công nghệ', label: 'Tech stack thực chiến' },
    ],
    skills: {
      label: '💡 Kỹ năng chuyên môn',
      title: 'Hộp công nghệ',
      titleGrad: 'thực chiến',
      sub: 'Các công nghệ đã và đang sử dụng trong production',
      tabs: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        devops: 'DevOps',
        automation: 'Automation',
      },
    },
    experience: {
      label: '💼 Kinh nghiệm làm việc',
      title: 'Thực tập tại',
      titleGrad: 'Fado Global',
      sub: '4 tháng đóng góp vào hệ thống quản lý nội bộ quy mô thực tế',
      role: 'Full-Stack Developer Intern',
      location: 'TP. Hồ Chí Minh, Việt Nam',
      items: [
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
      ],
    },
    projects: {
      label: '🚀 Dự án tiêu biểu',
      title: 'Sản phẩm kỹ thuật',
      titleGrad: 'hoàn thiện',
      sub: 'Các dự án thực chiến với demo và tài khoản dùng thử',
      highlights: 'Điểm nổi bật',
      demoTitle: '🔑 Tài khoản Demo',
      emailLabel: 'Email',
      passLabel: 'Password',
    },
    goals: {
      label: '🎯 Mục tiêu & Định hướng',
      title: 'Career',
      titleGrad: 'Roadmap',
      sub: 'Định hướng phát triển nghề nghiệp rõ ràng, có chiều sâu',
      cards: [
        {
          icon: '🎯',
          title: 'Ngắn hạn (1–2 năm)',
          body: 'Trở thành Full-Stack hoặc Backend Developer nòng cốt, làm chủ các giải pháp API có tính mở rộng cao và hệ thống microservices trong môi trường production thực tế.',
          tags: ['Scalable APIs', 'Microservices', 'System Design'],
        },
        {
          icon: '🏗️',
          title: 'Dài hạn (5 năm)',
          body: 'Hướng tới vị trí System Architect — thiết kế kiến trúc hệ thống quy mô lớn, dẫn dắt technical decisions và mentoring các developer trẻ trong môi trường agile.',
          isArch: true,
          tags: ['System Architect', 'Tech Lead', 'Mentoring'],
        },
        { icon: '📚', title: 'Học vấn', isEdu: true, tags: [] },
        { icon: '💬', title: 'Phương châm làm việc', isPhilo: true, tags: [] },
      ],
    },
    testimonials: {
      label: '⭐ Phản hồi',
      title: 'Đánh giá từ',
      titleGrad: 'chuyên gia',
      sub: 'Nhận xét từ người hướng dẫn thực tập và giảng viên đại học',
      items: [
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
      ],
    },
    contact: {
      label: '📬 Liên hệ',
      title: 'Sẵn sàng',
      titleGrad: 'kết nối',
      sub: 'Hãy liên hệ nếu bạn có cơ hội phù hợp',
      items: [
        { icon: '📞', label: 'Phone', val: '0399 503 025', copy: true },
        { icon: '✉️', label: 'Email', val: 'baotruong.190404@gmail.com', copy: true },
        { icon: '📍', label: 'Location', val: 'Cát Lái, Quận 2, TP. Hồ Chí Minh', copy: false },
      ],
      copied: 'Đã copy',
      footer: '© 2026 Trương Quốc Bảo — Mọi quyền được bảo lưu.',
      footer2: 'Phân phối phi thương mại phục vụ mục đích đánh giá tuyển dụng.',
    },
    typewriterTexts: [
      'Backend Engineer & API Builder',
      'Full-Stack Developer Intern',
      'System Design Enthusiast',
      'Automation Workflow Specialist',
    ],
  },

  en: {
    nav: {
      home: 'Home',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      goals: 'Goals',
      testimonials: 'Reviews',
      contact: 'Contact',
    },
    hero: {
      label: 'Full-Stack Developer Intern',
      desc: 'Final-year IT student at Saigon University. Completed 4 months of internship at',
      desc2:
        ', contributing to internal business platforms, GraphQL integrations, and automation workflows with n8n.',
      contacts: ['📍 Cat Lai, D.2, HCMC', '📞 0399 503 025', '✉️ baotruong.190404@gmail.com'],
      github: '⚡ GitHub Profile',
      copyEmail: '📧 Copy Email',
    },
    stats: [
      { n: '4', unit: 'months', label: 'Internship at Fado Global' },
      { n: '2', unit: 'projects', label: 'Production-level builds' },
      { n: '3', unit: 'APIs', label: 'Express.js endpoints built' },
      { n: '10+', unit: 'tech', label: 'Real-world tech stack' },
    ],
    skills: {
      label: '💡 Technical Skills',
      title: 'Battle-tested',
      titleGrad: 'Toolbox',
      sub: 'Technologies used in production environments',
      tabs: {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        devops: 'DevOps',
        automation: 'Automation',
      },
    },
    experience: {
      label: '💼 Work Experience',
      title: 'Internship at',
      titleGrad: 'Fado Global',
      sub: '4 months contributing to real-scale internal management systems',
      role: 'Full-Stack Developer Intern',
      location: 'Ho Chi Minh City, Vietnam',
      items: [
        {
          icon: '⚡',
          text: 'Developed responsive web interfaces with Next.js (App Router) and Material UI for an inventory management platform',
        },
        {
          icon: '🔗',
          text: 'Integrated GraphQL APIs and internal microservices — handling multi-module business data',
        },
        {
          icon: '🛠️',
          text: 'Built 3 Express.js API endpoints for warehouse sync, controlling concurrent stock updates',
        },
        {
          icon: '🗄️',
          text: 'Designed PostgreSQL schema: 2 normalized tables supporting multi-currency tracking',
        },
        {
          icon: '🤖',
          text: 'Built n8n automation workflows to collect, process, and sync data between internal and external systems',
        },
        {
          icon: '📱',
          text: 'Developed AI-powered Telegram support & consultation workflows for customer service',
        },
        {
          icon: '🐳',
          text: 'Worked with Dockerized services, Git workflows, Agile meetings and code reviews',
        },
      ],
    },
    projects: {
      label: '🚀 Featured Projects',
      title: 'Polished',
      titleGrad: 'Engineering',
      sub: 'Real-world projects with live demos and test accounts',
      highlights: 'Highlights',
      demoTitle: '🔑 Demo Account',
      emailLabel: 'Email',
      passLabel: 'Password',
    },
    goals: {
      label: '🎯 Goals & Direction',
      title: 'Career',
      titleGrad: 'Roadmap',
      sub: 'Clear and purposeful career development roadmap',
      cards: [
        {
          icon: '🎯',
          title: 'Short-term (1–2 years)',
          body: 'Become a core Full-Stack or Backend Developer, mastering scalable API solutions and microservices systems in real production environments.',
          tags: ['Scalable APIs', 'Microservices', 'System Design'],
        },
        {
          icon: '🏗️',
          title: 'Long-term (5 years)',
          body: 'Aim for the System Architect role — designing large-scale system architectures, leading technical decisions, and mentoring junior developers in agile environments.',
          isArch: true,
          tags: ['System Architect', 'Tech Lead', 'Mentoring'],
        },
        { icon: '📚', title: 'Education', isEdu: true, tags: [] },
        { icon: '💬', title: 'Work Philosophy', isPhilo: true, tags: [] },
      ],
    },
    testimonials: {
      label: '⭐ Feedback',
      title: 'Reviews from',
      titleGrad: 'Experts',
      sub: 'Feedback from internship supervisor and university lecturer',
      items: [
        {
          text: 'Bao demonstrated an extremely fast ability to adapt to new technologies. He proactively researched and thoroughly resolved the inventory data race condition using Express.js.',
          name: 'Tech Lead — FADO GLOBAL',
          sub: 'Internship Supervisor',
          avatar: '👨‍💼',
          color: '#7c3aed',
        },
        {
          text: "Bao's coursework and projects consistently achieved a high level of database structure quality. He has clear systematic thinking and excellent self-research and teamwork abilities.",
          name: 'Academic Advisor',
          sub: 'Faculty of IT — Saigon University',
          avatar: '👩‍🏫',
          color: '#06b6d4',
        },
      ],
    },
    contact: {
      label: '📬 Contact',
      title: 'Ready to',
      titleGrad: 'Connect',
      sub: 'Reach out if you have a suitable opportunity',
      items: [
        { icon: '📞', label: 'Phone', val: '0399 503 025', copy: true },
        { icon: '✉️', label: 'Email', val: 'baotruong.190404@gmail.com', copy: true },
        { icon: '📍', label: 'Location', val: 'Cat Lai, District 2, HCMC', copy: false },
      ],
      copied: 'Copied',
      footer: '© 2026 Truong Quoc Bao — All rights reserved.',
      footer2: 'Non-commercial distribution for recruitment evaluation purposes.',
    },
    typewriterTexts: [
      'Backend Engineer & API Builder',
      'Full-Stack Developer Intern',
      'System Design Enthusiast',
      'Automation Workflow Specialist',
    ],
  },
};

// ─── Themes ──────────────────────────────────────────────────────────────────
export const THEMES = {
  violet: {
    accent: '#7c3aed',
    accentLight: '#a78bfa',
    accentDark: '#6d28d9',
    secondary: '#06b6d4',
    secondaryLight: '#67e8f9',
  },
  cyan: {
    accent: '#0891b2',
    accentLight: '#22d3ee',
    accentDark: '#0e7490',
    secondary: '#7c3aed',
    secondaryLight: '#a78bfa',
  },
  rose: {
    accent: '#e11d48',
    accentLight: '#fb7185',
    accentDark: '#be123c',
    secondary: '#f59e0b',
    secondaryLight: '#fcd34d',
  },
  emerald: {
    accent: '#059669',
    accentLight: '#34d399',
    accentDark: '#047857',
    secondary: '#6366f1',
    secondaryLight: '#a5b4fc',
  },
};

// ─── Skills ──────────────────────────────────────────────────────────────────
export const SKILLS = {
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

export const SKILL_LEVELS = {
  'React.js': 90,
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

// ─── Projects ────────────────────────────────────────────────────────────────
export const PROJECTS = [
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
    desc: {
      vi: 'Nền tảng quản lý tài chính cá nhân với AI Assistant tích hợp Google AI APIs, chatbot real-time qua Socket.IO, tự động hóa n8n, thông báo Telegram và đồng bộ giao dịch ngân hàng SePay.',
      en: 'Personal finance management platform with AI Assistant integrating Google AI APIs, real-time chatbot via Socket.IO, n8n automation, Telegram notifications, and SePay banking transaction sync.',
    },
    arch: 'Microservices Architecture',
    creds: {
      email: 'dat1607@gmail.com',
      pass: 'Password123',
      note: {
        vi: 'Trải nghiệm AI Assistant phân tích chi tiêu và tích hợp SePay mock',
        en: 'Experience AI Assistant for spending analysis and SePay mock integration',
      },
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
    desc: {
      vi: 'Ứng dụng đặt đồ ăn trực tuyến lấy cảm hứng ShopeeFood — đầy đủ JWT auth, phân quyền 3 cấp (User/Store/Admin), real-time order tracking qua Socket.IO và tối ưu hóa query PostgreSQL với Prisma ORM.',
      en: 'ShopeeFood-inspired online food ordering app — full JWT auth, 3-tier permission (User/Store/Admin), real-time order tracking via Socket.IO, and optimized PostgreSQL queries with Prisma ORM.',
    },
    arch: 'Monolithic + Prisma ORM',
    creds: {
      email: { vi: 'Có thể đăng ký tài khoản', en: 'Register an account' },
      pass: { vi: 'Đăng ký', en: 'Register' },
      note: {
        vi: 'Hoặc Admin: seoulkitchen@gmail.com / Bao190404. để xem dashboard doanh thu cho nhà hàng "Seoul BBQ House"',
        en: 'Or Admin: seoulkitchen@gmail.com / Bao190404. to view revenue dashboard for "Seoul BBQ House"',
      },
    },
    highlights: [
      'JWT 3-tier auth',
      'Real-time order',
      'Optimized DB schema',
      'Deployed Vercel+Render',
    ],
  },
];
