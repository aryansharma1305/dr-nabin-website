import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Website temporarily suspended. To restore the full website, uncomment the
// BrowserRouter/App imports and render block below, then remove MaintenancePage.
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";

function MaintenancePage() {
  return (
    <main className="min-h-screen bg-background text-on-background antialiased selection:bg-primary selection:text-on-primary overflow-hidden relative">
      <div className="grain-overlay"></div>
      <div className="fixed inset-0 z-0 pointer-events-none aurora-bg opacity-60"></div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <section className="relative z-10 min-h-screen flex items-center justify-center px-margin-mobile md:px-margin-desktop py-20">
        <div className="w-full max-w-3xl text-center glass-panel rounded-2xl border border-primary/30 bg-surface-container-high/75 backdrop-blur-2xl px-8 py-12 md:px-14 md:py-16 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
          <div className="mx-auto mb-8 w-16 h-16 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[34px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              medical_services
            </span>
          </div>
          <p className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4">Temporary Notice</p>
          <h1 className="font-display-sm text-[42px] md:text-[64px] leading-tight text-on-surface mb-6">Website Temporarily Unavailable</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            This website is currently unavailable. Please contact the site owner for further information.
          </p>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MaintenancePage />
  </React.StrictMode>,
);

// Full website render path preserved for quick restoration:
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// );
