import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateTodo } from "../features/todosSlice";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todo = useSelector((state) => state.todos.find((t) => t.id === id));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: todo?.title || "",
    desc: todo?.desc || "",
    due: todo?.due || "",
    status: todo?.status || "Pending",
  });

  if (!todo) {
    return (
      <div className="text-white text-center mt-20">
        <p>Todo not found.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-600 rounded"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ ...todo, ...formData }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">Event Details</h1>

        {!isEditing ? (
          <>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-1">
                Title
              </h3>
              <p className="text-white">{todo.title}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-1">
                Description
              </h3>
              <p className="text-gray-300">{todo.desc}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-1">
                Due Date
              </h3>
              <p className="text-white">{todo.due}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-1">
                Status
              </h3>
              <p className="text-yellow-400">{todo.status}</p>
            </div>

            {todo.deleted && (
              <p className="text-red-500 font-semibold">
                This task is deleted.
              </p>
            )}

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Edit Event
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Back to Dashboard
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Title</label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                name="desc"
                rows="3"
                value={formData.desc}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Due Date</label>
              <input
                name="due"
                type="date"
                value={formData.due}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TodoDetails;
