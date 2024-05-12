import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../config/config.tsx';
import Searchbar from './Searchbar.tsx';
import { Link } from 'react-router-dom';

interface SearchResult {
    id: string;
    title: string;
    description: string;
    author: string;
}

const ResultsPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  };

    useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/api/v1/publications/search?query=${searchTerm}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setSearchResults(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error:', error);
            setLoading(false);
          });
      }, [location.search, searchTerm, BASE_URL]);

      if (loading) {
        return <div>Loading...</div>;
    }

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = searchResults.slice(startIndex, endIndex);
      const totalPages = Math.ceil(searchResults.length / itemsPerPage);

    return (
        <div className='search-result-page'>
            <Searchbar />
            
            {currentItems.map((result) => (
                <React.Fragment key={result.id}>
                  <Link to={`/ResultsDetail/${encodeURIComponent(result.title)}`} key={result.id} className="after-result-container">
                    <div >
                      <h2>{result.title}</h2> 
                      <h3>By {result.author}</h3>
                      <p>{result.description ? result.description.substr(0,150) : 'No description available'}</p> 
                    </div>
                  </Link>
                </React.Fragment>
              ))
            }
            <button className="result-page-change" onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
            <button className="result-page-change" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default ResultsPage;