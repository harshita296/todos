import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    dispatch(
      setUser({
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
      })
    );
    navigate("/dashboard");
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="relative bg-gray-800 text-white p-10 rounded-2xl shadow-2xl w-full max-w-xl mx-4 text-center space-y-6">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-4xl font-extrabold">Welcome to TodoMate</h2>
        <p className="text-gray-300 text-base leading-relaxed">
          Manage tasks effortlessly. Set due dates, track your progress, and get
          things done — all in one simple dashboard.
        </p>

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
