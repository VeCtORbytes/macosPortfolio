import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { WindowControls } from "#components";
import { photosLinks, gallery } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";

const Photos = () => {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [activeTab, setActiveTab] = useState("Library");
  const [expandedPerson, setExpandedPerson] = useState(false);

  // Reset expansion state when changing tabs
  useEffect(() => {
    setExpandedPerson(false);
  }, [activeTab]);

  const peoplePhotos = [gallery[0], gallery[1], gallery[4]]; // pic1, pic2, pic5 (containing Sarthak)

  // Dynamic filtering based on active sidebar tab
  const getFilteredPhotos = () => {
    switch (activeTab) {
      case "Memories":
        return [gallery[0], gallery[2], gallery[4]]; // pic1, pic3, pic5
      case "People":
        return peoplePhotos;
      case "Favorites":
        return [gallery[2], gallery[3], gallery[5]]; // pic3, pic4, pic6
      case "Library":
      default:
        return gallery; // All photos
    }
  };

  const filteredPhotos = getFilteredPhotos();

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Photos</h2>
      </div>

      <div className="flex h-[450px]">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map((link) => (
              <li
                key={link.id}
                onClick={() => setActiveTab(link.title)}
                className={link.title === activeTab ? "active" : ""}
              >
                <img src={link.icon} alt={link.title} />
                <p>{link.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery flex-1 overflow-y-auto">
          {activeTab === "People" && !expandedPerson ? (
            // Sarthak's stacked photo card (collapsed view)
            <div className="w-full flex items-center justify-center pt-10">
              <div
                className="flex flex-col items-center gap-4 cursor-pointer select-none group"
                onClick={() => setExpandedPerson(true)}
              >
                <div className="relative w-36 h-36">
                  {/* Back Stack */}
                  <img
                    src={gallery[4].img}
                    alt="Back Stack"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-sm border border-white/20 transform -rotate-12 -translate-x-4 scale-95 opacity-60 transition-transform duration-300 group-hover:-rotate-18 group-hover:-translate-x-6"
                  />
                  {/* Middle Stack */}
                  <img
                    src={gallery[1].img}
                    alt="Middle Stack"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-sm border border-white/20 transform rotate-12 translate-x-4 scale-95 opacity-80 transition-transform duration-300 group-hover:rotate-18 group-hover:translate-x-6"
                  />
                  {/* Front Photo */}
                  <img
                    src={gallery[0].img}
                    alt="Sarthak"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white z-10 transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm text-gray-800">Sarthak</p>
                  <span className="text-xs text-gray-400 font-medium">3 Photos</span>
                </div>
              </div>
            </div>
          ) : (
            // Normal gallery grid view (either Library, Memories, Favorites or Expanded People)
            <div className="w-full flex flex-col gap-4">
              {activeTab === "People" && expandedPerson && (
                <button
                  onClick={() => setExpandedPerson(false)}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer self-start select-none"
                >
                  <ChevronLeft className="size-4" /> People
                </button>
              )}
              <ul>
                {filteredPhotos.map((item) => {
                  const globalIndex = gallery.findIndex((g) => g.id === item.id);
                  const ext = item.img.split(".").pop().toLowerCase();

                  return (
                    <li
                      key={item.id}
                      onClick={() =>
                        openWindow("imgfile", {
                          name: `pic${globalIndex + 1}.${ext}`,
                          imageUrl: item.img,
                        })
                      }
                    >
                      <img src={item.img} alt={`pic${globalIndex + 1}`} />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
