const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: true,
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "AI Is Moving Beyond Chatbots",
    date: "May 2026",
    image: "/images/blogs/ai-moving-beyond-chatbots.jpg",
    link: "https://www.tectome.com/blogs/ai-moving-beyond-chatbots",
    company: "Tectome",
  },
  {
    id: 2,
    title: "5 Workflows Your Operations Team Can Automate This Month",
    date: "June 2026",
    image: "/images/blogs/ops-automation-final.jpg",
    link: "https://www.tectome.com/blogs/5-workflows-your-operations-team-can-automate-this-month",
    company: "Tectome",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    category: "AI & Tools",
    items: ["Groq API", "Prompt Engineering", "GitHub Copilot"],
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "GitHub", "Docker", "Postman"],
  },
];

export const socials = [
  {
    id: 1,
    text: "GitHub",
    icon: "/icons/github.svg",
    bg: "#24292e",
    link: "https://github.com/VeCtORbytes",
  },
  {
    id: 2,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#0077b5",
    link: "https://www.linkedin.com/in/sarthakgupta25/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#FFA116",
    link: "https://x.com/Sarthak_Gupta25",
  },
  {
    id: 4,
    text: "Email",
    icon: "/icons/mail.svg",
    bg: "#ef4444",
    link: "mailto:sarthakgupta2503@gmail.com",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/1690454075979_Original.jpg",
  },
  {
    id: 2,
    img: "/images/4788336E-6CB4-4A10-B533-4407AD174341.jpg",
  },
  {
    id: 3,
    img: "/images/5845AC8E-AA95-4A20-BCA4-72B1185BCD6A.jpg",
  },
  {
    id: 4,
    img: "/images/IMG_8146.PNG",
  },
  {
    id: 5,
    img: "/images/IMG_5329.JPG",
  },
  {
    id: 6,
    img: "/images/IMG_2999.jpg",
  },
];

