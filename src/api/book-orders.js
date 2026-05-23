const BASE = "/api/book-orders";

export async function submitBookOrder(data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Book order failed.");
  return json;
}

export async function getBookOrders() {
  const res = await fetch(BASE);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to load book orders.");
  return (json.data || []).map((row) => ({
    id: row.id,
    bookId: row.book_id,
    bookTitle: row.book_title,
    quantity: row.quantity,
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    submittedAt: row.submitted_at,
    type: "book-order",
  }));
}
