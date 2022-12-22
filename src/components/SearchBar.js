import React, { useState } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://api.instantwebtools.net/v1/airlines?name=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.results));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className='search' type="text" value={searchTerm} onChange={handleChange} />
      <button className='loadMore' type="submit">Search</button>
      {searchResults.length > 0 && (
        <ul>
          <li>Result:</li>
          {searchResults.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SearchBar