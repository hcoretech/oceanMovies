
#  OceanMovies 

A production-grade, highly responsive Movie Discovery Dashboard built with **React, TypeScript, Vite, and Tailwind CSS**. This application integrates natively with **The Movie Database (TMDB) API** using an optimized **Axios** client layer and features a persistent, localized storage tracking system.

---

## 🛠️ Tech Stack & Architecture Boundaries

- **Frontend Core**: React 18+ (Functional Components & Hooks)
- **Build Pipeline**: Vite (Case-sensitive module resolutions & lightning-fast HMR)
- **Type Safety Layer**: Strict TypeScript (Explicit boundaries, zero `any` parameters, type-only union operator mappings)
- **Styling Layout Engine**: Tailwind CSS (Utility-first, fluid animations, grid wrappers, native breakpoints)
- **Data Fetch Client**: Axios (Centralized instance mapping, automatic URL param serializations)

---

## 📂 Structural Codebase Blueprint

```text
src/
├── components/
│   ├── data/
│   │   └── staticData.ts         # Centralized filter configuration definitions
│   ├── DiscoverCard.tsx         # API grid item showcasing skeleton layout states
│   ├── Header.tsx               # Responsive search context input sub-bar
│   ├── MovieCarousel.tsx        # Auto-playing hero banner slider with full-bleed layout
│   ├── MovieDetailsModal.tsx    # Scroll-locked single detail overview overlay
│   ├── Sidebar.tsx              # Mobile hidden sliding panel tracking counts
│   └── WelcomeCard.tsx          # Dynamic type-guard card with skeleton pulse metrics
├── services/
│   └── movieApi.ts              # Authenticated Axios fetch instance abstraction layer
├── types/
│   └── index.ts                 # Unified absolute data interfaces contracts
├── App.tsx                      # Primary shell binder orchestration panel
└── main.tsx                     # Strict Mode mounting root element entry point
```

---

## ⚡ Engineering Wins & Optimizations

### 1. Unified Schema Data Transformation
The application implements two separate incoming data models (`TMDBMovie` and `MockMovie`) which are converted dynamically through localized functional mappings into a single `SavedItem` schema representation. This eliminates typings collisions inside the localized disk arrays.

### 2. Native Component Skeleton Pulses
Instead of legacy loading spinners, both grid systems (`WelcomeCard` and `DiscoverCard`) integrate local React boolean states synced to the HTML `onLoad` DOM emitter hook. This triggers a smooth, hardware-accelerated Tailwind `animate-pulse` rectangle placeholder matching the exact frame dimensions until downloading completes.

### 3. Asynchronous Debounced Stream Pipelines
To shield endpoints from network query crashes during user inputs, search state inputs are parsed reactively inside `useEffect` logic containing an integrated 400ms delay timeout wrapper. This mitigates continuous keypress traffic overloads.

### 4. Interactive Recommendation Modals
Clicking any card locks the primary background scrolling axis entirely by updating the document body viewport style attributes. It fires a nested async query to resolve semantic recommendation categories directly beneath the single movie synopsis block.

---

## 🚀 Local Deployment Execution Pipeline

### 1. Sync System Infrastructure Dependencies
Ensure you have Node.js (v18+) installed on your machine. Install project modules cleanly:
```bash
npm install
```

### 2. Initialize Variables Configuration
Create an environment settings configuration file named exactly `.env.local` inside the main root folder segment (next to `package.json`):
```env
TMDB_API_KEY="GET tmdb api key"
```

### 3. Spin Up Development Workspaces
Launch the cached local development build engine instance:
```bash
npm run dev
```

### 4. Production Compilation Diagnostic Sweep
Compile and bundle all structural code modules into an error-free, minimized browser static distribution chunk package:
```bash
npm run build
```
