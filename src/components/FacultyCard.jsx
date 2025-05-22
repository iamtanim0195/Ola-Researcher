// app/components/FacultyCard.jsx

const FacultyCard = ({ data, type }) => {
    const researchList =
        (type === 'professors' ? data.research_areas : data.research_fields) || [];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {type === 'professors' ? data.name : data.faculty_name}
                </h3>

                <div className="space-y-3">
                    {data.email && (
                        <p className="text-gray-600">
                            <span className="font-medium">Email:</span> {data.email}
                        </p>
                    )}

                    {data.university && (
                        <p className="text-gray-600">
                            <span className="font-medium">University:</span> {data.university}
                        </p>
                    )}

                    {researchList.length > 0 && (
                        <div className="text-gray-600">
                            <span className="font-medium">Research Areas:</span>
                            <ul className="list-disc list-inside mt-1 pl-2">
                                {researchList.map((area, idx) => (
                                    <li key={idx}>{area}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {data.ielts_score && (
                        <p className="text-gray-600">
                            <span className="font-medium">IELTS Score:</span> {data.ielts_score}
                        </p>
                    )}

                    {data.ielts_minimum && (
                        <p className="text-gray-600">
                            <span className="font-medium">IELTS Minimum:</span> {data.ielts_minimum}
                        </p>
                    )}

                    {data.gre_status && (
                        <p className="text-gray-600">
                            <span className="font-medium">GRE Status:</span> {data.gre_status}
                        </p>
                    )}

                    {data.gre_required && (
                        <p className="text-gray-600">
                            <span className="font-medium">GRE Required:</span> {data.gre_required}
                        </p>
                    )}

                    {data.google_scholar && (
                        <p className="text-gray-600 truncate">
                            <span className="font-medium">Google Scholar:</span>{' '}
                            <a
                                href={data.google_scholar}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View Profile
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FacultyCard;
