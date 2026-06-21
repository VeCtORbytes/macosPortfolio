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
          <img
            src={data.image}
            alt={data.name}
            className="w-16 h-16 rounded-full object-cover border border-gray-200/50 mb-3"
          />
        )}
        {data.subtitle && (
          <h3 className="text-sm font-semibold text-gray-500 mb-2 leading-relaxed">
            {data.subtitle}
          </h3>
        )}
        {data.description &&
          data.description.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed text-gray-600">
              {paragraph}
            </p>
          ))}

        {data.caseStudy && (
          <div className="case-study">
            <div className="case-block">
              <h4>The Problem</h4>
              <p>{data.caseStudy.problem}</p>
            </div>

            <div className="case-block">
              <h4>The Approach</h4>
              <ul>
                {data.caseStudy.approach.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="case-block result">
              <h4>The Result</h4>
              <p>{data.caseStudy.result}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
