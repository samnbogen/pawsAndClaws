"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Comment({userID, email}) {
    const [filteredComment, setFilteredComment] = useState([]);
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const { data: session } = useSession();
    const role = session?.user?.role;    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(session?.user?.email === email){
            alert("You cannot leave a comment");
            return;
        }

        try {
            const response = await fetch("/api/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, comment, date: new Date().toLocaleDateString(), userID}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Comment submitted:", data);
                fetchComments();
                setUsername("");
                setComment("");
            } else {
                console.error("Comment submission failed:", response);
            }
        } catch (error) {
            console.error("Comment submission failed:", error);
        }
    }

    const fetchComments = async () => {
        try {
            const response = await fetch("/api/comment", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (userID) {
                    const filteredComment = data.filter((comment) => comment.userID === userID);
                    setFilteredComment(filteredComment);
                }                
            } else {
                console.error("Comment fetch failed:", response);
            }
        } catch (error) {
            console.error("Comment fetch failed:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [userID]);   

    return(
        <main>
            <div className="flex flex-col items-center justify-center">
               
               { role === "user" &&
               <>
                    <h1 className="text-3xl w-full text-center text-green font-bold">
                        Leave a Comment
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Your Name"
                            className="w-full p-2 m-2 text-black border-2 border-black"
                        />
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Your Comment"
                            className="w-full p-2 m-2 text-black border-2 border-black"
                        />
                        <button
                            type="submit"
                            className="bg-green hover:bg-gray text-white font-bold py-2 px-4 m-8 rounded w-40"
                        >
                            Add Comment
                        </button>
                    </form>
                </>}
                <div className="flex flex-col items-center justify-center">
                    <ul>
                    {filteredComment.map((comment, index) => (
                        <li key={index} className="text-black">
                            <div className="flex flex-row w-full items-center justify-center p-10 mb-5 border border-light-gray rounded-lg">
                                <div className="w-1/2">
                                    <p className="font-bold">Username:</p>
                                    <p className="font-bold">Date:</p>
                                    <p className="font-bold">Comment:</p>
                                </div>
                                <div className="w-1/2">
                                    <p>{comment.username}</p>
                                    <p>{comment.date}</p>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}