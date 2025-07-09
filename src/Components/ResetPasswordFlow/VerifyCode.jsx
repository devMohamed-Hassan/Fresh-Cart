import React, { useState } from "react";
import { toast } from "react-toastify";

function VerifyCode({ onVerified }) {
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) return toast.error(data.message);
      toast.success("Code verified");
      onVerified();
    } catch (err) {
      setLoading(false);
      toast.error("Verification failed");
    }
  };

  return (
    <form onSubmit={handleVerify} className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Enter Code</h2>
      <input
        type="text"
        placeholder="6-digit code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md text-center tracking-widest"
      />
      <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-md">
        {loading ? "Verifying..." : "Verify Code"}
      </button>
    </form>
  );
}

export default VerifyCode;