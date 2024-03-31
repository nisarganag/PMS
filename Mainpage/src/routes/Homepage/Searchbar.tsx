import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './Searchbar.css';

const Searchbar = () => {
    const [input, setInput] = useState("");
    type SearchResultItem = {
      title: string;
      author: string;
      // other properties...
  };
    const [searchResult, setSearchResult] = useState<Array<SearchResultItem>>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInput(newValue);
      fetchData(newValue);
  };
    const fetchData = async (query: string) => {
      if (!query.trim()) {
        setSearchResult([]);
        return;
    }
        const response = await fetch(`http://localhost:8080/api/v1/publications/search?query=${query}`);
        const data = await response.json();
        setSearchResult(data);
    };

    

    const handleSearchClick = () => {
        fetchData(input);
    };

    return (
      <div className='input-component'>
          <div className='search-bar'>
              <input type="main-search" placeholder='Type to Search... ' value={input} onChange={handleChange} />
              <FaSearch className='search-icon' onClick={handleSearchClick} />
          </div>
          {(searchResult.length > 0) && (
          <div className={`search-results ${searchResult.length > 0 ? 'with-results' : ''}`}>
            <ul>
              {searchResult.slice(0,10).map((item: SearchResultItem, index: number) => (
                  <li key={index} className="search-result-item">
                      <b>{item.title}</b> by <i>{item.author}</i>
                  </li>
              ))}
              </ul>
          </div>)}
      </div>
  );
}

export default Searchbar;