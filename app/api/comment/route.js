import clientPromise from "../../lib/mongodb"
import { NextResponse } from "next/server";

//to handle the POST request to the database
export async function POST(request) {
 console.log("Incoming request body:", request.body);

 // Ensure that the request method is POST
 
   try {
     // Get the username and review from the request body
     const data = await request.json();
     //const {supplierID} = request.params;

     console.log(request.body);
     const client = await clientPromise;

     // Connect to the MongoDB database
     const db = client.db("users");

     // Insert the comment into the "review" collection
     await db.collection("userComment").insertOne({
        userID: data.userID,
        username: data.username,
        date: data.date,
        comment: data.comment,
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
    //when i try to get the supplierID from the params
    //i get an error of TypeError: Cannot destructure property 'supplierID' of 'request.params' as it is undefined.
    //const { supplierID } = request.query;
    //console.log("supplier ID: ", supplierID);
    const client = await clientPromise;
    const db = client.db("users");
    const collection = db.collection("userComment");
    const comment = await collection.find({}).toArray();

    //this works but only for the supplier with the ID of 65ea4b395cde72e70cbd0dd0
    //const test = {supplierID: "65ea4b395cde72e70cbd0dd0"}
    //const reviews = await collection.find(test).toArray();
    //in the review component, to not have fetch(/api/review/${supplierID})
    //console.log("reviews: ", reviews);

    return new Response(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.error("Error getting comments:", error);
    return new NextResponse(500, { error: "Internal Server Error" });
  }
}
