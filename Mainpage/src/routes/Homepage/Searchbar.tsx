import React, { useState, useEffect, useRef } from 'react';
import './Searchbar.css';
import { BASE_URL } from '../config/config.tsx';
import { useNavigate } from 'react-router-dom';


type SearchSuggestionItem = {
    title: string;
    author: string; 
};

const Searchbar = () => {
    const [input, setInput] = useState(localStorage.getItem('search') || '');
    const [searchSuggestion, setSearchSuggestion] = useState<Array<SearchSuggestionItem>>([]);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);
    const [isInputFocused, setInputFocused] = useState(false);
    const timeoutRef = useRef<number | null>(null);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInput(newValue);
      fetchData(newValue);
      sessionStorage.setItem('input', newValue);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setInput(event.target.value);

      timeoutRef.current = setTimeout(() => {
        fetchData(event.target.value);
      }, 300);
    };

    const fetchData = async (query: string) => {
        if (!query.trim()) {
            setSearchSuggestion([]);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/publications/search?query=${query}`);
        const data = await response.json();
        setSearchSuggestion(data);
    };

    const handleSuggestionClick = (suggestion: SearchSuggestionItem) => {
        setInput(suggestion.title);
        
        setSearchSuggestion([]);
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      localStorage.setItem('search', input);
      navigate(`/results?q=${input}`);
      setSearchSuggestion([]);
    };

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setSearchSuggestion([]);
        }
      }

      const storedInput = sessionStorage.getItem('input');
        if (storedInput) {
        setInput(storedInput);
        fetchData(storedInput);
        }
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };

      
    }, []);

    return (
      <div className='input-component' ref={searchRef}>
        <form className="input__container" onSubmit={handleSubmit}>      
          <button className="input__button__shadow" type="submit" >
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px" onClick={handleSubmit}>
              <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
            </svg>
          </button>
          <input type="search" name="main-search" className="input__search" placeholder="What do you want to search?" value={input} onChange={handleChange} onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} />

        </form>

        {(isInputFocused && searchSuggestion.length > 0) && (
          
          <div className={`search-results ${searchSuggestion.length > 0 ? 'with-results' : ''}`}>
            {searchSuggestion.slice(0, 5).map((suggestion, index) => (
              <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
                <li key={index} className="search-result-item">
                  <a>{suggestion.title}</a> By <a>{suggestion.author}</a>
                </li>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default Searchbar;