import { useRef } from "react";
import clsx from "clsx";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { locations } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

const desktopItems = [
  {
    id: "about",
    name: "About Me",
    icon: "/images/folder.png",
    position: "top-10 left-10",
    action: "finder-about",
  },
  {
    id: "hirelens",
    name: "HireLens",
    icon: "/images/folder.png",
    position: "top-44 left-10",
    action: "project",
    projectId: 5,
  },
  {
    id: "leetcrack",
    name: "LeetCrack",
    icon: "/images/folder.png",
    position: "top-[312px] left-10",
    action: "project",
    projectId: 6,
  },
  {
    id: "stockflow",
    name: "StockFlow",
    icon: "/images/folder.png",
    position: "top-[448px] left-10",
    action: "project",
    projectId: 7,
  },
  {
    id: "resume",
    name: "Resume.pdf",
    icon: "/images/pdf.png",
    position: "top-10 right-10",
    action: "resume",
  },
  {
    id: "contact",
    name: "Contact",
    icon: "/images/contact.png",
    position: "top-44 right-10",
    action: "contact",
  },
];

const Home = () => {
  const { openWindow } = useWindowStore();
  const { navigateTo } = useLocationStore();
  const lastClickRef = useRef({ id: null, time: 0 });
  const containerRef = useRef(null);

  const handleOpen = (item) => {
    if (item.action === "finder-about") {
      navigateTo(locations.about, [
        {
          id: locations.about.id,
          name: locations.about.name,
          location: locations.about,
        },
      ]);
      openWindow("finder");
    } else if (item.action === "project") {
      const project = locations.work.children.find(
        (c) => c.id === item.projectId,
      );
      if (project) {
        navigateTo(project, [
          { id: locations.work.id, name: "Work", location: locations.work },
          { id: project.id, name: project.name, location: project },
        ]);
        openWindow("finder");
      }
    } else if (item.action === "resume") {
      openWindow("resume");
    } else if (item.action === "contact") {
      openWindow("contact");
    }
  };

  const handleClick = (item) => {
    const now = Date.now();
    const isDouble =
      lastClickRef.current.id === item.id &&
      now - lastClickRef.current.time < 400;
    lastClickRef.current = { id: item.id, time: now };
    if (isDouble) handleOpen(item);
  };

  useGSAP(() => {
    const items = containerRef.current?.querySelectorAll("li");
    if (!items?.length) return;

    const draggables = Draggable.create(items, {
      bounds: "main",
      onClick: function () {
        const id = this.target.closest("li").dataset.id;
        const item = desktopItems.find((d) => d.id === id);
        if (item) handleClick(item);
      },
    });

    return () => draggables.forEach((d) => d.kill());
  }, []);

  return (
    <section id="home" ref={containerRef}>
      <ul>
        {desktopItems.map((item) => (
          <li
            key={item.id}
            data-id={item.id}
            className={clsx(item.position, "group")}
          >
            <img src={item.icon} alt={item.name} className="size-14" />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
