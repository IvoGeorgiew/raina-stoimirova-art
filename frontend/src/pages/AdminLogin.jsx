// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const API_URL = import.meta.env.VITE_API_URL;

    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // FormData required by backend
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      // Save token in localStorage
      localStorage.setItem("token", data.access_token);

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>

        {error && (
          <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-700 text-white py-2 rounded-lg font-semibold hover:bg-red-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
