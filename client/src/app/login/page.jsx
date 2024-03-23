"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [rollno, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading with a delay
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Ensure correct content type
        },
        body: new URLSearchParams({
          // Convert form data to URLSearchParams format
          rollno: rollno,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error registering user.");
    }
  };

  return (
    <main
      className={`min-h-screen flex items-center justify-center ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md transform transition-transform duration-500">
        <div className="mb-10 text-center text-4xl text-purple-600">LOGIN</div>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="text" className="p-1">
              Roll Number
            </label>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 my-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          {/* <Link href={"/home"}> */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-700 p-3 my-2"
            >
              Submit
            </button>
          {/* </Link> */}
        </form>
        <div className="flex justify-center items-center">{message}</div>
        {message === "Login Successful" && (
          <Link href="/home">
            <div className="flex justify-center item-center hover:text-purple-400">Click to go further</div>
          </Link>
        )}
      </div>
    </main>
  );
};

export default LoginPage;