export const personalInfo = {
  name: "Praveen",
  title: "Full Stack Developer | AI & ML Systems Enthusiast",
  roles: [
    "Full Stack Developer",
    "Python Backend Architect",
    "RAG & Vector Search Engineer",
    "Competitive Programmer (400+ Solved)",
    "B.E. CSE @ NIE Mysuru"
  ],
  institution: "The National Institute of Engineering (NIE), Mysuru",
  program: "Bachelor of Engineering in Computer Science & Engineering",
  year: "2nd Year Undergraduate (Class of 2027)",
  location: "Mysuru, Karnataka, India",
  email: "sp59600638@gmail.com",
  github: "https://github.com/sp5900638-max",
  linkedin: "https://linkedin.com/in/praveen-nie-cse",
  leetcode: "https://leetcode.com/u/sp5900638-max",
  codeforces: "https://codeforces.com/profile/sp5900638_max",
  bio: "Passionate 2nd-year Computer Science undergraduate at The National Institute of Engineering (NIE), Mysuru. Driven by solving complex algorithmic challenges and architecting deterministic, high-throughput backend systems. I specialize in Python microservices, FastAPI, Qdrant RAG vector retrieval, and scalable full-stack applications with Next.js and Tailwind CSS.",
  detailedBio: "I thrive at the intersection of algorithmic efficiency and production software engineering. Having solved over 400+ LeetCode problems, I bring rigorous data structure and optimization habits to building sub-40ms REST APIs, resilient Docker microservices, and AI-powered semantic search engines. When I'm not writing code or analyzing time complexities, I explore landscape photography across Karnataka and tinker with open-source systems.",
};

export const stats = [
  {
    value: 400,
    suffix: "+",
    label: "LeetCode Solved",
    sublabel: "Data Structures & Algorithms",
    icon: "Code2",
  },
  {
    value: 15,
    suffix: "+",
    label: "Projects Completed",
    sublabel: "Full Stack, AI & Backend",
    icon: "FolderGit2",
  },
  {
    value: 2,
    suffix: "+",
    label: "Years Experience",
    sublabel: "Hands-on Development",
    icon: "Clock",
  },
  {
    value: 99,
    suffix: ".9%",
    label: "API Reliability",
    sublabel: "Deterministic Microservices",
    icon: "ShieldCheck",
  },
];

export const beyondCodeInterests = [
  { name: "Photography", icon: "Camera", desc: "Urban, campus & landscape photography" },
  { name: "Travel & Hiking", icon: "Compass", desc: "Western Ghats, Coorg & Chamundi Hills" },
  { name: "Music Production", icon: "Headphones", desc: "Synthwave, Ambient & Lo-Fi Beats" },
  { name: "Fitness & Running", icon: "Activity", desc: "Calisthenics & 5k endurance runs" },
];

