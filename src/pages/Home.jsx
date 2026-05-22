import { useEffect, useRef, useState } from "react";
import drNabinPhoto from "../assets/dr-nabin.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar.jsx";
import FloatingSocial from "../components/FloatingSocial.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import Footer from "../components/Footer.jsx";
import { services, profile } from "./pageContent.js";

gsap.registerPlugin(ScrollTrigger);

const credentials = ["MBBS", "MD", "DMRD", "Fellowship Oncology", "ABR Certified"];
const phrases = ["Radiologist", "Oncology Fellow", "Stereotactic Radiosurgery Specialist", "Gold Medalist", "Medical Educator"];
const tickerText = "Radiologist • Medical Educator • Gold Medalist • Oncology Fellow • Stereotactic Specialist •";
const stats = [
  { target: 15, label: "Years Experience" },
  { target: 10000, label: "Scans Analyzed" },
  { target: 50, label: "Publications" },
  { target: 3, label: "Gold Medals" },
];

const featuredServices = services.slice(0, 6);

function useTypewriter() {
  const [text, setText] = useState("Radiologist");

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        setText(currentPhrase.substring(0, charIndex - 1));
        charIndex -= 1;
      } else {
        setText(currentPhrase.substring(0, charIndex + 1));
        charIndex += 1;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      timeoutId = window.setTimeout(type, typeSpeed);
    };

    timeoutId = window.setTimeout(type, 1000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return text;
}

