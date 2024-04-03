import { useState } from "react";

export default function Todo({ todo, onDelete, onToggleComplete, onEditedSave }) {
    let [isEditing, setIsEditing] = useState(false);
    let [text, setText] = useState(todo.title);
    function handleSave(id) {
      setIsEditing(false);
      onEditedSave(id, text);
    }
    if (isEditing) {
      return (
        <li className="todo">
          <input
            value={text}
            type="text"
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => handleSave(todo.id)}>Save</button>
        </li>
      );
    } else {
      return (
        <li className="todo">
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
            />
            {todo.title}
          </label>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </li>
      );
    }
  }