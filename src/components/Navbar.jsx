import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const todos = useSelector((state) => state.todos);

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const filteredTodos = todos.filter(
    (todo) =>
      !todo.deleted &&
      (todo.title.toLowerCase().includes(query.toLowerCase()) ||
        todo.desc.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 relative">
      {/* Left: App Name */}
      <div className="text-2xl font-semibold text-white">TodoMate</div>

      {/* Right: Search + Auth */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {user && showSearch && (
          <div className="relative w-64">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
              placeholder="Search events..."
            />
            {query && (
              <div className="absolute z-50 bg-gray-800 w-full mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
                {filteredTodos.length > 0 ? (
                  filteredTodos.map((todo) => (
                    <div
                      key={todo.id}
                      onClick={() => {
                        navigate(`/todo/${todo.id}`);
                        setQuery("");
                        setShowSearch(false);
                      }}
                      className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                    >
                      {todo.title}
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-gray-400">
                    No results found
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {user && (
          <button
            onClick={() => {
              setShowSearch((prev) => !prev);
              setQuery("");
            }}
            className="text-white hover:text-blue-400 transition"
          >
            <Search size={20} />
          </button>
        )}

        <button
          onClick={handleAuthClick}
          className="bg-blue-600 px-4 py-2 rounded text-white text-sm hover:bg-blue-700 transition"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
