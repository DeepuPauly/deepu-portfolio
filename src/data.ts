// ============================================================
//  EDIT THIS FILE TO MAKE THE SITE YOURS.
//  Change the text inside the quotes. Don't touch the code parts.
// ============================================================

export const SITE = {
  name: "DEEPU PAULY",
  role: "Full-Stack Developer",
  email: "deepupauly@email.com",
  github: "https://github.com/DeepuPauly",
  linkedin: "https://www.linkedin.com/in/deepu-pauly-0ba30a211/",
};

export const HERO = {
  kicker: "Software Engineer · FULL STACK",
  titleLine1: "Building the *backbone*",
  titleLine2: "of the real products.",
  subtitle:
    "I design and engineer end-to-end products — the data models, the logic, and the interfaces on top.",
};

export const ABOUT = {
  heading: "I turn ideas into *fast, reliable* software that ships.",
  body: "I'm a full-stack engineer in Dubai who builds production web apps from the data layer up. I like the hard, quiet parts — clean schemas, sane auth, multi-role systems that stay correct under load — and turning them into tools people actually use. Right now I'm going deeper on backend systems and picking up Go.",
  // Place your photo at public/profile.jpg — it will replace the initials placeholder
  image: "/images/08_k8byaq-removebg-preview.png",   // place your photo at public/images/profile.jpg
  initials: "DP",            // shown when no photo is present
  stats: [
    { value: "3+",  label: "YEARS BUILDING" },
    { value: "3", label: "COMPANIES / ROLES" },
    { value: "10+", label: "PROJECTS SHIPPED " },
  ],
};

export type SkillCategory = {
  name: string;
  skills: { name: string; level: number }[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Backend & APIs",
    skills: [
      { name: "PHP",                level: 90 },
      { name: "Node.js",            level: 85 },
      { name: "NestJS",             level: 80 },
      { name: "Python / FastAPI",   level: 80 },
      { name: "REST API Design",    level: 88 },
      { name: "JWT / OAuth2",       level: 82 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React.js",      level: 88 },
      { name: "TypeScript",    level: 85 },
      { name: "React Native",  level: 75 },
      { name: "Redux Toolkit", level: 78 },
      { name: "Tailwind CSS",  level: 85 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MySQL",      level: 88 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB",    level: 72 },
      { name: "Redis",      level: 72 },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "Docker",         level: 78 },
      { name: "AWS",            level: 72 },
      { name: "GitHub Actions", level: 78 },
      { name: "Nginx",          level: 70 },
    ],
  },
];

export const SKILLS: string[] = [
  "PHP", "TypeScript", "JavaScript", "React", "Node.js",
  "NestJS", "Python", "FastAPI", "React Native", "Redux Toolkit",
  "MySQL", "PostgreSQL", "MongoDB", "Redis",
  "Docker", "AWS", "GitHub Actions", "Nginx", "Tailwind",
  "Go (learning)",
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  type?: "Full-time" | "Freelance" | "Contract" | "Internship";
  description: string;
  achievements?: string[];
  stack?: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Foot Print Real Estate",
    role: "Full-Stack Developer",
    period: "2024 — Present",
    location: "Dubai, UAE",
    type: "Full-time",
    description:
      "Primary developer on a multi-role UAE property listings platform — building and maintaining backend logic, admin tooling, and user-facing interfaces across admin, marketing, and manager roles.",
    achievements: [
      "Built and hardened multi-role management flows with session-based auth, CSRF protection, bcrypt hashing, and block/unblock access controls",
      "Designed listing, lead, and order-management workflows using PDO prepared statements against a MySQL backend",
      "Built React.js dashboards and mobile-first interfaces for high-traffic listing and lead workflows",
      "Integrated CRM and automation workflows (HubSpot, Zapier, Make.com) to reduce manual operations",
    ],
    stack: ["PHP", "MySQL", "Apache", "React.js", "Node.js"],
  },
  {
    company: "Corezone Solutions",
    role: "Software Associate",
    period: "2023",
    location: "Kerala, India",
    type: "Full-time",
    description:
      "Built async microservices and real-time dashboards for high-concurrency inference pipelines.",
    achievements: [
      "Built async FastAPI and Node.js services with Redis and Celery task queues for high-concurrency workloads",
      "Built real-time React.js dashboards with WebSocket feeds for live analytics",
      "Delivered features in small, tested batches (PyTest) and participated in peer code reviews",
      "Automated CI/CD via Docker, GitHub Actions, and AWS Lambda",
    ],
    stack: ["Node.js", "Python", "FastAPI", "Redis", "Celery", "React.js"],
  },
  {
    company: "RISS Technologies",
    role: "Software Developer Intern",
    period: "2022 — 2023",
    location: "Kerala, India",
    type: "Internship",
    description:
      "First professional role. Built analytics dashboards and supported AI inference infrastructure.",
    achievements: [
      "Built analytics dashboards with React.js and FastAPI for AI inference outputs",
      "Containerised ETL pipelines using Docker and Nginx",
      "Added logging and error tracking to inference APIs to speed up debugging and retraining cycles",
    ],
    stack: ["React.js", "Python", "FastAPI", "Docker", "Nginx"],
  },
];