export const projects = [
  {
    id: "qdrant-rag-engine",
    title: "Autonomous Qdrant RAG Vector Engine",
    category: "AI & Vector Search",
    shortDesc: "Sub-35ms semantic search & RAG retrieval pipeline over 100k+ enterprise document chunks with dense vector embeddings.",
    fullDesc: "An enterprise-grade Retrieval-Augmented Generation (RAG) pipeline engineered with FastAPI, Qdrant Vector DB, and LangChain. Integrates 1536-dimensional OpenAI & open-source embeddings, dynamic semantic chunking, and Redis LRU caching for lightning-fast similarity lookups with deterministic sub-35ms query latency.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["FastAPI", "Python", "Qdrant", "Docker", "AsyncIO", "RAG"],
    metrics: ["< 35ms Vector Search", "1536-dim Embedding Space", "100k+ Chunks Indexed"],
    features: [
      "Sub-35ms Cosine similarity retrieval over high-dimensional vector index",
      "Dynamic token-aware recursive text splitter for preservation of context",
      "Asynchronous connection pooling and non-blocking worker queues",
      "Containerized microservice architecture with Docker Compose",
      "Interactive Swagger UI and streaming Server-Sent Events (SSE) endpoints"
    ],
    liveUrl: "https://qdrant-rag-demo.vercel.app",
    githubUrl: "https://github.com/sp5900638-max/qdrant-rag-pipeline",
  },
  {
    id: "cloudscale-gateway",
    title: "CloudScale Microservice REST Gateway",
    category: "Backend Architecture",
    shortDesc: "High-throughput asynchronous API gateway featuring distributed token-bucket rate limiting, JWT auth, and MySQL connection pooling.",
    fullDesc: "Production-grade microservices gateway handling 10,000+ requests per second with less than 38ms P99 latency. Built with FastAPI, Redis, and MySQL with robust circuit breakers, Prometheus metrics exporter, and non-root Docker container security.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    tags: ["FastAPI", "MySQL", "Redis", "Docker", "Linux", "JWT"],
    metrics: ["10k+ Req/Sec", "< 38ms P99 Latency", "99.98% Uptime"],
    features: [
      "Distributed token-bucket rate limiter with sliding window algorithms",
      "Stateless RS256 JWT cryptographic authentication and role verification",
      "Automated database failover and read-replica routing with SQLAlchemy 2.0",
      "Structured JSON structured logging with OpenTelemetry tracing headers",
      "Prometheus & Grafana telemetry exporter for active health inspection"
    ],
    liveUrl: "https://cloudscale-gateway.vercel.app",
    githubUrl: "https://github.com/sp5900638-max/cloudscale-api-gateway",
  },
  {
    id: "omnidev-ai-assistant",
    title: "OmniDev AI Multi-File Code Intelligence",
    category: "Full Stack & AI",
    shortDesc: "Next.js & Python full-stack application providing context-aware repository analysis, syntax AST visualizers, and code explanations.",
    fullDesc: "A complete developer tool designed for intelligent repository navigation and semantic code search. Built with Next.js App Router, Tailwind CSS, Framer Motion, and a FastAPI backend with vector indexing over AST parse trees.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "React", "Tailwind CSS", "Python", "FastAPI", "Tree-sitter"],
    metrics: ["AST Syntax Parsing", "Multi-File Context", "Real-Time WebSocket Sync"],
    features: [
      "Client-side AST syntax parser with interactive code block highlight",
      "Multi-turn streaming chat with Gemini & Claude LLM backends",
      "Instant repo file search and dependency graph visualization",
      "Dark mode glassmorphism UI with responsive mobile navigation",
      "One-click code snippet copying and markdown report generation"
    ],
    liveUrl: "https://omnidev-ai.vercel.app",
    githubUrl: "https://github.com/sp5900638-max/omnidev-ai-assistant",
  },
  {
    id: "telemetry-broker",
    title: "Distributed Event & Telemetry Broker",
    category: "Distributed Systems",
    shortDesc: "Asynchronous task queue with exponential backoff, dead-letter recovery, MongoDB document logs, and SQLite state persistence.",
    fullDesc: "High-volume background worker system engineered to offload heavy telemetry parsing and batch analytics from front-facing HTTP servers without blocking event loops.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "MongoDB", "SQLite", "Celery", "Docker", "Linux"],
    metrics: ["< 5ms Dispatch Overhead", "100% DLQ Recovery", "Zero Event Drop"],
    features: [
      "Dead-letter queue (DLQ) automated replay with exponential backoff jitter",
      "Dual-database architecture: MongoDB for timeseries telemetry & SQLite for lock state",
      "Worker process health heartbeats and dynamic autoscaling thresholds",
      "Complete CLI telemetry inspector with interactive log filters",
      "Non-root lightweight Alpine Docker containerization"
    ],
    liveUrl: "https://telemetry-broker.vercel.app",
    githubUrl: "https://github.com/sp5900638-max/telemetry-event-broker",
  },
];

