import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingSocial from "../components/FloatingSocial.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import { certificateSlots, awards } from "./pageContent.js";
import { getCertificates, mergeCertificateSlots } from "../api/certificates.js";
import drNabinPhoto from "../assets/dr-nabin.jpeg";
import book1 from "../assets/book-1.jpeg";
import book2 from "../assets/book-2.jpeg";
import book3 from "../assets/book-3.jpeg";

const galleryItems = [
  { title: "Dr. Nabin Kumar Yadav", type: "Profile", image: drNabinPhoto },
  { title: "Chest X-Ray Interpretation", type: "Book", image: book1 },
  { title: "Interpretation of CT Head", type: "Book", image: book2 },
  { title: "Basic to Advance USG", type: "Book", image: book3 },
];

export default function Gallery() {
  const [storedCertificates, setStoredCertificates] = useState({});

  useEffect(() => {
    let isMounted = true;
    getCertificates()
      .then((certificates) => {
        if (isMounted) setStoredCertificates(certificates);
      })
      .catch(() => {
        if (isMounted) setStoredCertificates({});
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const mergedCertificateSlots = mergeCertificateSlots(certificateSlots, storedCertificates);

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden">
      <div className="grain-overlay"></div>
      <div className="fixed inset-0 z-0 pointer-events-none aurora-bg opacity-50"></div>
      <FloatingSocial />
      <Navbar />

      <main className="relative z-10 pt-32 md:pt-40 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <section className="mb-20">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-5">Gallery</span>
          <h1 className="font-display-sm text-display-sm md:text-[72px] md:leading-[80px] text-on-surface mb-6">
            Certificates, Awards <span className="text-gradient-gold">& Books</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A dedicated gallery area for profile images, certificates, awards, achievements, and published book visuals.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-section-gap">
          {galleryItems.map((item) => (
            <article className="glass-panel rounded-2xl overflow-hidden border border-primary/20 group" key={item.title}>
              <div className="aspect-[3/4] bg-surface-container-low overflow-hidden">
                <img alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" src={item.image} />
              </div>
              <div className="p-5">
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">{item.type}</span>
                <h2 className="font-body-lg text-body-lg text-on-surface mt-2">{item.title}</h2>
              </div>
            </article>
          ))}
        </section>

        <section className="mb-section-gap">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase break-words">Certificate Upload Slots</span>
            <div className="hidden sm:block flex-1 h-px bg-primary/10"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-gutter">
            {mergedCertificateSlots.map((slot) => (
              <div
                className={`min-h-[220px] sm:aspect-[4/3] rounded-2xl border bg-surface-container-low/40 backdrop-blur-xl flex flex-col items-center justify-center text-center hover:border-primary/60 transition-all duration-300 overflow-hidden min-w-0 ${
                  slot.image ? "border-primary/20 p-0" : "border-dashed border-primary/30 p-5 sm:p-6"
                }`}
                key={slot.slot}
              >
                {slot.image ? (
                  <div className="relative w-full h-full min-h-[220px]">
                    <img alt={slot.title} className="w-full h-full object-cover" src={slot.image} />
                    <div className="absolute inset-x-0 bottom-0 bg-background/85 backdrop-blur-md p-4 text-left">
                      <p className="font-label-caps text-label-caps text-on-surface break-words">{slot.title}</p>
                      <p className="font-mono-technical text-mono-technical text-on-surface-variant mt-1">{slot.slot}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-primary text-4xl mb-4">add_photo_alternate</span>
                    <p className="font-label-caps text-label-caps text-on-surface break-words">{slot.title}</p>
                    <p className="font-mono-technical text-mono-technical text-on-surface-variant mt-2">{slot.slot}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Awards Summary</span>
            <div className="flex-1 h-px bg-primary/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {awards.slice(0, 6).map((award) => (
              <div className="glass-panel rounded-2xl p-6" key={award.title}>
                <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {award.icon}
                </span>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">{award.title}</h3>
                <p className="font-mono-technical text-mono-technical text-on-surface-variant">{award.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <CustomCursor />
    </div>
  );
}
