import React, { useState } from "react";
import "./App.css";
let initialTodos = [
  { id: 0, title: "lunch", completed: false },
  { id: 1, title: "revision", completed: true },
  { id: 2, title: "exercise", completed: false },
];
let nextId = 3;
function App() {
  let [todos, setTodos] = useState(initialTodos);
  let total = todos.length;
  let completed = todos.filter((todo) => todo.completed).length;
  console.log(todos);
  function handleDelete(deletedId) {
    setTodos(todos.filter((todo) => todo.id !== deletedId));
  }
  function handleToggleComplete(toggleId) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === toggleId) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  }
  function handleEditedSave(editedId, text) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editedId) {
          return { ...todo, title: text };
        } else {
          return todo;
        }
      })
    );
  }
  function handleAddNewTodo(title) {
    setTodos([...todos, { id: nextId++, title: title, completed: false }]);
  }
  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
      </header>
      <AddNewTodo onAddNewTodo={handleAddNewTodo} />
      <TodoList
        onEditedSave={handleEditedSave}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        todos={todos}
      />
      <p>
        total todos : {total} , completed todos : {completed}
      </p>
    </div>
  );
}

function TodoList({ todos, onDelete, onToggleComplete, onEditedSave }) {
  return (
    <div className="todo-list">
      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => {
          return (
            <Todo
              onEditedSave={onEditedSave}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              key={todo.id}
              todo={todo}
            ></Todo>
          );
        })}
      </ul>
    </div>
  );
}

function Todo({ todo, onDelete, onToggleComplete, onEditedSave }) {
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

function AddNewTodo({ onAddNewTodo }) {
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
export default App;
