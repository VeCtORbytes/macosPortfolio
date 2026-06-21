import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { navIcons, navLinks } from "../constants";
import useWindowStore from "#store/window";
import useSpotlightStore from "#store/spotlight";
import useSystemStore from "#store/system";
import {
  Sun,
  Volume2,
  Wifi,
  WifiOff,
  Bluetooth,
  Moon,
  Play,
  Pause,
  SkipForward,
  Music,
  Check,
  Loader2,
  ExternalLink,
  Mail,
  FileText,
  RefreshCw
} from "lucide-react";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const toggleSpotlight = useSpotlightStore((s) => s.toggleSpotlight);
  const { isWifiOn, toggleWifi, brightness, setBrightness, volume, setVolume } = useSystemStore();
  
  const [activeMenu, setActiveMenu] = useState(null);
  const [time, setTime] = useState("");
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return saved === "dark" || (!saved && prefersDark);
    }
    return false;
  });

  // Advanced Mock State for interactive features
  const [wifiNetwork, setWifiNetwork] = useState("Sarthak's Brain 5G");
  const [connectingNetwork, setConnectingNetwork] = useState(null);
  const [networksList, setNetworksList] = useState([
    { name: "Home_Network_Ext", type: "wifi" },
    { name: "Starbucks_Guest", type: "wifi" },
    { name: "Sarthak's Hotspot", type: "hotspot" },
  ]);

  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [isAirDropOn, setIsAirDropOn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Lofi Coding Beats 🎧",
    artist: "Lofi Girl / ChilledCow"
  });

  // Live dynamic clock ticking every second
  useEffect(() => {
    const updateTime = () => setTime(dayjs().format("ddd MMM D h:mm A"));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize and load dark mode preference on mount
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Global close listener on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveMenu(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleDarkMode = () => {
    const isNewDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isNewDark ? "dark" : "light");
    setIsDark(isNewDark);
  };

  const handleIconClick = (id, event) => {
    event.stopPropagation(); // Stop bubbling to window close listener
    
    if (id === 1) {
      setActiveMenu(activeMenu === "wifi" ? null : "wifi");
    } else if (id === 2) {
      setActiveMenu(null);
      toggleSpotlight();
    } else if (id === 3) {
      setActiveMenu(activeMenu === "user" ? null : "user");
    } else if (id === 4) {
      setActiveMenu(activeMenu === "control" ? null : "control");
    }
  };

  const handleNetworkClick = (networkName) => {
    if (connectingNetwork || networkName === wifiNetwork || !isWifiOn) return;
    setConnectingNetwork(networkName);
    setTimeout(() => {
      setNetworksList((prev) => {
        const filtered = prev.filter((n) => n.name !== networkName);
        const oldType = wifiNetwork.includes("Hotspot") ? "hotspot" : "wifi";
        return [...filtered, { name: wifiNetwork, type: oldType }];
      });
      setWifiNetwork(networkName);
      setConnectingNetwork(null);
    }, 1200);
  };

  return (
    <nav className="relative z-[9998]">
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Sarthak's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <ul>
          {navIcons.map(({ id, img }) => (
            <li
              key={id}
              className="relative flex items-center"
              onClick={(e) => handleIconClick(id, e)}
            >
              <img
                src={img}
                className={`icon-hover cursor-pointer transition-opacity duration-200 ${
                  id === 1 && !isWifiOn ? "opacity-35" : ""
                }`}
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>
        <time className="cursor-default select-none">{time}</time>

        {/* --- Dropdown Menus Nested inside the relative Container to align perfectly with the navbar components --- */}

        {/* Wi-Fi Dropdown */}
        {activeMenu === "wifi" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-9 w-64 bg-[#f6f6f6] dark:bg-[#1c1c1e] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl dark:shadow-2xl p-4 text-[13px] text-neutral-900 dark:text-neutral-100 z-[9999] cursor-default select-none animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-[14px]">Wi-Fi</span>
              <button
                onClick={toggleWifi}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 cursor-pointer outline-none ${
                  isWifiOn ? "bg-[#007aff] dark:bg-[#0a84ff]" : "bg-black/10 dark:bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                    isWifiOn ? "translate-x-[18px]" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-2.5 py-1.5 rounded-lg">
              <span className="text-neutral-500 dark:text-neutral-400 font-medium">Status</span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isWifiOn
                    ? "text-[#00A154] bg-[#00A154]/10"
                    : "text-red-500 bg-red-500/10"
                }`}
              >
                {isWifiOn ? "Connected" : "Disconnected"}
              </span>
            </div>

            {isWifiOn ? (
              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mt-1">
                  Connected Network
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#007aff]/10 dark:bg-[#0a84ff]/10 border border-[#007aff]/20 dark:border-[#0a84ff]/20">
                  <div className="flex items-center gap-2">
                    <Wifi className="size-4 text-[#007aff] dark:text-[#0a84ff] animate-pulse" />
                    <span className="font-semibold text-[#007aff] dark:text-[#0a84ff] truncate max-w-40">
                      {wifiNetwork}
                    </span>
                  </div>
                  <Check className="size-4 text-[#007aff] dark:text-[#0a84ff] shrink-0" />
                </div>

                <div className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mt-1">
                  Nearby Networks
                </div>

                <div className="flex flex-col gap-1 max-h-[120px] overflow-y-auto pr-1">
                  {networksList.map((network) => (
                    <div
                      key={network.name}
                      onClick={() => handleNetworkClick(network.name)}
                      className="flex items-center justify-between p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {network.type === "hotspot" ? (
                          <Bluetooth className="size-4 text-neutral-500 dark:text-neutral-400" />
                        ) : (
                          <Wifi className="size-4 text-neutral-500 dark:text-neutral-400" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300 truncate max-w-40">
                          {network.name}
                        </span>
                      </div>
                      
                      {connectingNetwork === network.name ? (
                        <Loader2 className="size-3.5 text-[#007aff] dark:text-[#0a84ff] animate-spin shrink-0" />
                      ) : (
                        <span className="text-[10px] text-neutral-400">Join</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-neutral-400 dark:text-neutral-500 text-xs font-medium">
                Turn on Wi-Fi to see available networks.
              </div>
            )}
          </div>
        )}

        {/* User Profile / About This Mac Spec Card */}
        {activeMenu === "user" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-9 w-72 bg-[#f6f6f6] dark:bg-[#1c1c1e] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl dark:shadow-2xl p-4 text-[13px] text-neutral-900 dark:text-neutral-100 z-[9999] cursor-default select-none animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-black/5 dark:border-white/5">
              <div className="relative">
                <img
                  src="/images/sarthak.jpeg"
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border border-white dark:border-white/10 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00A154] border-2 border-white dark:border-[#1c1c1e] rounded-full" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[14px] text-neutral-900 dark:text-white leading-tight">
                  Sarthak Gupta
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 py-1 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">System OS</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">macOS Sequoia (Mock)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Processor</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Apple M4 Max (Mock)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Memory</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">32 GB LPDDR5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Startup Disk</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Macintosh HD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Status</span>
                <span className="text-[#00A154] font-bold">Coding Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-black/5 dark:border-white/5">
              <button
                onClick={() => {
                  openWindow("contact");
                  setActiveMenu(null);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-colors font-semibold cursor-pointer text-xs"
              >
                <Mail className="size-3.5 text-[#007aff] dark:text-[#0a84ff]" />
                Contact
              </button>
              <button
                onClick={() => {
                  openWindow("resume");
                  setActiveMenu(null);
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-colors font-semibold cursor-pointer text-xs"
              >
                <FileText className="size-3.5 text-[#007aff] dark:text-[#0a84ff]" />
                Resume
              </button>
            </div>
            
            <button
              onClick={() => window.open("https://github.com/VeCtORbytes", "_blank")}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#007aff] dark:bg-[#0a84ff] hover:bg-[#007aff]/90 dark:hover:bg-[#0a84ff]/90 text-white font-semibold transition-colors cursor-pointer text-xs shadow-md shadow-blue-500/10"
            >
              <ExternalLink className="size-3.5" />
              Visit My GitHub
            </button>
          </div>
        )}

        {/* Control Center Dropdown */}
        {activeMenu === "control" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-9 w-80 bg-[#f6f6f6] dark:bg-[#1c1c1e] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl dark:shadow-2xl p-4 text-[13px] text-neutral-900 dark:text-neutral-100 z-[9999] cursor-default select-none flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-100"
          >
            {/* 2x2 Grid of System Controls */}
            <div className="grid grid-cols-2 gap-2">
              {/* Wi-Fi Control */}
              <div
                onClick={toggleWifi}
                className={`p-2.5 rounded-2xl flex items-center gap-2.5 cursor-pointer select-none transition-all duration-200 ${
                  isWifiOn
                    ? "bg-[#007aff] dark:bg-[#0a84ff] text-white shadow-md shadow-blue-500/20"
                    : "bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15"
                }`}
              >
                <div
                  className={`size-7 rounded-full flex items-center justify-center ${
                    isWifiOn ? "bg-white/20" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  <Wifi className="size-4" />
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="font-semibold text-xs truncate">Wi-Fi</span>
                  <span
                    className={`text-[9px] truncate mt-0.5 ${
                      isWifiOn ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {isWifiOn ? wifiNetwork : "Off"}
                  </span>
                </div>
              </div>

              {/* Bluetooth Control */}
              <div
                onClick={() => setIsBluetoothOn(!isBluetoothOn)}
                className={`p-2.5 rounded-2xl flex items-center gap-2.5 cursor-pointer select-none transition-all duration-200 ${
                  isBluetoothOn
                    ? "bg-[#007aff] dark:bg-[#0a84ff] text-white shadow-md shadow-blue-500/20"
                    : "bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15"
                }`}
              >
                <div
                  className={`size-7 rounded-full flex items-center justify-center ${
                    isBluetoothOn ? "bg-white/20" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  <Bluetooth className="size-4" />
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="font-semibold text-xs truncate">Bluetooth</span>
                  <span
                    className={`text-[9px] truncate mt-0.5 ${
                      isBluetoothOn ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {isBluetoothOn ? "On" : "Off"}
                  </span>
                </div>
              </div>

              {/* AirDrop Control */}
              <div
                onClick={() => setIsAirDropOn(!isAirDropOn)}
                className={`p-2.5 rounded-2xl flex items-center gap-2.5 cursor-pointer select-none transition-all duration-200 ${
                  isAirDropOn
                    ? "bg-[#007aff] dark:bg-[#0a84ff] text-white shadow-md shadow-blue-500/20"
                    : "bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15"
                }`}
              >
                <div
                  className={`size-7 rounded-full flex items-center justify-center ${
                    isAirDropOn ? "bg-white/20" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  <RefreshCw className="size-3.5" />
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="font-semibold text-xs truncate">AirDrop</span>
                  <span
                    className={`text-[9px] truncate mt-0.5 ${
                      isAirDropOn ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {isAirDropOn ? "Everyone" : "Off"}
                  </span>
                </div>
              </div>

              {/* Dark Mode Control */}
              <div
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-2xl flex items-center gap-2.5 cursor-pointer select-none transition-all duration-200 ${
                  isDark
                    ? "bg-[#007aff] dark:bg-[#0a84ff] text-white shadow-md shadow-blue-500/20"
                    : "bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15"
                }`}
              >
                <div
                  className={`size-7 rounded-full flex items-center justify-center ${
                    isDark ? "bg-white/20" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  <Moon className="size-4" />
                </div>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="font-semibold text-xs truncate">Dark Mode</span>
                  <span
                    className={`text-[9px] truncate mt-0.5 ${
                      isDark ? "text-blue-105" : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    {isDark ? "On" : "Off"}
                  </span>
                </div>
              </div>
            </div>

            {/* Sliders Container (Volume & Brightness) */}
            <div className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl flex flex-col gap-3.5">
              {/* Display Brightness */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sun className="size-3.5 text-amber-500" />
                    <span>Display Brightness</span>
                  </span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#007aff] dark:accent-[#0a84ff] outline-none"
                />
              </div>

              {/* Sound Volume */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Volume2 className="size-3.5 text-blue-500" />
                    <span>Sound Volume</span>
                  </span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#007aff] dark:accent-[#0a84ff] outline-none"
                />
              </div>
            </div>

            {/* Music Card */}
            <div className="p-2.5 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`size-9 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-1000 ${
                    isPlaying ? "animate-spin [animation-duration:8s]" : ""
                  }`}
                >
                  <Music className="size-4.5" />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="font-bold text-xs text-neutral-800 dark:text-neutral-200 truncate">
                    {currentTrack.title}
                  </span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    {currentTrack.artist}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="size-7 rounded-full bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center text-neutral-800 dark:text-neutral-200 cursor-pointer hover:scale-105 active:scale-95 transition-all shrink-0 border border-black/5 dark:border-white/5"
                >
                  {isPlaying ? (
                    <Pause className="size-3 text-neutral-700 dark:text-neutral-300 fill-current" />
                  ) : (
                    <Play className="size-3 text-neutral-700 dark:text-neutral-300 fill-current ml-0.5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setCurrentTrack({
                      title: "Cyberpunk Coffee ☕",
                      artist: "Synthwave Beats Project"
                    });
                  }}
                  className="size-7 rounded-full bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center text-neutral-800 dark:text-neutral-200 cursor-pointer hover:scale-105 active:scale-95 transition-all shrink-0 border border-black/5 dark:border-white/5"
                >
                  <SkipForward className="size-3 text-neutral-700 dark:text-neutral-300 fill-current" />
                </button>
              </div>
            </div>

            {/* Battery status */}
            <div className="flex justify-between items-center text-[10px] text-neutral-400 dark:text-neutral-500 px-1 pt-1.5 border-t border-black/5 dark:border-white/5">
              <span>Battery</span>
              <span className="font-semibold text-neutral-600 dark:text-neutral-400">100% (Charged) 🔌</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
