### `App.js` 리팩토링 기법 학습 가이드: 코드 분할과 동적 라우팅

이 문서는 `App.js` 파일을 리팩토링하며 적용된 두 가지 핵심적인 모던 React 개발 기법을 설명합니다.

1.  **코드 분할 (Code Splitting)과 지연 로딩 (Lazy Loading)**
2.  **데이터 기반 렌더링 (Data-Driven Rendering)**

이 기법들을 이해하면 더 빠르고, 더 효율적이며, 유지보수가 쉬운 애플리케이션을 만들 수 있습니다.

---

#### 1. 코드 분할과 `React.lazy`, `Suspense`

##### 🧐 무엇인가요? (What)

**코드 분할**은 거대한 하나의 자바스크립트 파일(번들)을 여러 개의 작은 파일(청크, chunk)로 나누는 기술입니다. **`React.lazy`**는 이 코드 분할을 React 컴포넌트에 적용할 수 있게 해주는 기능으로, 컴포넌트가 실제로 렌더링되어야 할 시점에 해당 컴포넌트의 코드를 동적으로 불러옵니다. 이를 **지연 로딩(Lazy Loading)**이라고 합니다.

**`Suspense`**는 이렇게 지연 로딩되는 컴포넌트가 준비될 때까지 사용자에게 보여줄 대체 UI(예: 로딩 스피너)를 지정하는 역할을 합니다.

##### 🤔 왜 사용해야 하나요? (Why)

- **초기 로딩 성능 향상**: 사용자가 앱에 처음 접속했을 때, 당장 필요하지 않은 모든 게임 컴포넌트의 코드를 한 번에 불러올 필요가 없습니다. `React.lazy`를 사용하면 초기에는 `App.js`와 `Home` 컴포넌트 등 필수적인 코드만 불러오고, 사용자가 특정 게임 링크를 클릭했을 때 해당 게임의 코드만 다운로드합니다. 이로 인해 초기 페이지 로딩 속도가 크게 향상됩니다.
- **사용자 경험 개선**: `Suspense`를 통해 컴포넌트가 로딩되는 동안 사용자에게 "로딩 중..."과 같은 메시지를 보여줄 수 있어, 사용자가 아무것도 없는 흰 화면을 보며 기다리는 경험을 방지할 수 있습니다.

##### 💻 어떻게 사용하나요? (How)

**적용 전 (Before):** 모든 컴포넌트를 파일 상단에서 정적으로 `import` 합니다.

```javascript
import Gugudan from './components/gugudan/Gugudan';
import WordRelay from './components/wordRelay/WordRelay';
// ... 모든 게임 컴포넌트 import
```

**적용 후 (After):** `React.lazy`와 동적 `import()` 구문을 사용합니다.

```javascript
import React, { Suspense, lazy } from 'react';

// 1. React.lazy로 컴포넌트를 감싸 동적으로 임포트합니다.
const Gugudan = lazy(() => import('./components/gugudan/Gugudan'));
const WordRelay = lazy(() => import('./components/wordRelay/WordRelay'));
// ...

function App() {
  return (
    <div>
      {/* ... 네비게이션 ... */}
      <main>
        {/* 2. Suspense로 라우트 전체를 감싸고, fallback UI를 지정합니다. */}
        <Suspense fallback={<h2>로딩 중...</h2>}>
          <Routes>{/* ... 라우트 설정 ... */}</Routes>
        </Suspense>
      </main>
    </div>
  );
}
```

---

#### 2. 데이터 기반 렌더링 (Data-Driven Rendering)

##### 🧐 무엇인가요? (What)

**데이터 기반 렌더링**은 UI의 구조와 내용을 하드코딩하는 대신, 배열이나 객체 같은 데이터 구조를 기반으로 동적으로 UI를 생성하는 프로그래밍 패턴입니다. "Don't Repeat Yourself" (DRY) 원칙을 따르는 좋은 방법입니다.

##### 🤔 왜 사용해야 하나요? (Why)

- **유지보수성 향상**: 새로운 게임을 추가하거나 기존 게임을 제거할 때, 여러 곳의 코드를 수정할 필요가 없습니다. `gameRoutes`라는 배열의 한 줄만 추가하거나 제거하면 네비게이션 메뉴와 페이지 라우트가 자동으로 업데이트됩니다. 이는 실수를 줄이고 개발 속도를 높여줍니다.
- **가독성 및 간결성**: 반복적인 JSX 코드가 사라지고, UI의 구조가 데이터에 의해 명확하게 정의되므로 코드를 읽고 이해하기가 훨씬 쉬워집니다.
- **확장성**: 나중에 각 라우트에 아이콘이나 추가 설명 같은 새로운 속성을 추가하고 싶을 때, 데이터 구조에 새로운 필드를 추가하고 렌더링 로직만 살짝 수정하면 되므로 확장이 매우 용이합니다.

##### 💻 어떻게 사용하나요? (How)

**적용 전 (Before):** 네비게이션 링크와 라우트를 각각 수동으로 하드코딩합니다.

```javascript
// 네비게이션 메뉴
<ul>
  <li><Link to="/gugudan">구구단</Link></li>
  <li><Link to="/wordRelay">끝말잇기</Link></li>
  {/* ... */}
</ul>

// 라우트 설정
<Routes>
  <Route path="/gugudan" element={<Gugudan />} />
  <Route path="/wordRelay" element={<WordRelay />} />
  {/* ... */}
</Routes>
```

**적용 후 (After):** 라우트 정보를 배열 데이터로 정의하고, `map()` 함수를 사용해 동적으로 렌더링합니다.

```javascript
// 1. 라우트 정보를 배열 데이터로 정의합니다.
const gameRoutes = [
  { path: '/gugudan', title: '구구단', component: <Gugudan /> },
  { path: '/wordRelay', title: '끝말잇기', component: <WordRelay /> },
  // ...
];

function App() {
  return (
    <div className="app-layout">
      <nav className="app-menu">
        <ul>
          {/* 2. 배열을 map()으로 순회하며 네비게이션 메뉴를 생성합니다. */}
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
        <Routes>
          {/* 3. 배열을 map()으로 순회하며 라우트를 생성합니다. */}
          {gameRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </main>
    </div>
  );
}
```
