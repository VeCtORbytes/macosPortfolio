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
  const dockRef = useRef(null);

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

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    if (app.id === "trash") {
      navigateTo(locations.trash, [
        { id: locations.trash.id, name: "Trash", location: locations.trash },
      ]);
      openWindow("finder");
      return;
    }

    const winState = windows[app.id];

    if (!winState) {
      console.error(`Window not found for app ${app.id}`);
      return;
    }

    if (!winState.isOpen) {
      openWindow(app.id);
    } else if (winState.isMinimized) {
      restoreWindow(app.id);
    } else {
      // Find the maximum zIndex among all open, non-minimized windows
      const openWindows = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
      const maxZIndex = openWindows.length > 0 ? Math.max(...openWindows.map((w) => w.zIndex)) : 0;

      if (winState.zIndex < maxZIndex) {
        // Bring to front if it is behind other windows
        focusWindow(app.id);
      } else {
        // Already on top, close it
        closeWindow(app.id);
      }
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;