import Link from "next/link";
//npm install dompurify

export default function User ({username, userID}) {
    
    return (
        <Link href={`/tab/users/${userID}`}>
        <div className="flex flex-col w-60 h-52 items-center justify-center border-green border-2 p-4 m-2 rounded-3xl hover:scale-110 transition-transform duration-300">

            <div className="text-center mt-4">
                <h1 className="text-4xl font-bold">{username}</h1>          
            </div>
        </div>
        </Link>
    );
}