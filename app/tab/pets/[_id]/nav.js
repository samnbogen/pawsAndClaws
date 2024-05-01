import { useState } from 'react';
import PetCard from "./main.js";
import Records from "./records.js";
import Contacts from "./contacts.js";
import Pedigree from "./pedigree.js";

const FormNav = () => {
    const [selectedForm, setSelectedForm] = useState('form1');
    
    const handleFormChange = (form) => {
        setSelectedForm(form);
    };

    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            <div class="flex flex-row pb-6">
              <div>
                <h1 class="text-3xl pr-1">Pet</h1>
              </div>
              <div>
                <h1 class="text-3xl text-green">cards</h1>
              </div>
            </div>
            <div class="h-10 flex flex-row w-2/5">
                <div onClick={() => handleFormChange('form1')} class=" mr-1 p-1 rounded-t-lg w-1/4 bg-green hover:cursor-pointer"
                style={{ backgroundColor: selectedForm === 'form1' ? '#7FB069' : 'gray' }}>
                    <h1 class="text-lg text-center text-white">General</h1>
                </div>
                <div onClick={() => handleFormChange('form2')}class=" mr-1 p-1 rounded-t-lg w-1/4 bg-gray hover:cursor-pointer"
                style={{ backgroundColor: selectedForm === 'form2' ? '#7FB069' : 'gray' }}>
                    <h1 class="text-lg text-center text-white">Records</h1>
                </div>
                <div onClick={() => handleFormChange('form3')} class=" mr-1 p-1 rounded-t-lg w-1/4 bg-gray hover:cursor-pointer"
                style={{ backgroundColor: selectedForm === 'form3' ? '#7FB069' : 'gray' }}>
                    <h1 class="text-lg text-center text-white">Contacts</h1>
                </div>
                <div onClick={() => handleFormChange('form4')} class="p-1 rounded-t-lg w-1/4 bg-gray hover:cursor-pointer"
                style={{ backgroundColor: selectedForm === 'form4' ? '#7FB069' : 'gray' }}>
                    <h1 class="text-lg text-center text-white">Pedigree</h1>
                </div>
            </div>
            {selectedForm === 'form1' && <PetCard />}
            {selectedForm === 'form2' && <Records />}
            {selectedForm === 'form3' && <Contacts />}
            {selectedForm === 'form4' && <Pedigree />}
        </div>
    )
};

export default FormNav;