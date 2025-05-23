'use client';

import { useState, useEffect } from 'react';
import FacultyCard from './FacultyCard';

const FacultyPage = () => {
    const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState('professors');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedResearchAreas, setSelectedResearchAreas] = useState([]);
    const [ieltsScore, setIeltsScore] = useState('');
    const [allResearchAreas, setAllResearchAreas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/faculty?type=${viewMode}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const filtered = Array.isArray(result) ? result : [];
                setData(filtered);

                // Extract all research areas for multi-select options
                const areas = new Set();
                filtered.forEach((item) => {
                    const areasList =
                        viewMode === 'professors' ? item.research_areas : item.research_fields;
                    (areasList || []).forEach((area) => areas.add(area));
                });
                setAllResearchAreas([...areas]);
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

    // Advanced filtering
    const filteredData = data.filter((item) => {
        const researchList =
            (viewMode === 'professors' ? item.research_areas : item.research_fields) || [];

        // Check research area match
        const matchesResearch =
            selectedResearchAreas.length === 0 ||
            researchList.some((r) =>
                selectedResearchAreas.some(
                    (area) => r.toLowerCase() === area.toLowerCase()
                )
            );

        // Check IELTS match
        const requiredIelts = item.ielts_minimum || item.ielts_score;
        const matchesIelts =
            !ieltsScore || !requiredIelts || parseFloat(ieltsScore) >= parseFloat(requiredIelts);

        return matchesResearch && matchesIelts;
    });

    const handleResearchAreaToggle = (area) => {
        setSelectedResearchAreas((prev) =>
            prev.includes(area)
                ? prev.filter((a) => a !== area)
                : [...prev, area]
        );
    };

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
                            setSelectedResearchAreas([]);
                            setIeltsScore('');
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${viewMode === 'professors'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Students
                    </button>
                    <button
                        onClick={() => {
                            setViewMode('students');
                            setSelectedResearchAreas([]);
                            setIeltsScore('');
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${viewMode === 'students'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Professors
                    </button>
                </div>
            </div>

            {/* IELTS Input */}
            <div className="flex justify-center mb-4">
                <input
                    type="number"
                    step="0.5"
                    placeholder="Enter your IELTS score"
                    value={ieltsScore}
                    onChange={(e) => setIeltsScore(e.target.value)}
                    className="w-full max-w-xs px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Research Area Multi-select */}
            <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {allResearchAreas.map((area) => (
                    <label
                        key={area}
                        className={`cursor-pointer border px-3 py-1 rounded-full text-sm text-center ${selectedResearchAreas.includes(area)
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        onClick={() => handleResearchAreaToggle(area)}
                    >
                        {area}
                    </label>
                ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <FacultyCard key={index} data={item} type={viewMode} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No {viewMode} found matching criteria
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacultyPage;
