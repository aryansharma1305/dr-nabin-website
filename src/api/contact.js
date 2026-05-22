const BASE = "/api/messages";

// ── Submit a contact message ──
export async function submitContact(data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Submission failed.");
  return json;
}

// ── Admin: fetch all messages ──
export async function getMessages() {
  const res = await fetch(BASE);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to load messages.");
  return (json.data || []).map(normalise);
}

// ── Admin: mark a message as read ──
export async function markMessageRead(id) {
  const res = await fetch(`${BASE}?id=${id}`, { method: "PATCH" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Update failed.");
  return json;
}

// ── Admin: delete a message ──
export async function deleteMessage(id) {
  const res = await fetch(`${BASE}?id=${id}`, { method: "DELETE" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Delete failed.");
  return json;
}

// Map Postgres snake_case columns → camelCase used in the UI
function normalise(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    read: row.is_read,
    submittedAt: row.submitted_at,
    type: "contact",
  };
}
