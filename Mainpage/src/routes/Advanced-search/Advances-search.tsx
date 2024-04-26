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
      "By Author": "author",
      "By Title": "title",
      "By Publisher": "publisher",
      "By Date": "date",
      "By Issue Number": "issueNumber",
      "By Location": "location",
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
              <li><label><input type="checkbox" value="By Author" onChange={handleFilterChange} /> By Author</label></li>
              <li><label><input type="checkbox" value="By Title" onChange={handleFilterChange} /> By Title</label></li>
              <li><label><input type="checkbox" value="By Publisher" onChange={handleFilterChange} /> By Publisher</label></li>
              <li><label><input type="checkbox" value="By Date" onChange={handleFilterChange} /> By Date</label></li>
              <li><label><input type="checkbox" value="By Issue Number" onChange={handleFilterChange} /> By Issue Number</label></li>
              <li><label><input type="checkbox" value="By Location" onChange={handleFilterChange} /> By Location</label></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Advanced_search;