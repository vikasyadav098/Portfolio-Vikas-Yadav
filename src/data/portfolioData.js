export const portfolioData = {
  personal: {
    name: "Vikas Yadav",
    role: "MERN Stack / Full Stack Developer",
    headline: "Engineering Scalable, Human-Centric Systems.",
    subheadline: "Specializing in React, Node.js, Express, MongoDB, and AI-Powered Workflow Automations.",
    location: "Rudrapur, Uttarakhand, India",
    email: "vikyadav098@gmail.com",
    phone: "+91-9997675330",
    github: "https://github.com/vikasyadav098",
    linkedin: "https://www.linkedin.com/in/vikas-yadav-a4a935390/",
    photo: "/photo.jpg",
    summary: "MERN Stack Developer with hands-on experience building end-to-end web applications using MongoDB, Express.js, React.js, and Node.js, improving full-stack performance by up to 45% through optimization. Skilled in delivering complete features from database design through REST API development to responsive frontend interfaces, with practical experience in AI-powered automation using n8n, Anthropic Claude API, and locally-hosted LLMs. Completing a BCA in Computer Science with a strong focus on workflow automation, prompt engineering, and API integration."
  },
  
  projects: [
    {
      id: "ai-interview",
      title: "AI Interview Platform",
      category: "Full-Stack AI Application",
      description: "A production-grade mock interview system enabling candidates to practice role-specific technical questions with instant AI feedback. Features a Node/Express REST backend, MongoDB storage, and self-hosted Ollama LLM integration with resilient fallback layers.",
      longDescription: "Engineered dedicated API endpoints for interview creation, question generation, answer submission, and detailed result scoring. Utilizes response-normalization algorithms to guarantee high availability and error-free evaluation response streams.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Ollama LLM", "Axios", "Vercel", "Render"],
      demoUrl: "https://ai-interview-gilt-six.vercel.app",
      githubUrl: "https://github.com/vikasyadav098/Ai-Interview",
      featured: true,
      stats: "45% Faster API Processing"
    },
    {
      id: "ai-workflow",
      title: "AI Workflow Automation",
      category: "AI Agent & Webhook System",
      description: "An event-driven task automation engine connecting Telegram Bot API with OpenAI & Anthropic Claude APIs via n8n workflows. Automatically parses natural language into reminders, task queues, and automated webhook triggers.",
      longDescription: "Features conditional branching logic, automated retry mechanisms, JSON transformations, and structured error handling. Uses prompt engineering to maximize conversational accuracy while reducing API token overhead by 35%.",
      tags: ["n8n", "Telegram Bot API", "OpenAI API", "Claude API", "JavaScript", "Webhooks", "JSON"],
      demoUrl: null,
      githubUrl: "https://github.com/vikasyadav098",
      featured: true,
      stats: "35% Token Efficiency Gain"
    },
    {
      id: "financial-dashboard",
      title: "Financial Dashboard UI",
      category: "Frontend Analytics UI",
      description: "A clean, modern data-driven financial dashboard interface built for high density real-time data visual insights. Features intuitive charts, KPI cards, smart responsive layouts, and zero-lag smooth state updates.",
      longDescription: "Designed for clarity, maximum screen real estate, and rapid mobile reflows. Uses custom CSS component tokens and optimized chart lifecycle hooks.",
      tags: ["React.js", "JavaScript", "CSS3", "Vite", "Vercel"],
      demoUrl: "https://financial-dashboard-ui-eight.vercel.app",
      githubUrl: "https://github.com/vikasyadav098/Financial-Dashboard-UI",
      featured: true,
      stats: "60 FPS Interactive Visuals"
    },
    {
      id: "food-delivery",
      title: "Food Delivery Platform",
      category: "E-Commerce Web Application",
      description: "A responsive culinary ordering platform featuring dynamic menu filtering, real-time cart state management, local storage persistence, and a streamlined checkout experience.",
      longDescription: "Built with pure modular JavaScript and lightweight styling, ensuring ultra-fast initial page paints and seamless mobile touch interactions.",
      tags: ["HTML5", "CSS3", "JavaScript", "Vercel"],
      demoUrl: "https://food-delivery-web-lo13i57qo-vikasyadav098s-projects.vercel.app",
      githubUrl: "https://github.com/vikasyadav098/Food-Delivery-Web-Page",
      featured: false,
      stats: "100 Lighthouse Performance"
    },
    {
      id: "robot-3d",
      title: "3D Interactive Robot",
      category: "Interactive 3D Graphics",
      description: "An interactive 3D robot model that follows mouse cursor trajectory in real-time with smooth spatial kinematics and continuous GPU rotation interpolation.",
      longDescription: "Demonstrates real-time vector math, inverse kinematics, and lightweight 3D graphics rendered natively on browser canvas.",
      tags: ["JavaScript", "CSS 3D", "Three.js", "WebGL"],
      demoUrl: null,
      githubUrl: "https://github.com/vikasyadav098/3d-Robot_Cursor",
      featured: false,
      stats: "Real-Time IK Tracking"
    },
    {
      id: "card-hover",
      title: "Tactile Hover Components",
      category: "UI Micro-Interactions",
      description: "A hardware-accelerated UI component collection showcasing smooth 3D perspective hover transforms, depth lighting, and clean CSS transitions.",
      longDescription: "Ideal for modern minimalist websites seeking subtle micro-animations without external heavy runtime dependencies.",
      tags: ["CSS3", "HTML5", "JavaScript"],
      demoUrl: null,
      githubUrl: "https://github.com/vikasyadav098/card-hover-animation",
      featured: false,
      stats: "Pure CSS Hardware Acceleration"
    }
  ],
  
  experiences: [
    {
      period: "April 2026 – Present",
      company: "Independent MERN Stack Developer",
      role: "Freelance / Self-Directed Development",
      location: "Remote, India",
      bullets: [
        "Built 2+ complete full-stack web applications from scratch, designing MongoDB schemas, RESTful Node/Express APIs, and React frontend interfaces.",
        "Implemented secure enterprise authentication using JWT, bcrypt, CORS policies, and cookie-based session management.",
        "Managed complex application state across user sessions and shopping carts using React Context API and Redux Toolkit.",
        "Improved overall application loading speed by up to 45% through Vite bundle optimization, code splitting, and MongoDB query indexing.",
        "Deployed full-stack projects with frontend on Vercel and backend services on Render with automated environment configurations."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      major: "Computer Science & Programming",
      institution: "Kumaun University, Nainital, Uttarakhand, India",
      period: "May 2023 – May 2026"
    }
  ],

  certifications: [
    { title: "Claude with the Anthropic API", issuer: "Anthropic", date: "March 2026" },
    { title: "AI Prompt Learning Journey", issuer: "Naukri Campus", date: "March 2026" },
    { title: "UX Design Introduction Job Simulation", issuer: "Lloyds Banking Group (Forage)", date: "February 2026" },
    { title: "Introduction to Generative AI Studio", issuer: "Simplilearn / Google Cloud", date: "December 2025" },
    { title: "Introduction to Front End Development", issuer: "Simplilearn", date: "December 2025" }
  ],

  skillsGrid: [
    {
      category: "Frontend",
      skills: [
        { name: "React.js", icon: "atom" },
        { name: "JavaScript (ES6+)", icon: "code" },
        { name: "Redux / Context API", icon: "layers" },
        { name: "Tailwind CSS", icon: "palette" },
        { name: "HTML5 & CSS3", icon: "layout" },
        { name: "Responsive Architecture", icon: "smartphone" }
      ]
    },
    {
      category: "Backend & Devops",
      skills: [
        { name: "Node.js", icon: "server" },
        { name: "Express.js", icon: "cpu" },
        { name: "MongoDB & Mongoose", icon: "database" },
        { name: "REST API Development", icon: "globe" },
        { name: "JWT & Security Auth", icon: "shield-check" },
        { name: "Vercel & Render", icon: "cloud" }
      ]
    },
    {
      category: "Tools & AI Methods",
      skills: [
        { name: "n8n Workflow System", icon: "workflow" },
        { name: "OpenAI & Claude APIs", icon: "bot" },
        { name: "Ollama Local LLMs", icon: "brain" },
        { name: "Prompt Engineering", icon: "sparkles" },
        { name: "Git & GitHub", icon: "git-branch" },
        { name: "Vite & Postman", icon: "zap" }
      ]
    }
  ]
};
