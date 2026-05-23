import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingSocial from "../components/FloatingSocial.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import { profile, services, educationHighlights } from "./pageContent.js";
import { useReveal } from "./useReveal.js";

const diagnosticTags = ["USG", "XRAY", "CT", "MRI", "Mammography", "Emergency", "Teleradiology", "Radiosurgery"];

export default function Services() {
  useReveal();

  const diagnostic = services.filter((s) => s.category === "diagnostic");
  const education = services.filter((s) => s.category === "education");
  const oncology = services.filter((s) => s.category === "oncology");
  const research = services.filter((s) => s.category === "research");

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <div className="noise-bg"></div>
      <FloatingSocial />
      <Navbar />

      <main className="flex-grow pt-32 md:pt-40 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">

        {/* Header */}
        <header className="mb-20 md:mb-32 relative reveal-item">
          <h1 className="font-display-lg text-display-sm md:text-[72px] md:leading-[80px] leading-tight">
            What I <br className="md:hidden" />
            <span className="text-gradient-gold relative inline-block">
              Offer
              <svg className="absolute w-full h-4 -bottom-2 left-0 text-primary opacity-60" preserveAspectRatio="none" viewBox="0 0 100 10">
                <path d="M0 5 Q 50 10 100 2" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              </svg>
            </span>
          </h1>
          <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant mt-6 max-w-2xl">
            Precision diagnostics, teleradiology, second-opinion review, emergency reporting, radiosurgery support, medical education, FMGE coaching, and research collaboration.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-primary/30 bg-surface-container-low/60 backdrop-blur-xl font-mono-technical text-mono-technical text-primary">
            <span className="material-symbols-outlined text-[18px]">payments</span>
            Consultation fee: {profile.consultationFee}
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary-container/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </header>

        {/* ── Diagnostic Radiology Bento ── */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-8 reveal-item">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Diagnostic Radiology</span>
            <div className="flex-1 h-px bg-primary/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-auto md:auto-rows-[260px]">
            {/* Hero card */}
            <div className="md:col-span-8 md:row-span-2 glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden group flex flex-col justify-end min-h-[420px] reveal-item">
              <div className="scan-line"></div>
              <div
                className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity transition-opacity duration-500 group-hover:opacity-40 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBP4HOeAisnrNIkYjow9JbG3yben16KwwxEgW5t8YOmWkDQJxDtlW3Xp9dNtbC7945L851NUOkHRfa5xcJlLUkfxu-48HcF8jzL71zp0_iEQOPTvuv76C4KTvKKciSOnVNJIaImZm1vHOzv6YMRH0rvlSIbHotJbzmOhI9V_RHyn91Qv-N3R9T6aDlwfDB7dU0R4K3pwkTCkyfRJ-WQERc_XotRGRO0bEk7oeYaXHvgvqvIr2oiex9zS30do9z7tL1n0qO_HrsJMls')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
              <div className="relative z-20">
                <span className="material-symbols-outlined text-primary mb-4 icon-glow-gold text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  radiology
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">Diagnostic Radiology</h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-6">
                  Expert reporting across X-Ray, CT, MRI, Ultrasound, Mammography, emergency imaging, night reporting, and second-opinion cases. Precision diagnostics for patients, clinicians, and institutions.
                </p>
                <div className="flex flex-wrap gap-2">
                  {diagnosticTags.map((tag) => (
                    <span className="px-3 py-1 rounded-full border border-primary/20 bg-surface/50 backdrop-blur-md font-label-caps text-label-caps text-on-surface-variant" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Smaller diagnostic cards */}
            {diagnostic.slice(1, 5).map((service, index) => (
              <div
                className={`${index < 2 ? "md:col-span-4" : index === 2 ? "md:col-span-5" : "md:col-span-3"} glass-panel rounded-2xl p-8 relative flex flex-col justify-between group overflow-hidden reveal-item hover:-translate-y-2 transition-all duration-500`}
                key={service.title}
                style={{ transitionDelay: `${(index + 1) * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] transition-all duration-500 group-hover:bg-primary/10"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <span className={`material-symbols-outlined ${index % 2 === 0 ? "text-tertiary-fixed-dim icon-glow-blue" : "text-primary icon-glow-gold"} text-[40px]`}>
                    {service.icon}
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    arrow_forward
                  </span>
                </div>
                <div className="relative z-10 mt-8">
                  <h3 className="font-headline-lg text-[20px] font-semibold mb-2">{service.title}</h3>
                  <p className="font-body-md text-mono-technical text-on-surface-variant">{service.description}</p>
                </div>
              </div>
            ))}

            {/* Remaining diagnostic cards */}
            {diagnostic.slice(5).map((service, index) => (
              <div
                className="md:col-span-4 glass-panel rounded-2xl p-8 relative flex flex-col justify-between group overflow-hidden reveal-item hover:-translate-y-2 transition-all duration-500"
                key={service.title}
                style={{ transitionDelay: `${(index + 5) * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] transition-all duration-500 group-hover:bg-primary/10"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <span className={`material-symbols-outlined ${index % 2 === 0 ? "text-primary icon-glow-gold" : "text-tertiary-fixed-dim icon-glow-blue"} text-[40px]`}>
                    {service.icon}
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    arrow_forward
                  </span>
                </div>
                <div className="relative z-10 mt-8">
                  <h3 className="font-headline-lg text-[20px] font-semibold mb-2">{service.title}</h3>
                  <p className="font-body-md text-mono-technical text-on-surface-variant">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education & Research ── */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-8 reveal-item">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Education & Research</span>
            <div className="flex-1 h-px bg-primary/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Education highlights */}
            <div className="glass-panel rounded-2xl p-8 md:p-10 relative overflow-hidden group reveal-item hover:-translate-y-2 transition-all duration-500">
              <div className="scan-line"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-tertiary/5 rounded-full blur-[60px] transition-all duration-500 group-hover:bg-tertiary/10"></div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-tertiary-fixed-dim icon-glow-blue text-[48px] mb-4">school</span>
                <h3 className="font-headline-lg text-headline-lg mb-3">Medical Education</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Institutional curriculum design and specialized guest lectures for postgraduate radiology programs worldwide. Visiting faculty across Kyrgyzstan, Uzbekistan, Kazakhstan, and Russia.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {educationHighlights.map((item) => (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-surface-container-low/60 border border-primary/10" key={item.title}>
                      <span className={`material-symbols-outlined text-[18px] mt-0.5 ${item.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-label-caps text-label-caps text-on-surface text-[10px]">{item.title}</p>
                        <p className="font-mono-technical text-mono-technical text-on-surface-variant text-[11px] leading-tight mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-rows-2 gap-gutter">
              {/* FMGE */}
              <div className="glass-panel rounded-2xl p-8 relative flex flex-col justify-between group overflow-hidden reveal-item hover:-translate-y-2 transition-all duration-500">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-full blur-[40px] transition-all duration-500 group-hover:bg-secondary-container/10"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <span className="material-symbols-outlined text-secondary icon-glow-blue text-[40px]">menu_book</span>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    arrow_forward
                  </span>
                </div>
                <div className="relative z-10 mt-4">
                  <h3 className="font-headline-lg text-[20px] font-semibold mb-2">FMGE Coaching</h3>
                  <p className="font-body-md text-mono-technical text-on-surface-variant">{education[1]?.description}</p>
                </div>
              </div>

              {/* Research */}
              <div className="glass-panel rounded-2xl p-8 relative flex flex-col justify-between group overflow-hidden reveal-item hover:-translate-y-2 transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface to-surface-container-high opacity-50 z-0"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <span className="material-symbols-outlined text-primary icon-glow-gold text-[40px]">biotech</span>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    arrow_forward
                  </span>
                </div>
                <div className="relative z-10 mt-4">
                  <h3 className="font-headline-lg text-[20px] font-semibold mb-2">Research Partnership</h3>
                  <p className="font-body-md text-mono-technical text-on-surface-variant">{research[0]?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Oncology & Radiosurgery ── */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-8 reveal-item">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Oncology & Radiosurgery</span>
            <div className="flex-1 h-px bg-primary/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="glass-panel rounded-2xl p-8 md:p-10 relative flex flex-col justify-between group overflow-hidden reveal-item hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface to-surface-container-high opacity-50 z-0"></div>
              <div className="relative z-10 flex justify-between items-start">
                <span className="material-symbols-outlined text-primary icon-glow-gold text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  coronavirus
                </span>
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="font-headline-lg text-headline-lg mb-3">Clinical Oncology</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{oncology[0]?.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Staging", "Treatment Monitoring", "PET-CT", "Oncological Imaging"].map((tag) => (
                    <span className="px-3 py-1 rounded-full border border-primary/20 bg-surface/50 backdrop-blur-md font-label-caps text-label-caps text-on-surface-variant text-[10px]" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-8 md:p-10 relative flex flex-col justify-between group overflow-hidden reveal-item hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface to-surface-container-high opacity-50 z-0"></div>
              <div className="relative z-10 flex justify-between items-start">
                <span className="material-symbols-outlined text-tertiary-fixed-dim icon-glow-blue text-[48px]">precision_manufacturing</span>
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="font-headline-lg text-headline-lg mb-3">Stereotactic Radiosurgery</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Sub-millimeter precision imaging for radiosurgery guidance. Fellowship-trained in Canada with expertise in advanced neuro-oncological and stereotactic procedures.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Neuro-Oncology", "Sub-mm Precision", "SRS Planning", "Canada Fellowship"].map((tag) => (
                    <span className="px-3 py-1 rounded-full border border-tertiary/20 bg-surface/50 backdrop-blur-md font-label-caps text-label-caps text-on-surface-variant text-[10px]" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── CTA Banner ── */}
      <section className="w-full relative mt-8 overflow-hidden border-t border-primary/10 reveal-item">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-highest to-surface-container-lowest z-0"></div>
        <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32 flex flex-col items-center text-center">
          <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg max-w-3xl mb-6">
            Ready to work with a <span className="text-primary">Gold Medalist</span> Radiologist?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
            Book a consultation for {profile.consultationFee} or start an institutional teleradiology conversation.
          </p>
          <Link
            className="bg-primary text-on-primary font-mono-technical text-body-md px-10 py-5 rounded-full hover:bg-primary-fixed hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(212,168,67,0.2)] hover:shadow-[0_0_50px_rgba(212,168,67,0.4)] flex items-center gap-3 group magnetic-btn"
            to="/book-consultation"
          >
            Initiate Consultation
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2">arrow_forward</span>
          </Link>
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </div>
  );
}
