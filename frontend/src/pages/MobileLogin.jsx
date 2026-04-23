import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOTP, verifyOTP } from "../api/authApi";
import OTPInput from "../components/auth/OTPInput";
import { useEffect } from "react";

const MobileLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
  });

  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async () => {
    if (!formData.mobile || formData.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      await sendOTP(formData.mobile);
      toast.success("OTP sent Successfully!");
      setStep(2);
      setFormData((prev) => ({ ...prev, otp: "" }));
      setResendTimer(30); // Start 60 second timer for resending OTP
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    try {
      setLoading(true);

      const res = await verifyOTP({
        mobile: formData.mobile,
        code: formData.otp,
      });

      localStorage.setItem("token", res.data.accessToken);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      navigate("/schemes");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
      {/* Card */}
      <div
        className="
        w-full 
        max-w-sm sm:max-w-md lg:max-w-lg 
        bg-black border-2 border-gray-500 
        rounded-2xl 
        p-6 sm:p-8 lg:p-10 
        shadow-lg
      "
      >
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-6">
          Login with Mobile Number
        </h2>

        {step === 1 && (
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="text-xs sm:text-sm text-gray-400">Phone</label>
              <input
                type="tel"
                name="mobile"
                maxLength={10}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="
                w-full mt-1 px-3 sm:px-4 py-3 
                bg-gray-900 border border-gray-700 
                rounded-lg 
                text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-white 
                transition
              "
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="
              w-full 
              bg-white text-black 
              py-2 sm:py-3 
              rounded-lg 
              text-sm sm:text-base 
              font-medium 
              hover:bg-gray-200 
              transition
            "
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <OTPInput name="otp" value={formData.otp} onChange={handleChange} />

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="
              w-full 
              bg-white text-black 
              py-2 sm:py-3 
              rounded-lg 
              text-sm sm:text-base 
              font-medium 
              hover:bg-gray-200 
              transition
            "
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileLogin;
