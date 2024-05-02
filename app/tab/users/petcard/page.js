"use client";

import Header from '/app/components/header.js';
import PetCardForm from "./form.js";

export default function Home() {
  return (
    <main>
      <Header text="Create a Pet Card"/>
      <div class="flex flex-row pb-6 justify-center mt-36">
        <div>
          <h1 class="text-3xl pr-1">Pet</h1>
        </div>
        <div>
          <h1 class="text-3xl text-green">Card</h1>
        </div>
      </div>
      <PetCardForm />
  </main>
  );
}