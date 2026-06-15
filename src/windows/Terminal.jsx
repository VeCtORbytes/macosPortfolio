import WindowControls from "#components/WindowControls";
import { techStack } from "#constants";
import WindowWrapper from "#hoc/windowWrapper";
import { Check, Flag } from "lucide-react";

const TechStackItem = ({ category, items }) => (
  <li className="flex items-center">
    <Check className="check" size={20} />
    <h3>{category}</h3>
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          {item}
          {i < items.length - 1 ? "," : ""}
        </li>
      ))}
    </ul>
  </li>
);

const Terminal = () => (
  <>
    <div id="window-header">
      <WindowControls target="terminal" />
      <h2>sarthak@portfolio ~ tech-stack</h2>
    </div>

    <div className="techstack">
      <p>
        <span className="font-bold">sarthak@portfolio:~$</span> cat
        ./tech-stack.json
      </p>

      <div className="label">
        <p className="w-32">Category</p>
        <p>Technologies</p>
      </div>

      <ul className="content">
        {techStack.map((entry) => (
          <TechStackItem key={entry.category} {...entry} />
        ))}
      </ul>

      <div className="footnote">
        <p>
          <Check size={20} />
          {techStack.length}/{techStack.length} categories resolved — exit code
          0
        </p>
        <p className="text-black">
          <Flag size={15} fill="black" /> process finished in 6ms
        </p>
      </div>
    </div>
  </>
);

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
