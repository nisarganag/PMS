import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../config/config.tsx';

interface SearchResult {
    title: string;
    description: string;
}

const ResultsPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q');

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
        <div className='search-result-page'>
            <h1>Search Results</h1>
            <div className='result-container'>
                {searchResults.map((result, index) => (
                    <div key={index}>
                        <h2>{result.title}</h2>
                        <p>{result.description ? result.description.substr(0,150) : ''}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default ResultsPage;