"use client";
import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mname, setMname] = useState("");
  const [rollno, setRollno] = useState("");
  const [message, setMessage] = useState("");

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
          username: username,
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
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md">
        <div className="mb-10 text-center text-4xl text-purple-600">
          TRACKNTRACE
        </div>
        <form onSubmit={handleSubmit}>
          <p>
            <b>User Login</b>
          </p>
          <p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          <p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          <p>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="Enter your First Name"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          <p>
            <input
              type="text"
              value={mname}
              onChange={(e) => setMname(e.target.value)}
              placeholder="Enter your Middle Name"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          <p>
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder="Enter your Last Name"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          <p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your E-Mail Address"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          <p>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              placeholder="Enter your Roll Number"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          <p>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone Number"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </p>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
          >
            Submit
          </button>
        </form>
      </div>
      <div>{message}</div>
    </main>
  );
};

export default LoginPage;
