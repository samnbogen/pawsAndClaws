export default function PedigreeForm(){
    return (
        <div class="border border-light-gray rounded-b-lg w-2/5">
            <h1 class="text-lg p-2">Pedigree</h1>
            <p class="p-2">Placeholder text.</p>
            <div>
                <div class="flex flex-col border border-light-gray m-2">
                <h1 class="p-2 text-lg bg-green text-white">Pet Information</h1>
                    <div class="p-2">
                        <label class="text-gray block" for="sire">Sire</label>
                        <input class="border border-gray rounded" type="text" id="sire" name="sire" />
                    </div>
                    <div class="p-2">
                        <label class="text-gray block" for="dam">Dam</label>
                        <input class="border border-gray rounded" type="text" id="dam" name="dam" />
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
}