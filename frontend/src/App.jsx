// Main React component for the MERN To-Do List application
import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  // B2: tasks are kept in component state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // B2: fetch all tasks from the backend once, when the page loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Could not reach the server. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  // B3: POST the new task, then add the saved task (with its real _id) to state
  const handleAdd = async (title) => {
    try {
      setError("");
      const saved = await createTask(title);
      setTasks((prev) => [saved, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // B4: PUT the flipped "completed" value, then swap the updated task into state
  const handleToggle = async (task) => {
    try {
      setError("");
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit a task's title through the PUT endpoint
  const handleEdit = async (task, title) => {
    try {
      setError("");
      const updated = await updateTask(task._id, { title });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // B5: DELETE on the server, then remove the task from state
  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="app">
      <header className="header">
        <h1>To-Do List</h1>
        <p className="count">
          {tasks.length === 0 ? "Nothing to do yet" : `${remaining} of ${tasks.length} left`}
        </p>
      </header>

      <TaskForm onAdd={handleAdd} />

      {error && <p className="error" role="alert">{error}</p>}

      {loading ? (
        <p className="empty">Loading tasks…</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}
