"use client";
import Header from '/app/components/header.js';
import React, { useState } from 'react';

export default function Contact() {
    
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          message: ''
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Handle form submission logic here
          console.log(formData);
        };
    
      
    return (
        <main>
            <Header text="Contact Us"/>
            <div className="container mt-36 p-4">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray shadow-sm focus:border-green focus:ring focus:ring-green focus:ring-opacity-50"
                        placeholder="Your name"
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray shadow-sm focus:border-gray focus:ring focus:ring-gray focus:ring-opacity-50"
                        placeholder="Your email"
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray shadow-sm focus:border-gray focus:ring focus:ring-gray focus:ring-opacity-50"
                        placeholder="Your message"
                    ></textarea>
                    </div>
                    <div className="text-center">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray"
                    >
                        Send Message
                    </button>
                    </div>
                </form>
            </div>
        </main>
    );
}