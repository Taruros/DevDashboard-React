const TodoItem = ({ id, todo, removeTodo }) => {
  return (
    <li className="todo-item">
      {todo}

      <button
        className="btn btn-todo-delete"
        onClick={() => {
          removeTodo(id);
        }}
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;