export { navLinks, navIcons, dockApps, techStack, photosLinks, gallery };

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    // ===============================
    // PROJECT 1 — HIRELENS
    // ===============================

    {
      id: 5,
      name: "HireLens",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "README.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "HireLens is an AI-powered hiring workspace built for recruiters and HR teams.",
            "Upload resumes, create job requirements and score candidates using AI.",
            "Built with Next.js, FastAPI, PostgreSQL, Supabase and Groq.",
            "Developed during my AI + Full Stack Engineering internship.",
          ],
        },
        {
          id: 2,
          name: "HireLens Frontend",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://resume-screener-cyan-xi.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "HireLens Backend",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://resume-screener-rtm6.onrender.com",
          position: "top-28 left-20",
        },
        {
          id: 4,
          name: "GitHub",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/VeCtORbytes/resume-screener",
          position: "top-45 right-10",
        },
        {
          id: 5,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/hirelens.png",
        },
      ],
    },

    // ===============================
    // PROJECT 2 — LEETCRACK
    // ===============================

    {
      id: 6,
      name: "LeetCrack",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[15vh] left-10",
      children: [
        {
          id: 1,
          name: "README.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "LeetCrack is a LeetCode-inspired coding platform.",
            "Supports JavaScript, Python and C++ execution.",
            "Includes GitHub authentication and coding workspace.",
            "Built using Next.js, Supabase and Monaco Editor.",
          ],
        },
        {
          id: 2,
          name: "LeetCrack Live",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://leet-crack.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "GitHub",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/VeCtORbytes/LeetCrack",
          position: "top-28 left-20",
        },
        {
          id: 4,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/leetcrack.png",
          position: "top-52 right-80",
        },
      ],
    },

    // ===============================
    // PROJECT 3 — STOCKFLOW
    // ===============================

    {
      id: 7,
      name: "StockFlow",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[25vh] left-15",
      children: [
        {
          id: 1,
          name: "README.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "StockFlow is a stock trading simulator inspired by Zerodha.",
            "Track portfolios and visualize market activity.",
            "Built using the MERN stack.",
            "Created during my Full Stack Developer internship.",
          ],
        },
        {
          id: 2,
          name: "StockFlow Live",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://stocker-1-frontend.onrender.com",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "GitHub",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/VeCtORbytes/Stocker",
          position: "top-28 left-20",
        },
        {
          id: 4,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/stockflow.png",
          position: "top-52 right-80",
        },
      ],
    },

    // ===============================
    // PROJECT 4 — WANDERLUST
    // ===============================

    {
      id: 8,
      name: "Wanderlust",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 left-5",
      windowPosition: "top-[10vh] left-20",
      children: [
        {
          id: 1,
          name: "README.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Travel and property listing platform.",
            "Users can browse destinations, upload listings and leave reviews.",
            "Built using Node.js, Express, MongoDB and Cloudinary.",
            "One of my first complete full-stack applications.",
          ],
        },
        {
          id: 2,
          name: "Wanderlust Live",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://delta-project-2-hb3x.onrender.com",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "GitHub",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/VeCtORbytes/Delta-project",
          position: "top-28 left-20",
        },
        {
          id: 4,
          name: "Screenshot.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/wanderlust.png",
          position: "top-52 right-80",
        },
      ],
    },

    // ===============================
    // PROJECT 5 — CODEREVIEWER
    // ===============================

    {
      id: 9,
      name: "CodeReviewer",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-96 left-40",
      windowPosition: "top-[18vh] left-25",
      children: [
        {
          id: 1,
          name: "README.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "AI-powered code review platform.",
            "Analyze code quality and receive intelligent suggestions.",
            "Built using React, Node.js and AI APIs.",
            "Helps developers improve code before deployment.",
          ],
        },
        {
          id: 2,
          name: "CodeReviewer Live",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://codereviewer-1-fyjr.onrender.com",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "GitHub",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/VeCtORbytes/CodeReviewer",
          position: "top-28 left-20",
        },
      ],
    },

    // ===============================
    // PROJECT 6 — TODO APP
    // ===============================

    {
      id: 10,
      name: "Todo App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-96 right-20",
      windowPosition: "top-[12vh] left-30",
      children: [
        {
          id: 1,
          name: "README.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Task management application.",
            "Create, organize and manage daily tasks.",
            "Authentication, CRUD operations and responsive UI.",
            "Built using MERN stack technologies.",
          ],
        },
        {
          id: 2,
          name: "TodoApp Live",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://todo-app-flame-gamma-50.vercel.app/login",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "GitHub",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/VeCtORbytes/TODO-APP",
          position: "top-28 left-20",
        },
      ],
    },

    // ===============================
    // ARTICLES
    // ===============================

    {
      id: 11,
      name: "Articles",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-[130px] left-[250px]",
      windowPosition: "top-[8vh] left-32",
      children: [
        {
          id: 1,
          name: "AI Moving Beyond Chatbots.url",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://www.tectome.com/blogs/ai-moving-beyond-chatbots",
          position: "top-5 left-10",
        },
        {
          id: 2,
          name: "Operations Automation.url",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://www.tectome.com/blogs/5-workflows-your-operations-team-can-automate-this-month",
          position: "top-20 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/sarthak.jpeg", // 🔁 replace with your actual photo
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/sarthak-2.jpeg", // 🔁 replace with your actual photo
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/sarthak-3.jpeg", // 🔁 replace with your actual photo
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Full Stack Developer | MERN Stack | AWS & DevOps Enthusiast",
      image: "/images/sarthak.jpeg", // 🔁 replace with your actual photo
      description: [
        "Hey! I'm Sarthak Gupta 👋, a Full Stack Developer who works primarily with the MERN stack and enjoys solving real-world problems through software.",
        "Right now I'm building out this portfolio while diving deeper into AWS, Docker, Kubernetes, System Design, Redis, and CI/CD — basically anything cloud-native and DevOps-flavored.",
        "I'm always up for collaborating on open source full stack or DevOps projects, and I'm especially interested in scaling distributed systems and cloud-native architectures.",
        "Feel free to ask me about MERN Stack, React, Node.js, Express.js, MongoDB, REST APIs, Authentication, or Full Stack Development in general — happy to talk shop.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  contact: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  resume: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  safari: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  photos: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  terminal: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  txtfile: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  imgfile: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
