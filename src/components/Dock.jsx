import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { dockApps, locations } from "#constants";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

const Dock = () => {
  const { openWindow, closeWindow, focusWindow, restoreWindow, windows } = useWindowStore();
  const navigateTo = useLocationStore((s) => s.navigateTo);
  const activeLocation = useLocationStore((s) => s.activeLocation);
  const dockRef = useRef(null);

  // Check if an app is open (taking finder vs trash mapping into account)
  const isAppOpen = (id) => {
    if (id === "trash") {
      return windows.finder?.isOpen && activeLocation?.id === locations.trash.id;
    }
    if (id === "finder") {
      return windows.finder?.isOpen && activeLocation?.id !== locations.trash.id;
    }
    return windows[id]?.isOpen;
  };

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        })
      );
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app, event) => {
    if (!app.canOpen) return;

    const id = app.id;
    const isAlreadyOpen = isAppOpen(id);

    // Bouncing launch feedback
    if (!isAlreadyOpen && event?.currentTarget) {
      const iconBtn = event.currentTarget;
      gsap.to(iconBtn, {
        y: -16,
        duration: 0.15,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(iconBtn, { y: 0, duration: 0.1 });
        }
      });
    }

    if (id === "trash") {
      navigateTo(locations.trash, [
        { id: locations.trash.id, name: "Trash", location: locations.trash },
      ]);
      openWindow("finder");
      return;
    }

    const winState = windows[id];

    if (!winState) {
      console.error(`Window not found for app ${id}`);
      return;
    }

    if (!winState.isOpen) {
      openWindow(id);
    } else if (winState.isMinimized) {
      restoreWindow(id);
    } else {
      // Find the maximum zIndex among all open, non-minimized windows
      const openWindows = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
      const maxZIndex = openWindows.length > 0 ? Math.max(...openWindows.map((w) => w.zIndex)) : 0;

      if (winState.zIndex < maxZIndex) {
        // Bring to front if it is behind other windows
        focusWindow(id);
      } else {
        // Already on top, close it
        closeWindow(id);
      }
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container pb-2">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center pb-1">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={(e) => toggleApp({ id, canOpen }, e)}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
            {isAppOpen(id) && (
              <span className="absolute bottom-[-1px] w-[5px] h-[5px] bg-black/60 dark:bg-white/70 rounded-full" />
            )}
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;