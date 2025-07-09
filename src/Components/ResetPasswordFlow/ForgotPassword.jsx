import React, { useState } from "react";
import { toast } from "react-toastify";

function ForgotPassword({ onNext, setEmail }) {
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) return setError(data.message);
      toast.success(data.message);
      setEmail(emailInput);
      onNext();
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        required
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
      <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md">
        {loading ? "Sending..." : "Send Code"}
      </button>
      {error && <p className="mt-1 text-sm text-red-500 bg-gray-100 p-1 rounded-md">{error}</p>}

    </form>
  );
}


export default ForgotPassword;
