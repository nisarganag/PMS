import { useState } from 'react';
import { BASE_URL } from './config/config';

function Advanced_search() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Fetch the search results based on the selected filters and search term
    // You need to replace this with your actual data fetching logic
    selectedFilters.forEach(filter => {
      fetch(`${BASE_URL}/api/v1/publications/search?${filter}=${searchTerm}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedFilters(selectedOptions);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Advanced Searches</h1>
      <select multiple onChange={handleFilterChange}>
        <option value="author">Author</option>
        <option value="date">Date</option>
        <option value="title">Title</option>
        {/* Add more options for additional filters */}
      </select>
      <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search term" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Advanced_search;