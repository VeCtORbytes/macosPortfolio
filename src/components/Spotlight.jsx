import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import useSpotlightStore from "#store/spotlight";
import { locations, gallery } from "#constants";
import gsap from "gsap";

const SEARCH_ITEMS = [
  // Apps
  { id: "finder", name: "Finder", kind: "Application", icon: "/images/finder.png", type: "app" },
  { id: "safari", name: "Safari (Articles)", kind: "Application", icon: "/images/safari.png", type: "app" },
  { id: "photos", name: "Gallery (Photos)", kind: "Application", icon: "/images/photos.png", type: "app" },
  { id: "terminal", name: "Skills (Terminal)", kind: "Application", icon: "/images/terminal.png", type: "app" },
  { id: "contact", name: "Contact Me", kind: "Application", icon: "/images/contact.png", type: "app" },
  
  // Projects
  { id: "hirelens", name: "Project: HireLens", kind: "Project Folder", icon: "/images/folder.png", type: "project", projectId: 5 },
  { id: "leetcrack", name: "Project: LeetCrack", kind: "Project Folder", icon: "/images/folder.png", type: "project", projectId: 6 },
  { id: "stockflow", name: "Project: StockFlow", kind: "Project Folder", icon: "/images/folder.png", type: "project", projectId: 7 },
  { id: "wanderlust", name: "Project: Wanderlust", kind: "Project Folder", icon: "/images/folder.png", type: "project", projectId: 8 },
  
  // Files
  { id: "resume", name: "Resume.pdf", kind: "PDF Document", icon: "/images/pdf.png", type: "resume" },
  { id: "about-me", name: "about-me.txt", kind: "Text File", icon: "/images/txt.png", type: "about-file" },
  
  // Photos
  { id: "pic1", name: "pic1.jpg (Sarthak)", kind: "JPEG Image", icon: "/images/image.png", type: "photo", index: 0 },
  { id: "pic2", name: "pic2.jpg (Casual)", kind: "JPEG Image", icon: "/images/image.png", type: "photo", index: 1 },
  { id: "pic3", name: "pic3.jpg (Vacation)", kind: "JPEG Image", icon: "/images/image.png", type: "photo", index: 2 },
  { id: "pic4", name: "pic4.jpg", kind: "JPEG Image", icon: "/images/image.png", type: "photo", index: 3 },
  { id: "pic5", name: "pic5.jpg (Me)", kind: "JPEG Image", icon: "/images/image.png", type: "photo", index: 4 },
  { id: "pic6", name: "pic6.jpg", kind: "JPEG Image", icon: "/images/image.png", type: "photo", index: 5 },
];

const Spotlight = () => {
  const { isOpen, closeSpotlight } = useSpotlightStore();
  const { openWindow } = useWindowStore();
  const { navigateTo } = useLocationStore();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus input on load
    inputRef.current?.focus();

    // Scale up animation
    gsap.fromTo(
      containerRef.current,
      { scale: 0.9, opacity: 0, y: -20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.5)" }
    );

    // Global escape hook
    const handleGlobalEsc = (e) => {
      if (e.key === "Escape") closeSpotlight();
    };
    window.addEventListener("keydown", handleGlobalEsc);
    return () => window.removeEventListener("keydown", handleGlobalEsc);
  }, [isOpen, closeSpotlight]);

  if (!isOpen) return null;

  // Filter items based on search query
  const filtered = SEARCH_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.kind.toLowerCase().includes(query.toLowerCase())
  );

  const handleLaunch = (item) => {
    closeSpotlight();

    if (item.type === "app") {
      openWindow(item.id);
    } else if (item.type === "project") {
      const project = locations.work.children.find((c) => c.id === item.projectId);
      if (project) {
        navigateTo(project, [
          { id: locations.work.id, name: "Work", location: locations.work },
          { id: project.id, name: project.name, location: project },
        ]);
        openWindow("finder");
      }
    } else if (item.type === "resume") {
      openWindow("resume");
    } else if (item.type === "about-file") {
      navigateTo(locations.about, [
        { id: locations.about.id, name: locations.about.name, location: locations.about }
      ]);
      openWindow("finder");
    } else if (item.type === "photo") {
      const globalIndex = item.index;
      const ext = gallery[globalIndex].img.split(".").pop().toLowerCase();
      openWindow("imgfile", {
        name: `pic${globalIndex + 1}.${ext}`,
        imageUrl: gallery[globalIndex].img,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        handleLaunch(filtered[activeIndex]);
      }
    }
  };

  return (
    <div
      onClick={closeSpotlight}
      className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-xs z-[999999] flex justify-center pt-[15vh] select-none"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] h-fit max-h-[420px] bg-white/75 dark:bg-[#1c1c1e]/75 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200/40 dark:border-white/5">
          <Search className="size-5 text-gray-400 dark:text-gray-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-normal"
          />

        </div>

        {/* Search Results list */}
        {filtered.length > 0 ? (
          <div className="overflow-y-auto max-h-[350px] p-2 space-y-0.5">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => handleLaunch(item)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-150 ${
                  idx === activeIndex
                    ? "bg-blue-600 text-white"
                    : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={item.icon} className="size-5 shrink-0" alt={item.name} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold ${
                    idx === activeIndex
                      ? "text-blue-100"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {item.kind}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-sm text-gray-400 dark:text-gray-500 font-medium">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
