import { useState } from "react";

// B3: form to add a new task
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser's full page reload
    if (!title.trim()) return;
    const ok = await onAdd(title);
    if (ok) setTitle(""); // clear the input only after a successful save
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New task"
      />
      <button type="submit">Add task</button>
    </form>
  );
}
