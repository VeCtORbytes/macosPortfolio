import { useRef } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";

const ImageFile = () => {
  const data = useWindowStore((s) => s.windows.imgfile.data);
  const containerRef = useRef(null);

  if (!data) return null;

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const windowEl = containerRef.current?.closest(".window");
    if (!windowEl) return;

    // Constrain the image preview window to a max dimension of 520px
    const maxDimension = 520;
    let width = naturalWidth;
    let height = naturalHeight;

    if (width > maxDimension || height > maxDimension) {
      const ratio = width / height;
      if (width > height) {
        width = maxDimension;
        height = maxDimension / ratio;
      } else {
        height = maxDimension;
        width = maxDimension * ratio;
      }
    }

    // Round the values to prevent subpixel layout issues
    width = Math.round(width);
    height = Math.round(height);

    // Apply smooth transition animations for resizing
    windowEl.style.transition = "width 0.25s cubic-bezier(0.25, 1, 0.5, 1)";
    windowEl.style.width = `${width}px`;

    const previewEl = containerRef.current.querySelector(".preview");
    if (previewEl) {
      previewEl.style.transition = "height 0.25s cubic-bezier(0.25, 1, 0.5, 1)";
      previewEl.style.height = `${height}px`;
    }
  };

  return (
    <div ref={containerRef}>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{data.name}</p>
      </div>

      <div className="preview" style={{ height: "auto" }}>
        <img
          src={data.imageUrl}
          alt={data.name}
          onLoad={handleImageLoad}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

const ImageWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageWindow;
