"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

export default function Page(){
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userInteractions, setUserInteractions] = useState("");
    const [userAttachment, setUserAttachment] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [supplierInteractions, setSupplierInteractions] = useState("");
    const [supplierAttachment, setSupplierAttachment] = useState("");
    const [companyName, setCompanyName] = useState([]);

    const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

    const fetchCompany = async () => {
        try {
            const response = await fetch("/api/user", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCompanyName(data);
            } else {
                console.error("Company fetch failed:", response);
            }
        } catch (error) {
            console.error("Company fetch failed:", error);
        }
    }

    useEffect(() => {
        fetchCompany();}, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/user/reportFraud", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userFirstName, userLastName, userInteractions,
                     userAttachment, supplierName, supplierInteractions, supplierAttachment}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Report submitted:", data);
                setUserFirstName("");
                setUserLastName("");
                setUserInteractions("");
                setUserAttachment("");
                setSupplierName("");
                setSupplierInteractions("");
                setSupplierAttachment("");
            } else {
                console.error("Report submission failed:", response);
            }
        } catch (error) {
            console.error("Report submission failed:", error);
        }
    }
    
    return (
      <div className="p-52">
        <h1 className="text-5xl text-green font-bold mb-4 text-left">Report Fraud</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-4 flex flex-row">
            <h1 className="text-lg font-bold w-1/4">First Name:</h1>
            <input
              className="border border-light-gray rounded p-2 ml-auto w-3/4"
              type="text"
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
            />
          </label>
          <label className="mb-4 flex flex-row">
            <h1 className="text-lg font-bold w-1/4">Last Name:</h1>
            <input
              className="border border-light-gray rounded p-2 ml-auto w-3/4"
              type="text"
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
            />
          </label>
          <label className="mb-4 flex flex-row">
            <h1 className="text-lg font-bold w-1/4">Interactions with the Supplier:</h1>
            <textarea
              className="border border-light-gray rounded p-2 ml-auto w-3/4"
              value={userInteractions}
              onChange={(e) => setUserInteractions(e.target.value)}
            />
          </label>
          <label className="mb-4 flex flex-row">
            <h1 className="text-lg font-bold w-1/4">User Attachments:</h1>
            <ReactQuill
              type="file"
              value={userAttachment}
              onChange={setUserAttachment}
            /> 
          </label>
          <label className="mb-4 flex flex-row">
            <h1 className="text-lg font-bold w-1/4">Supplier Name:</h1>
            <select
              className="border border-light-gray rounded p-2 ml-auto w-64 justify-start"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            >
              <option value="flex flex-row">Select Supplier</option>
              {companyName.map((company) => (
                <option key={company.email} value={company.Company}>
                  {company.Company}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-4 flex flex-row">
            <h1 className="text-lg font-bold w-60">Supplier Interactions:</h1>
            <textarea
              className="border border-light-gray rounded p-2 ml-auto w-3/4"
              value={supplierInteractions}
              onChange={(e) => setSupplierInteractions(e.target.value)}
            />
          </label>
          <label className="mb-4 flex flex-row ">
            <h1 className="text-lg font-bold w-1/4">Supplier Attachments:</h1>
            <ReactQuill
              value={supplierAttachment}
              onChange={setSupplierAttachment}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                  ["code-block"],
                ],
              }}
            />
          </label>
          <div className="flex flex-row justify-center m-4">
            <button className="bg-green hover:bg-gray text-white font-bold py-2 px-4 m-8 rounded w-40" type="submit">Submit</button>
          </div>          
        </form>
      </div>
    );
}