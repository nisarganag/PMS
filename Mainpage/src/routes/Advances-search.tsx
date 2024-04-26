import { useState } from 'react';
import { BASE_URL } from './config/config';

function Advanced_search() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleSearch = () => {
    selectedFilters.forEach(filter => {
      fetch(`${BASE_URL}/api/v1/publications/search?${filter}=${searchTerm}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedFilters(prevFilters => [...prevFilters, event.target.value]);
    } else {
      setSelectedFilters(prevFilters => prevFilters.filter(filter => filter !== event.target.value));
    }
  };
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div className="search-area">
        <form id="search-form">
          <input type="text" placeholder="search" onSubmit={handleSearch} />
        </form>
  
        <a href="#" id="adv-search-btn" onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
          Advanced Search <i className="fa fa-caret-down"></i>
        </a>
      </div>
  
      {showAdvancedOptions && (
        <div id="advanced-options">
          <div className="adv-opt-container">
            <ul>
              <li>
                <label>
                  <input type="checkbox" value="By Author" onChange={handleFilterChange} />
                  By Author
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" value="By Title" onChange={handleFilterChange} />
                  By Title
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" value="By Publisher" onChange={handleFilterChange} />
                  By Publisher
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" value="By Date" onChange={handleFilterChange} />
                  By Date
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" value="By Issue Number" onChange={handleFilterChange} />
                  By Issue Number
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" value="By Location" onChange={handleFilterChange} />
                  By Location
                </label>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Advanced_search;