import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/todos", {
        text: text.trim(),
      });
      setText("");
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (id, newText) => {
    if (newText === null) return;
    const trimmrd = newText.trim();
    if (!trimmrd) return;
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        text: trimmrd,
      });
      fetchTodos();
    } catch (error) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg:slate-50 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg:white rounded-2xl shadow-lg p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            MERN TODOLIST
          </h1>
          <span className="text-sm text-slate-500">Simple CURD UI Design</span>
        </header>

        <section className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="write todo..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
            ></input>

            <button
              onClick={addTodo}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-white font-medium"
            >
              + Add
            </button>
          </div>
        </section>
        <section>
          {loading ? (
            <div className="text-center py-8 text-slate-500">
              Loading todos...
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No Todos yet add your first task
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li key={todo._id} className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium">{todo.text}</p>
                    <p className="text-xs text-slate-400 mt-1">id:{todo._id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={()=>{
                      const newText = prompt("Edit Todo",todo.text);
                      updateTodo(todo._id,newText)
                    }}className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200">
                      🖊️
                    </button>
                    <button onClick={()=> deleteTodo(todo._id)}className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200">
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <footer className="mt-6 text-xs text-slate-400 text-right">
          tip:Press Enter to add todos
        </footer>
      </div>
    </div>
  );
};

export default App;
