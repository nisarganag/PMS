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
        const response = await fetch(`http://52.66.213.10:8080/api/v1/publications/search?query=${query}`);
        const data = await response.json();
        setSearchResult(data);
    };

    

    const handleSearchClick = () => {
        fetchData(input);
    };

    return (
      <div className='input-component'> 
        <div className="input__container">
          <div className="shadow__input"></div>
          <button className="input__button__shadow">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px" onClick={handleSearchClick}>
              <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
            </svg>
          </button>
          <input type="main-search" name="text" className="input__search" placeholder="What do you want to search?" value={input} onChange={handleChange}/>
        </div>


        {/* <div className='search-bar'>
            <input type="main-search" placeholder='Type to Search... ' value={input} onChange={handleChange} />
            <FaSearch className='search-icon' onClick={handleSearchClick} />
        </div> */}
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