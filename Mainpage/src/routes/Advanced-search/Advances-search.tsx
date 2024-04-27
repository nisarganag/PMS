import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";
import "./Advanced-search.css";

function Advanced_search() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
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

    const selectedFilter = selectedFilters[0]; // Assuming only one filter can be selected at a time
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
            placeholder="Write here..."
            className="Adv-search-bar"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button type="submit">Search</button>
        </form>

        <button
          id="adv-search-btn"
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          Advanced Search <i className="fa fa-caret-down"></i>
        </button>
      </div>

      {showAdvancedOptions && (
        <div id="advanced-options">
          <div className="adv-opt-container">
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value="By Language"
                    onChange={handleFilterChange}
                  />{" "}
                  By Language
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value="By Category"
                    onChange={handleFilterChange}
                  />{" "}
                  By Category
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value="By Publisher"
                    onChange={handleFilterChange}
                  />{" "}
                  By Publisher
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value="By Date"
                    onChange={handleFilterChange}
                  />{" "}
                  By Date
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value="By Co-Author"
                    onChange={handleFilterChange}
                  />{" "}
                  By Co-Author
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    value="By Country"
                    onChange={handleFilterChange}
                  />{" "}
                  By Country
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
