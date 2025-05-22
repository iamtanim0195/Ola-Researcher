// app/api/faculty/route.js
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    console.log(`Fetching data for type: ${type}`);

    if (!['professors', 'students'].includes(type)) {
        console.error('Invalid type requested:', type);
        return NextResponse.json([], { status: 400 });
    }

    const collectionName = type === 'professors'
        ? 'Log_in_as_Professors'
        : 'Log_in_as_Students';

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        console.log(`Accessing collection: ${collectionName}`);
        const collection = db.collection(collectionName);

        const data = await collection.find({}).toArray();
        console.log(`Found ${data.length} items`);

        await client.close();

        return NextResponse.json(Array.isArray(data) ? data : []);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json([], { status: 500 });
    }
}