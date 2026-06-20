import { WindowControls } from "#components";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import clsx from "clsx";
import WindowWrapper from "#hoc/windowWrapper.jsx";
import { locations } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import { useRef } from "react";

const Finder = () => {
  const {
    activeLocation,
    path,
    history,
    historyIndex,
    navigateTo,
    goBack,
    goForward,
  } = useLocationStore();
  const { openWindow } = useWindowStore();
  const contentRef = useRef(null);

  const openFavourite = (location) =>
    navigateTo(location, [{ id: location.id, name: location.name, location }]);

  const openWorkChild = (item) =>
    navigateTo(item, [
      { id: locations.work.id, name: "Work", location: locations.work },
      { id: item.id, name: item.name, location: item },
    ]);

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder")
      return navigateTo(item, [
        ...path,
        { id: item.id, name: item.name, location: item },
      ]);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "blank");
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  useGSAP(() => {
    if (!activeLocation) return;
    const items = contentRef.current?.querySelectorAll("li");
    if (!items?.length) return;

    const draggables = Draggable.create(items, {
      bounds: contentRef.current,
      onPress: function () {
        window.dispatchEvent(new Event("item-drag-start"));
      },
      onRelease: function () {
        window.dispatchEvent(new Event("item-drag-end"));
      },
      onClick: function () {
        const id = Number(this.target.dataset.id);
        const item = activeLocation.children.find((c) => c.id === id);
        if (item) openItem(item);
      },
    });

    return () => draggables.forEach((d) => d.kill());
  }, [activeLocation]);

  const renderList = (name, items, onClick) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => onClick(item)}
            className={clsx(
              item.id === activeLocation?.id ? "active" : "not-active",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="toolbar">
        <div className="nav-buttons">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            aria-label="Back"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            aria-label="Forward"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="breadcrumb">
          {path.map((seg, i) => (
            <span key={seg.id ?? i} className="breadcrumb-item">
              {i > 0 && <ChevronRight className="chevron" />}
              <button
                onClick={() => navigateTo(seg.location, path.slice(0, i + 1))}
                className={clsx(i === path.length - 1 && "current")}
              >
                {seg.name}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favourites", Object.values(locations), openFavourite)}
          {renderList("Work", locations.work.children, openWorkChild)}
        </div>
        <ul className="content" ref={contentRef}>
          {activeLocation?.children.map((item) => (
            <li key={item.id} data-id={item.id} className={item.position}>
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
