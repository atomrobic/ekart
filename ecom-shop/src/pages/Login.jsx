import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  otp: z.string().min(4, "OTP must be at least 4 digits").optional(),
});

const Login = () => {
  const carouselImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?...",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?...",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?...",
  ];

  const [showOtp, setShowOtp] = useState(false);
  const redirect = (path) => {
    window.location.href = path;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (!showOtp) {
        // Step 1: Send email + password to backend
        const res = await fetch("https://ecom-new-4bgv.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || "Login failed");
        }

        // Step 2: If login success, request OTP
        await fetch(`https://ecom-new-4bgv.onrender.com/send-otp?email=${data.email}`, {
          method: "POST",
        });

        setShowOtp(true); // Show OTP input
      } else {
        // Step 3: Verify OTP
        const { email, otp } = getValues();
        const res = await fetch(
          `https://ecom-new-4bgv.onrender.com/verify-otp?email=${email}&otp=${otp}`,
          {
            method: "POST",
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || "Invalid OTP");
        }

        alert("OTP Verified! Login complete");
        redirect("/home"); // Redirect to dashboard or home page
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-white overflow-x-hidden">
      {/* Carousel */}
      <div className="hidden lg:flex w-1/2 h-screen bg-gray-100">
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          stopOnHover={false}
          swipeable={false}
          emulateTouch={false}
          className="w-full h-full"
        >
          {carouselImages.map((img, i) => (
            <div key={i} className="h-screen">
              <img src={img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full border px-3 py-2 rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* OTP Input (conditionally shown) */}
          {showOtp && (
            <div>
              <label className="block font-medium mb-1">OTP</label>
              <input
                type="text"
                {...register("otp")}
                placeholder="Enter the OTP"
                className="w-full border px-3 py-2 rounded-lg"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#141414] text-white py-2 rounded-lg font-bold"
          >
            {showOtp ? "Verify OTP" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
