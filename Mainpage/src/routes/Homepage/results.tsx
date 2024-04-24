import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../config/config.tsx';
import Searchbar from './Searchbar.tsx';
import Loading from '../Loading/Loading.tsx';

interface SearchResult {
    title: string;
    description: string;
}



const ResultsPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q');
    const [loading, setLoading] = useState(true);
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
      }, [searchTerm, BASE_URL]);
    return (
        <div className='search-result-page'>
            <Searchbar />
            
            {loading ? (
              <div>
                Please wait while we fetch the results.....
              </div>
            ) : (
              
                searchResults.map((result, index) => (
                  <div className="after-result-container" key={index}>
                    <h2>{result.title}</h2>
                    <p>{result.description ? result.description.substr(0,150) : 'No description available'}</p> 
                  </div>
                ))
              
            )}
        </div>
    );
};

export default ResultsPage;