# macOS Desktop Portfolio Simulator 🖥️🍏

Welcome to my portfolio! This project is an interactive, fully responsive **macOS Desktop Simulator** built using **React 19**, **Vite**, **Tailwind CSS v4**, and **GSAP**. It recreates a realistic desktop environment to showcase my software projects, professional experiences, and skills.

---

## 🚀 Live Demo
Check out the live deployment here: **[https://resume-screener-cyan-xi.vercel.app/](https://resume-screener-cyan-xi.vercel.app/)** *(Update this link to your actual hosted URL!)*

---

## ✨ Key Features

### 📂 Interactive Desktop Environment
- **Draggable Windows**: Drag, minimize, maximize, and stack desktop windows powered by **GSAP Draggable** with strict boundary constraints.
- **Dynamic Z-Index Indexing**: Clicking on any window automatically brings it to the front, tracking active window focus.
- **Finder Navigation**: A custom file browser with directory routing, breadcrumbs, search filtering, and history navigation (Back/Forward).

### 🔍 Spotlight Search (`Cmd/Ctrl + K`)
- Activate the macOS Spotlight search bar globally with `Cmd + K` (Mac) or `Ctrl + K` (Windows/Linux) to search across projects, documents, links, and contact tools.

### 📄 Premium File Reader (`README.txt` Viewer)
- Monospace document pill banners displaying document types.
- High-contrast introduction cards and dynamic text parser that formats bold (`**`) highlights.
- Structured **Case Studies** for each software project showing **Problem** ➔ **Approach** ➔ **Result** layouts.

### 🦖 In-Window Dino Game
- A custom 2D Canvas-based clone of the classic Chrome Dinosaur game, complete with physics jumping, speed increments, collision detection, and high-score persistence via LocalStorage.

### ⚙️ System Controls
- **Control Center & Menu Bar**: Toggle WiFi networks, simulate connecting to public hotspots (e.g., Starbucks Guest), control volume/brightness via slider overlays, and toggle dark/light modes.
- **Dynamic Clock**: Real-time system clock formatted using Day.js.

### 📱 Responsive Device Gating
- Serves the full macOS workspace to desktop screens ($\ge$ 768px).
- Automatically serves mobile viewports with a beautiful, professional single-card SaaS-themed landing page directing users to a larger screen while offering fast social connect options.

---

## 🛠️ Tech Stack & Libraries

- **Frontend Core**: React 19.2.0, Vite 7.2.4
- **Styling**: Tailwind CSS v4.1.18, Vanilla CSS, Lucide React (Icons)
- **State Management**: Zustand 5.0.14 (Handles windows, system settings, path history, and search)
- **Animations**: GSAP (GreenSock Animation Platform) 3.14.2 & `@gsap/react`
- **Utilities**: Day.js (System clock), React PDF 10.4.1 (Resume rendering), Clsx (Conditional class names)

---

## 📂 Project Structure

```bash
src/
├── components/          # Reusable UI widgets (Navbar, Dock, Spotlight, Welcome)
├── constants/           # Project specs, system configurations, and folder trees
├── hoc/                 # High Order Components (windowWrapper for window features)
├── store/               # Zustand state stores (location, system, window, spotlight)
├── windows/             # Simulated apps (Finder, Safari, Terminal, Resume, Photos, Dino, Text)
├── App.jsx              # App entry point (Conditional desktop/mobile rendering)
├── index.css            # Global CSS styles and Tailwind overrides
└── main.jsx             # React DOM mounting
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/VeCtORbytes/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. Run code linter:
   ```bash
   npm run lint
   ```

5. Build for production:
   ```bash
   npm run build
   ```
   The compiled assets will be built inside the `/dist` directory.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
