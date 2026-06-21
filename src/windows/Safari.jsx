import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import useSystemStore from "#store/system";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Share,
  ShieldHalf,
  Search,
  Plus,
  MoveRight,
  WifiOff,
} from "lucide-react";

const Safari = () => {
  const { isWifiOn, toggleWifi } = useSystemStore();

  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="search">
            <ShieldHalf className="icon" />

            <Search className="icon" />

            <input type="text" readOnly value="https://sarthak.dev/blog" />
          </div>
        </div>

        <div className="flex items-center gap-5 mr-4">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      {!isWifiOn ? (
        <div className="flex flex-col items-center justify-center py-20 px-10 text-center select-none">
          <WifiOff className="size-16 text-gray-300 dark:text-gray-600 mb-4 animate-pulse" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">You are offline</h2>
          <p className="text-xs text-gray-500 dark:text-gray-450 max-w-sm mb-6 leading-relaxed">
            Safari cannot open the page because your computer is not connected to the internet. Turn on Wi-Fi in the menu bar to connect.
          </p>
          <button
            onClick={toggleWifi}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150 cursor-pointer"
          >
            Connect Wi-Fi
          </button>
        </div>
      ) : (
        <div className="blog">
          <div className="blog-heading">
            <p>Developer Articles</p>
            <h2>Sarthak Blog</h2>
          </div>

          <div className="space-y-8">
            {blogPosts.map(({ id, image, title, date, link, company }) => (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-post"
              >
                <div className="image-container">
                  <img src={image} alt={title} />
                </div>

                <div className="content">
                  <p>
                    {date} • Published at {company}
                  </p>
                  <h3>{title}</h3>

                  <span className="read-more">
                    Read Article
                    <MoveRight className="icon-hover" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
