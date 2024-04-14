import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SearchResult {
    title: string;
    description: string;
}

const ResultsPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q');
    const BASE_URL = 'http://your-api-url.com'; // replace with your actual API URL

    useEffect(() => {
        fetch(`${BASE_URL}/api/v1/publications/search?query=${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setSearchResults(data))
            .catch(error => console.error('Error:', error));
    }, [searchTerm, BASE_URL]);

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Search Results</h1>
            {searchResults.map((result, index) => (
                <div key={result.title + index}>
                    <h2>{result.title}</h2>
                    <p>{result.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ResultsPage;