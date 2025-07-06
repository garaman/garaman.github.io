import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Gugudan from './components/Gugudan';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React123
        </a>
        <br />
        <Link to="/gugudan" className="App-link">
          구구단 페이지로 이동
        </Link>
      </header>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gugudan" element={<Gugudan />} />
    </Routes>
  );
}

export default App;
