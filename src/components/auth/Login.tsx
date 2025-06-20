"use client";

import { Login } from "@/api/auth";
import { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      setError("Please enter your username and password");
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your username and password",
      });
      return;
    }

    try {
      const response = await Login({ username, password });
      Cookies.set("access_token", response.access_token, { expires: 1 });
      Cookies.set("refresh_token", response.refresh_token, { expires: 7 });

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
      });

      router.push("/");
    } catch (error: unknown) {
      setLoading(false);

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object"
      ) {
        const errResponse = (error as any).response;

        if (errResponse.status === 401) {
          setError("Invalid username or password");
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid username or password",
          });
        } else if (errResponse.status === 422) {
          const validationMessage =
            (errResponse.data?.message as string) || "Validation failed";
          setError(validationMessage);
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: validationMessage,
          });
        } else {
          setError("Something went wrong. Please try again later.");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong. Please try again later.",
          });
        }
      } else {
        setError("Unexpected error occurred.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unexpected error occurred.",
        });
      }
    }
  };

  return (
    <div className=" flex h-screen mx-auto bg-primary w-full text-primary">
      <div className=" w-full  flex flex-col bg-background_secondary items-center justify-center ">
        {/* modal */}
        <div className=" px-5 w-fit text-xs md:text-base lg:text-sm  xl:text-base lg:w-[350px] lg:h-[450px] xl:w-[500px] xl:h-[500px] rounded-2xl p-10  shadow flex flex-col gap-5 bg-primary text-secondary  ">
          {/* title */}
          <div className=" flex flex-col gap-2">
            {" "}
            <p className=" text-3xl lg:text-2xl xl:text-3xl text-secondary font-bold">
              Login
            </p>
            <p>Please log in to access our AI-powered features.</p>
          </div>
          {/* form */}
          <form
            className="flex flex-col gap-5 justify-center"
            onSubmit={handleSubmit}
          >
            {/* {error && <p className="text-red-500">{error}</p>}{" "} */}
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
                  placeholder="Username"
                  className="border-2 rounded-lg px-5 py-2 text-primary font-semibold bg-secondary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Password</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Menghubungkan state dengan input
                  maxLength={64}
                  placeholder="Password"
                  className="border-2 rounded-lg px-5 py-2 text-primary font-semibold bg-secondary"
                />
              </div>
            </div>
            <div className="flex justify-between px-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="keep-signed-in"
                  id="keep-signed-in"
                />
                <p>Keep me signed in</p>
              </div>

              <p className="underline font-semibold">Forgot password?</p>
            </div>
            <button
              type="submit" // Pastikan ini adalah tombol submit
              className="w-full p-3 rounded-lg bg-secondary text-primary hover:bg-third hover:text-primary"
              disabled={loading} // Menonaktifkan tombol saat loading
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-button underline font-semibold"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
