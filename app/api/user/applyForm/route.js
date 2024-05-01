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
    const db = client.db("fosters");

    // Insert the comment into the "applyForm" collection
    await db.collection("applyForm").insertOne({
      email: data.email,
       homeEnv: data.homeEnv,
       rentOrOwn: data.rentOrOwn,
       homeSqrFT: data.homeSqrFT,
       fosterEXP: data.fosterEXP,
       homeComposition: data.homeComposition,
       petLevelOfComfort: data.petLevelOfComfort,
       openToSpecialNeeds: data.openToSpecialNeeds,
       currentPets: data.currentPets,
       currentPetsSocialization: data.currentPetsSocialization,
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
    const db = client.db("fosters");
    const collection = db.collection("applyForm");
    const form = await collection.find({}).toArray();
    return new Response(JSON.stringify(form), { status: 200 });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return new NextResponse(500, { error: "Internal Server Error" });
  }
}