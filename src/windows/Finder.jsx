import { WindowControls } from "#components";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import clsx from "clsx";
import WindowWrapper from "#hoc/windowWrapper.jsx";
import { locations } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import { useRef, useState, useEffect } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery("");
  }, [activeLocation]);

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
      return window.open(item.href, "_blank");
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const filteredChildren = activeLocation?.children?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        const id = Number(this.target.closest("li").dataset.id);
        const item = filteredChildren?.find((c) => c.id === id);
        if (item) openItem(item);
      },
    });

    return () => draggables.forEach((d) => d.kill());
  }, [activeLocation, searchQuery]);

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
        <h2>{activeLocation?.name || "Finder"}</h2>
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

        <div className="flex-1" />

        <div className="flex items-center gap-1.5 bg-black/5 rounded-md px-2.5 py-1 text-xs border border-gray-200/50 mr-2">
          <Search className="size-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-gray-700 w-28 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favourites", Object.values(locations), openFavourite)}
          {renderList("Work", locations.work.children, openWorkChild)}
        </div>
        <ul className="content" ref={contentRef}>
          {filteredChildren?.map((item) => (
            <li key={item.id} data-id={item.id}>
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
