"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../(components)/navbar";
import Link from "next/link";


window.onload =function(){

    async function  fetchDatafromDatabase()
    {
      try
      {
          const response =await fetch("http://127.0.0.1:8080/api/register3",{
              method:"GET",
              headers:{"Content-Type":"application/json"}
          })
          if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return await response.json();
      }
      catch(error){console.log('Error');}
  
    }

        message=fetchDatafromDatabase();

    if(message==1)
    {
      const page = () => {
        const [showFirstText, setShowFirstText] = useState(false);
        const [showSecondText, setShowSecondText] = useState(false);
        const [showThirdText, setShowThirdText] = useState(false);
      
        useEffect(() => {
          const firstTextTimeout = setTimeout(() => {
            setShowFirstText(true);
          }, 1000);
      
          const secondTextTimeout = setTimeout(() => {
            setShowSecondText(true);
          }, 1500);
      
          const thirdTextTimeout = setTimeout(() => {
            setShowThirdText(true);
          }, 2000);
      
          return () => {
            clearTimeout(firstTextTimeout);
            clearTimeout(secondTextTimeout);
            clearTimeout(thirdTextTimeout);
          };
        }, []);
      
        return (
          <main>
            <Navbar />
            <div className="loading-screen flex flex-col items-center justify-center  p-10 m-10">
              {showFirstText && (
                <div className="falling-texts space-y-4 text-4xl text-purple-400 font-bold">
                  <div className="falling-text text-4xl md:text-6xl lg:text-7xl">
                    <div className="text-white text-center">HAVE LOST OR FOUND SOMETHING?</div>
                  </div>
                </div>
              )}
              {showSecondText && (
                <div className="falling-texts space-y-4 text-4xl text-indigo-400 font-bold">
                  <div className="falling-text2 text-4xl md:text-5xl lg:text-7xl p-1 my-4">
                    <div className="text-center">DONT WORRY</div>
                    <div className="text-center">
                      ASK THE STUDENT COMMUNITY FOR HELP
                    </div>
                  </div>
                </div>
              )}
              {showThirdText && (
                <div className="falling-texts space-y-4 text-4xl text-purple-400 font-bold">
                  <div className="falling-text2 text-2xl md:text-4xl lg:text-5xl p-1 my-4">
                    <Link href="/lostforms">
                      <div className="text-white hover:text-purple-700 text-center">
                        Want to report something LOST? Click here
                      </div>
                    </Link>
                  </div>
                </div>
              )}
              {showThirdText && (
                <div className="falling-texts space-y-4 text-4xl text-purple-400 font-bold">
                  <div className="falling-text2 text-2xl md:text-4xl lg:text-5xl p-1 my-4">
                    <Link href="/foundforms">
                      <div className="text-white hover:text-purple-700 text-center">
                        Want to report something FOUND? Click here
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </main>
        );
      };
      
    }
    else
    {
      
    }
}


export default page;
