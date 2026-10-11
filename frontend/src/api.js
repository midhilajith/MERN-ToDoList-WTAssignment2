// All calls to the backend REST API live here (Assignment B6).
const BASE = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/tasks`;

// Shared helper: send a request and return parsed JSON, or throw a readable error
async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

const jsonOptions = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

// GET /api/tasks
export const getTasks = () => request(BASE);

// POST /api/tasks
export const createTask = (title) => request(BASE, jsonOptions("POST", { title }));

// PUT /api/tasks/:id  (updates = { completed } and/or { title })
export const updateTask = (id, updates) => request(`${BASE}/${id}`, jsonOptions("PUT", updates));

// DELETE /api/tasks/:id
export const deleteTask = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
