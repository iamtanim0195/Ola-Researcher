// app/api/faculty/route.js
import { NextResponse } from 'next/server';
import  { connectToDatabase }  from '../../../lib/mongodb';
import Faculty from '../../../models/Faculty';

export async function GET() {
    await connectToDatabase();
    const facultyList = await Faculty.find().lean();
    return NextResponse.json(facultyList);
}
