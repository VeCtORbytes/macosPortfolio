import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";

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
} from "lucide-react";

const Safari = () => {
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
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
