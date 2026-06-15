import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const windowState = useWindowStore((s) => s.windows[target]);

  const isMaximized = windowState?.isMaximized;

  return (
    <div id="window-controls">
      <button onClick={() => closeWindow(target)} className="close" aria-label="Close" />
      <button onClick={() => minimizeWindow(target)} className="minimize" aria-label="Minimize" />
      <button
        onClick={() => (isMaximized ? restoreWindow(target) : maximizeWindow(target))}
        className="maximize"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      />
    </div>
  );
};

export default WindowControls;
