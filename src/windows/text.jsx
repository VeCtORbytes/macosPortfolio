import { WindowControls } from "#components";
import WindowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const data = useWindowStore((s) => s.windows.txtfile.data);

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="p-6 overflow-y-auto max-h-[500px] text-gray-800 space-y-4 font-sans select-text">
        {data.image && (
          <div className="flex justify-center mb-4">
            <img
              src={data.image}
              alt={data.name}
              className="w-24 h-24 rounded-full object-cover shadow-md border border-gray-200"
            />
          </div>
        )}
        {data.subtitle && (
          <h3 className="text-center text-sm font-semibold text-gray-500 mb-2 leading-relaxed">
            {data.subtitle}
          </h3>
        )}
        {data.description &&
          data.description.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed text-gray-600">
              {paragraph}
            </p>
          ))}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
