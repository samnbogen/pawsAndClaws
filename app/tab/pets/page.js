//for displaying the list of pets
//will have search bar

import PetList from "./pet-list";
import Header from '/app/components/header.js';

export default function Page() {

    return (
        <main>
            <Header text="Pets"/>
            <div className="pt-32">
                <PetList />
            </div>
        </main>
    );
}