import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../features/todosSlice";
import TodoList from "../components/TodoList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTodo = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      due: formData.get("due"),
      status: "Pending",
    };
    dispatch(addTodo(newTodo));
    setShowModal(false);
    e.target.reset();
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900 min-h-screen text-white relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Welcome, {user?.displayName}
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 p-2 rounded-full hover:bg-blue-700"
          title="Add Todo"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["all", "pending", "completed", "deleted"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded capitalize text-sm ${
              filter === type ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {type} Todos
          </button>
        ))}
      </div>

      {/* Todo List */}
      <TodoList filter={filter} />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 text-white rounded-xl w-full max-w-lg p-6 shadow-xl relative transform transition-all duration-300 animate-fadeInModal">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">Create New Todo</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                type="text"
                placeholder="Title"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
              <textarea
                name="desc"
                placeholder="Description"
                rows="3"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                required
              ></textarea>
              <input
                name="due"
                type="date"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Save Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
