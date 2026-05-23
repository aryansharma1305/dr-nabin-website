import { useState, useEffect, useCallback } from "react";
import { getConsultations, deleteConsultation } from "../api/book-consultation.js";
import { getMessages, markMessageRead, deleteMessage } from "../api/contact.js";
import {
  deleteCertificate,
  getCertificates,
  mergeCertificateSlots,
  saveCertificate,
  uploadCertificateToCloudinary,
} from "../api/certificates.js";
import { certificateSlots } from "./pageContent.js";

const ADMIN_PASSWORD = "dryadav2024";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Badge({ children, color = "primary" }) {
  const colors = {
    primary: "border-primary/30 text-primary bg-primary/10",
    blue: "border-secondary/30 text-secondary bg-secondary/10",
    green: "border-green-500/30 text-green-400 bg-green-500/10",
    red: "border-red-500/30 text-red-400 bg-red-500/10",
    slate: "border-outline/30 text-on-surface-variant bg-surface-variant/30",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full border font-label-caps text-[10px] ${colors[color]}`}>
      {children}
    </span>
  );
}

function StatCard({ icon, label, value, color = "text-primary" }) {
  return (
    <div className="bg-surface-container-low/60 backdrop-blur-xl border border-primary/10 rounded-xl p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className={`material-symbols-outlined ${color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </div>
      <div>
        <p className="font-label-caps text-label-caps text-on-surface-variant">{label}</p>
        <p className="font-display-sm text-[28px] font-bold text-on-surface">{value}</p>
      </div>
    </div>
  );
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("consultations");
  const [consultations, setConsultations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [certificates, setCertificates] = useState({});
  const [certificateStatus, setCertificateStatus] = useState("");
  const [certificateError, setCertificateError] = useState("");

  const refreshData = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const [c, m] = await Promise.all([getConsultations(), getMessages()]);
      setConsultations(c);
      setMessages(m);
    } catch (err) {
      setFetchError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthed) refreshData();
  }, [isAuthed, refreshData]);

  useEffect(() => {
    if (!isAuthed) return;

    getCertificates()
      .then(setCertificates)
      .catch((err) => {
        setCertificateError(err.message || "Failed to load certificates.");
      });
  }, [isAuthed]);

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  async function handleDeleteConsultation(id) {
    try {
      await deleteConsultation(id);
      setConsultations((prev) => prev.filter((c) => c.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err) {
      alert(err.message);
    }
    setConfirmDelete(null);
  }

  async function handleDeleteMessage(id) {
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err) {
      alert(err.message);
    }
    setConfirmDelete(null);
  }

  async function handleOpenMessage(msg) {
    if (!msg.read) {
      try {
        await markMessageRead(msg.id);
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m)));
      } catch (_) {
        // non-critical
      }
    }
    setSelectedItem({ ...msg, type: "contact" });
  }

  async function handleCertificateUpload(slot, file) {
    if (!file) return;

    setCertificateError("");
    setCertificateStatus(`Processing ${slot.title}...`);

    try {
      const uploaded = await uploadCertificateToCloudinary(file);
      await saveCertificate({
        slot: slot.slot,
        title: slot.title,
        issuer: slot.issuer,
        imageUrl: uploaded.imageUrl,
        publicId: uploaded.publicId,
      });

      const nextCertificates = {
        ...certificates,
        [slot.slot]: {
          slot: slot.slot,
          title: slot.title,
          issuer: slot.issuer,
          image: uploaded.imageUrl,
          publicId: uploaded.publicId,
          uploadedAt: new Date().toISOString(),
        },
      };
      setCertificates(nextCertificates);
      setCertificateStatus(`${slot.title} uploaded to Cloudinary.`);
    } catch (err) {
      setCertificateError(err.message || "Could not upload this certificate.");
      setCertificateStatus("");
    }
  }

  async function handleCertificateRemove(slot) {
    try {
      await deleteCertificate(slot.slot);
      const nextCertificates = { ...certificates };
      delete nextCertificates[slot.slot];
      setCertificates(nextCertificates);
      setCertificateStatus(`${slot.title} removed from the website.`);
      setCertificateError("");
    } catch (err) {
      setCertificateError(err.message || "Could not remove this certificate.");
      setCertificateStatus("");
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length;
  const mergedCertificateSlots = mergeCertificateSlots(certificateSlots, certificates);
  const uploadedCertificateCount = Object.values(certificates).filter(Boolean).length;

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background text-on-background flex items-center justify-center px-margin-mobile relative overflow-hidden">
        <div className="fixed inset-0 aurora-bg opacity-40 pointer-events-none"></div>
        <div className="grain-overlay"></div>

        <div className="w-full max-w-sm relative z-10">
          <div className="text-center mb-10">
            <span className="material-symbols-outlined text-primary text-5xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
              admin_panel_settings
            </span>
            <h1 className="font-display-sm text-display-sm text-on-surface mb-2">Admin Portal</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Dr. Nabin Kumar Yadav</p>
          </div>

          <form
            className="glass-panel rounded-2xl p-8 flex flex-col gap-6"
            onSubmit={handleLogin}
          >
            <div className="relative">
              <input
                autoComplete="current-password"
                className="w-full bg-surface-container-low border border-primary/20 rounded-xl px-4 py-4 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary transition-colors pr-12"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                type="password"
                value={password}
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
            </div>

            {error && (
              <p className="text-error font-mono-technical text-mono-technical flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </p>
            )}

            <button
              className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors magnetic-btn"
              type="submit"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="grain-overlay"></div>

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-primary/10 px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            admin_panel_settings
          </span>
          <span className="font-headline-lg text-[20px] md:text-headline-lg text-primary tracking-normal truncate">Admin <span className="hidden sm:inline">Dashboard</span></span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 font-label-caps text-label-caps"
            onClick={refreshData}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1.5 font-label-caps text-label-caps"
            onClick={() => setIsAuthed(false)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-primary/10 bg-surface-container-lowest/40 pt-8 px-4 gap-2 fixed top-16 bottom-0">
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-caps text-label-caps transition-all ${
              activeTab === "consultations" ? "bg-primary/10 text-primary border border-primary/20" : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low/60"
            }`}
            onClick={() => { setActiveTab("consultations"); setSelectedItem(null); }}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Consultations
            {consultations.length > 0 && (
              <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                {consultations.length}
              </span>
            )}
          </button>
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-caps text-label-caps transition-all ${
              activeTab === "messages" ? "bg-primary/10 text-primary border border-primary/20" : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low/60"
            }`}
            onClick={() => { setActiveTab("messages"); setSelectedItem(null); }}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            Messages
            {unreadCount > 0 && (
              <span className="ml-auto bg-secondary/20 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-caps text-label-caps transition-all ${
              activeTab === "certificates" ? "bg-primary/10 text-primary border border-primary/20" : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low/60"
            }`}
            onClick={() => { setActiveTab("certificates"); setSelectedItem(null); }}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            Certificates
            {uploadedCertificateCount > 0 && (
              <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                {uploadedCertificateCount}
              </span>
            )}
          </button>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-primary/10 grid grid-cols-3">
          <button
            className={`flex-1 flex flex-col items-center py-3 gap-1 font-label-caps text-label-caps transition-colors ${activeTab === "consultations" ? "text-primary" : "text-on-surface-variant"}`}
            onClick={() => { setActiveTab("consultations"); setSelectedItem(null); }}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            Consultations
          </button>
          <button
            className={`flex-1 flex flex-col items-center py-3 gap-1 font-label-caps text-label-caps transition-colors relative ${activeTab === "messages" ? "text-primary" : "text-on-surface-variant"}`}
            onClick={() => { setActiveTab("messages"); setSelectedItem(null); }}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">mail</span>
            Messages
            {unreadCount > 0 && (
              <span className="absolute top-2 right-1/4 bg-secondary text-on-secondary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            className={`flex-1 flex flex-col items-center py-3 gap-1 font-label-caps text-label-caps transition-colors relative ${activeTab === "certificates" ? "text-primary" : "text-on-surface-variant"}`}
            onClick={() => { setActiveTab("certificates"); setSelectedItem(null); }}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
            Certs
            {uploadedCertificateCount > 0 && (
              <span className="absolute top-2 right-1/4 bg-primary text-on-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {uploadedCertificateCount}
              </span>
            )}
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 md:ml-56 p-6 md:p-10 pb-24 md:pb-10">

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="font-mono-technical text-mono-technical text-on-surface-variant">Fetching from database…</p>
            </div>
          )}

          {/* Fetch error */}
          {!loading && fetchError && activeTab !== "certificates" && (
            <div className="mb-8 flex items-start gap-3 bg-error/10 border border-error/30 rounded-xl p-5">
              <span className="material-symbols-outlined text-error flex-shrink-0">error</span>
              <div>
                <p className="font-label-caps text-label-caps text-error mb-1">Failed to load data</p>
                <p className="font-mono-technical text-mono-technical text-on-surface-variant">{fetchError}</p>
                <button
                  className="mt-3 text-primary font-label-caps text-label-caps hover:underline flex items-center gap-1"
                  onClick={refreshData}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  Try again
                </button>
              </div>
            </div>
          )}

          {!loading && (!fetchError || activeTab === "certificates") && (
            <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <StatCard icon="calendar_month" label="Total Consultations" value={consultations.length} />
            <StatCard icon="mail" label="Total Messages" value={messages.length} color="text-secondary" />
            <StatCard icon="mark_email_unread" label="Unread Messages" value={unreadCount} color="text-tertiary" />
            <StatCard icon="check_circle" label="Read Messages" value={messages.length - unreadCount} color="text-green-400" />
          </div>

          {/* Consultations Tab */}
          {activeTab === "consultations" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* List */}
              <div className="space-y-3">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                  Consultation Requests
                  <span className="ml-3 font-mono-technical text-mono-technical text-on-surface-variant text-sm">({consultations.length})</span>
                </h2>
                {consultations.length === 0 ? (
                  <div className="bg-surface-container-low/40 border border-primary/10 rounded-xl p-12 text-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4 block">inbox</span>
                    <p className="font-body-md text-body-md text-on-surface-variant">No consultation requests yet.</p>
                  </div>
                ) : (
                  consultations.map((c) => (
                    <div
                      className={`bg-surface-container-low/40 backdrop-blur-xl border rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-primary/40 ${
                        selectedItem?.id === c.id ? "border-primary/50 bg-surface-container-low/70" : "border-primary/10"
                      }`}
                      key={c.id}
                      onClick={() => setSelectedItem({ ...c, type: "consultation" })}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-body-md text-body-md text-on-surface font-semibold truncate">
                            {c.firstName} {c.lastName}
                          </p>
                          <p className="font-mono-technical text-mono-technical text-on-surface-variant truncate">{c.email}</p>
                        </div>
                        <Badge color="primary">{c.consultType || "General"}</Badge>
                      </div>
                      <p className="font-mono-technical text-mono-technical text-on-surface-variant mt-2 text-[11px]">
                        {formatDate(c.submittedAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Detail */}
              <div>
                {selectedItem && selectedItem.type === "consultation" ? (
                  <div className="bg-surface-container-low/60 backdrop-blur-xl border border-primary/20 rounded-xl p-8 sticky top-24">
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="font-headline-lg text-headline-lg text-on-surface">Request Detail</h3>
                      <button
                        className="text-error hover:text-red-400 transition-colors flex items-center gap-1 font-label-caps text-label-caps"
                        onClick={() => setConfirmDelete(selectedItem.id)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Delete
                      </button>
                    </div>
                    <dl className="space-y-4">
                      {[
                        { label: "Full Name", value: `${selectedItem.firstName} ${selectedItem.lastName}` },
                        { label: "Email", value: selectedItem.email },
                        { label: "Phone", value: selectedItem.phone || "—" },
                        { label: "Modality", value: selectedItem.modality || "—" },
                        { label: "Consultation Type", value: selectedItem.consultType },
                        { label: "Timeframe", value: selectedItem.timeframe },
                        { label: "Message", value: selectedItem.message },
                        { label: "Submitted", value: formatDate(selectedItem.submittedAt) },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <dt className="font-label-caps text-label-caps text-primary mb-1">{label}</dt>
                          <dd className="font-body-md text-body-md text-on-surface break-words">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 pt-6 border-t border-primary/10">
                      <a
                        className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 rounded-full hover:bg-primary-fixed transition-colors"
                        href={`mailto:${selectedItem.email}?subject=Re: Consultation Request`}
                      >
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-container-low/20 border border-primary/10 rounded-xl p-12 text-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4 block">touch_app</span>
                    <p className="font-body-md text-body-md text-on-surface-variant">Select a request to view details.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* List */}
              <div className="space-y-3">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                  Contact Messages
                  <span className="ml-3 font-mono-technical text-mono-technical text-on-surface-variant text-sm">({messages.length})</span>
                </h2>
                {messages.length === 0 ? (
                  <div className="bg-surface-container-low/40 border border-primary/10 rounded-xl p-12 text-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4 block">inbox</span>
                    <p className="font-body-md text-body-md text-on-surface-variant">No messages yet.</p>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      className={`backdrop-blur-xl border rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-primary/40 ${
                        selectedItem?.id === m.id
                          ? "border-primary/50 bg-surface-container-low/70"
                          : m.read
                          ? "border-primary/10 bg-surface-container-low/40"
                          : "border-secondary/20 bg-secondary/5"
                      }`}
                      key={m.id}
                      onClick={() => handleOpenMessage({ ...m, type: "contact" })}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {!m.read && <span className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></span>}
                            <p className={`font-body-md text-body-md truncate ${m.read ? "text-on-surface" : "text-on-surface font-semibold"}`}>
                              {m.name}
                            </p>
                          </div>
                          <p className="font-mono-technical text-mono-technical text-on-surface-variant truncate">{m.email}</p>
                        </div>
                        <Badge color={m.read ? "slate" : "blue"}>{m.subject || "General"}</Badge>
                      </div>
                      <p className="font-mono-technical text-mono-technical text-on-surface-variant mt-2 line-clamp-1 text-[12px]">
                        {m.message}
                      </p>
                      <p className="font-mono-technical text-mono-technical text-on-surface-variant mt-1 text-[11px]">
                        {formatDate(m.submittedAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Detail */}
              <div>
                {selectedItem && selectedItem.type === "contact" ? (
                  <div className="bg-surface-container-low/60 backdrop-blur-xl border border-primary/20 rounded-xl p-8 sticky top-24">
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="font-headline-lg text-headline-lg text-on-surface">Message Detail</h3>
                      <button
                        className="text-error hover:text-red-400 transition-colors flex items-center gap-1 font-label-caps text-label-caps"
                        onClick={() => setConfirmDelete(selectedItem.id)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Delete
                      </button>
                    </div>
                    <dl className="space-y-4">
                      {[
                        { label: "Name", value: selectedItem.name },
                        { label: "Email", value: selectedItem.email },
                        { label: "Subject", value: selectedItem.subject },
                        { label: "Submitted", value: formatDate(selectedItem.submittedAt) },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <dt className="font-label-caps text-label-caps text-primary mb-1">{label}</dt>
                          <dd className="font-body-md text-body-md text-on-surface">{value}</dd>
                        </div>
                      ))}
                      <div>
                        <dt className="font-label-caps text-label-caps text-primary mb-2">Message</dt>
                        <dd className="font-body-md text-body-md text-on-surface bg-surface-container-low/60 rounded-xl p-4 border border-primary/10 leading-relaxed whitespace-pre-wrap">
                          {selectedItem.message}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-6 pt-6 border-t border-primary/10">
                      <a
                        className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 rounded-full hover:bg-primary-fixed transition-colors"
                        href={`mailto:${selectedItem.email}?subject=Re: ${selectedItem.subject}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">reply</span>
                        Reply via Email
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-container-low/20 border border-primary/10 rounded-xl p-12 text-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4 block">touch_app</span>
                    <p className="font-body-md text-body-md text-on-surface-variant">Select a message to read it.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === "certificates" && (
            <div className="space-y-8">
              <div className="bg-surface-container-low/40 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">Certificate Uploads</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                      Upload certificate images to Cloudinary here. They will appear automatically in the About page certificate slots and in the Gallery page.
                    </p>
                  </div>
                  <Badge color="primary">{uploadedCertificateCount} of {certificateSlots.length} uploaded</Badge>
                </div>

                {(certificateStatus || certificateError) && (
                  <div className={`mt-6 rounded-xl border p-4 font-mono-technical text-mono-technical ${
                    certificateError
                      ? "border-error/30 bg-error/10 text-error"
                      : "border-primary/20 bg-primary/10 text-primary"
                  }`}>
                    {certificateError || certificateStatus}
                  </div>
                )}

                <div className="mt-6 rounded-xl border border-primary/10 bg-surface-container-low/60 p-4 font-mono-technical text-mono-technical text-on-surface-variant">
                  Cloudinary uploads use a server-side signature, so the API secret stays out of the browser bundle.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {mergedCertificateSlots.map((slot, index) => (
                  <article
                    className="bg-surface-container-low/50 backdrop-blur-xl border border-primary/10 rounded-2xl overflow-hidden min-w-0"
                    key={slot.slot}
                  >
                    <div className="min-h-[220px] sm:aspect-[4/3] bg-surface-container-lowest/60 flex items-center justify-center overflow-hidden">
                      {slot.image ? (
                        <img alt={slot.title} className="w-full h-full object-cover" src={slot.image} />
                      ) : (
                        <div className="text-center p-8">
                          <span className="material-symbols-outlined text-primary text-5xl mb-4 block">add_photo_alternate</span>
                          <p className="font-mono-technical text-mono-technical text-on-surface-variant">No image uploaded</p>
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="font-label-caps text-label-caps text-primary tracking-widest uppercase">{slot.slot}</p>
                        <h3 className="font-body-lg text-body-lg text-on-surface mt-1 break-words">{slot.title}</h3>
                        <p className="font-mono-technical text-mono-technical text-on-surface-variant mt-1">{slot.issuer}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          accept="image/*"
                          className="sr-only"
                          id={`certificate-upload-${index}`}
                          onChange={(event) => {
                            handleCertificateUpload(slot, event.target.files?.[0]);
                            event.target.value = "";
                          }}
                          type="file"
                        />
                        <label
                          className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-caps text-label-caps px-4 py-3 rounded-full hover:bg-primary-fixed transition-colors"
                          htmlFor={`certificate-upload-${index}`}
                        >
                          <span className="material-symbols-outlined text-[18px]">upload_file</span>
                          {slot.image ? "Replace" : "Upload"}
                        </label>
                        {slot.image && (
                          <button
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-error/30 text-error font-label-caps text-label-caps px-4 py-3 rounded-full hover:bg-error/10 transition-colors"
                            onClick={() => handleCertificateRemove(slot)}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
          </>
        )}
        </main>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-md px-4">
          <div className="bg-surface-container-high border border-error/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <span className="material-symbols-outlined text-error text-5xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Confirm Delete</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              This action cannot be undone. The record will be permanently removed.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-6 py-3 rounded-full border border-primary/30 text-on-surface font-label-caps text-label-caps hover:bg-surface-variant transition-colors"
                onClick={() => setConfirmDelete(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 rounded-full bg-error text-on-error font-label-caps text-label-caps hover:opacity-90 transition-opacity"
                onClick={() => {
                  if (activeTab === "consultations") handleDeleteConsultation(confirmDelete);
                  else handleDeleteMessage(confirmDelete);
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
