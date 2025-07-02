import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../features/todosSlice";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();

  const toggleStatus = () => {
    if (!todo.deleted) {
      dispatch(
        updateTodo({
          ...todo,
          status: todo.status === "Pending" ? "Completed" : "Pending",
        })
      );
    }
  };

  const handleDelete = () => {
    if (!todo.deleted) {
      dispatch(deleteTodo(todo.id));
    }
  };

  const handleRestore = () => {
    dispatch(
      updateTodo({
        ...todo,
        deleted: false,
      })
    );
  };

  return (
    <div
      className={`relative bg-gray-800 border ${
        todo.deleted ? "border-red-600 opacity-60" : "border-gray-600"
      } rounded-xl p-5 shadow-md hover:shadow-lg transition duration-200 w-full max-w-sm`}
    >
      {todo.deleted && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
          Deleted
        </div>
      )}

      <h2 className="text-xl font-semibold text-white mb-2">{todo.title}</h2>
      <p className="text-gray-300 mb-3">{todo.desc}</p>
      <div className="text-sm text-gray-400 mb-1">
        Due: <span className="text-white">{todo.due}</span>
      </div>
      <div className="text-sm text-yellow-400 mb-4">Status: {todo.status}</div>

      <div className="flex flex-col gap-2">
        {!todo.deleted ? (
          <>
            <button
              onClick={toggleStatus}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Mark {todo.status === "Pending" ? "Completed" : "Pending"}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={handleRestore}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          >
            Restore
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
