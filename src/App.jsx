import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Navbar, Welcome, Dock } from "#components";
import { Safari, Terminal, Resume, Finder, Text, Image } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
    </main>
  );
};

export default App;
