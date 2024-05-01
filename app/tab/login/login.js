// Import the necessary modules
"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
//import {useHistory} from "react-router-dom";
import Link from "next/link";

// Component definition
export default function Page() {
  // Define component state
  const [credentials, setCredentials] = useState({ email: "", password: ""});
  const [auth, setAuth] = useState(false);
  const [message, setErrorMessage] = useState("");
  //const history = useHistory();

  // Use the useSession hook to get session data
  const { data: session, status } = useSession();

  // Event handler for form changes
  const handleChanges = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Event handler for login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("login", {
        redirect: false,
        email: credentials.email.toLowerCase(),
        password: credentials.password,
      });
  
      if(response.error){
        setErrorMessage(response.error);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("An error occurred during login.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };
  

  useEffect(() => {
    const checkSession = async () => {
      try {
        if (session) {
          console.log("Login page page successful");
          setAuth(true);
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("An error occurred while checking the session", error);
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    };
  
    checkSession();
  }, [session]);
  

    if(status === "loading"){
      return <div>Loading...</div>
    } else if (auth === true) {
      return(
        <div className="flex flex-col items-center justify-center my-52">
            <h1>Welcome you&apos;re logged in!</h1>
            <Link href="/">Click here to go to main page</Link>
            <Link href="/tab/users/createProfile" className="text-center block mt-4 font-semibold">Create a Profile!</Link>
            <button className="text-white font-bold py-2 px-4 rounded-full mt-4 bg-green" onClick={signOut}>Log out</button>
        </div>
      )
    } else {
      //console.error("Login failed", response.error);
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md m-10">
            <h1 className="text-3xl font-bold mb-4">Log In</h1>
            <form onSubmit={handleLogin} className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-gray font-semibold">Email</label>
              <input type="email" id="email" name="email" className="text-black border-2 border-green w-full rounded-md py-2 px-3" value={credentials.email} onChange={handleChanges} />
              <br/>
              <label htmlFor="password" className="text-gray font-semibold">Password</label>
              <input type="password" id="password" name="password" className="text-black border-2 border-green w-full rounded-md py-2 px-3" value={credentials.password} onChange={handleChanges} />
              <br/>
              {message && <p className="text-red text-center">{message}</p>}
              <button className="self-center text-black font-bold py-2 px-4 rounded mt-2 border border-black" type="submit">Login</button>
              <div>
                <Link href="/tab/signup" className="text-center block mt-4 font-semibold">Don&apos;t have an account? Sign up here</Link>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }