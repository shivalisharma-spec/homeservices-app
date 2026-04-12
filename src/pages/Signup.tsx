import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "@/api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!form.name || !form.email || !form.password) {
        alert("Please fill all fields");
        return;
      }

      const res = await API.post("/api/signup", form);

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Signup successful 🎉");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        {/* NAME */}
        <input
          name="name"
          className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          name="email"
          className="border p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          name="password"
          className="border p-3 w-full mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-medium cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}