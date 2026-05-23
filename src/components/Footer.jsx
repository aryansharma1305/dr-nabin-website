import { Link } from "react-router-dom";
import { academicLinks, profile } from "../pages/pageContent.js";

const footerLinks = [
  { label: "Portfolio", to: "/" },
  { label: "About", to: "/about" },
  { label: "Research", to: "/publications" },
  { label: "Books", to: "/books" },
  { label: "Gallery", to: "/gallery" },
  { label: "Clinical Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1AFCkZskQ2/?mibextid=wwXIfr",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/drnabinyadav?igsh=Z3Q5YWFycWYwbHMz&utm_source=qr",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@drnabinkyadav?si=9_mLsT6IOKOfpqmA",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VaoEBx3IyPtL13p7PX3d",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "ResearchGate",
    href: academicLinks.researchGate,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M4 4h7.2c2.8 0 4.8 1.7 4.8 4.3 0 1.8-.9 3.1-2.4 3.8L17 20h-3.1l-3-7H6.8v7H4V4zm2.8 2.4v4.2h4.1c1.4 0 2.2-.8 2.2-2.1s-.8-2.1-2.2-2.1H6.8zM18.4 4H21v16h-2.6V4z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full border-t border-primary/10 relative z-10 overflow-hidden">
      {/* Top gradient line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand column */}
          <div className="space-y-6">
            <Link className="font-headline-lg text-[24px] leading-8 text-primary tracking-normal block" to="/">
              {profile.displayName}
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed">
              Gold Medalist Radiologist, Medical Educator, and Oncology Fellow advancing precision diagnostics worldwide.
            </p>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((link) => (
                <a
                  className="w-9 h-9 rounded-full border border-primary/20 bg-surface-container-low/60 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
                  href={link.href}
                  key={link.label}
                  rel="noreferrer"
                  target="_blank"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-6">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    to={link.to}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 overflow-hidden"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-6">Connect</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">location_on</span>
                <div>
                  <p className="font-mono-technical text-mono-technical text-on-surface">EMHRC</p>
                  <p className="font-mono-technical text-mono-technical text-on-surface-variant text-xs">Attending Radiologist</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">account_balance</span>
                <div>
                  <p className="font-mono-technical text-mono-technical text-on-surface">Daaru Salaam University</p>
                  <p className="font-mono-technical text-mono-technical text-on-surface-variant text-xs">Academic Director of Medicine</p>
                </div>
              </div>
              <Link
                className="inline-flex items-center gap-2 mt-4 bg-primary/10 border border-primary/30 text-primary font-label-caps text-label-caps px-5 py-2.5 rounded-full hover:bg-primary/20 transition-all duration-300"
                to="/book-consultation"
              >
                <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono-technical text-mono-technical text-on-surface-variant opacity-60 text-center md:text-left">
            © {new Date().getFullYear()} Dr. Nabin Kumar Yadav. Advancing Radiology. Inspiring Futures.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-on-surface-variant font-mono-technical text-mono-technical hover:text-primary transition-all text-xs" href="#">
              Privacy Policy
            </a>
            <a className="text-on-surface-variant font-mono-technical text-mono-technical hover:text-primary transition-all text-xs" href="#">
              Medical Disclaimer
            </a>
            <a className="text-on-surface-variant font-mono-technical text-mono-technical hover:text-primary transition-all text-xs" href="#">
              Institutional Access
            </a>
            <a
              className="text-on-surface-variant font-mono-technical text-mono-technical hover:text-primary transition-all text-xs inline-flex items-center gap-1.5"
              href={academicLinks.researchGate}
              rel="noreferrer"
              target="_blank"
            >
              ResearchGate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
