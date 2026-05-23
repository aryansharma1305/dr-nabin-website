import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Portfolio", to: "/" },
  { label: "About", to: "/about" },
  { label: "Research", to: "/publications" },
  { label: "Clinical", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const mobileItems = [
  { title: "Home", icon: "person", to: "/" },
  { title: "About", icon: "info", to: "/about" },
  { title: "Research", icon: "biotech", to: "/publications" },
  { title: "Clinical", icon: "medical_services", to: "/services" },
  { title: "Connect", icon: "chat", to: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`hidden md:flex justify-center items-center px-margin-desktop py-6 w-full z-50 fixed top-0 bg-transparent border-b border-transparent shadow-none transition-all duration-400 ${isScrolled ? "nav-scrolled" : ""}`}
        id="main-nav"
      >
        <ul className="flex gap-8 items-center mr-auto">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                className={`font-label-caps text-label-caps flex flex-col items-center hover:text-primary transition-colors duration-300 ${
                  location.pathname === item.to ? "text-primary" : "text-on-surface-variant"
                }`}
                to={item.to}
              >
                <span
                  className={`w-1 h-1 bg-secondary rounded-full mx-auto mb-1 transition-opacity duration-300 ${
                    location.pathname === item.to ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="font-label-caps text-label-caps text-on-primary bg-primary px-6 py-3 rounded-full hover:scale-95 transition-transform duration-200 magnetic-btn"
          to="/book-consultation"
        >
          Book Consultation
        </Link>
      </nav>

      {/* Mobile Side Nav */}
      <nav className="md:hidden flex flex-col gap-6 py-8 px-2 z-40 fixed left-4 top-1/2 -translate-y-1/2 rounded-full bg-surface-container-low/60 backdrop-blur-xl border border-primary/10 shadow-2xl">
        <div className="flex flex-col items-center gap-5">
          {mobileItems.map((item) => (
            <Link
              className={`rounded-full p-3 hover:scale-110 transition-transform duration-300 ${
                location.pathname === item.to
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`}
              key={item.to}
              title={item.title}
              to={item.to}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            </Link>
          ))}
          <Link
            className="rounded-full p-3 hover:scale-110 transition-transform duration-300 text-on-surface-variant hover:bg-surface-variant"
            title="Book Consultation"
            to="/book-consultation"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">calendar_add_on</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
