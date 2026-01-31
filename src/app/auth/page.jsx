"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup states
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      console.log(data);
      setMessage("Login successful ✅");
      router.push("/"); // ✅ redirect here
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: signUpName,
          email: signUpEmail,
          password: signUpPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      setMessage("Account created successfully 🎉");
      setIsLogin(true);
      setSignUpName("");
      setSignUpEmail("");
      setSignUpPassword("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden w-full max-w-150 h-[90%] m-2">
      <div className="login-sign-up-container h-full w-full relative">
        <div className="h-full w-full mx-auto overflow-hidden">
          {/* LOGIN */}
          <div
            className={`login-container items-center justify-between absolute left-0 top-0 w-full h-full flex ${
              isLogin ? "z-10" : "z-0"
            }`}
          >
            <div
              className={`Login_sidebar_header p-5 z-5 h-full rounded-r-full flex items-center bg-black transition-all duration-400 text-white font-bold ${
                isLogin ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <h1 className="text-5xl">Login</h1>
            </div>
            <div
              className={`p-5 flex items-center justify-center flex-col duration-400 gap-5 w-full h-full ${
                isLogin ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <form
                onSubmit={onLogin}
                className="login-form items-center justify-center w-full flex flex-col gap-5"
              >
                <div className="email_con flex w-full flex-col gap-1">
                  <label
                    className="text-sm font-bold text-gray-500"
                    htmlFor="login-mail"
                  >
                    Enter Email
                  </label>
                  <input
                    id="login-mail"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="border-2 border-gray-300 outline-gray-400 p-2 w-full text-md tracking-wider text-gray-700"
                  />
                </div>
                <div className="password_con flex w-full flex-col gap-1">
                  <label
                    className="text-sm font-bold text-gray-500"
                    htmlFor="login-pass"
                  >
                    Enter Password
                  </label>
                  <input
                    id="login-pass"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="border-2 border-gray-300 outline-gray-400 p-2 w-full text-md tracking-wider text-gray-700"
                  />
                </div>
                <button
                  disabled={loading}
                  className="p-3 bg-black text-white text-xl font-bold px-7 cursor-pointer rounded-md disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div>
                <p className="font-bold">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setIsLogin(false)}
                    className="text-sm underline inline-block cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* SIGN UP */}
          <div
            className={`sign-up-container absolute left-0 top-0 w-full h-full flex ${
              isLogin ? "z-0" : "z-10"
            }`}
          >
            <div
              className={`p-5 flex items-center justify-center duration-400 flex-col w-full gap-5 h-full ${
                isLogin ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              <form
                onSubmit={onSignUp}
                className="sign-up-form items-center justify-center w-full flex flex-col gap-5"
              >
                <div className="name_con w-full flex flex-col gap-1">
                  <label
                    className="text-sm font-bold text-gray-500"
                    htmlFor="sign-up-name"
                  >
                    Enter Name
                  </label>
                  <input
                    id="sign-up-name"
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="border-2 border-gray-300 outline-gray-400 p-2 w-full text-md tracking-wider text-gray-700"
                  />
                </div>
                <div className="email_con w-full flex flex-col gap-1">
                  <label
                    className="text-sm font-bold text-gray-500"
                    htmlFor="sign-up-mail"
                  >
                    Enter Email
                  </label>
                  <input
                    id="sign-up-mail"
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="border-2 border-gray-300 outline-gray-400 p-2 w-full text-md tracking-wider text-gray-700"
                  />
                </div>
                <div className="sign-up-password-con flex w-full flex-col gap-1">
                  <label
                    className="text-sm font-bold text-gray-500"
                    htmlFor="sign-up-pass"
                  >
                    Enter Password
                  </label>
                  <input
                    id="sign-up-pass"
                    type="password"
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="border-2 border-gray-300 outline-gray-400 p-2 w-full text-md tracking-wider text-gray-700"
                  />
                </div>
                <button
                  disabled={loading}
                  className="p-3 bg-black text-white text-xl font-bold px-7 cursor-pointer rounded-md disabled:opacity-50"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              <div>
                <p className="font-bold">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsLogin(true)}
                    className="text-sm z-5 underline inline-block cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>

            <div
              className={`Login_sidebar_header text-center p-5 h-full rounded-l-full flex items-center bg-black transition-all duration-400 text-white font-bold ${
                isLogin ? "translate-x-full" : "translate-x-0"
              }`}
            >
              <h1 className="text-5xl line-clamp-2">Sign Up</h1>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-bold text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default page;
