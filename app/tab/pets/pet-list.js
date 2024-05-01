"use client";
import { useState, useEffect } from "react";
import Pet from "./pet.js";

export default function PetList() {
  const [pets, setPets] = useState([]);
  const [visiblePets, setVisiblePets] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter is set to "all"

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
          setPets(data);
        } else {
          console.error("Pet Card submission failed:", response);
        }
      } catch (error) {
        console.error("Pet Card submission failed:", error);
      }
    };

    fetchPets();
  }, []);

  // Function to add the next pet to the visible list
  const addNextPet = () => {
    setVisiblePets((prevVisiblePets) => {
      const nextIndex = prevVisiblePets.length;
      if (nextIndex < pets.length) {
        return [...prevVisiblePets, pets[nextIndex]];
      }
      return prevVisiblePets; // No more pets to add
    });
  };

  // Set an interval to add pets to the visible list
  useEffect(() => {
    const interval = setInterval(() => {
      addNextPet();
    }, 5); // Adjust time as needed

    return () => clearInterval(interval);
  }, [visiblePets, pets]);

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Function to sort pets by breed
  const sortPetsByBreed = () => {
    const sortedPets = [...visiblePets].sort((a, b) => {
      return a.breed.localeCompare(b.breed);
    });
    setVisiblePets(sortedPets);
  };

  // Function to sort pets by age
  const sortPetsByAge = () => {
    const sortedPets = [...visiblePets].sort((a, b) => {
      return a.age - b.age;
    });
    setVisiblePets(sortedPets);
  };

  // Filter the pets based on the selected filter
  const filteredPets = filter === "all" ? visiblePets : visiblePets.filter(pet => pet.species === filter);

  return (
    <div>
      <div className="flex flex-row justify-center">
        <select
          id="filter"
          onChange={handleFilterChange}
          className="bg-green hover:bg-gray text-white font-bold py-2 px-4 m-2 rounded w-40"
        >
          <option value="all">All Species</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="other">Other</option>
        </select>
        <button
          className="bg-green hover:bg-gray text-white font-bold py-2 px-4 m-2 rounded w-40"
          onClick={sortPetsByBreed}
        >
          Sort by Breed
        </button>
        <button
          className="bg-green hover:bg-gray text-white font-bold py-2 px-4 m-2 rounded w-40"
          onClick={sortPetsByAge}
        >
          Sort by Age
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-20 py-10">
        {filteredPets.map((pet, index) => (
          <Pet key={index} {...pet} />
        ))}
      </div>
    </div>
  );
}