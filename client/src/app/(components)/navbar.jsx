"use client";
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <nav className="lg:flex lg:flex-row justify-center m-4 p-4">
        <div className="hidden lg:flex items-center">
          <Image src={"/iiitdm.jpeg"} alt="Logo" width={50} height={20} />{" "}
          <div className="h-full border-l border-purple-700 mx-4"></div>
        </div>
        {/* Desktop view */}
        <div className="hidden lg:flex items-center">
          <h1 className="text-white">FORMS</h1>
          <div className="h-full border-l border-purple-700 mx-4"></div>
        </div>
        <div className="hidden lg:flex items-center">
          <h1 className="text-white">LOST ITEMS</h1>
          <div className="h-full border-l border-purple-700 mx-4"></div>
        </div>
        <div className="hidden lg:flex items-center">
          <h1 className="text-white">FOUND ITEMS</h1>
          <div className="h-full border-l border-purple-700 mx-4"></div>
        </div>
        <div className="hidden lg:flex items-center">
          <h1 className="text-white">LOST HISTORY</h1>
          <div className="h-full border-l border-purple-700 mx-4"></div>
        </div>
        <div className="hidden lg:flex items-center">
          <h1 className="text-white">FOUND HISTORY</h1>
          <div className="h-full border-l border-purple-700 mx-4"></div>
        </div>
        <div className="hidden lg:flex items-center">
          <h1 className="text-white">PROFILE</h1>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden flex items-center justify-between">
          <button onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          <Image
            src={"/iiitdm.jpeg"}
            alt="Logo"
            width={100}
            height={100}
            className="justify-content items-center"
          />
          <div className="text-transparent">" " </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="lg:hidden top-16 w-full">
          <div className="flex flex-col items-center mt-4">
            <h1 className="text-white mb-2">FORMS</h1>
            <h1 className="text-white mb-2">LOST ITEMS</h1>
            <h1 className="text-white mb-2">FOUND ITEMS</h1>
            <h1 className="text-white mb-2">HISTORY</h1>
            <h1 className="text-white mb-2">PROFILE</h1>
          </div>
        </div>
      )}
    </main>
  );
};

export default Navbar;
