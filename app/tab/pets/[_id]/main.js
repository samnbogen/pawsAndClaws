"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";

export default function PetCardForm() {
const pathname = usePathname();
const lastPartOfPathname = pathname.split("/").pop();
const [petCard, setPetCard] = useState([]);

const fetchPetCard = async () => {
    try {
        const response = await fetch("/api/user/petCard", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            setPetCard(data);
        } else {
            console.error("Pet Card fetch failed:", response);
        }
    } catch (error) {
        console.error("Pet Card fetch failed:", error);
    }
};

useEffect(() => {
    fetchPetCard();
}, []);

if (lastPartOfPathname) {
    const foundPetCard = petCard.find(
        (petCard) => petCard._id === lastPartOfPathname
        
    );
    //console.log("foundPetCard", foundPetCard);
    if (foundPetCard) {
        return (
            <div className="border w-2/5 rounded-b-lg border-light-gray p-4 max-w-xl mx-auto">
                <div className="flex flex-row">                        
                            <div className="p-1 w-1/2">                                
                                <div dangerouslySetInnerHTML={{ __html: foundPetCard.photo }} />
                            </div>                            
                            <div className="p-1 w-1/2">
                                <div className="flex flex-row">
                                    <div className="p-1 w-1/2">
                                        <label className="font-bold block" htmlFor="petName">Pet Name</label>
                                        <p>{foundPetCard.name}</p>
                                    </div>
                                    <div className="p-1 w-1/2">
                                        <label className="font-bold block" htmlFor="petAge">Pet Age</label>
                                        <p>{foundPetCard.age}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="p-1 w-1/2">
                                        <label className="font-bold block" htmlFor="species">Species</label>
                                        <p>{foundPetCard.species}</p>
                                    </div>
                                    <div className="p-1 w-1/2">
                                        <label className="font-bold block" htmlFor="breed">Breed/Type</label>
                                        <p>{foundPetCard.breed}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="p-1 w-1/3">
                                        <label className="font-bold block" htmlFor="sex">Sex</label>
                                        <p>{foundPetCard.sex}</p>
                                    </div>
                                    <div className="p-1 w-1/3">
                                        <label className="font-bold block" htmlFor="size">Size</label>
                                        <p>{foundPetCard.size}</p>
                                    </div>
                                    <div className="p-1 w-1/3">
                                        <label className="font-bold block" htmlFor="fixed">Fixed</label>
                                        <p>{foundPetCard.fixed}</p>
                                    </div>
                                </div>
                                <div className="p-1">
                                    <label className="font-bold block" htmlFor="additionalInfo">Additional Info</label>
                                    <p>{foundPetCard.additionalInfo}</p>
                                </div>                                
                        </div>
                    </div>
                </div>
            );
        }
    }
}