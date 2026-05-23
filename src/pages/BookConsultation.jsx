import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingSocial from "../components/FloatingSocial.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import { submitBookConsultation } from "../api/book-consultation.js";
import { profile, services, consultationModalities } from "./pageContent.js";
import { useReveal } from "./useReveal.js";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  modality: z.string().min(1, "Select a modality"),
  consultType: z.string().min(1, "Select a consultation type"),
  timeframe: z.string().min(1, "Select a timeframe"),
  message: z.string().min(10, "Add a brief reason for consultation"),
});

const consultationTypes = [
  "X-Ray Reporting",
  "CT Reporting",
  "MRI Reporting",
  "Ultrasound Reporting",
  "Mammography Reporting",
  "Emergency & Night Reporting",
  "Second Opinion Services",
  "Teleradiology Services",
  "Radiosurgery",
  "Academic/Research Inquiry",
];

export default function BookConsultation() {
  useReveal();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      modality: "",
      consultType: "",
      timeframe: "As soon as possible",
      message: "",
    },
  });

  const values = watch();

  async function nextStep() {
    const fields = step === 1 ? ["firstName", "lastName", "email"] : ["modality", "consultType", "timeframe"];
    const ok = await trigger(fields);
    if (ok) setStep((current) => Math.min(current + 1, 3));
  }

  async function onSubmit(data) {
    await submitBookConsultation(data);
    setSubmitted(true);
  }

  return (
    <div className="antialiased min-h-screen flex flex-col bg-background text-on-background">
      <div className="fixed inset-0 pointer-events-none z-0 aurora-bg opacity-60"></div>
      <FloatingSocial />
      <Navbar />
      <main className="flex-grow pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop flex items-center justify-center relative z-10">
        <form className="w-full max-w-4xl glass-card rounded-2xl overflow-hidden shadow-2xl reveal active relative" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 border-b border-primary/10 relative">
            <h1 className="font-display-sm text-display-sm text-on-surface mb-2">Request Consultation</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Secure your appointment with Dr. Yadav. Standard consultation fee: <span className="text-primary">{profile.consultationFee}</span>.
            </p>
            <div className="mt-8 relative w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
            <div className="flex justify-between mt-4 font-label-caps text-label-caps text-on-surface-variant">
              <span className={step >= 1 ? "text-primary transition-colors duration-300" : "transition-colors duration-300"}>01 Personal</span>
              <span className={step >= 2 ? "text-primary transition-colors duration-300" : "transition-colors duration-300"}>02 Details</span>
              <span className={step >= 3 ? "text-primary transition-colors duration-300" : "transition-colors duration-300"}>03 Review</span>
            </div>
          </div>

          <div className="p-8 md:p-12 relative min-h-[460px]">
            {step === 1 && (
              <div className="transition-all duration-300 opacity-100 translate-x-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label="FIRST NAME" error={errors.firstName?.message}>
                    <input className="form-input w-full pt-6 pb-2 font-body-md text-body-md peer placeholder-transparent" id="firstName" placeholder="First Name" type="text" {...register("firstName")} />
                  </Field>
                  <Field label="LAST NAME" error={errors.lastName?.message}>
                    <input className="form-input w-full pt-6 pb-2 font-body-md text-body-md peer placeholder-transparent" id="lastName" placeholder="Last Name" type="text" {...register("lastName")} />
                  </Field>
                  <Field className="md:col-span-2" label="EMAIL ADDRESS" error={errors.email?.message}>
                    <input className="form-input w-full pt-6 pb-2 font-body-md text-body-md peer placeholder-transparent" id="email" placeholder="Email Address" type="email" {...register("email")} />
                  </Field>
                  <Field className="md:col-span-2" label="PHONE NUMBER (OPTIONAL)" error={errors.phone?.message}>
                    <input className="form-input w-full pt-6 pb-2 font-body-md text-body-md peer placeholder-transparent" id="phone" placeholder="Phone Number" type="tel" {...register("phone")} />
                  </Field>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 transition-all duration-300 opacity-100 translate-x-0">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-4">CONSULTATION DETAILS</label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {consultationModalities.map((modality) => (
                      <label className="gold-stroke rounded-lg p-4 cursor-pointer flex flex-col gap-3 hover:bg-surface-variant transition-colors group" key={modality.code}>
                        <input className="sr-only peer" type="radio" value={modality.code} {...register("modality")} />
                        <span className="material-symbols-outlined text-primary text-[28px] peer-checked:text-secondary">{modality.icon}</span>
                        <span className="font-label-caps text-label-caps text-on-surface group-hover:text-primary transition-colors">{modality.code}</span>
                        <span className="font-mono-technical text-[11px] leading-relaxed text-on-surface-variant">{modality.description}</span>
                      </label>
                    ))}
                  </div>
                  {errors.modality && <p className="mb-6 text-error font-mono-technical text-mono-technical">{errors.modality.message}</p>}
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-4">CONSULTATION TYPE</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {consultationTypes.map((type) => (
                      <label className="gold-stroke rounded-lg p-4 cursor-pointer flex items-center space-x-3 hover:bg-surface-variant transition-colors group" key={type}>
                        <input className="text-primary bg-transparent border-outline-variant focus:ring-primary focus:ring-offset-surface" type="radio" value={type} {...register("consultType")} />
                        <span className="font-mono-technical text-mono-technical text-on-surface group-hover:text-primary transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                  {errors.consultType && <p className="mt-3 text-error font-mono-technical text-mono-technical">{errors.consultType.message}</p>}
                </div>
                <div className="relative">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-4">PREFERRED TIMEFRAME</label>
                  <select className="form-input w-full py-3 font-body-md text-body-md bg-transparent appearance-none" {...register("timeframe")}>
                    <option className="bg-surface text-on-surface">As soon as possible</option>
                    <option className="bg-surface text-on-surface">Within 1-2 Weeks</option>
                    <option className="bg-surface text-on-surface">Next Month</option>
                  </select>
                  <div className="pointer-events-none absolute bottom-3 right-0 flex items-center px-2 text-on-surface-variant">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 transition-all duration-300 opacity-100 translate-x-0">
                <Field label="BRIEF REASON FOR CONSULTATION" error={errors.message?.message}>
                  <textarea className="form-input w-full pt-6 pb-2 font-body-md text-body-md peer placeholder-transparent resize-none" id="message" placeholder="Brief Description" rows="4" {...register("message")}></textarea>
                </Field>
                <div className="bg-surface-container-low p-6 rounded-xl border border-primary/5 mt-8">
                  <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-4">Summary</h3>
                  <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                    <li><span className="font-mono-technical text-primary mr-2">Name:</span>{values.firstName} {values.lastName}</li>
                    <li><span className="font-mono-technical text-primary mr-2">Modality:</span>{values.modality || "--"}</li>
                    <li><span className="font-mono-technical text-primary mr-2">Type:</span>{values.consultType || "--"}</li>
                    <li><span className="font-mono-technical text-primary mr-2">Consultation Fee:</span>{profile.consultationFee}</li>
                  </ul>
                  <p className="font-label-caps text-label-caps text-outline mt-6">
                    A representative will contact you to confirm details and provide next steps for reports, imaging files, or academic consultation.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 border-t border-primary/10 flex justify-between items-center bg-surface-container-lowest/50">
            <button
              className={`${step === 1 ? "opacity-0 pointer-events-none" : ""} font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all flex items-center gap-2`}
              onClick={() => setStep((current) => Math.max(current - 1, 1))}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span> BACK
            </button>
            {step < 3 ? (
              <button className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-full uppercase tracking-widest flex items-center gap-3 ml-auto magnetic-btn" onClick={nextStep} type="button">
                <span>NEXT STEP</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-full uppercase tracking-widest flex items-center gap-3 ml-auto magnetic-btn" disabled={isSubmitting} type="submit">
                <span>{isSubmitting ? "SENDING" : "SUBMIT REQUEST"}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            )}
          </div>

          <div className={`${submitted ? "opacity-100" : "opacity-0 pointer-events-none"} absolute inset-0 bg-surface/90 backdrop-blur-3xl z-50 flex flex-col items-center justify-center transition-opacity duration-700`}>
            <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-4xl">check</span>
            </div>
            <h2 className="font-display-sm text-display-sm text-on-surface mb-2">Request Received</h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-md">Your consultation request has been recorded. Dr. Yadav's team will review it and contact you shortly to confirm details and next steps.</p>
          </div>
        </form>
      </main>
      <section className="px-margin-mobile md:px-margin-desktop pb-24 relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.slice(0, 3).map((service) => (
            <div className="glass-card rounded-xl p-5" key={service.title}>
              <span className="material-symbols-outlined text-primary mb-3">{service.icon}</span>
              <h3 className="font-label-caps text-label-caps text-on-surface">{service.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <CustomCursor />
    </div>
  );
}

function Field({ children, className = "", error, label }) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <label className="absolute left-0 top-2 font-label-caps text-label-caps text-on-surface-variant transition-all peer-placeholder-shown:text-body-md peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:text-label-caps peer-focus:text-primary">
        {label}
      </label>
      {error && <p className="mt-2 text-error font-mono-technical text-mono-technical">{error}</p>}
    </div>
  );
}
