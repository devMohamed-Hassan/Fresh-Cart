import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import VerifyCode from "./VerifyCode";
import ResetPassword from "./ResetPassword";

function ResetFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {step === 1 && (
        <ForgotPassword
          onNext={() => setStep(2)}
          setEmail={setEmail}
        />
      )}
      {step === 2 && (
        <VerifyCode email={email} onVerified={() => setStep(3)} />
      )}
      {step === 3 && <ResetPassword email={email} />}
    </div>
  );
}

export default ResetFlow;
