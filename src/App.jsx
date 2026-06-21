import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
  Photos,
} from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Home />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
    </main>
  );
};

export default App;