export const skillCategories = [
  {
    name: "Languages & Runtimes",
    description: "Core programming languages with strict type patterns and algorithmic optimization.",
    skills: [
      { name: "Python", level: "Advanced", icon: "python", color: "#3776AB" },
      { name: "C++", level: "Advanced", icon: "cpp", color: "#00599C" },
      { name: "JavaScript", level: "Proficient", icon: "javascript", color: "#F7DF1E" },
      { name: "TypeScript", level: "Proficient", icon: "typescript", color: "#3178C6" },
      { name: "SQL", level: "Advanced", icon: "database", color: "#00f5ff" },
      { name: "Bash / Shell", level: "Proficient", icon: "terminal", color: "#4EAA25" },
    ],
  },
  {
    name: "Frontend & UI Engineering",
    description: "Modern, responsive, accessible web interfaces with smooth micro-interactions.",
    skills: [
      { name: "React", level: "Advanced", icon: "react", color: "#61DAFB" },
      { name: "Next.js", level: "Advanced", icon: "nextjs", color: "#ffffff" },
      { name: "Tailwind CSS", level: "Advanced", icon: "tailwind", color: "#06B6D4" },
      { name: "Framer Motion", level: "Proficient", icon: "framer", color: "#FF0055" },
      { name: "HTML5 / CSS3", level: "Advanced", icon: "html", color: "#E34F26" },
    ],
  },
  {
    name: "Backend & Systems",
    description: "Deterministic REST endpoints, asynchronous event loops, and microservices.",
    skills: [
      { name: "FastAPI", level: "Advanced", icon: "fastapi", color: "#009688" },
      { name: "Flask", level: "Proficient", icon: "flask", color: "#ffffff" },
      { name: "Node.js", level: "Proficient", icon: "nodejs", color: "#339933" },
      { name: "RESTful APIs", level: "Advanced", icon: "api", color: "#8b5cf6" },
      { name: "AsyncIO", level: "Advanced", icon: "cpu", color: "#10b981" },
    ],
  },
  {
    name: "Databases, Cloud & DevOps",
    description: "Scalable data stores, high-dimensional vector search, and containerization.",
    skills: [
      { name: "Qdrant Vector DB", level: "Advanced", icon: "vector", color: "#DC2626" },
      { name: "MySQL", level: "Advanced", icon: "mysql", color: "#4479A1" },
      { name: "MongoDB", level: "Proficient", icon: "mongodb", color: "#47A248" },
      { name: "SQLite", level: "Advanced", icon: "sqlite", color: "#003B57" },
      { name: "Docker", level: "Advanced", icon: "docker", color: "#2496ED" },
      { name: "Git & GitHub", level: "Advanced", icon: "git", color: "#F05032" },
      { name: "Linux / Debian", level: "Advanced", icon: "linux", color: "#FCC624" },
    ],
  },
];

export const experienceTimeline = [
  {
    period: "2023 — Present",
    role: "B.E. in Computer Science & Engineering",
    organization: "The National Institute of Engineering (NIE), Mysuru",
    type: "Education",
    location: "Mysuru, Karnataka",
    highlights: [
      "Currently in 2nd year maintaining strong academic standing in foundational CS coursework.",
      "Core subjects: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems (DBMS), Operating Systems, and Discrete Mathematics.",
      "Active participant in technical symposiums and competitive programming coding rounds.",
    ],
    tags: ["DSA", "DBMS", "OS", "Computer Architecture", "Algorithms"],
  },
  {
    period: "2024 — Present",
    role: "Backend & Vector Search Systems Developer",
    organization: "Independent Engineering Projects & Open Source",
    type: "Experience",
    location: "Mysuru / Remote",
    highlights: [
      "Architected sub-35ms RAG pipelines utilizing Qdrant Vector DB and FastAPI for enterprise document retrieval.",
      "Designed resilient, containerized REST API gateways with Redis caching and distributed token-bucket rate limiters.",
      "Implemented comprehensive unit test suites achieving > 90% coverage for asynchronous Python services.",
    ],
    tags: ["FastAPI", "Qdrant", "Docker", "Python", "Redis", "Microservices"],
  },
  {
    period: "2023 — 2024",
    role: "Competitive Programming & Problem Solving",
    organization: "LeetCode & Codeforces",
    type: "Milestone",
    location: "Online",
    highlights: [
      "Solved 400+ algorithmic problems across LeetCode, mastering Graphs, Dynamic Programming, Trees, and Heaps.",
      "Maintained consistent daily streak and participated in global bi-weekly algorithmic contests.",
      "Authored clean, documented solutions in Python and modern C++ with optimal space and time complexities.",
    ],
    tags: ["400+ Solved", "Dynamic Programming", "Graph Theory", "Greedy", "C++", "Python"],
  },
];

