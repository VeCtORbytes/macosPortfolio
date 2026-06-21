import { useState, useEffect } from "react";
import { socials } from "#constants/index.js";

const MobileView = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 375);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-screen relative flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 font-sans select-none overflow-hidden p-6">
      
      {/* Subtle modern radial mesh glow in background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Main Card Container */}
      <div className="relative z-10 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-6 shadow-xl animate-in fade-in zoom-in duration-500">
        
        {/* Monitor SVG Icon */}
        <div className="mx-auto size-14 bg-zinc-800/50 rounded-2xl flex items-center justify-center border border-zinc-700/50 text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
        </div>

        {/* Typography Headers */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold tracking-tight text-white">
            Desktop Experience Required
          </h2>
          <p className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
            Sarthak Gupta — Portfolio
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-2">
            This portfolio simulates a complete macOS desktop environment with draggable windows, custom folders, and interactive terminal panels.
          </p>
          <p className="text-xs text-zinc-300 leading-relaxed font-semibold font-sans">
            Please access this website from a desktop or laptop device to explore the workspace.
          </p>
        </div>

        {/* Contact shortcuts for mobile users */}
        <div className="border-t border-zinc-800/80 pt-5 space-y-3">
          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest text-center">
            Quick Connect
          </p>
          <div className="grid grid-cols-2 gap-2">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 rounded-xl text-zinc-300 text-xs font-semibold justify-center transition-colors"
              >
                <img 
                  src={social.icon} 
                  alt={social.text} 
                  className="w-3.5 h-3.5 brightness-0 invert opacity-70" 
                />
                <span>{social.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Current status display */}
        <div className="bg-black/30 border border-zinc-800/40 rounded-xl p-2.5 text-[9px] font-mono text-zinc-500 flex justify-between">
          <span>Width: {width}px</span>
          <span>Required: ≥ 768px</span>
        </div>

      </div>

      {/* Footer detail */}
      <div className="absolute bottom-6 text-[9px] font-mono text-zinc-600 tracking-widest uppercase">
        Strict Desktop viewport Mode
      </div>

    </div>
  );
};

export default MobileView;