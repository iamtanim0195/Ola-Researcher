'use client';

import { useEffect, useState } from 'react';

export default function FacultyPage() {
    const [facultyList, setFacultyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch('/api/faculty')
            .then((res) => res.json())
            .then((data) => {
                setFacultyList(data);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    // Filter logic: matches ANY word in any field
    const filteredFaculty = facultyList.filter((faculty) => {
        const combined = `
            ${faculty['Faculty Name'] || ''}
            ${faculty['University Name'] || ''}
            ${faculty['Department'] || ''}
            ${faculty['Field of interest '] || ''}
            ${faculty['Language Proficiency'] || ''}
        `.toLowerCase();

        return searchQuery
            .toLowerCase()
            .split(' ')
            .every((word) => combined.includes(word));
    });

    const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
    const currentFaculty = filteredFaculty.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) return <p className="p-6">Loading faculty data...</p>;

    return (
        <div className="p-6 space-y-6">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name, university, or interest"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentFaculty.map((faculty, index) => (
                    <div
                        key={faculty._id || index}
                        className="rounded-2xl shadow-lg p-4 border border-gray-200 bg-white hover:shadow-xl transition-transform duration-200 hover:scale-[1.02] text-black"
                    >
                        <h2 className="text-xl font-semibold">{faculty['Faculty Name']}</h2>
                        <p className="text-sm text-gray-700">
                            {faculty['University Name']} – {faculty['Department']}
                        </p>
                        <p className="text-sm">🗣️ {faculty['Language Proficiency']}</p>
                        <p className="text-sm font-semibold text-blue-600">
                            🎯 Field of interest: {faculty['Field of interest '] || 'N/A'}
                        </p>
                        <p className="text-sm">📜 GRE: {faculty['GRE Score']}</p>
                        <p className="text-sm">💼 {faculty['Job Experience'] || 'No experience listed'}</p>
                        {faculty['Scholar/Orcid Link'] && (
                            <a
                                href={faculty['Scholar/Orcid Link']}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-blue-600 underline text-sm"
                            >
                                Google Scholar Profile
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination controls (Previous / Next only) */}
            <div className="flex justify-center items-center space-x-4 pt-6">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-black px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="text-black  px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
