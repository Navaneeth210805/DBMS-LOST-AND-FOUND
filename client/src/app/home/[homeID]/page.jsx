"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/(components)/navbar";
import Link from "next/link";


const GetState = ( { params } ) => {
  const [loading,setisloading] = useState(false)  

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/state');
        console.log('Fetched data:', response.data);
        if(response.data==true)
        {
          setisloading(true);
          console.log(loading);
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchState();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/check_role');
        if (response.data.role === 'admin') {
          setAdmin(true);
          console.log('ADMIN')
        }
        console.log('BOOOOO')
        setisloading(true); 
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
  
    fetchRole();
  }, []);


const page = () => {
        const [showFirstText, setShowFirstText] = useState(false);
        const [showSecondText, setShowSecondText] = useState(false);
        const [showThirdText, setShowThirdText] = useState(false);
        console.log(params.homeID);
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
            <Navbar userID={params.homeID}/>
            {loading ? (
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
            ) : 
            <div className="space-y-4 text-4xl text-indigo-400 font-bold p-1 my-4 flex justify-center items-center">
              <Link href="/login">
                Please Login to access the portal
              </Link>
              </div>}
          </main>
        );

        
      };
      return page();
  };
export default GetState;
