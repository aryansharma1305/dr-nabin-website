import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingSocial from "../components/FloatingSocial.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import { submitContact } from "../api/contact.js";
import { profile, socialLinks } from "./pageContent.js";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    await submitContact(data);
    setSubmitted(true);
  }

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-x-hidden grain-bg flex flex-col font-body-md selection:bg-primary/30 selection:text-primary">
      <div className="fixed top-0 left-1/4 w-1/2 h-1/2 bg-tertiary/10 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-0 right-1/4 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-[-1]"></div>
      <FloatingSocial />
      <Navbar />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-[160px] pb-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        <div className="md:col-span-5 md:sticky md:top-32 space-y-12 pr-0 md:pr-12">
          <div className="space-y-6">
            <h1 className="font-display-sm text-display-sm text-on-surface">
              Initiate
              <br />
              <span className="text-primary italic font-light">Dialogue.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
              For patient consultations, second opinions, teleradiology, institutional inquiries, academic collaborations, and specialized radiological services.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {profile.currentRoles.map((role) => (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low/80 backdrop-blur-md rounded-full border border-white/10 font-mono-technical text-mono-technical text-on-surface" key={role}>
                <span className="material-symbols-outlined text-[16px] text-tertiary">{role.includes("University") ? "account_balance" : "location_on"}</span>
                {role}
              </div>
            ))}
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden glass-border-gold bg-surface-container-lowest flex items-center justify-center group">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIWPX4wRM6f-OJreTKZzycAEAhDOC20Y9s9lfjTvkeZyDHOG0-TJoUQ9QfljSr5FA3lRVOc0aCsX0G_3nLRRTNUyvN5u0zniVQTyBl2Ciin0MRgMmU_IauC85zOfBD_E5C9Pka2EKrpLHWennhj1dV7vbEYCi6hCiwDwBiWFJODX561YMSgy6KQj0hdl5wYgrYy3YcaqQf3WRV77hChnur9298fUTa5BPT8pyyYLBMAmPFcM-S0O3isj2Bx_yx3_J-ypdbeIu4RtI')",
              }}
            ></div>
            <div className="absolute top-[45%] left-[52%] w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(212,168,67,0.8)] animate-pulse"></div>
            <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-tertiary rounded-full shadow-[0_0_10px_rgba(179,202,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
            <div className="absolute top-[25%] left-[45%] w-2 h-2 bg-tertiary rounded-full shadow-[0_0_10px_rgba(179,202,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
            <div className="absolute top-[60%] left-[75%] w-2 h-2 bg-tertiary rounded-full shadow-[0_0_10px_rgba(179,202,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
          </div>

          <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap gap-8">
            {socialLinks.map((link) => (
              <a className="text-on-surface-variant hover:text-primary hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-2" href={link.href} key={link.label} rel="noreferrer" target="_blank">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {link.icon}
                </span>
                <span className="font-label-caps text-label-caps text-[10px]">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 mt-12 md:mt-0">
          <div className="bg-surface-container-low/60 backdrop-blur-xl glass-border-gold p-8 md:p-12 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            <form className="relative z-10 space-y-10" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ContactField error={errors.name?.message} label="Full Name">
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface font-body-md text-body-md py-3 px-0 focus:ring-0 placeholder-transparent peer transition-colors focus:border-tertiary" id="name" placeholder="Name" type="text" {...register("name")} />
                </ContactField>
                <ContactField error={errors.email?.message} label="Corporate Email">
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface font-body-md text-body-md py-3 px-0 focus:ring-0 placeholder-transparent peer transition-colors focus:border-tertiary" id="email" placeholder="Email" type="email" {...register("email")} />
                </ContactField>
              </div>
              <div className="relative input-glow group">
                <select className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface font-body-md text-body-md py-3 px-0 focus:ring-0 appearance-none transition-colors focus:border-tertiary" id="subject" {...register("subject")}>
                  <option className="bg-surface-container-high text-on-surface-variant" value="">
                    Select Inquiry Type
                  </option>
                  <option className="bg-surface-container-high text-on-surface" value="clinical">
                    Clinical Consultation
                  </option>
                  <option className="bg-surface-container-high text-on-surface" value="second-opinion">
                    Second Opinion
                  </option>
                  <option className="bg-surface-container-high text-on-surface" value="teleradiology">
                    Teleradiology Services
                  </option>
                  <option className="bg-surface-container-high text-on-surface" value="academic">
                    Academic Research
                  </option>
                  <option className="bg-surface-container-high text-on-surface" value="institutional">
                    Institutional Partnership
                  </option>
                </select>
                <div className="absolute right-0 top-3 pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
                {errors.subject && <p className="mt-2 text-error font-mono-technical text-mono-technical">{errors.subject.message}</p>}
              </div>
              <ContactField error={errors.message?.message} label="Message Context">
                <textarea className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface font-body-md text-body-md py-3 px-0 focus:ring-0 placeholder-transparent peer transition-colors focus:border-tertiary resize-none" id="message" placeholder="Message" rows="4" {...register("message")}></textarea>
              </ContactField>
              {submitted && (
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 font-body-md text-body-md text-on-surface">
                  Message received. Dr. Yadav's team will review it and respond to your inquiry shortly.
                </div>
              )}
              <div className="pt-4 flex justify-end">
                <button className="magnetic bg-primary text-on-primary-fixed font-label-caps text-label-caps py-4 px-10 rounded-full transition-all duration-300 ease-out shadow-[0_4px_20px_rgba(212,168,67,0.2)] flex items-center gap-3" disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Transmitting" : "Transmit Message"}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
}

function ContactField({ children, error, label }) {
  return (
    <div className="relative input-glow group">
      {children}
      <label className="absolute left-0 top-3 text-on-surface-variant font-body-md text-body-md transition-all peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-tertiary peer-valid:-top-4 peer-valid:text-[12px]">
        {label}
      </label>
      {error && <p className="mt-2 text-error font-mono-technical text-mono-technical">{error}</p>}
    </div>
  );
}
