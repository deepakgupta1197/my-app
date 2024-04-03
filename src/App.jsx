import React, { useState } from "react";
import "./App.css";
import AddNewTodo from "./components/AddNewTodo";
import TodoList from "./components/TodoList";
import { useEffect } from "react";

function getLocalData(){
  return JSON.parse(localStorage.getItem('todos'))
}
let nextId = 3;
function App() {
  let [todos, setTodos] = useState(getLocalData());
  let total = todos.length;
  let completed = todos.filter((todo) => todo.completed).length;
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
  // add data to local storage
  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos]
  );
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

export default App;
