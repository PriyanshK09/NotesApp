// src/components/MainPage.js
import React, { useState, useEffect } from "react";
import Note from "./Note";
import "./MainPage.css";

function MainPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const username = localStorage.getItem("username") || "User";
  const MAX_CHARS = 200;

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
    const savedTheme = localStorage.getItem("theme") || "light";
    setDarkMode(savedTheme === "dark");
  }, []);

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

  const addNote = () => {
    if (newNote.trim() && newNote.length <= MAX_CHARS) {
      const note = {
        text: newNote,
        date: new Date().toLocaleDateString("en-GB"),
        color: getRandomColor(),
      };
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNewNote("");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const editNote = (index, newText) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = newText;
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
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
            .map((note, index) => (
              <Note
                key={index}
                note={note}
                onDelete={() => deleteNote(index)}
                onEdit={(newText) => editNote(index, newText)}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
