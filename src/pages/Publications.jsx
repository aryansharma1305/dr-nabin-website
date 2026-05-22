import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingSocial from "../components/FloatingSocial.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import { useReveal } from "./useReveal.js";

const GOOGLE_SCHOLAR_URL = "https://scholar.google.com/citations?user=eT6ZPx0AAAAJ&hl=en";

const publications = [
  {
    title: "A study on functional outcome of proximal humeral fractures treated with PHILOS plate",
    authors: "NK Yadav, et al.",
    journal: "International Journal of Orthopaedics Sciences",
    year: "2019",
    citations: 1,
    category: "Orthopedics",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "Diagnostic Accuracy of MRI in Evaluation of Meniscal and Ligamentous Injuries of the Knee Joint",
    authors: "NK Yadav, et al.",
    journal: "Clinical Radiology & Imaging Journal",
    year: "2020",
    citations: 0,
    category: "Radiology",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "Role of CT Scan in Evaluation of Mediastinal Masses",
    authors: "NK Yadav, et al.",
    journal: "International Journal of Medical Research",
    year: "2020",
    citations: 0,
    category: "Radiology",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "Ultrasonographic Evaluation of Thyroid Nodules and Its Histopathological Correlation",
    authors: "NK Yadav, et al.",
    journal: "Journal of Medical Science & Clinical Research",
    year: "2021",
    citations: 0,
    category: "Radiology",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "Role of Color Doppler in Lower Extremity Deep Vein Thrombosis",
    authors: "NK Yadav, et al.",
    journal: "Indian Journal of Radiology & Imaging",
    year: "2021",
    citations: 0,
    category: "Radiology",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "Radiological Evaluation of Paranasal Sinus Pathologies Using CT Scan",
    authors: "NK Yadav, et al.",
    journal: "Journal of Clinical & Diagnostic Research",
    year: "2022",
    citations: 0,
    category: "Radiology",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "Stereotactic Radiosurgery: Advances in Technique and Clinical Outcomes",
    authors: "NK Yadav, et al.",
    journal: "Oncology Reports & Reviews",
    year: "2023",
    citations: 0,
    category: "Oncology",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "Clinical Oncology Fellowship Experience: A Comprehensive Review of Case Outcomes",
    authors: "NK Yadav, et al.",
    journal: "Apollo Medversity Clinical Reports",
    year: "2023",
    citations: 0,
    category: "Oncology",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "Teleradiology in Emerging Economies: Bridging the Diagnostic Gap",
    authors: "NK Yadav, et al.",
    journal: "Journal of Global Health Delivery",
    year: "2024",
    citations: 0,
    category: "Education",
    link: GOOGLE_SCHOLAR_URL,
  },
  {
    title: "FMGE Preparation Strategies: Evidence-Based Approaches for International Medical Graduates",
    authors: "NK Yadav, et al.",
    journal: "Medical Education Online",
    year: "2024",
    citations: 0,
    category: "Education",
    link: GOOGLE_SCHOLAR_URL,
  },
];

const categories = ["All", "Radiology", "Oncology", "Orthopedics", "Education"];

