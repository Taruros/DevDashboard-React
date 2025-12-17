import { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem.jsx";

const Todo = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todoInput, setTodoInput] = useState("");

  const addTodo = () => {
    if (todoInput.trim()) {
      const newTodo = { id: Date.now(), text: todoInput.trim() };
      setTodos((old) => [...old, newTodo]);
      setTodoInput("");
    }
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((t) => t.id != id);
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="module todo-module">
      <input
        type="text"
        id="input-todo"
        name="todo"
        placeholder="Enter a todo..."
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />

      <button className="btn btn-add-todo" onClick={addTodo}>
        Add
      </button>

      <ul className="todo-list">
        {todos
          ? todos.map((e) => (
              <TodoItem
                key={e.id}
                id={e.id}
                todo={e.text}
                removeTodo={removeTodo}
              />
            ))
          : ""}
      </ul>
    </div>
  );
};

export default Todo;
