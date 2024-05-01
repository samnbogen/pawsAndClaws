"use client";
import { useState, useEffect } from "react";
import Pet from "@/app/tab/pets/pet.js";

export default function PetList({userID}) {
    const [pets, setPets] = useState([]);

    // Fetch all pets from the database
     useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch("/api/user/petCard", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                
                    const filteredPets = data.filter((pets) => pets.userID === userID);
                    setPets(filteredPets);
                
            } else {
            console.error("Pet Card submission failed:", response);
            }
        } catch (error) {
            console.error("Pet Card submission failed:", error);
        }
        };

        fetchPets();
    }, []);
            

    return (
        <div> 
            <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6 px-20 py-10 ">
                {pets.map(pet => (
                    <div key={pet.id}>
                        <Pet {...pet} />
                    </div>
                ))}
            </div>     
        </div>
    );
}