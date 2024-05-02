"use client";

import Header from '/app/components/header.js';
import PetCard from './main.js';

export default function Home() {
  return (
    <main>
      <Header text="PetStarz" text2="The Pawsitive Online Source for Finding Pets."/>
      <PetCard />
  </main>
  );
}