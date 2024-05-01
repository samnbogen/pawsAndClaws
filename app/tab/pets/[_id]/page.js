"use client";

import Header from '/app/components/header.js';
import Nav from './nav.js';

export default function Home() {
  return (
    <main>
      <Header text="PetStarz" text2="The Pawsitive Online Source for Finding Pets."/>
      <Nav />
  </main>
  );
}