import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import User from '../../../models/User';
import { connectToDatabase } from '../../../lib/mongoose';

export async function GET() {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    return Response.json(user);
}

export async function PUT(request) {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    const data = await request.json();

    if (!session) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: data },
        { new: true }
    );

    return Response.json(updatedUser);
}