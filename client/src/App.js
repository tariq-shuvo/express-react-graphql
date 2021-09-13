import './App.css';
import AuthorList from './components/AuthorList';
import BookList from './components/BookList';

function App() {
  return (
    <div className="App">
      <section className="App-header">
        <h1>Book List</h1>
        <BookList />
      </section>
      <section className="App-header">
        <h1>Author List</h1>
        <AuthorList />
      </section>
    </div>
  );
}

export default App;
