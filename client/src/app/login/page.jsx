"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Eyeclose from "../(components)/eyeclose.jsx";
import Eyeopen from "../(components)/eyeopen.jsx";

const LoginPage = () => {
    const [rollno, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [pwddisplay, setPwdDisplay] = useState(false);
    const [roll,setroll] = useState('None');

    useEffect(() => {
        // Simulate loading with a delay
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    const handlePwdDisplay = () => {
        setPwdDisplay(!pwddisplay);
    }

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
            setroll(data[1].rollno);
            setMessage(data[0].message);
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error registering user.");
        }
    };

    return (
        <main className={`min-h-screen flex flex-col items-center justify-center ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md transform transition-transform duration-500">
                <div className="mb-10 text-center text-4xl text-indigo-800">LOGIN</div>
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
                            className="w-full p-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-indigo-800 my-2"
                        />
                    </p>
                    <p>
                        <label htmlFor="text" className="p-1">
                            Password
                        </label>
                        <span className="flex flex-row justify-center border-2 border-indigo-500 mb-3 rounded-lg focus:border-purple-800">
                            <input
                                type={pwddisplay ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full p-3 border-none rounded-lg focus:border-none focus:outline-none"
                            />
                            <button type="button" onClick={handlePwdDisplay} className="mr-3">
                                {pwddisplay ? <Eyeopen /> : <Eyeclose />}
                            </button>
                        </span>
                    </p>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-xl font-medium text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-purple-700 p-3 my-2"
                    >
                        Submit
                    </button>
                </form>
                <Link href="/">
                    <div className="flex justify-center items-center hover:text-indigo-700 text-xl font-medium">Return to HomePage</div>
                </Link>
                <div className="flex justify-center items-center">{message}</div>
                {message === "Login Successful" && (
                    <Link href={`/home/${rollno}`}>
                        <div className="flex justify-center item-center hover:text-indigo-500">Click to go further</div>
                    </Link>
                )}
            </div>
            <div className="text-white mt-12 text-2xl ">
                DON'T HAVE AN ACCOUNT YET? <Link className="text-indigo-400 underline" href={"/signup"}>SIGNUP</Link>
            </div>
        </main>
    );
};


export default LoginPage;