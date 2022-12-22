import './App.css';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Airlines Info</h1>
        <SearchBar />
        <Pagination />
      </div>
    </div>
  );
}

export default App;
