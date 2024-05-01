"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Comment from './comment';
import DOMPurify from 'dompurify';
import Link from "next/link";
import PetList from "./pets";
import Header from "@/app/components/header";

export default function Page() {
    const pathname = usePathname();
    const lastPartOfPathname = pathname.split("/").pop();
    const { data: session } = useSession();
    const role = session?.user?.role;

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

    if (lastPartOfPathname) {
        const foundUser = users.find(
            (user) => user.userID === lastPartOfPathname
        );
        if (foundUser) {
            return (                
                <main>
                    <Header text="User Profile"/>
                    <div className=' flex flex-col md:flex-row mt-36 m-10'>
                        <div className='w-full md:w-1/4 flex mt-20 rounded-t-3xl items-center justify-center overflow-hidden'>
                            <div 
                            style={{width: '200px', height: '200px', objectFit: 'cover'}}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(foundUser.photo) }} />
                        </div>
                        <div className='w-full md:w-3/4 flex flex-wrap'>
                            <div className="w-full pt-10 text-6xl font-black text-green">
                                <h1 style={{ fontFamily: 'Pacifico' }}>
                                    {foundUser.username}
                                </h1>
                            </div>
                            <div className="border border-green flex flex-wrap w-full rounded-lg mt-10 mb-10 mr-10 pl-10">
                                <div className='w-1/2 pt-10'>                                    
                                    <h1 class="font-bold">Email</h1>                                    
                                </div>
                                <div className='w-1/2 p-10'>                                    
                                    <h2>{foundUser.email}</h2>                                    
                                </div>
                                <div className='w-full pr-10 pb-10'>
                                <h2>{foundUser.additionalInfo}</h2>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full">
                        <div className='md:w-1/2 flex flex-col md:flex-row m-10 border-green border rounded-lg p-2'>
                            <div className='w-full p-10'>
                                <h1 style={{ fontFamily: 'Pacifico' }} class="text-3xl w-full text-center text-green font-bold">
                                    Pets
                                </h1>    
                                <PetList userID={lastPartOfPathname} />                     
                            </div>
                        </div>
                        <div className='md:w-1/2 flex flex-col md:flex-col m-10 border-green border rounded-lg p-2'>
                            <div className='w-full p-10'>
                                <h2 style={{ fontFamily: 'Pacifico' }} className="text-3xl w-full text-center text-green font-bold">
                                    Comments
                                </h2>                  
                            </div>
                            <div>
                                <Comment userID={lastPartOfPathname}/>
                            </div>
                        </div>
                    </div>        
                    <div className="flex justify-center">
                        <button className="bg-green hover:bg-gray text-white font-bold py-2 px-4 m-8 rounded w-40">
                            <Link href={"./reportFraud"}>Report Fraud</Link>
                        </button>
                     </div>
                </main>                
            );
        }
    }
}