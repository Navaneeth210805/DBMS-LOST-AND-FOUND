"use client";
import React, { useState } from "react";
import Link from "next/link";

const FoundForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollno, setRollno] = useState("");
  const [location, setLocation] = useState("");
  const [fdate, setDate] = useState("");
  const [itemtype, setItemtype] = useState("");
  const [itemdescription, setItemdescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (selectedFile) => {
    const maxSize = 1 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      alert("File size exceeds 1MB limit. Please choose a smaller file"); 
      return;
    } else {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(file!=null)
    {
      let image_data=file
      let reader=new FileReader();

      reader.onload = function() {
        var image_data = reader.result;

        const form_data = {
          email: email,
          phone_no: phone,
          roll_no: rollno,
          location: location,
          ldate: fdate,
          itemtype: itemtype,
          itemdescription: itemdescription,
          image: image_data
        };

        sendFormData(form_data);
      };

      reader.readAsDataURL(image_data)
    }
    else
    {
      const form_data = {
        email: email,
        phone_no: phone,
        roll_no: rollno,
        location: location,
        ldate: fdate,
        itemtype: itemtype,
        itemdescription: itemdescription,
        image: "null"
      };

      sendFormData(form_data);
    }
  }
    
    async function sendFormData(form_data){
    try {
      const response = await fetch("http://127.0.0.1:8080/api/register3", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Ensure correct content type
        },
        body: new URLSearchParams(form_data),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error submitting form.");
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md transform transition-transform duration-500">
        <div className="mb-10 text-center text-4xl text-indigo-600">
          FOUND ITEMS FORMS
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
          <p>
            <label htmlFor="text" className="p-1">
              Location Last Seen
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the Location Last Seen"
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              inputMode="numeric"
            />
          </p>
          <p>
            <label htmlFor="text" className="p-1">
              Date when Found
            </label>
            <input
              value={fdate}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
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
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
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
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700"
            />
          </div>
          <p>
            <label htmlFor="text" className="p-1">
              Found Item Photo
            </label>
            <input
              type="file"
              onChange={(e) =>handleFileChange(e.target.files[0])}
              placeholder="Enter the category/type of the item(Book,keychain etc)"
              className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-purple-700 my-2"
              inputMode="numeric"
              accept="image/*"
            />
          </p>

          {/* <Link href="/"> */}
          <button
            type="submit"
            className="w-full p-2 my-2 bg-indigo-600 font-medium text-xl text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-purple-700"
          >
            Submit
          </button>
          {/* </Link> */}
        </form>
        <Link href={"/home"}>
          <div className="text-xl font-medium flex justify-center items-center hover:text-indigo-600 cursor-pointer">
            Return To HomePage
          </div>
        </Link>
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

export default FoundForm;
