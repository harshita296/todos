import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex justify-between items-center">
      <span className="text-2xl font-semibold text-white">TodoMate</span>
      <button
        onClick={handleAuthClick}
        className="bg-blue-600 px-4 py-2 rounded text-white text-sm hover:bg-blue-700 transition"
      >
        {user ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

export default Navbar;
