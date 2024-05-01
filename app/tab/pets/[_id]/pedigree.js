export default function PedigreeForm(){
    return (
        <div class="border border-light-gray rounded-b-lg w-2/5">
            <h1 class="text-lg p-2">Pedigree</h1>
            <p class="p-2">Placeholder text.</p>
            <div>
                <div class="flex flex-col border border-light-gray m-2">
                <h1 class="p-2 text-lg bg-green text-white">Pet Information</h1>
                    <div class="p-2">
                        <p class="text-gray block" for="sire">Sire: placeholder text</p>
                    </div>
                    <div class="p-2">
                        <p class="text-gray block" for="dam">Dam: placeholder text</p>
                    </div>
                </div>
            </div>
        </div>
    )
}