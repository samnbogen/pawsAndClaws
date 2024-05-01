export default function ContactsForm() {
    
    return (
        <div class="flex flex-col w-2/5 border border-light-gray rounded-b-lg">
            <div>
                <h1 class="p-2 text-lg text-black">Contacts</h1>
                <p class="p-2">Placeholder text</p>
            </div>
            <div class="m-2 h-64 border border-light-gray">
                <h1 class="p-2 text-lg text-white bg-green">Service Type:</h1>
                <p class="p-2">Placeholder text</p>
            </div>
            <div class="m-2 h-64 border border-light-gray">
                <h1 class="p-2 text-lg text-white bg-gray">Service Type:</h1>
                <p class="p-2">Placeholder text</p>
            </div>
            <div class="m-2 h-64 border border-light-gray">
                <h1 class="p-2 text-lg text-white bg-gray">Service Type:</h1>
                <p class="p-2">Placeholder text</p>
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
}