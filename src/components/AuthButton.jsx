//src/components/AuthButton.jsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function AuthButton() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleImageClick = () => {
        router.push('/dashboard');
    };

    return session ? (
        <> <img
            src={session.user.image}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full cursor-pointer inline-block"
            onClick={handleImageClick}
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
