import { useSelector } from "react-redux";
import TodoCard from "./TodoCard";

const TodoList = ({ filter }) => {
  const todos = useSelector((state) => state.todos);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "deleted") return todo.deleted === true;
    if (todo.deleted) return false;
    if (filter === "pending") return todo.status !== "Completed";
    if (filter === "completed") return todo.status === "Completed";
    return true;
  });

  return (
    <div className="flex flex-wrap gap-6 mt-6">
      {filteredTodos.length === 0 ? (
        <p className="text-gray-400 text-lg">No {filter} todos found.</p>
      ) : (
        filteredTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;
