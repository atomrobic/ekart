import '../index.css';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
// ✅ Zod schema
const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const redirect = (path) => {
    window.location.href = path;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Register and send OTP
  const onSubmit = async (data) => {
    const { confirmPassword, ...formData } = data;
    setEmail(formData.email);

    try {
      const res = await fetch("https://ecom-new-4bgv.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail);
      }

      const otpRes = await fetch(`https://ecom-new-4bgv.onrender.com/send-otp?email=${formData.email}`, {
        method: "POST",
      });

      if (!otpRes.ok) {
        const errorData = await otpRes.json();
        console.error("Error sending OTP:", errorData);
        alert("Failed to send OTP");
        return;
      }

      alert("OTP sent to your email.");
      setShowOtp(true);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed: " + error.message);
    }
  };

  // ✅ Handle OTP Verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://ecom-new-4bgv.onrender.com/verify-otp?email=${email}&otp=${otp}`);
      const data = response.data;

      if (response.status === 200) {
        alert("OTP verified successfully");
        // redirect or clear state if needed
        redirect("/home"); // Assuming you want to redirect to login after successful registration
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2 sm:gap-4 text-[#141414]">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">ShopOnline</h2>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden sm:flex items-center gap-4 lg:gap-9">
            <a className="text-sm font-medium hover:text-opacity-80" href="#">Home</a>
            <a className="text-sm font-medium hover:text-opacity-80" href="#">Shop</a>
            <a className="text-sm font-medium hover:text-opacity-80" href="#">About</a>
            <a className="text-sm font-medium hover:text-opacity-80" href="#">Contact</a>
          </div>
          <button className="hidden sm:flex min-w-[84px] h-10 px-4 bg-[#f2f2f2] text-sm font-bold rounded-lg hover:bg-[#e0e0e0] transition-colors">
            Sign In
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center py-5 px-4 sm:px-10 lg:px-40">
        <div className="w-full max-w-[512px] py-5">
          <h2 className="text-[28px] font-bold text-center pb-3 pt-5">
            Create an Account
          </h2>

          {!showOtp ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-base font-medium pb-2">Name</label>
                <input
                  {...register("name")}
                  placeholder="Enter your name"
                  className="w-full h-14 px-4 border rounded-lg focus:outline-none focus:border-black"
                />
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-base font-medium pb-2">Email</label>
                <input
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full h-14 px-4 border rounded-lg focus:outline-none focus:border-black"
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-base font-medium pb-2">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Enter password"
                  className="w-full h-14 px-4 border rounded-lg focus:outline-none focus:border-black"
                />
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-base font-medium pb-2">Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm password"
                  className="w-full h-14 px-4 border rounded-lg focus:outline-none focus:border-black"
                />
                <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-10 bg-black text-white rounded-lg font-bold hover:bg-opacity-90 transition-colors"
                >
                  Register
                </button>
              </div>

              <p className="text-sm text-center text-gray-500 underline pt-2 hover:text-black cursor-pointer">
                Already have an account? Sign in
              </p>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-center">
                Enter OTP sent to {email}
              </h3>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full h-14 px-4 border rounded-lg focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="w-full h-10 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
