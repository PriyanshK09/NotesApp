// src/components/Note.js
import React, { useState } from "react";
import "./Note.css";

function Note({ note, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleEdit = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  return (
    <div
      className="note"
      style={{ backgroundColor: note.color.background, color: note.color.text }}
    >
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <p>{note.text}</p>
      )}
      <div className="note-footer">
        <small>{note.date}</small>
        <div className="note-actions">
          {isEditing ? (
            <button
              onClick={handleEdit}
              className="save-button"
              title="Save"
            ></button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
                title="Edit"
              ></button>
              <button
                onClick={onDelete}
                className="delete-button"
                title="Delete"
              ></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;
