export default function RecordsForm() {
    return(
        <div class="border rounded-b-lg border-light-gray w-2/5">
            <div class="p-2">
                <h1 class="text-lg">Record Keeping</h1>
                <p>Placeholder text.</p> {/* replace with information about section */}
            </div>
            <div class="flex flex-row">
                <div class="border border-light-gray h-64 w-1/2 m-2">
                    <h1 class="text-lg text-white bg-red p-1">Alerts</h1>
                    <p class="p-2">Placeholder text</p>
                </div>
                <div div class="border border-light-gray h-64 w-1/2 m-2">
                    <h1 class="text-lg text-white bg-green p-1">Current Medications</h1>
                    <p class="p-2">Placeholder text</p>
                </div>
            </div>
            <div>
                <div class="border border-light-gray m-2">
                    <h1 class="text-lg text-white bg-green p-1">Medical Records</h1>
                    <p class="p-2">Placeholder text.</p>
                    <div class="border border-light-gray h-64 m-2">
                        <p class="p-2">The table will go here.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row p-2">
                <div class="mr-1">
                    <div class="text-center text-white p-1 w-40 border-2 border-green bg-green rounded-lg hover:bg-white hover:cursor-pointer hover:text-green">
                        <p>Save</p>
                    </div>
                </div>
                <div class="ml-1">
                    <div class="text-center text-white p-1 w-40 border-2 border-red bg-red rounded-lg hover:bg-white hover:cursor-pointer hover:text-red">
                        <p>Cancel</p>
                    </div>
                </div>
            </div>
        </div>
    )
};