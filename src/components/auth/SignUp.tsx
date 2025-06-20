"use client";

import { Register } from "@/api/auth";
import { useState } from "react";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telegram_user_id, setTelegram] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !username ||
      !email ||
      !telegram_user_id ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match.",
      });
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters.",
      });
    }

    try {
      await Register({
        username,
        email,
        telegram_user_id,
        password,
      });

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Register Successful",
        text: "Please login to continue.",
      });

      router.push("/auth/login");
    } catch (error: any) {
      setLoading(false);

      if (error.response?.status === 404) {
        setError("User not found");

        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: "User not found",
        });
      } else if (error.response?.status === 409) {
        setError("Email or username already in use.");

        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: "Email or username already in use.",
        });
      } else {
        setError("Something went wrong. Please try again later.");

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      }
    }
  };

  return (
    <div className=" flex h-full mx-auto bg-primary w-full text-primary">
      <div className=" w-full  flex flex-col bg-background_secondary items-center justify-center py-10">
        {/* modal */}
        <div className=" px-5 w-fit text-xs md:text-base lg:text-sm  xl:text-base lg:w-[350px] lg:h-full xl:w-[500px] xl:h-full rounded-2xl p-10  shadow flex flex-col gap-5 bg-primary text-secondary  ">
          {/* title */}
          <div className=" flex flex-col gap-2">
            {" "}
            <p className=" text-3xl lg:text-2xl xl:text-3xl text-secondary font-bold">
              Sign Up
            </p>
            <p>
              Don’t have an account? Register now to start using our AI
              features.
            </p>
          </div>
          {/* form */}
          <form
            className="flex flex-col gap-5 justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="font-bold">Username</p>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={64}
                  minLength={6}
                  placeholder="Username"
                  required
                  className="border-2 rounded-lg px-5 py-2 text-primary font-semibold bg-secondary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Email</p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={64}
                  minLength={6}
                  placeholder="Email"
                  required
                  className="border-2 rounded-lg px-5 py-2 text-primary font-semibold bg-secondary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Telegram User ID</p>
                <input
                  type="text"
                  name="telegram_user_id"
                  id="telegram_user_id"
                  value={telegram_user_id}
                  onChange={(e) => setTelegram(e.target.value)}
                  maxLength={64}
                  minLength={6}
                  placeholder="Telegram User ID"
                  required
                  className="border-2 rounded-lg px-5 py-2 text-primary font-semibold bg-secondary"
                />
                <div className=" flex flex-col gap-2 p-2">
                  <p>How to get your Telegram User ID:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Open the Telegram app (on your phone or desktop).</li>
                    <li>
                      Search for this bot: <strong>@userinfobot</strong>.
                    </li>
                    <li>
                      Click <strong>Start</strong>.
                    </li>
                    <li>
                      The bot will immediately reply with your user information,
                      including:
                      <ul className="list-disc list-inside ml-5 space-y-1">
                        <li>Your Telegram User ID</li>
                        <li>Your username (if you have one)</li>
                        <li>Your full name</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
              <div className=" relative flex flex-col gap-2">
                <p className="font-bold">Password</p>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={64}
                  minLength={6}
                  placeholder="Password"
                  required
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  className="border-2 rounded-lg px-5 py-2 text-primary font-semibold bg-secondary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-10 text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Retype Password</p>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  maxLength={64}
                  minLength={6}
                  placeholder="Password"
                  required
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  className="border-2 rounded-lg px-5 py-2 text-primary font-semibold bg-secondary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-secondary text-primary hover:bg-third hover:text-primary"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-button underline font-semibold"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
