import { useState, useRef, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import { techStack } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { locations } from "#constants/index.js";
import { Check, Flag, Terminal as TermIcon } from "lucide-react";

// Theme styles configuration
const THEMES = {
  default: {
    bg: "bg-white",
    text: "text-gray-800",
    headerText: "sarthak@portfolio ~ tech-stack",
    promptText: "sarthak@portfolio:~$",
    promptColor: "text-[#00A154]",
    caretColor: "#1f2937",
    outputColor: "text-gray-700",
    borderClass: "border-gray-200/50",
  },
  matrix: {
    bg: "bg-black",
    text: "text-[#00ff00] font-mono",
    headerText: "sarthak@matrix ~ zsh",
    promptText: "neo@matrix:~$",
    promptColor: "text-[#00ff00]",
    caretColor: "#00ff00",
    outputColor: "text-[#00ff00] opacity-90",
    borderClass: "border-[#00ff00]/20",
  },
  dark: {
    bg: "bg-[#1c1c1e]",
    text: "text-gray-200 font-mono",
    headerText: "sarthak@portfolio ~ dark-sh",
    promptText: "sarthak@portfolio:~$",
    promptColor: "text-blue-400",
    caretColor: "#ffffff",
    outputColor: "text-gray-300",
    borderClass: "border-white/10",
  },
};

const Terminal = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const navigateTo = useLocationStore((s) => s.navigateTo);
  
  const [themeName, setThemeName] = useState("default");
  const [currentCommand, setCurrentCommand] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const theme = THEMES[themeName] || THEMES.default;
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Prepopulate outputs with the initial startup tech-stack printout
  const [outputLines, setOutputLines] = useState(() => {
    const initial = [
      { type: "text", content: "Last login: Sun Jun 21 13:00:20 on ttys001" },
      { type: "prompt", content: "cat ./tech-stack.json" },
      {
        type: "techstack",
        content: techStack,
      },
      { type: "text", content: "6 categories resolved — exit code 0" },
      { type: "text", content: "Process finished in 6ms" },
    ];
    return initial;
  });

  // Focus command input on load and whenever clicked
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto scroll output
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputLines]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) {
      setOutputLines((prev) => [...prev, { type: "prompt", content: "" }]);
      return;
    }

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Prompt eco line
    const promptLine = { type: "prompt", content: trimmed };
    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let resultLines = [];

    switch (command) {
      case "help":
        resultLines = [
          { type: "text", content: "Available CLI commands:" },
          { type: "text", content: "  help      - Display this command dictionary" },
          { type: "text", content: "  ls        - List active directory files" },
          { type: "text", content: "  cat <file>- View details/content of a file" },
          { type: "text", content: "  skills    - Visual tech competency ASCII charts" },
          { type: "text", content: "  neofetch  - System metadata & specs summary" },
          { type: "text", content: "  theme     - Switch layout theme (default, matrix, dark)" },
          { type: "text", content: "  about     - Launch Finder and show Sarthak's folders" },
          { type: "text", content: "  contact   - Launch the mail/socials card dialog" },
          { type: "text", content: "  clear     - Wipe output history" },
        ];
        break;

      case "ls":
        resultLines = [
          { type: "text", content: "about_me.txt    contact.md    skills.json    projects/" },
        ];
        break;

      case "cat": {
        const file = args[0]?.toLowerCase();
        if (!file) {
          resultLines = [{ type: "error", content: "usage: cat [filename]" }];
        } else if (file === "about_me.txt") {
          resultLines = [
            { type: "text", content: "Hey! I'm Sarthak Gupta 👋, a Full Stack Developer who works primarily with the MERN stack." },
            { type: "text", content: "I love solving real-world problems and scaling cloud-native architectures." },
            { type: "text", content: "Enthusiastic about React/Next.js, Node.js, AWS, Docker, CI/CD, and Redis." },
          ];
        } else if (file === "contact.md") {
          resultLines = [
            { type: "text", content: "GitHub:   https://github.com/VeCtORbytes" },
            { type: "text", content: "LinkedIn: https://www.linkedin.com/in/sarthakgupta25/" },
            { type: "text", content: "Email:    sarthakgupta2503@gmail.com" },
            { type: "text", content: "Twitter:  https://x.com/Sarthak_Gupta25" },
          ];
        } else if (file === "skills.json") {
          resultLines = [
            { type: "code", content: JSON.stringify({
              Frontend: ["React.js", "Next.js", "JavaScript", "TypeScript"],
              Styling: ["Tailwind CSS", "HTML5", "CSS3"],
              Backend: ["Node.js", "Express.js", "REST APIs"],
              Database: ["MongoDB", "PostgreSQL", "MySQL"],
              DevOps: ["Git", "GitHub", "Docker", "AWS", "CI/CD"]
            }, null, 2) },
          ];
        } else if (file === "projects.json") {
          resultLines = [
            { type: "text", content: "Directory contents under projects/:" },
            { type: "text", content: "  1. HireLens      - AI recruiter dashboard (Next.js, FastAPI)" },
            { type: "text", content: "  2. LeetCrack     - Coding simulator editor workspace (Next.js, Monaco)" },
            { type: "text", content: "  3. StockFlow     - Stock simulator exchange (MERN stack)" },
            { type: "text", content: "  4. Wanderlust    - Property rental Cloudinary listings (Node.js, Express)" },
          ];
        } else {
          resultLines = [{ type: "error", content: `cat: ${args[0]}: No such file or directory` }];
        }
        break;
      }

      case "skills":
        resultLines = [
          { type: "text", content: "Competency Level Profile:" },
          { type: "text", content: "Frontend   [████████████████░░░] 80% (React/Next/TS)" },
          { type: "text", content: "Backend    [█████████████████░░] 85% (Node/Express/APIs)" },
          { type: "text", content: "Database   [██████████████░░░░░] 70% (Mongo/Postgres/MySQL)" },
          { type: "text", content: "DevOps     [███████████████░░░░] 75% (Git/Docker/AWS/CI)" },
          { type: "text", content: "AI Dev     [████████████████░░░] 80% (Groq/Prompt Engineering)" },
        ];
        break;

      case "neofetch":
        resultLines = [
          {
            type: "neofetch",
            content: {
              os: "macOS Portfolio v1.0.0",
              host: "Sarthak's Portfolio Machine",
              kernel: "React 19.0.0 + Vite 7",
              shell: "zsh (antigravity-mock-cli)",
              cpu: "MERN Stack Engine @ 4.0GHz",
              ram: "16 GB Node.js Virtual Heap",
              uptime: "19 hours, 11 mins",
            },
          },
        ];
        break;

      case "theme": {
        const selected = args[0]?.toLowerCase();
        if (!selected) {
          resultLines = [{ type: "text", content: "usage: theme [default|matrix|dark]" }];
        } else if (THEMES[selected]) {
          setThemeName(selected);
          resultLines = [{ type: "text", content: `Terminal theme successfully set to '${selected}'` }];
        } else {
          resultLines = [{ type: "error", content: `theme: '${selected}' is not a valid terminal theme` }];
        }
        break;
      }

      case "clear":
        setOutputLines([]);
        return;

      case "about":
        navigateTo(locations.about, [
          { id: locations.about.id, name: locations.about.name, location: locations.about },
        ]);
        openWindow("finder");
        resultLines = [{ type: "text", content: "Navigating Finder to 'About Me' folder..." }];
        break;

      case "contact":
        openWindow("contact");
        resultLines = [{ type: "text", content: "Opening Contact dialog window..." }];
        break;

      default:
        resultLines = [
          { type: "error", content: `zsh: command not found: ${command}` },
        ];
    }

    setOutputLines((prev) => [...prev, promptLine, ...resultLines]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand);
      setCurrentCommand("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCurrentCommand(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setCurrentCommand("");
      } else {
        setHistoryIndex(nextIndex);
        setCurrentCommand(history[nextIndex]);
      }
    }
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>{theme.headerText}</h2>
      </div>

      <div
        onClick={handleContainerClick}
        className={`flex-1 flex flex-col p-4 h-[390px] overflow-y-auto cursor-text select-text transition-colors duration-300 ${theme.bg} ${theme.text}`}
      >
        <div className="flex-1 space-y-2.5">
          {outputLines.map((line, idx) => {
            if (line.type === "prompt") {
              return (
                <div key={idx} className="flex gap-2">
                  <span className={`font-bold shrink-0 ${theme.promptColor}`}>
                    {theme.promptText}
                  </span>
                  <span>{line.content}</span>
                </div>
              );
            }

            if (line.type === "techstack") {
              return (
                <div key={idx} className={`my-2 py-3 border-y border-dashed ${theme.borderClass}`}>
                  <div className="flex items-center font-semibold ms-6 mb-3 opacity-90">
                    <span className="w-32">Category</span>
                    <span>Technologies</span>
                  </div>
                  <ul className="space-y-1.5 ms-6">
                    {line.content.map((entry) => (
                      <li key={entry.category} className="flex items-start">
                        <Check className="text-[#00A154] w-4 mt-0.5 shrink-0" size={16} />
                        <h3 className="font-semibold text-[#00A154] w-32 ms-2 shrink-0">
                          {entry.category}
                        </h3>
                        <span className="opacity-95">{entry.items.join(", ")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            if (line.type === "neofetch") {
              const info = line.content;
              return (
                <div key={idx} className="flex gap-6 py-2 leading-relaxed">
                  <div className="text-red-500 font-bold shrink-0 hidden sm:block">
                    {`     ,x88888x,
  ,888888888888,
 8888888888888888
 888888888888888888
 888888888888888888
 \`8888888888888888'
  \`88888888888888'
    \`x8888888x'`}
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-red-400">sarthak@portfolio</p>
                    <p className="opacity-60">-----------------</p>
                    <p>OS: <span className="opacity-90">{info.os}</span></p>
                    <p>Host: <span className="opacity-90">{info.host}</span></p>
                    <p>Kernel: <span className="opacity-90">{info.kernel}</span></p>
                    <p>Shell: <span className="opacity-90">{info.shell}</span></p>
                    <p>CPU: <span className="opacity-90">{info.cpu}</span></p>
                    <p>RAM: <span className="opacity-90">{info.ram}</span></p>
                    <p>Uptime: <span className="opacity-90">{info.uptime}</span></p>
                  </div>
                </div>
              );
            }

            if (line.type === "code") {
              return (
                <pre key={idx} className="bg-black/5 dark:bg-white/5 p-2.5 rounded-lg overflow-x-auto text-[12px] opacity-90 leading-tight">
                  <code>{line.content}</code>
                </pre>
              );
            }

            if (line.type === "error") {
              return (
                <div key={idx} className="text-red-500 font-semibold">
                  {line.content}
                </div>
              );
            }

            return (
              <div key={idx} className={`${theme.outputColor}`}>
                {line.content}
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>

        {/* Input prompt line */}
        <div className="flex items-center gap-2 mt-4 pt-2 border-t border-gray-100/5 dark:border-white/5 shrink-0">
          <span className={`font-bold shrink-0 ${theme.promptColor}`}>
            {theme.promptText}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 p-0 m-0 text-inherit font-inherit select-text"
            style={{ caretColor: theme.caretColor }}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
