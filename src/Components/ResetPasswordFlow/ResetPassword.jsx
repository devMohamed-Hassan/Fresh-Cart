import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPassword({ email }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password })
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) return toast.error(data.message);
      toast.success("Password reset successfully");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleReset} className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md"
      />
      <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md">
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPassword;