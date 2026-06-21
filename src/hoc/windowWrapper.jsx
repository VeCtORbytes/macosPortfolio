import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

const WindowWrapper = (Component, WindowKey) => {
  const Wrapped = (props) => {
    const focusWindow = useWindowStore((s) => s.focusWindow);
    const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
    const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
    const restoreWindow = useWindowStore((s) => s.restoreWindow);
    const windowState = useWindowStore((s) => s.windows[WindowKey]);

    const isOpen = windowState?.isOpen;
    const isMinimized = windowState?.isMinimized;
    const isMaximized = windowState?.isMaximized;
    const zIndex = windowState?.zIndex;

    const ref = useRef(null);

    // Open animation
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen || isMinimized) return;

      el.style.display = "block";
      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
      );
    }, [isOpen, isMinimized]);

    // Minimize animation
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isMinimized) {
        gsap.to(el, {
          scale: 0.3,
          opacity: 0,
          y: 80,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      }
    }, [isMinimized]);

    // Draggable setup
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      const draggable = Draggable.create(el, {
        trigger: el.querySelector("#window-header"),
        onPress: () => focusWindow(WindowKey),
      })[0];

      const disable = () => draggable?.disable();
      const enable = () => {
        if (!isMaximized) draggable?.enable();
      };

      window.addEventListener("item-drag-start", disable);
      window.addEventListener("item-drag-end", enable);

      if (isMaximized) draggable?.disable();

      return () => {
        window.removeEventListener("item-drag-start", disable);
        window.removeEventListener("item-drag-end", enable);
        draggable?.kill();
      };
    }, [focusWindow, isMaximized]);

    // Show/hide without animation on mount
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen && !isMinimized ? "block" : "none";
    }, [isOpen, isMinimized]);

    return (
      <section
        id={WindowKey}
        ref={ref}
        style={{ zIndex }}
        className={`absolute window ${isMaximized ? "maximized" : ""}`}
        onMouseDown={() => focusWindow(WindowKey)}
      >
        <Component
          {...props}
          onMinimize={() => minimizeWindow(WindowKey)}
          onMaximize={() => maximizeWindow(WindowKey)}
          onRestore={() => restoreWindow(WindowKey)}
          isMaximized={isMaximized}
        />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