export type Education = {
  school: string;
  degree: string;
  field: string;
  period: string;
  note?: string;
};

export const EDUCATION: Education[] = [
  {
    school: "Manipal Institute of Technology",
    degree: "Master of Computer Applications (MCA)",
    field: "Computer Applications",
    period: "2026 — Present",
    note: "Bengaluru, India · Pursuing",
  },
  {
    school: "University of Calicut",
    degree: "Bachelor of Science",
    field: "Computer Science",
    period: "2023",
    note: "Kerala, India",
  },
];

export type Award = {
  image: string;
  alt: string;
  caption?: string;
};

export const AWARDS = {
  heading: "Awards & *Certifications*",
  // Edit this description to say something about your awards/certifications
  description: "Recognition earned through consistent learning, hands-on delivery, and a drive to grow as an engineer.",
  items: [
    {
      image: "images/1771443027774.jpg",
      alt: "Certificate or Award 1",
      caption: "Rising Star Award 2024 – FP Property",
    },
    {
      image: "images/1771443052624.jpg",
      alt: "Certificate or Award 2",
      caption: "Award Recognition Ceremony 2024",
    },
  ] as Award[],
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  // Place demo video in public/videos/project-name.mp4 and set the path here.
  // The video auto-plays silently on card hover as a preview.
  video?: string;
};

export const PROJECTS: Project[] = [
  {
  title: "Hostick CRM",
  description:
    "Developed a custom CRM platform to streamline customer management, sales tracking, support operations, and workflow automation. Built responsive dashboards, optimized database performance, and improved operational efficiency through centralized business processes.",
  stack: [""],
  link: "https://hostick.io/",
  video: "/videos/hostick.io.mp4",
},
{
  title: "Pro Handover CRM",
  description:
    "Built and enhanced a property management CRM that simplifies tenant, owner, maintenance, and property tracking. Implemented responsive interfaces, workflow automation, and real-time data management to improve operational efficiency for property management teams.",
  stack: [""],
  link: "https://www.prohandover.com/",
  video: "/videos/prohandover.com.mp4",
},
{
  title: "FP Property",
  description:
    "Developed and maintained a real estate platform for property listings, property management, and investment services. Focused on responsive UI development, performance optimization, lead generation workflows, and seamless user experiences across devices.",
  stack: [""],
  link: "https://fpproperty.com",
  video: "/videos/fpproperty.com.mp4",
},
{
  title: "Synnect Group LLC-FZ",
  description:
    "Designed and developed a modern corporate website for a digital transformation and AI solutions company. Delivered responsive front-end components, optimized performance, and implemented scalable web solutions to strengthen the company's online presence.",
  stack: [""],
  link: "https://synnect.ae",
  video: "/videos/synnect.com.mp4",
},
{
  title: "Ve Care Health Care",
  description:
    "Created and maintained a healthcare services website focused on accessibility, responsive design, and user engagement. Implemented modern UI components and optimized site performance to provide a seamless experience for patients and visitors.",
  stack: [""],
  link: "https://vecarehealth.com",
  video: "/videos/vecarehealth.com.mp4",
},
{
  title: "Finnect Group",
  description:
    "Developed a professional corporate website showcasing business services and solutions. Focused on responsive design, performance optimization, and clean user interfaces that effectively communicate the brand's offerings and expertise.",
  stack: [""],
  link: "https://finnect-group.com",
  video: "/videos/finnect-group.com.mp4",
},
{
  title: "Mount Haven Properties",
  description:
    "Built and enhanced a property listings platform featuring dynamic property search, listing management, and responsive user interfaces. Improved usability and performance to support real estate sales and property discovery.",
  stack: [""],
  link: "https://listings.mounthavenproperties.com/",
  video: "/videos/mounthavenproperties.com.mp4",
},
{
  title: "Sky Aero Solutions",
  description:
    "Developed a corporate aviation website highlighting aerospace services and solutions. Implemented responsive layouts, optimized loading performance, and delivered a professional digital experience aligned with industry standards.",
  stack: [""],
  link: "https://skyaerosolutions.com/",
  video: "/videos/skyaerosolutions.cpm.mp4",
},
{
  title: "Noble Printing Press",
  description:
    "Designed and developed a modern printing services website featuring product showcases, service information, and lead generation capabilities. Focused on responsive design, performance, and user-friendly navigation.",
  stack: [""],
  link: "https://nobleppt.com/",
  video: "/videos/nobleppt.com.mp4",
},
];