export const certifications = [
  {
    id: "cert-1",
    title: "Generative AI & Vector Search Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    skills: ["RAG", "Embeddings", "Vector Databases", "Prompt Engineering"],
    credentialUrl: "https://coursera.org/verify/deeplearning-rag",
    description: "Hands-on mastery of high-dimensional vector search, semantic embeddings, dense retrieval architectures, and agentic workflows.",
  },
  {
    id: "cert-2",
    title: "Problem Solving (Advanced Algorithms)",
    issuer: "HackerRank & LeetCode Certified",
    date: "2024",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    skills: ["Data Structures", "Dynamic Programming", "Graph Algorithms", "C++"],
    credentialUrl: "https://hackerrank.com/certificates/problem-solving-adv",
    description: "Comprehensive assessment evaluating algorithmic complexity, graph traversal, greedy choice, and memory optimization.",
  },
  {
    id: "cert-3",
    title: "NIE Mysuru Annual Hackathon Finalist",
    issuer: "The National Institute of Engineering (NIE)",
    date: "2024",
    category: "Competitions",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    skills: ["Full Stack Dev", "FastAPI", "Vector Search", "Rapid Prototyping"],
    credentialUrl: "https://nie.ac.in/events/hackathon-2024",
    description: "Built an autonomous document indexing and question-answering system for campus research papers in a 24-hour sprint.",
  },
  {
    id: "cert-4",
    title: "Containerization & Microservices with Docker",
    issuer: "Linux Foundation & Docker Community",
    date: "2024",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80",
    skills: ["Docker", "Docker Compose", "Multi-stage Builds", "Linux Security"],
    credentialUrl: "https://docker.com/certification/prep",
    description: "Engineered production container images, isolated network bridges, volume mounts, and automated CI/CD container testing.",
  },
];

export const photoGallery = [
  {
    id: "photo-1",
    title: "Campus Hackathon 24h Sprint",
    location: "NIE Mysuru Innovation Lab",
    category: "Hackathons",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    caption: "Late-night debugging session building the RAG document retrieval system with teammates.",
  },
  {
    id: "photo-2",
    title: "Western Ghats Sunrise Trek",
    location: "Coorg / Karnataka Hills",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    caption: "Recharging between semesters in the misty Western Ghats trails.",
  },
  {
    id: "photo-3",
    title: "NIE Heritage Clock Tower & Campus",
    location: "The National Institute of Engineering, Mysuru",
    category: "Campus Life",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    caption: "Historic campus grounds where my computer engineering journey began.",
  },
  {
    id: "photo-4",
    title: "Night Sky & Astrophotography",
    location: "Chamundi Hills Foot, Mysuru",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    caption: "Long exposure capture experimenting with low-light camera sensor calibration.",
  },
  {
    id: "photo-5",
    title: "Developer Workstation & Setup",
    location: "Personal Dev Lab",
    category: "Coding",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
    caption: "Mechanical keyboard, dual monitor setup, and terminal running Docker containers.",
  },
  {
    id: "photo-6",
    title: "Early Morning 5K Campus Run",
    location: "Mysuru Sports Complex",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    caption: "Starting the day with physical endurance discipline before diving into algorithmic proofs.",
  },
];
