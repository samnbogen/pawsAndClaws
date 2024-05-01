"use client";
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

export default function createProfile() {
    const { data: session } = useSession();

    const [name, setUsername] = useState("");
    const [age, setUserAge] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [photo, setPhoto] = useState("");

    const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

    const userEmail = session?.user?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        //if no photo is added, a default photo will be added
        const photoToSend = photo || "<p><img src='/noImage.png' alt='no photo' /></p>";

        try {

            const response = await fetch("/api/user/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail, name, age, additionalInfo, photo: photoToSend}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Profile submitted:", data);
                setUsername("");
                setUserAge("");
                setAdditionalInfo("");
                setPhoto("");
            } else {
                console.error("Profile submission failed:", response);
            }
        } catch (error) {
            console.error("Profile submission failed:", error);
        }
    }

return (    
    <form onSubmit={handleSubmit} className="border w-2/5 rounded-b-lg border-light-gray p-4 max-w-xl mx-auto mt-36 mb-10 bg-white">
        <h1 className="text-lg p-1">General Information</h1>
        <div className="flex flex-row">
            <div className="p-1 w-1/2">
                <label className="text-gray block" htmlFor="username">Username</label>
                <input className="border border-light-gray rounded w-full" type="text" id="username" name="username" 
                value={name} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="p-1 w-1/2">
                <label className="text-gray block" htmlFor="userAge">User Age</label>
                <input className="border border-light-gray rounded w-full" type="number" id="userAge" name="userAge" 
                value={age} onChange={(e) => setUserAge(e.target.value)} />
            </div>
        </div>
        <div className="p-1">
            <label className="text-gray block" htmlFor="additionalInfo">Additional Info</label>
            <textarea className="border border-light-gray rounded-lg w-full h-32" type="text" id="additionalInfo" name="additionalInfo" 
            value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)}/>
        </div>
        <div className='p-1'>
            <label className="text-gray block" htmlFor="photo">Add Photo</label>
            <ReactQuill className="border border-light-gray rounded-lg w-full" 
             value={photo} onChange={setPhoto}
             modules={{
                toolbar:[
                    ['image']
                ]
             }} />
        </div>
        <div className="flex flex-row p-1">
            <div className="w-1/2">
                <button type="submit" className="text-center text-white p-1 w-40 border-2 border-green bg-green rounded-lg hover:bg-white hover:cursor-pointer hover:text-green">
                    Save
                </button>
            </div>
            <div className=" ml-12 w-1/2">
                <button type="button" className="text-center text-white p-1 w-40 border-2 border-red bg-red rounded-lg hover:bg-white hover:cursor-pointer hover:text-red">
                    Cancel
                </button>
            </div>
        </div>
    </form>
)
};