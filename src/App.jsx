import { useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import useSpotlightStore from "#store/spotlight";
import useSystemStore from "#store/system";

import { Navbar, Welcome, Dock, Home, Spotlight } from "#components";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
  Photos,
} from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  const toggleSpotlight = useSpotlightStore((s) => s.toggleSpotlight);
  const brightness = useSystemStore((s) => s.brightness);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSpotlight();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [toggleSpotlight]);

  return (
    <main>
      <Navbar />
      <Welcome />
      <Home />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />

      <Spotlight />

      {/* Dynamic Screen Dimming Overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none z-[9999999] transition-opacity duration-150"
        style={{ opacity: (100 - brightness) / 100 }}
      />
    </main>
  );
};

export default App;
