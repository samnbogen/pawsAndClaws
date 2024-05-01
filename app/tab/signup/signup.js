"use client";
import { useState } from 'react';
import{ signIn, useSession} from "next-auth/react";
import Link from 'next/link';

export default function SignUp(){
    const {data: session} = useSession();
    //console.log(session);
    const [message, setErrorMessage] = useState("");
    const [userPasswordChecklist, setUserPasswordChecklist] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        digit: false,
        specialCharacter: false
    });
    const [supplierPasswordChecklist, setSupplierPasswordChecklist] = useState({
        minLength: false,
        lowercase: false,
        uppercase: false,
        digit: false,
        specialCharacter: false
    });

    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleUserSubmit = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value.toLowerCase();
        const password = event.target.elements.password.value;
        const role = "user";
        onSubmit({ email, password, role});
    };
    
    const handleSupplierSubmit = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value.toLowerCase();
        const password = event.target.elements.password.value;
        const role = "supplier";
        onSubmit({email, password, role});
    };
    
    const checkUserPasswordRequirements = (password) => {
        const minLength = password.length >= 8;
        const lowercase = /[a-z]/.test(password);
        const uppercase = /[A-Z]/.test(password);
        const digit = /\d/.test(password);
        const specialCharacter = /[!@#$%^&*]/.test(password);
        
        setUserPasswordChecklist({
            minLength,
            lowercase,
            uppercase,
            digit,
            specialCharacter
        });
    };

    const checkSupplierPasswordRequirements = (password) => {
        const minLength = password.length >= 8;
        const lowercase = /[a-z]/.test(password);
        const uppercase = /[A-Z]/.test(password);
        const digit = /\d/.test(password);
        const specialCharacter = /[!@#$%^&*]/.test(password);
        
        setSupplierPasswordChecklist({
            minLength,
            lowercase,
            uppercase,
            digit,
            specialCharacter
        });
    };


    const onSubmit = async (user) => {
        try{
            const response = await signIn("signup", {...user,
            redirect: false,
        });
        if(response?.ok){
            console.log("Sign up successful", response);
            setSignupSuccess(true);
            mutate();
        } else {
            setErrorMessage(response.error);
            setTimeout(() => setErrorMessage(""), 5000);
            console.error("Sign up failed", response);
            
        }

    } catch (error){
        console.error(error);
        setTimeout(() => setErrorMessage(""), 5000);
        setErrorMessage("Sign up failed");
    };
};


return (
    <>
        {signupSuccess ? (
            // Display success message
            <div className="flex flex-col items-center justify-center bg-gray-100 ">
                <h1>Welcome {session.user.email}, you&apos;re successfully signed up!</h1>
                <Link href="/">Click here to go to the main page</Link>
            </div>
        ) : (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className='flex mr-50 flex-grow h-50 w-full items-center justify-center'> 
                    <form onSubmit={handleUserSubmit} className="bg-white p-8 rounded shadow-md mr-5 h-50 w-1/2 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4 text-center">User <span className='text-green'>Sign Up</span></h2>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Email:</label>
                                <input 
                                className="w-full border rounded-md p-2"
                                required
                                name='email'
                                type="email" 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mt-4 mb-2">Password:</label>
                                <input 
                                className="w-full border rounded-md p-2"
                                required
                                type="password"
                                name='password'
                                onChange={(e) => checkUserPasswordRequirements(e.target.value)}
                                />
                            </div>
                            <div className='text-left mt-2'>
                                <ul className='list-disc list-inside'>
                                    <li className={userPasswordChecklist.minLength ? 'text-green' : 'text-red'}>Minimum 8 characters</li>
                                    <li className={userPasswordChecklist.lowercase ? 'text-green' : 'text-red'}>At least one lowercase letter</li>
                                    <li className={userPasswordChecklist.uppercase ? 'text-green' : 'text-red'}>At least one uppercase letter</li>
                                    <li className={userPasswordChecklist.digit ? 'text-green' : 'text-red'}>At least one digit</li>
                                    <li className={userPasswordChecklist.specialCharacter ? 'text-green' : 'text-red'}>At least one special character: !@#$%^&*</li>
                                </ul>
                            </div>
                            <div className='flex justify-center'>
                                <button className=" text-white font-bold py-2 px-4 rounded-full mt-4 bg-green" type="submit"> User Sign Up</button>
                            </div>
                    </form>

                    <form onSubmit={handleSupplierSubmit} className="bg-white p-8 rounded shadow-md h-50 w-1/2 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Supplier <span className='text-green'>Sign Up</span></h2>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Email:</label>
                                <input 
                                className="w-full border rounded-md p-2"
                                required
                                type="text"
                                name='email'
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mt-4 mb-2">Password:</label>
                                <input 
                                className="w-full border rounded-md p-2"
                                required
                                type="password"
                                name='password'
                                onChange={(e) => checkSupplierPasswordRequirements(e.target.value)} 
                                />
                            </div>
                            <div className='text-left mt-2'>
                                <ul className='list-disc list-inside'>
                                    <li className={supplierPasswordChecklist.minLength ? 'text-green' : 'text-red'}>Minimum 8 characters</li>
                                    <li className={supplierPasswordChecklist.lowercase ? 'text-green' : 'text-red'}>At least one lowercase letter</li>
                                    <li className={supplierPasswordChecklist.uppercase ? 'text-green' : 'text-red'}>At least one uppercase letter</li>
                                    <li className={supplierPasswordChecklist.digit ? 'text-green' : 'text-red'}>At least one digit</li>
                                    <li className={supplierPasswordChecklist.specialCharacter ? 'text-green' : 'text-red'}>At least one special character</li>
                                    
                                </ul>
                            </div>
                        <div className='flex justify-center'>
                            <button className="text-white font-bold py-2 px-4 rounded-full mt-4 bg-green" type="submit">Supplier Sign Up</button>
                        </div>
                    </form> 
                </div>
            </div>
                {/* Link at the bottom */}
                <div className="text-center">
                {/* error message */}
                {message && <p className="text-red">{message}</p>}
                    <Link className="text-center block mt-4 font-semibold" href="./login">Already have an account? Log in</Link>
                </div>
        </>
        )}
    </>
);
}