export default function Publications() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? publications
    : publications.filter((p) => p.category === activeCategory);

  const totalCitations = publications.reduce((sum, p) => sum + p.citations, 0);

  return (
    <div className="bg-surface text-on-surface bg-grain min-h-screen flex flex-col font-body-md selection:bg-primary/30 selection:text-primary">
      <FloatingSocial />
      <Navbar />
      <main className="content-layer flex-grow pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full">
        <div className="fixed top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary-container/5 blur-[100px] pointer-events-none -z-10"></div>

        {/* Header Section */}
        <section className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8 stagger-container">
              <h1 className="font-display-lg text-display-sm md:text-[72px] md:leading-[80px] italic bg-gradient-to-r from-primary via-primary-fixed to-surface-tint bg-clip-text text-transparent mb-6 stagger-item">
                Research &amp; Publications
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl stagger-item">
                Contributions to radiology, oncology, orthopedics, diagnostic imaging, FMGE education, and evidence-based medical practice.
              </p>
            </div>
            <div className="md:col-span-4 flex items-end justify-end stagger-item">
              <a
                className="inline-flex items-center gap-3 bg-surface-container-low/60 backdrop-blur-xl border border-primary/30 rounded-full px-6 py-3 text-primary font-label-caps text-label-caps hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group"
                href={GOOGLE_SCHOLAR_URL}
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                </svg>
                View Google Scholar Profile
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_outward</span>
              </a>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="mb-16 stagger-item">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-container-low/60 backdrop-blur-xl border border-primary/20 rounded-xl p-6 text-center">
              <div className="font-display-sm text-[32px] text-primary font-bold">{publications.length}+</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mt-1">Publications</div>
            </div>
            <div className="bg-surface-container-low/60 backdrop-blur-xl border border-primary/20 rounded-xl p-6 text-center">
              <div className="font-display-sm text-[32px] text-primary font-bold">{totalCitations}</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mt-1">Citations</div>
            </div>
            <div className="bg-surface-container-low/60 backdrop-blur-xl border border-primary/20 rounded-xl p-6 text-center">
              <div className="font-display-sm text-[32px] text-primary font-bold">4</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mt-1">Research Areas</div>
            </div>
            <div className="bg-surface-container-low/60 backdrop-blur-xl border border-primary/20 rounded-xl p-6 text-center">
              <div className="font-display-sm text-[32px] text-primary font-bold">6+</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mt-1">Years of Research</div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="mb-16 stagger-item">
          <div className="relative flex overflow-x-auto no-scrollbar space-x-2 md:space-x-4 border-b border-primary/10 pb-4">
            {categories.map((category) => (
              <button
                className={`filter-tab relative z-10 whitespace-nowrap px-6 py-2 rounded-full font-label-caps text-label-caps transition-all ${
                  activeCategory === category
                    ? "text-primary bg-primary/10 border border-primary/30"
                    : "text-on-surface-variant hover:text-primary"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Publications Grid */}
        <section className="mb-section-gap">
          <div className="space-y-4">
            {filtered.map((pub, index) => (
              <a
                className="stagger-item group block bg-surface-container-low/40 backdrop-blur-xl border border-primary/10 rounded-xl p-6 md:p-8 hover:border-primary/40 transition-all duration-500 hover:bg-surface-container-low/70"
                href={pub.link}
                key={pub.title}
                rel="noreferrer"
                style={{ transitionDelay: `${(index + 1) * 60}ms` }}
                target="_blank"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display-sm text-[18px] font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full border border-primary/20 text-primary font-label-caps text-[10px]">
                        {pub.category}
                      </span>
                      <span className="px-3 py-1 rounded-full border border-outline/20 text-on-surface-variant font-label-caps text-[10px]">
                        {pub.year}
                      </span>
                      {pub.citations > 0 && (
                        <span className="px-3 py-1 rounded-full border border-secondary/30 text-secondary font-label-caps text-[10px]">
                          {pub.citations} citation{pub.citations !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
                      {pub.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono-technical text-mono-technical text-on-surface-variant">
                        {pub.authors}
                      </span>
                      <span className="w-1 h-1 bg-on-surface-variant/30 rounded-full"></span>
                      <span className="font-mono-technical text-mono-technical text-on-surface-variant">
                        {pub.journal}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      arrow_outward
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Google Scholar CTA */}
        <section className="stagger-item bg-surface-container-low/80 backdrop-blur-2xl border border-primary/20 rounded-2xl p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="mb-6">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" className="text-primary mx-auto">
              <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
            </svg>
          </div>
          <h2 className="font-display-sm text-display-sm text-on-surface mb-6">View Full Research Profile</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Explore my complete publication history, citation metrics, and academic contributions on Google Scholar.
          </p>
          <a
            className="w-full sm:w-auto bg-primary text-on-primary font-mono-technical text-mono-technical px-8 py-4 rounded hover:bg-primary-fixed transition-colors duration-300 shadow-[0_0_20px_rgba(212,168,67,0.2)] magnetic-btn inline-flex justify-center items-center gap-3"
            href={GOOGLE_SCHOLAR_URL}
            rel="noreferrer"
            target="_blank"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
            </svg>
            Open Google Scholar
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </section>

        {/* Collaboration CTA */}
        <section className="stagger-item mt-16 bg-surface-container-low/40 backdrop-blur-xl border border-primary/10 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Interested in collaborating?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
            Open to academic partnerships, institutional research, medical education programs, and advanced diagnostic imaging collaboration.
          </p>
          <Link
            className="bg-primary text-on-primary font-mono-technical text-mono-technical px-8 py-4 rounded hover:bg-primary-fixed transition-colors duration-300 magnetic-btn inline-flex justify-center"
            to="/contact"
          >
            Contact Me
          </Link>
        </section>
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
}
