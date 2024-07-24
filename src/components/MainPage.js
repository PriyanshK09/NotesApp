// src/components/MainPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";
import "./MainPage.css";

function MainPage({ logout }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const username = localStorage.getItem("username") || "User";
  const MAX_CHARS = 200;

  useEffect(() => {
    fetchNotes();
    const savedTheme = localStorage.getItem("theme") || "light";
    setDarkMode(savedTheme === "dark");
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://note-app-backend-ssw7.onrender.com/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const getRandomColor = () => {
    const colors = [
      { background: "#FFD700", text: "#000000" },
      { background: "#98FB98", text: "#000000" },
      { background: "#FFA07A", text: "#000000" },
      { background: "#87CEFA", text: "#000000" },
      { background: "#DDA0DD", text: "#000000" },
      { background: "#F0E68C", text: "#000000" },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addNote = async () => {
    if (newNote.trim() && newNote.length <= MAX_CHARS) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://note-app-backend-ssw7.onrender.com/api/notes",
          {
            text: newNote,
            color: getRandomColor(),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotes([...notes, response.data]);
        setNewNote("");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://note-app-backend-ssw7.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = async (id, newText) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://note-app-backend-ssw7.onrender.com/api/notes/${id}`,
        { text: newText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.text.localeCompare(b.text);
    }
  });

  return (
    <div className={`main-container ${darkMode ? "dark" : "light"}`}>
      <aside className="sidebar">
        <div className="logo">📝</div>
        <nav className="menu">
          <button className="menu-item active" title="Home">
            🏠
          </button>
          <button className="menu-item" title="Add Note">
            ➕
          </button>
          <button className="menu-item" title="Settings">
            ⚙️
          </button>
          <button className="menu-item" onClick={logout} title="Logout">
            🚪
          </button>
        </nav>
        <button
          className="theme-switch"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </aside>
      <main className="content">
        <header className="header">
          <h1>
            Welcome back, <span>{username}</span> 👋
          </h1>
        </header>
        <div className="search-sort-container">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="alphabetical">Sort Alphabetically</option>
          </select>
        </div>
        <div className="notes-grid">
          <div className="note new-note">
            <textarea
              placeholder="Type to add a new note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value.slice(0, MAX_CHARS))}
            ></textarea>
            <div className="note-footer">
              <small>{MAX_CHARS - newNote.length} characters remaining</small>
              <button
                onClick={addNote}
                disabled={newNote.length === 0 || newNote.length > MAX_CHARS}
              >
                Add Note
              </button>
            </div>
          </div>
          {sortedNotes
            .filter((note) =>
              note.text.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((note) => (
              <Note
                key={note._id}
                note={note}
                onDelete={() => deleteNote(note._id)}
                onEdit={(newText) => editNote(note._id, newText)}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default MainPage;