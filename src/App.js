import React, { Suspense, lazy } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';

// React.lazy를 사용하여 컴포넌트를 동적으로 임포트합니다.
const Gugudan = lazy(() => import('./components/gugudan/Gugudan'));
const WordRelay = lazy(() => import('./components/wordRelay/WordRelay'));
const NumberBaseball = lazy(() => import('./components/numberBaseBall/NumberBaseball'));
const ResponseCheck = lazy(() => import('./components/responseCheck/ResponseCheck'));
const RSP = lazy(() => import('./components/rock-scissors-paper/RSP'));
const Lotto = lazy(() => import('./components/lotto/Lotto'));
const TicTacToe = lazy(() => import('./components/tictectoe/TicTacToe'));
const MineSearch = lazy(() => import('./components/mineSearch/MineSearch'));

// 라우트 정보를 배열로 관리하여 코드의 중복을 줄이고 관리를 용이하게 합니다.
const gameRoutes = [
  { path: '/gugudan', title: '구구단', component: <Gugudan /> },
  { path: '/wordRelay', title: '끝말잇기', component: <WordRelay /> },
  { path: '/numberBaseBall', title: '숫자야구', component: <NumberBaseball /> },
  { path: '/responseCheck', title: '반응속도체크', component: <ResponseCheck /> },
  { path: '/rock-scissors-paper', title: '가위바위보', component: <RSP /> },
  { path: '/lotto', title: '로또', component: <Lotto /> },
  { path: '/tictectoe', title: '틱택토', component: <TicTacToe /> },
  { path: '/mineSearch', title: '지뢰찾기', component: <MineSearch /> },
];

// 홈 컴포넌트
function Home() {
  return (
    <div className="home-content">
      <h1 className="home-title">React 미니 프로젝트 모음</h1>
      <p className="home-description">
        다양한 React 기반의 미니 게임과 애플리케이션을 경험해보세요!
      </p>
      <Link to="/gugudan" className="home-button">
        프로젝트 둘러보기
      </Link>
    </div>
  );
}

// 로딩 중에 보여줄 Suspense Fallback 컴포넌트
function Loading() {
  return <h2>로딩 중...</h2>;
}

function App() {
  return (
    <div className="app-layout">
      <nav className="app-menu">
        <ul>
          <li>
            <Link to="/" className="App-link">
              Home
            </Link>
          </li>
          {gameRoutes.map((route) => (
            <li key={route.path}>
              <Link to={route.path} className="App-link">
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="app-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {gameRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <>
                    <h1>{route.title}</h1>
                    {route.path === '/gugudan' ? (
                      <div className="gugudan-content">
                        <Gugudan />
                        <Gugudan />
                        <Gugudan />
                      </div>
                    ) : (
                      route.component
                    )}
                  </>
                }
              />
            ))}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
