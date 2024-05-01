import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

//to handle the POST request to the database
export async function POST(request) {
    console.log('Incoming request body:', request.body);
    try {
        // Get the username and review from the request body
        const data = await request.json();
        console.log(request.body);
        const client = await clientPromise;
        // Connect to the MongoDB database
        const db = client.db("supplier");

        const findings = await db.collection("supplierInfo").find({Company: data.supplierName}).toArray();
        const companyID = findings[0]._id;
        //console.log("findings", findings);

        // Insert the comment into the "reportFraud" collection
        await db.collection("reportFraud").insertOne({
            supplierID: companyID,
            userFirstName: data.userFirstName,
            userLastName: data.userLastName,
            userInteractions: data.userInteractions,
            userAttachment: data.userAttachment,
            supplierName: data.supplierName,
            supplierInteractions: data.supplierInteractions,
            supplierAttachment: data.supplierAttachment,
            
        });
        // Respond with the inserted comment
        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        console.error('Error handling comment submission:', error);
        return new NextResponse(500, { error: 'Internal Server Error' });
    }
}

//to handle the GET request to the database
/*export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db('supplier');
        const collection = db.collection('reportFraud');
        const fraud = await collection.find({}).toArray();
        return new Response(JSON.stringify(fraud), { status: 200 });
    } catch (error) {
        console.error('Error getting reviews:', error);
        return new NextResponse(500, { error: 'Internal Server Error' });
    }
}*/