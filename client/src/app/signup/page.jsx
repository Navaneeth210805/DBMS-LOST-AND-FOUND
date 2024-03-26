"use client";
import React, { useState } from "react";
import Link from "next/link";

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
      const response = await fetch("http://127.0.0.1:8080/api/register1", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Ensure correct content type
        },
        body: new URLSearchParams({
          // Convert form data to URLSearchParams format
          username: username,
          password: password,
          fname: fname,
          mname: mname,
          lname: lname,
          email: email,
          roll_no: rollno,
          phone_no: phone
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
      <div className="p-8 bg-white mt-6 mb-6 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md transform transition-transform duration-500">
        <div className="mb-10 text-center text-4xl text-indigo-800">
          SIGN UP
        </div>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="text" className="p-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border-2 border-indigo-500 ring-offset-2 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              required
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
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              required
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              First Name
            </label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="Enter your First Name"
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              required
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Middle Name
            </label>
            <input
              type="text"
              value={mname}
              onChange={(e) => setMname(e.target.value)}
              placeholder="Enter your Middle Name"
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Last Name
            </label>
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder="Enter your Last Name"
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              required
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your E-Mail Address"
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Roll Number
            </label>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              placeholder="Enter your Roll Number"
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Phone Number
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone Number"
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              inputMode="numeric"
            />
          </p>
          {/* <Link href="/"> */}
            <button
              type="submit"
              className="w-full p-2 my-2 bg-indigo-600 text-xl font-medium text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-purple-700"
            >
              Submit
            </button>
          {/* </Link> */}
        </form>
        <div className="flex justify-center item-center">{message}</div>
        <Link href={"/"}>
          <div className="flex justify-center items-center hover:text-indigo-500 font-bold">Return to HomePage</div>
        </Link>
         {message === "User registered successfully" && (
          <Link href="/login">
            <div className="flex justify-center item-center hover:text-purple-700">
              Click to Login
            </div>
          </Link>
        )}
      </div>
    </main>
  );
};

export default LoginPage;