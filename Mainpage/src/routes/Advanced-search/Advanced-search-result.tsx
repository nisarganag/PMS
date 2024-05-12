import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = results.slice(startIndex, endIndex);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className='search-result-page'>
      <h1 style={{marginLeft:'10px', borderBottom:'black 2px solid'}}>Search Results:</h1>
      {currentItems.map((result) => (
        <React.Fragment key={result.id} >
          <Link to={`/ResultsDetail/${encodeURIComponent(result.title)}`} key={result.id} className="after-result-container">
            <div key={result.id}>
              <h2>{result.title}</h2>
              <h3>By {result.author}</h3>
              <p>{result.description}</p>
            </div>
          </Link>
        </React.Fragment>
      ))}
      <button className='result-page-change' onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
      <button className='result-page-change' onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
}

export default SearchResults;