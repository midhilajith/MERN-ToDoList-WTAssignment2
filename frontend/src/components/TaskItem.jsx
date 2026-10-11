import { useState } from "react";

// A single task row: checkbox (B4), inline edit, and delete button (B5)
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = async () => {
    if (draft.trim() === task.title) return setEditing(false);
    const ok = await onEdit(task, draft);
    if (ok) setEditing(false);
  };

  const cancel = () => {
    setDraft(task.title);
    setEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "not done" : "done"}`}
      />

      {editing ? (
        <input
          className="edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          aria-label="Edit task title"
        />
      ) : (
        <span className="title">{task.title}</span>
      )}

      <div className="actions">
        {editing ? (
          <>
            <button onClick={save}>Save</button>
            <button className="ghost" onClick={cancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="ghost" onClick={() => setEditing(true)}>Edit</button>
            <button className="danger" onClick={() => onDelete(task._id)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
