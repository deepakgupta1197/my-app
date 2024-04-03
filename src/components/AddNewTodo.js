import { useState } from "react";

export default function AddNewTodo({ onAddNewTodo }) {
    let [title, setTitle] = useState("");
    return (
      <div className="add-new-todo">
        <input
          placeholder="title..."
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <button onClick={() => onAddNewTodo(title)}>Add</button>
      </div>
    );
  }