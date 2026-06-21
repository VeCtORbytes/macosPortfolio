import { WindowControls } from "#components";
import WindowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";

const ImageFile = () => {
  const data = useWindowStore((s) => s.windows.imgfile.data);

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{data.name}</p>
      </div>

      <div className="preview">
        <img src={data.imageUrl} alt={data.name} />
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageWindow;
