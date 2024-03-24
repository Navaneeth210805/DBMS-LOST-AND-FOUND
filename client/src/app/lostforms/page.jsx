"use client";
import React, { useState } from "react";
import Link from "next/link";

const LostForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollno, setRollno] = useState("");
  const [location, setLocation] = useState("");
  const [ldate, setDate] = useState("");
  const [itemtype, setItemtype] = useState("");
  const [itemdescription, setItemdescription] = useState("");

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
          phone_no: phone,
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
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md transform transition-transform duration-500">
        <div className="mb-10 text-center text-4xl text-purple-600">
          LOST ITEMS FORMS
        </div>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="text" className="p-1">
              Roll Number
            </label>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              placeholder="Enter your First Name"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
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
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
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
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              inputMode="numeric"
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Location Last Seen
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the Location Last Seen"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              inputMode="numeric"
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Date when Lost
            </label>
            <input
              value={ldate}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              inputMode="numeric"
              type="date"
              name="begin"
              placeholder="dd-mm-yyyy"
              min="1997-01-01"
              max="2099-12-31"
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Item Type
            </label>
            <input
              type="text"
              value={itemtype}
              onChange={(e) => setItemtype(e.target.value)}
              placeholder="Enter the category/type of the item(Book,keychain etc)"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              inputMode="numeric"
            />
          </p>
          <div className="mb-4">
            <label htmlFor="itemdescription" className="p-1 block">
              Item Description
            </label>
            <textarea
              id="itemdescription"
              value={itemdescription}
              onChange={(e) => setItemdescription(e.target.value)}
              placeholder="Enter item description"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </div>
          <p>
            <label htmlFor="text" className="p-1">
              Lost Item Photo
            </label>
            <input
              type="file"
              value={itemtype}
              onChange={(e) => setItemtype(e.target.value)}
              placeholder="Enter the category/type of the item(Book,keychain etc)"
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              inputMode="numeric"
              accept="image/*"
            />
          </p>

          {/* <Link href="/"> */}
          <button
            type="submit"
            className="w-full p-2 my-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
          >
            Submit
          </button>
          {/* </Link> */}
        </form>
        <div className="flex justify-center item-center">{message}</div>
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

export default LostForm;