export default function Home() {
  const rootRef = useRef(null);
  const typewriterText = useTypewriter();

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray(".gs-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          },
        );
      });

      gsap.utils.toArray(".counter").forEach((counter) => {
        ScrollTrigger.create({
          trigger: counter,
          start: "top 90%",
          once: true,
          onEnter: () => {
            const target = Number(counter.getAttribute("data-target"));
            gsap.to(counter, {
              innerHTML: target,
              duration: 2,
              snap: { innerHTML: 1 },
              ease: "power2.out",
              onUpdate() {
                const value = Math.round(this.targets()[0].innerHTML);
                counter.innerHTML = target > 1000 ? `${value.toLocaleString()}+` : `${value}${target > 10 ? "+" : ""}`;
              },
            });
          },
        });
      });
    }, rootRef);

    const magneticButtons = Array.from(document.querySelectorAll(".magnetic-btn"));
    const cleanups = magneticButtons.map((button) => {
      const handleMouseMove = (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      };
      const handleMouseLeave = () => {
        button.style.transform = "translate(0px, 0px)";
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="grain-overlay"></div>
      <div className="fixed inset-0 z-0 pointer-events-none aurora-bg"></div>
      <FloatingSocial />
      <Navbar />

      {/* ── Hero ── */}
      <main className="relative z-10 pt-32 md:pt-40 min-h-screen flex flex-col justify-center pb-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-margin-mobile xl:px-32 w-full gs-reveal">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            {/* Left column */}
            <div className="md:col-span-8 flex flex-col gap-8 md:pr-12">
              <div className="space-y-4">
                <h1
                  className="font-display-lg text-display-lg md:text-[140px] text-on-surface italic font-light tracking-tight gs-reveal"
                  style={{ lineHeight: 1.1 }}
                >
                  {"Precision.".split(" ").map((word, index) => (
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      key={word}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
                <h2 className="font-body-lg text-body-lg md:text-[32px] md:leading-[40px] text-gradient-gold font-light gs-reveal">
                  Diagnosis. Education. Excellence.
                </h2>
              </div>

              <div className="h-8 font-mono-technical text-mono-technical text-on-surface-variant tracking-wider uppercase text-sm flex items-center gap-2 gs-reveal">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                <span id="typewriter-text">{typewriterText}</span>
                <span className="animate-pulse border-r-2 border-primary ml-1 h-5"></span>
              </div>

              <div className="flex flex-wrap gap-4 mt-8 overflow-hidden py-2 gs-reveal" id="credentials-container">
                {credentials.map((credential) => (
                  <div
                    className="shimmer-pill px-5 py-2.5 rounded-full border border-primary/30 bg-surface-variant/40 backdrop-blur-sm font-mono-technical text-sm text-on-surface-variant flex items-center gap-2"
                    key={credential}
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_#D4A843]"></span>
                    {credential}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mt-12 gs-reveal">
                <Link
                  className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-full flex items-center justify-center gap-2 magnetic-btn hover:shadow-[0_0_30px_rgba(212,168,67,0.5)]"
                  to="/book-consultation"
                >
                  Book a Consultation
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  className="glass-panel text-on-surface font-label-caps text-label-caps px-8 py-4 rounded-full flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-surface-variant/50 magnetic-btn"
                  to="/publications"
                >
                  View My Work
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">visibility</span>
                </Link>
              </div>
            </div>

            {/* Right column — portrait */}
            <div className="md:col-span-4 mt-16 md:mt-0 relative hidden md:block gs-reveal">
              <div className="w-full aspect-[3/4] glass-panel rounded-2xl overflow-hidden relative group float-animation border-filament">
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10"></div>
                <img
                  alt="Dr. Yadav"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out mix-blend-luminosity"
                  src={drNabinPhoto}
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 glass-panel rounded-xl p-4 flex items-center gap-4 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-label-caps text-primary mb-1">Current Focus</p>
                    <p className="font-mono-technical text-mono-technical text-on-surface text-xs truncate">Stereotactic Radiosurgery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-[1440px] mx-auto px-margin-mobile xl:px-32 w-full mt-32 gs-reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-primary/10 bg-surface-container-low/30 backdrop-blur-sm rounded-3xl">
            {stats.map((stat) => (
              <div className="text-center space-y-2" key={stat.label}>
                <div className="font-display-sm text-display-sm text-primary counter" data-target={stat.target}>
                  0
                </div>
                <div className="font-label-caps text-label-caps text-on-surface-variant">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── About Teaser ── */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-margin-mobile xl:px-32 py-section-gap gs-reveal">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 relative">
            <div className="absolute inset-0 m-auto w-64 h-64 border border-primary/20 rounded-full border-t-primary animate-spin-slow pointer-events-none"></div>
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border border-primary/20 relative z-10 bg-surface-container mx-auto">
              <img
                alt="Dr. Nabin Kumar Yadav"
                className="w-full h-full object-cover mix-blend-luminosity opacity-80 hover:opacity-100 hover:mix-blend-normal transition-all duration-700"
                src={drNabinPhoto}
              />
            </div>
          </div>
          <div className="md:col-span-7 mt-12 md:mt-0 space-y-6">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block">The Physician</span>
            <h2 className="font-display-sm text-display-sm text-on-surface leading-tight">
              Precision <br />
              <span className="text-on-surface-variant italic font-light">meets</span> Empathy.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Dr. Nabin Kumar Yadav is a dedicated radiologist, academic leader, and medical educator with a deep commitment to patient care, medical research, and academic excellence across multiple countries.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[profile.credentials, "Fellowship Oncology", "Stereotactic Radiosurgery"].map((item) => (
                <span
                  className="px-4 py-2 rounded-full border border-primary/20 bg-surface-container-low/60 backdrop-blur-xl font-mono-technical text-mono-technical text-on-surface-variant"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              className="inline-flex items-center gap-2 text-primary font-label-caps text-label-caps hover:gap-4 transition-all duration-300 group mt-4"
              to="/about"
            >
              Read Full Bio
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="relative z-10 bg-surface-container-low/20 border-y border-primary/10 py-section-gap gs-reveal">
        <div className="max-w-[1440px] mx-auto px-margin-mobile xl:px-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-4">Clinical Services</span>
              <h2 className="font-display-sm text-display-sm text-on-surface">What I Offer</h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-300 group"
              to="/services"
            >
              View All Services
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {featuredServices.map((service, index) => (
              <div
                className="glass-panel rounded-2xl p-8 relative flex flex-col justify-between group overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_30px_rgba(212,168,67,0.1)]"
                key={service.title}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] transition-all duration-500 group-hover:bg-primary/10"></div>
                <div className="scan-line"></div>
                <div className="relative z-10">
                  <span
                    className={`material-symbols-outlined mb-4 text-[40px] ${
                      index % 2 === 0 ? "text-primary icon-glow-gold" : "text-tertiary-fixed-dim icon-glow-blue"
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {service.icon}
                  </span>
                  <h3 className="font-headline-lg text-[20px] font-semibold mb-2 text-on-surface">{service.title}</h3>
                  <p className="font-mono-technical text-mono-technical text-on-surface-variant leading-relaxed">{service.description}</p>
                </div>
                <div className="relative z-10 mt-6 flex justify-end">
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-primary/30 bg-surface-container-low/60 backdrop-blur-xl font-mono-technical text-mono-technical text-primary mb-8">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Consultation fee: {profile.consultationFee}
            </div>
            <div className="block">
              <Link
                className="bg-primary text-on-primary font-label-caps text-label-caps px-10 py-4 rounded-full inline-flex items-center gap-3 magnetic-btn hover:shadow-[0_0_30px_rgba(212,168,67,0.4)] transition-all duration-300"
                to="/book-consultation"
              >
                Initiate Consultation
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gold Medal Spotlight ── */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-margin-mobile xl:px-32 py-section-gap gs-reveal">
        <div className="relative overflow-hidden shine-sweep bg-surface-container-high/80 backdrop-blur-2xl border border-primary/50 p-12 md:p-20 rounded-2xl text-center group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-40 transition-opacity duration-500">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "120px", fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
          </div>
          <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full w-1/2 h-1/2 m-auto pointer-events-none"></div>
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Pinnacle of Achievement</span>
          <h2 className="font-display-sm text-display-sm text-on-surface mb-6">Gold Medalist</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Honored by Central Christian University for outstanding contributions to radiology and medical education. A testament to a standard of care that accepts no compromises.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-primary font-label-caps text-label-caps border border-primary/40 px-8 py-3 rounded-full hover:bg-primary/10 transition-all duration-300"
            to="/about"
          >
            Learn More
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="fixed bottom-0 w-full overflow-hidden bg-surface-container-lowest/80 backdrop-blur-md border-t border-primary/10 z-30 py-3 pointer-events-none">
        <div className="ticker-track font-label-caps text-label-caps text-primary tracking-widest uppercase opacity-70 flex">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="whitespace-nowrap flex-shrink-0 px-4" key={index}>
              {tickerText}
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <CustomCursor />
    </div>
  );
}
