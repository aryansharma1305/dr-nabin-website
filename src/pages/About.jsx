import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import FloatingSocial from "../components/FloatingSocial.jsx";
import Footer from "../components/Footer.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import { profile, educationHighlights, awards } from "./pageContent.js";
import { getGalleryItems } from "../api/gallery-items.js";
import { useReveal } from "./useReveal.js";
import drNabinPhoto from "../assets/dr-nabin.jpeg";

const timeline = [
  {
    label: "Foundation",
    title: "MBBS",
    detail: "Medical foundation that shaped a global clinical perspective. Trained across international institutions.",
    icon: "school",
  },
  {
    label: "Radiodiagnosis",
    title: "DMRD",
    detail: "Diploma in Medical Radio Diagnosis — Katihar Medical College. Specializing in the intricate world of diagnostic imaging.",
    icon: "radiology",
  },
  {
    label: "Oncology",
    title: "Clinical Oncology Fellowship",
    detail: "Apollo Hospital in collaboration with Medversity. Advanced training in oncological imaging and treatment monitoring.",
    icon: "coronavirus",
  },
  {
    label: "Radiosurgery",
    title: "Stereotactic Radiosurgery Fellowship",
    detail: "Advanced fellowship training in Canada. Sub-millimeter precision imaging for neuro-oncological procedures.",
    icon: "precision_manufacturing",
  },
];

