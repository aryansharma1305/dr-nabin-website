const BASE = "/api/consultations";

// ── Submit a new consultation request ──
export async function submitBookConsultation(data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Submission failed.");
  return json;
}

// ── Admin: fetch all consultations ──
export async function getConsultations() {
  const res = await fetch(BASE);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to load consultations.");
  // Normalise DB snake_case → camelCase for the Admin UI
  return (json.data || []).map(normalise);
}

// ── Admin: delete a consultation ──
export async function deleteConsultation(id) {
  const res = await fetch(`${BASE}?id=${id}`, { method: "DELETE" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Delete failed.");
  return json;
}

// Map Postgres snake_case columns → camelCase used in the UI
function normalise(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    consultType: row.consult_type,
    timeframe: row.timeframe,
    message: row.message,
    submittedAt: row.submitted_at,
    type: "consultation",
  };
}
