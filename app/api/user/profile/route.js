import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

//to handle the POST request to the database
export async function POST(request) {
 console.log("Incoming request body:", request.body);

  try {
    // Get the username and review from the request body
    const data = await request.json();

    console.log(request.body);
    const client = await clientPromise;

    // Connect to the MongoDB database
    const db = client.db("users");

    // Query the "user" collection in the database for documents where the email field matches `data.email`
    const findings = await db.collection("user").find({email: data.email}).toArray();

    // Extract the `_id` field from the first document in the returned array
    const userID = findings[0]._id;


    await db.collection("profile").insertOne({
       userID: userID,
       email: data.email,
       username: data.username,
       additionalInfo: data.additionalInfo,
       photo: data.photo,
    
    });
    
    // Respond with the inserted comment
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error("Error handling comment submission:", error);
    return new NextResponse(500, { error: "Internal Server Error" });
  }
}

//to handle the GET request to the database
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("users");
    const collection = db.collection("profile");

    const profile = await collection.find({}).toArray();

    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return new NextResponse(500, { error: "Internal Server Error" });
  }
}