import Todo from "./Todo";

export default function TodoList({ todos, onDelete, onToggleComplete, onEditedSave }) {
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