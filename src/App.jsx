import { useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import useSpotlightStore from "#store/spotlight";
import useSystemStore from "#store/system";

import {
  Navbar,
  Welcome,
  Dock,
  Home,
  Spotlight,
  MobileView,
} from "#components";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
  Photos,
  Dino,
} from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  const toggleSpotlight = useSpotlightStore((s) => s.toggleSpotlight);
  const brightness = useSystemStore((s) => s.brightness);

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return true;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = (e) => {
      setIsDesktop(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleResize);
    } else {
      mediaQuery.addListener(handleResize);
    }

    setIsDesktop(mediaQuery.matches);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleResize);
      } else {
        mediaQuery.removeListener(handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSpotlight();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [toggleSpotlight, isDesktop]);

  return (
    <main>
      {isDesktop ? (
        <div className="hidden md:block">
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
          <Dino />

          <Spotlight />
        </div>
      ) : (
        <MobileView />
      )}

      {/* Dynamic Screen Dimming Overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none z-[9999999] transition-opacity duration-150"
        style={{ opacity: (100 - brightness) / 100 }}
      />
    </main>
  );
};

export default App;
