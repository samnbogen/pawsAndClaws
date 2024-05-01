"use client";
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
//to be able to add a photo
//npm install react-quill
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

export default function PetCardForm() {
const { data: session } = useSession();

//only a supplier can save the petcard form
    //the form will be saved to the database
    //send with the email of the supplier

    const [name, setPetName] = useState("");
    const [age, setPetAge] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreedAndType] = useState("");
    const [sex, setSex] = useState("");
    const [size, setSize] = useState("");
    const [fixed, setFixed] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [photo, setPhoto] = useState("");

    const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

    const userEmail = session?.user?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        //if no photo is added, a default photo will be added
        const photoToSend = photo || "<p><img src='/noImage.png' alt='no photo' /></p>";

        try {

            const response = await fetch("/api/user/petCard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail,name, age, species, breed,
                    sex, size, fixed, additionalInfo, photo: photoToSend}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Pet Card submitted:", data);
                setPetName("");
                setPetAge("");
                setSpecies("");
                setBreedAndType("");
                setSex("");
                setSize("");
                setFixed("");
                setAdditionalInfo("");
                setPhoto("");
            } else {
                console.error("Pet Card submission failed:", response);
            }
        } catch (error) {
            console.error("Pet Card submission failed:", error);
        }
    }

return (
    <form onSubmit={handleSubmit} className="border w-2/5 rounded-b-lg border-light-gray p-4 max-w-xl mx-auto bg-white">
        <h1 className="text-lg p-1">General Information</h1>
        <div className="flex flex-row">
            <div className="p-1 w-1/2">
                <label className="text-gray block" htmlFor="petName">Pet Name</label>
                <input className="border border-light-gray rounded w-full" type="text" id="petName" name="petName" 
                value={name} onChange={(e) => setPetName(e.target.value)} />
            </div>
            <div className="p-1 w-1/2">
                <label className="text-gray block" htmlFor="petAge">Pet Age</label>
                <input className="border border-light-gray rounded w-full" type="number" id="petAge" name="petAge" 
                value={age} onChange={(e) => setPetAge(e.target.value)} />
            </div>
        </div>
        <div className="flex flex-row">
            <div className="p-1 w-1/2">
                <label className="text-gray block" htmlFor="species">Species</label>
                <select className="border border-light-gray rounded w-full" type="text" id="species" name="species"
                value={species} onChange={(e) => setSpecies(e.target.value)}>
                    <option selected></option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="p-1 w-1/2">
                <label className="text-gray block" htmlFor="breed">Breed/Type</label>
                <input className="border border-light-gray rounded w-full" type="text" id="breed" name="breed"
                value={breed} onChange={(e) => setBreedAndType(e.target.value)} />
            </div>
        </div>
        <div className="flex flex-row">
            <div className="p-1 w-1/3">
                <label className="text-gray block" htmlFor="sex">Sex</label>
                <select className="border border-light-gray rounded w-full" type="text" id="sex" name="sex"
                value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option selected></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="p-1 w-1/3">
                <label className="text-gray block" htmlFor="size">Size</label>
                <select className="border border-light-gray rounded w-full" type="text" id="size" name="size"
                value={size} onChange={(e) => setSize(e.target.value)}>
                    <option selected></option>
                    <option value="small">S</option>
                    <option value="medium">M</option>
                    <option value="large">L</option>
                    <option value="extraLarge">XL</option>
                </select>
            </div>
            <div className="p-1 w-1/3">
                <label className="text-gray block" htmlFor="fixed">Fixed</label>
                <select className="border border-light-gray rounded w-full" type="text" id="fixed" name="fixed"
                value={fixed} onChange={(e) => setFixed(e.target.value)}>
                    <option selected></option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unknown">Unknown</option>
                </select>
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
       {/* {!photo && <img src="/noImage.png" alt="no photo" className='mt-2'/>} */}
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