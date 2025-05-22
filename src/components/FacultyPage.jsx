// src/components/FacultyPage.jsx
'use client';

import { useState, useEffect } from 'react';
import FacultyCard from './FacultyCard';

const FacultyPage = () => {
    const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState('professors');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/faculty?type=${viewMode}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(Array.isArray(result) ? result : []);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [viewMode]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter((item) => {
        const researchList =
            (viewMode === 'professors' ? item.research_areas : item.research_fields) || [];

        return researchList.some((area) =>
            area.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Faculty Directory</h1>

            {/* Toggle Buttons */}
            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md shadow-sm">
                    <button
                        onClick={() => {
                            setViewMode('professors');
                            setSearchTerm('');
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                            viewMode === 'professors'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Students
                    </button>
                    <button
                        onClick={() => {
                            setViewMode('students');
                            setSearchTerm('');
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                            viewMode === 'students'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Professors
                    </button>
                </div>
            </div>

            {/* Search Input */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search by Research Area..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <FacultyCard key={index} data={item} type={viewMode} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No {viewMode} found matching search
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacultyPage;
