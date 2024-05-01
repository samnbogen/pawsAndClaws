"use client";
import { useState, useEffect } from "react";
import User from "./user";

export default function UserList() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/user/profile", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error("User fetch failed:", response);
            }
        } catch (error) {
            console.error("User fetch failed:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <main>
            <div className="flex flex-col items-center justify-center pt-20">                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 p-16">
                    {users.map((user) => (
                        <User key={user.id} {...user} />
                    ))}
                </div>
            </div>
        </main>
    );
}

