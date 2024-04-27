import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Advanced_search() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const filterKeys: { [key: string]: string } = {
      "By Language": "language",
      "By Category": "category",
      "By Publisher": "publisher",
      "By Date": "date",
      "By Co-Author": "coAuthor",
      "By Country": "country",
    };
    const filterParams = selectedFilters.map(filter => `${filterKeys[filter]}=${searchTerm}`).join('&');
    navigate(`/AdvancedSearchResult?${filterParams}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedFilters(prevFilters => checked ? [...prevFilters, value] : prevFilters.filter(filter => filter !== value));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div className="search-area">
        <form id="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="search" onChange={e => setSearchTerm(e.target.value)} />
          <button type="submit">Search</button>
        </form>

        <button id="adv-search-btn" onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
          Advanced Search <i className="fa fa-caret-down"></i>
        </button>
      </div>

      {showAdvancedOptions && (
        <div id="advanced-options">
          <div className="adv-opt-container">
            <ul>
              <li><label><input type="checkbox" value="By Language" onChange={handleFilterChange} /> By Language</label></li>
              <li><label><input type="checkbox" value="By Category" onChange={handleFilterChange} /> By Category</label></li>
              <li><label><input type="checkbox" value="By Publisher" onChange={handleFilterChange} /> By Publisher</label></li>
              <li><label><input type="checkbox" value="By Date" onChange={handleFilterChange} /> By Date</label></li>
              <li><label><input type="checkbox" value="By Co-Author" onChange={handleFilterChange} /> By Co-Author</label></li>
              <li><label><input type="checkbox" value="By Country" onChange={handleFilterChange} /> By Country</label></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Advanced_search;