import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SearchResult {
    title: string;
    description: string;
  }

interface ResultsProps {
searchResults: SearchResult[];
}

const ResultsPage: React.FC<ResultsProps> = ({ searchResults: initialSearchResults }) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>(initialSearchResults);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

  useEffect(() => {
    fetch(`/api/search?query=${searchTerm}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error(error));
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results</h1>
      {searchResults.map((result, index) => (
        <div key={index}>
          <h2>{result.title}</h2>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;