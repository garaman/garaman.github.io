import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Gugudan from './components/gugudan/Gugudan';

// Home 컴포넌트: App-logo만 중앙정렬로 표시
function Home() {
  return (
    <div className="home-content">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

function App() {
  return (
    <div className="app-layout">
      <nav className="app-menu">
        <ul>
          <li>
            <Link to="/" className="App-link">Home</Link>
          </li>
          <li>
            <Link to="/gugudan" className="App-link">구구단</Link>
          </li>
        </ul>
      </nav>
      <main className="app-content">
        <Routes>
          <Route path="*" element={<Home />} /> {/* 404일 때 홈으로 이동 */}
          <Route path="/" element={<Home />} />
          <Route path="/gugudan" element={
            <>
            <h1>구구단 게임</h1>
              <div className="gugudan-content">              
                <Gugudan />
                <Gugudan />
                <Gugudan />
              </div>
            </>
            }
          />          
        </Routes>
      </main>
    </div>
  );
}

export default App;
