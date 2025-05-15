'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
    const { data: session } = useSession();

    return session ? (
        <> <img
            src={session.user.image}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full cursor-pointer inline-block"

        />
            <button onClick={() => signOut()} className="text-blue-700 hover:underline ml-4">
                Sign out
            </button>
        </>
    ) : (
        <button onClick={() => signIn("google")} className="text-blue-700 hover:underline">
            Sign in with Google
        </button>
    );
}
