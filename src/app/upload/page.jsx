'use client';

import { useState } from 'react';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState({ message: '', isError: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: 'Uploading...', isError: false });

        if (!file) {
            setStatus({ message: 'Please select a file first', isError: true });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ message: `Upload successful! File: ${data.fileName}`, isError: false });
            } else {
                setStatus({ message: data.error || 'Upload failed', isError: true });
            }
        } catch (error) {
            setStatus({ message: 'Network error', isError: true });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    disabled={status.message === 'Uploading...'}
                >
                    {status.message === 'Uploading...' ? 'Uploading...' : 'Upload CV'}
                </button>
                {status.message && (
                    <p className={`mt-2 text-sm ${status.isError ? 'text-red-500' : 'text-green-500'}`}>
                        {status.message}
                    </p>
                )}
            </form>
        </div>
    );
}