const countries = [
  { name: "India", flag: "🇮🇳" },
  { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Canada", flag: "🇨🇦" },
];

// Bio broken into scannable blocks — each has a label + short paragraph
const bioBlocks = [
  {
    label: "Who He Is",
    icon: "person",
    text: "Dr. Nabin Kumar Yadav is a dedicated radiologist, academic leader, and medical educator with a deep commitment to patient care, medical research, and academic excellence. He currently serves as the Academic Director of Medicine at Daaru Salaam University and works as an attending radiologist at EMHRC.",
  },
  {
    label: "Clinical Expertise",
    icon: "radiology",
    text: "With extensive experience in radiology and clinical medicine, Dr. Yadav earned his MBBS and Diploma in Medical Radio Diagnosis (DMRD), then advanced his expertise through a Fellowship in Clinical Oncology from Apollo Hospital in collaboration with Medversity, and a Fellowship in Stereotactic Radiosurgery in Canada.",
  },
  {
    label: "Research & Publications",
    icon: "biotech",
    text: "Dr. Yadav has actively contributed to numerous research projects and scientific publications in oncology, diagnostic imaging, and radiology — all focused on improving patient outcomes through precise diagnosis, advanced imaging technologies, and evidence-based practice.",
  },
  {
    label: "Global Educator",
    icon: "public",
    text: "Widely recognized as an accomplished medical educator, Dr. Yadav has served as visiting faculty at universities across Kyrgyzstan, Uzbekistan, Kazakhstan, and Russia, including Jalal-Abad State University. He is also a respected FMGE faculty member for Radiology and OBG at Docversity India.",
  },
  {
    label: "Gold Medalist",
    icon: "workspace_premium",
    text: "In recognition of his outstanding contributions to radiology and medical education, Dr. Yadav was honored with a Gold Medal by Central Christian University. Driven by compassion, innovation, and professional excellence, he continues to inspire future healthcare professionals worldwide.",
  },
];

export default function About() {
  useReveal();
  const [uploadedItems, setUploadedItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getGalleryItems()
      .then((items) => {
        if (isMounted) setUploadedItems(items);
      })
      .catch(() => {
        if (isMounted) setUploadedItems([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const recognitionMedia = uploadedItems
    .filter((item) => ["Certificate", "Award", "Achievement"].includes(item.category))
    .slice(0, 6);

  return (
    <div className="bg-background text-on-background antialiased selection:bg-primary selection:text-on-primary overflow-x-hidden">
      <div className="noise-overlay"></div>
      <FloatingSocial />
      <Navbar />

      <main className="pt-24 md:pt-0 md:pl-32">

        {/* ── Hero ── */}
        <section className="flex flex-col md:flex-row items-stretch px-margin-mobile md:px-margin-desktop gap-12 pt-16 md:pt-24 pb-section-gap relative overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

          {/* ── Portrait card — tall rectangle, full face visible ── */}
          <div className="w-full md:w-[38%] lg:w-[32%] flex-shrink-0 reveal">
            <div className="relative w-full max-w-sm mx-auto md:mx-0">
              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-surface-container shadow-[0_0_60px_rgba(212,168,67,0.08)] group">
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 pointer-events-none"></div>

                <img
                  alt="Dr. Nabin Kumar Yadav"
                  className="w-full object-cover object-top transition-all duration-700 group-hover:scale-[1.02]"
                  src={drNabinPhoto}
                  style={{ aspectRatio: "3/4", objectPosition: "top center" }}
                />

                {/* Gold Medalist chip — bottom of card */}
                <div className="absolute bottom-5 left-5 right-5 z-20 glass-panel rounded-xl px-5 py-3 flex items-center gap-3 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-primary leading-none">Gold Medalist</p>
                    <p className="font-mono-technical text-mono-technical text-on-surface-variant text-[11px] mt-0.5">Central Christian University</p>
                  </div>
                </div>
              </div>

              {/* Decorative corner lines — like the mockup */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-primary/40 rounded-tr-xl pointer-events-none"></div>
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-primary/40 rounded-bl-xl pointer-events-none"></div>
            </div>
          </div>

          {/* ── Text column ── */}
          <div className="flex-1 flex flex-col justify-center reveal">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-5 block">The Genesis</span>
            <h1 className="font-display-sm text-[2.8rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] text-on-surface mb-6 font-bold">
              Precision <br />
              <span className="text-on-surface-variant italic font-light">meets</span> Empathy.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">
              Radiologist. Academic Director. Gold Medalist. Dr. Nabin Kumar Yadav bridges the gap between raw technological capability and profound human care across six countries.
            </p>

            {/* Credential pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["MBBS", "DMRD", "Fellowship Oncology", "Stereotactic Radiosurgery", "Gold Medalist"].map((item) => (
                <span
                  className="px-4 py-2 rounded-full border border-primary/20 bg-surface-container-low/60 backdrop-blur-xl font-mono-technical text-mono-technical text-on-surface-variant text-[12px]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Current roles */}
            <div className="flex flex-col gap-3 mb-10">
              {profile.currentRoles.map((role) => (
                <div className="flex items-center gap-3" key={role}>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_6px_#D4A843] flex-shrink-0"></span>
                  <span className="font-mono-technical text-mono-technical text-on-surface-variant">{role}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-full flex items-center gap-2 magnetic-btn hover:shadow-[0_0_30px_rgba(212,168,67,0.5)] transition-all"
                to="/book-consultation"
              >
                Book Consultation
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                className="glass-panel text-on-surface font-label-caps text-label-caps px-8 py-4 rounded-full flex items-center gap-2 hover:bg-surface-variant/50 transition-all magnetic-btn"
                to="/publications"
              >
                View Research
                <span className="material-symbols-outlined text-sm">biotech</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Bio — scannable blocks ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap bg-surface-container-low/30 border-y border-primary/10 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal">
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-3">Background</span>
              <h2 className="font-display-sm text-display-sm text-on-surface">The Full Story</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {bioBlocks.map((block, index) => (
                <div
                  className={`reveal bg-surface-container-low/50 backdrop-blur-md border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group ${
                    index === bioBlocks.length - 1 && bioBlocks.length % 2 !== 0 ? "md:col-span-2 md:max-w-2xl md:mx-auto w-full" : ""
                  }`}
                  key={block.label}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {block.icon}
                      </span>
                    </div>
                    <h3 className="font-label-caps text-label-caps text-primary tracking-widest uppercase">{block.label}</h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{block.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Education Highlights ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap relative">
          <div className="text-center mb-16 reveal">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-4">Academic Excellence</span>
            <h2 className="font-display-sm text-display-sm text-on-surface">Teaching & Leadership</h2>
            <div className="w-12 h-px bg-primary mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-6xl mx-auto">
            {educationHighlights.map((item, index) => (
              <div
                className="bg-surface-container-low/50 backdrop-blur-md border border-primary/20 rounded-xl p-8 flex flex-col items-center text-center gap-4 reveal hover:border-primary/60 hover:-translate-y-2 transition-all duration-300"
                key={item.title}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className={`material-symbols-outlined text-[28px] ${item.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface mb-1">{item.title}</h3>
                  <p className="font-mono-technical text-mono-technical text-on-surface-variant text-[12px] leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="timeline-container px-margin-mobile md:px-margin-desktop py-section-gap relative bg-surface-container-low/20 border-y border-primary/10">
          <div className="text-center mb-24 reveal">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-4">Career Path</span>
            <h2 className="font-display-sm text-display-sm text-on-surface">Trajectory</h2>
            <div className="w-12 h-[1px] bg-primary mx-auto mt-6"></div>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-surface-container-high -translate-x-1/2"></div>
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/80 to-transparent -translate-x-1/2"></div>
            {timeline.map((item, index) => (
              <div className="flex flex-col md:flex-row items-center justify-between mb-16 relative reveal" key={item.title}>
                <div className={`hidden md:block md:w-[45%] ${index % 2 === 0 ? "text-right pr-12" : "pl-12 order-3"}`}>
                  <div className={`flex items-center gap-2 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                    <span className="font-mono-technical text-mono-technical text-primary">{item.label}</span>
                    <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {item.icon}
                    </span>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 shadow-[0_0_15px_rgba(212,168,67,0.8)] z-10"></div>
                <div className={`w-full pl-12 md:pl-0 md:w-[45%] ${index % 2 === 1 ? "md:pr-12 md:text-right order-2 md:order-1" : ""}`}>
                  <div className="bg-surface/30 backdrop-blur-xl border border-primary/30 p-8 rounded-xl hover:bg-surface-container/60 hover:border-primary/60 transition-all duration-300 group">
                    <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Gold Medal Spotlight ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap relative flex justify-center reveal">
          <div className="absolute inset-0 bg-primary/5 blur-[150px] -z-10 rounded-full w-1/2 h-1/2 m-auto"></div>
          <div className="w-full max-w-3xl shine-sweep bg-surface-container-high/80 backdrop-blur-2xl border border-primary/50 p-12 md:p-16 rounded-2xl text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
              <span className="material-symbols-outlined text-display-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                workspace_premium
              </span>
            </div>
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Pinnacle of Achievement</span>
            <h2 className="font-display-sm text-display-sm text-on-surface mb-6">Gold Medalist</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Honored by Central Christian University for outstanding contributions to radiology and medical education. A testament to a standard of care that accepts no compromises.
            </p>
          </div>
        </section>

        {/* ── Awards & Achievements ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap bg-surface-container-low/20 border-y border-primary/10 relative">
          <div className="text-center mb-16 reveal">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-4">Recognition</span>
            <h2 className="font-display-sm text-display-sm text-on-surface">Awards & Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-6xl mx-auto mb-16">
            {awards.map((award, index) => (
              <div
                className="reveal bg-surface-container-low/50 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 hover:border-primary/60 hover:-translate-y-2 transition-all duration-300"
                key={award.title}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {award.icon}
                  </span>
                </div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">{award.title}</h3>
                <p className="font-mono-technical text-mono-technical text-primary">{award.issuer}</p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">{award.year}</p>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            {recognitionMedia.length > 0 && (
              <>
                <div className="mb-8 reveal">
                  <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Recognition Media</span>
                  <div className="mt-2 h-px bg-primary/10"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-gutter">
                  {recognitionMedia.map((item, index) => (
                    <div
                      className="reveal min-h-[220px] sm:aspect-[4/3] rounded-2xl border border-primary/20 bg-surface-container-low/40 backdrop-blur-xl overflow-hidden hover:border-primary/60 transition-all duration-300 min-w-0"
                      key={item.id}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="relative w-full h-full min-h-[220px]">
                        <img alt={item.title} className="w-full h-full object-cover" src={item.image} />
                        <div className="absolute inset-x-0 bottom-0 bg-background/85 backdrop-blur-md p-4 text-left">
                          <p className="font-label-caps text-label-caps text-primary tracking-widest uppercase">{item.category}</p>
                          <p className="font-body-md text-body-md text-on-surface break-words mt-1">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Global Reach ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap bg-surface-container-lowest border-t border-primary/10 relative">
          <div className="text-center mb-16 reveal">
            <span className="material-symbols-outlined text-primary mb-4 text-4xl block" style={{ fontVariationSettings: "'FILL' 1" }}>
              public
            </span>
            <h2 className="font-display-sm text-display-sm text-on-surface">Global Reach</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4 max-w-xl mx-auto">
              Teaching, practicing, and advancing radiology across six countries.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {countries.map((country, index) => (
              <div
                className="bg-surface-container-low/50 backdrop-blur-md border border-primary/20 rounded-xl p-6 flex flex-col items-center justify-center gap-3 reveal hover:border-primary/60 transition-all duration-300 hover:-translate-y-2"
                key={country.name}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="text-3xl">{country.flag}</span>
                <span className="font-mono-technical text-mono-technical text-on-surface">{country.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-margin-mobile md:px-margin-desktop py-24 relative reveal">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Ready to connect?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Book a consultation, explore research collaborations, or reach out for academic partnerships.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-full flex items-center gap-2 magnetic-btn hover:shadow-[0_0_30px_rgba(212,168,67,0.5)] transition-all"
                to="/book-consultation"
              >
                Book Consultation
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                className="glass-panel text-on-surface font-label-caps text-label-caps px-8 py-4 rounded-full flex items-center gap-2 hover:bg-surface-variant/50 transition-all magnetic-btn"
                to="/contact"
              >
                Get in Touch
                <span className="material-symbols-outlined text-sm">mail</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CustomCursor />
    </div>
  );
}
