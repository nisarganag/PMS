import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";
import "./Advanced-search.css";

function Advanced_search() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const filterAPIs: { [key: string]: string } = {
      "By Language": `${BASE_URL}/api/v1/publications/searchByLanguage?query=`,
      "By Category": `${BASE_URL}/api/v1/publications/searchByCategory?query=`,
      "By Publisher": `${BASE_URL}/api/v1/publications/searchByPublisher?query=`,
      "By Date": `${BASE_URL}/api/v1/publications/searchByDate?query=`,
      "By Co-Author": `${BASE_URL}/api/v1/publications/searchByCoAuthor?query=`,
      "By Country": `${BASE_URL}/api/v1/publications/searchByCountry?query=`,
    };

    const selectedFilter = selectedFilters[0];
    const apiURL = `${filterAPIs[selectedFilter]}${searchTerm}`;
    navigate(`/AdvancedSearchResult?apiURL=${encodeURIComponent(apiURL)}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFilters([value]);
    } else {
      setSelectedFilters([]);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      <div className="search-area">
        <form id="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search here..."
            className="Adv-search-bar"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button type="submit" className="adv-search-btn">
            <span>
              <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
            </span>
          </button>
        </form>
      </div>

      
        <div id="advanced-options">
          <div className="adv-opt-container">
            <h1>Filter:</h1>
            <ul>
            {['By Language', 'By Category', 'By Publisher', 'By Date', 'By Co-Author', 'By Country'].map((filter) => (
              <li
                key={filter}
                className={selectedFilters.includes(filter) ? 'active-filter' : ''}
  
              >
                <label style={{ width: '100%', height: '100%', display: 'block', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    value={filter}
                    onChange={handleFilterChange}
                    checked={selectedFilters.includes(filter)}
                  />{" "}
                  {filter}
                </label>
              </li>
            ))}
          </ul>
          </div>
        </div>
    </div>
  );
}

export default Advanced_search;
