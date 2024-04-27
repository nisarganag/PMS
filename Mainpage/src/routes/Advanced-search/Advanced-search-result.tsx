import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  author: string;
}

function SearchResults() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const apiURL = new URLSearchParams(location.search).get('apiURL');
      if (apiURL) {
        const response = await fetch(apiURL);
        const data = await response.json();
        setResults(data);
      }
      setIsLoading(false);
    };
  
    fetchResults();
  }, [location.search]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Results</h1>
      {results.map((result) => (
        <div key={result.id}>
          <h2>{result.title}</h2>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;