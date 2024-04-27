import React from "react";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { currentUserAtom } from "../../jotaiLib/lib";
import { useNavigate } from "react-router-dom";
import OAuth from "./OAuth";
import Apple from "./Apple";
function Signin() {
  const setCurrentUser = useSetAtom(currentUserAtom);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      const { username, _id, avatar } = data;
      setCurrentUser({
        username,
        _id,
        avatar,
      });
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center align-middle sm:items-center h-lvh w-full">
      <div className="sm:size-[520px] sm:rounded-lg sm:border-gray-500 sm:border flex flex-col gap-4 p-10 sm:px-24 sm:py-10">
        <h1 className="text-gray-200 text-4xl font-semibold">Sign in to X</h1>
        <div className="flex flex-col gap-4">
          <OAuth text={"Sign in with Google"} />
          <Apple />
        </div>
        <div className="flex items-center text-white w-full gap-2">
          <hr className="flex-1" />
          <div>or</div>
          <hr className="flex-1" />
        </div>
        <form className="flex-col flex gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <input
              type="email"
              className="w-full p-4 bg-transparent border border-gray-800 focus:border-blue-600 transition-colors outline-none  text-white"
              placeholder="Email"
              required
              id="email"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="password"
              className="w-full p-4 bg-transparent border border-gray-800 focus:border-blue-600 transition-colors outline-none  text-white"
              placeholder="Password"
              required
              id="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button
            className="w-full bg-white text-black p-3 rounded-2xl font-semibold text-xl disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "loggiing in" : "Login"}
          </button>
          {error && (
            <span className="text-[#d80000d0] font-semibold text-center">
              {error}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signin;
