### React Hooks 학습 가이드: `useEffect`와 `useCallback` 올바르게 사용하기

이 문서는 React Hooks, 특히 `useEffect`와 `useCallback` 사용 시 발생하는 `exhaustive-deps` 경고의 원인을 이해하고, 이를 해결하기 위한 핵심 개념을 설명합니다.

#### 1. React Hooks의 핵심: 클로저(Closure)와 의존성 배열(Dependency Array)

React 함수형 컴포넌트는 렌더링될 때마다 함수 내부의 모든 것이 (변수, 함수 등) 새로 생성됩니다. 이때 Hooks는 이전 렌더링의 상태(state)를 기억하기 위해 **클로저**라는 자바스크립트 개념을 활용합니다.

- **클로저**: 함수가 선언될 당시의 외부 환경(스코프)을 기억하는 것입니다. `useEffect`나 `useCallback` 내부의 함수는 선언될 때의 state나 props를 "기억"합니다.

이것이 바로 **의존성 배열**이 필요한 이유입니다. 의존성 배열은 React에게 "이 Hook은 여기에 명시된 값들에 의존하고 있으니, 이 값들 중 하나라도 변경되면 Hook 내부의 함수를 다시 생성해줘"라고 알려주는 역할을 합니다.

만약 의존성 배열을 제대로 명시하지 않으면, 함수는 오래된(stale) state나 props를 기억하게 되어 예기치 않은 버그를 유발합니다.

#### 2. `useEffect`: 사이드 이펙트(Side Effect) 관리하기

`useEffect`는 컴포넌트 렌더링 이후에 발생하는 부수 효과(예: API 요청, DOM 조작, 구독 등)를 관리하는 Hook입니다.

##### 의존성 배열의 역할

- **`[]` (빈 배열)**: 컴포넌트가 **최초 렌더링될 때 한 번만** 실행됩니다. (`componentDidMount`와 유사)

  ```jsx
  useEffect(() => {
    // 최초에 한 번만 실행할 API 요청 등
    fetchInitialData();
  }, []); // 빈 배열이므로 다시 실행되지 않음
  ```

- **`[dep1, dep2, ...]` (의존성 명시)**: 최초 렌더링 시 실행되고, 이후 **배열 안의 의존성 중 하나라도 변경될 때마다** 다시 실행됩니다. (`componentDidUpdate`와 유사)

  ```jsx
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    // userId가 변경될 때마다 해당 유저의 정보를 가져옴
    fetchUserData(userId);
  }, [userId]); // userId에 의존
  ```

- **배열 생략**: **매 렌더링마다** 실행됩니다. 무한 루프를 유발할 수 있어 매우 위험하므로 특별한 경우가 아니면 사용하지 않습니다.
  ```jsx
  // 잘못된 예시: 무한 루프 발생!
  useEffect(() => {
    // 이 코드는 매 렌더링마다 실행되어 state를 변경하고,
    // state 변경은 다시 렌더링을 유발합니다.
    setCount((prevCount) => prevCount + 1);
  });
  ```

#### 3. `useCallback`: 함수 재사용과 성능 최적화

`useCallback`은 함수를 **메모이제이션(memoization)**하여, 의존성이 변경되지 않는 한 함수가 재생성되는 것을 방지합니다. 이는 자식 컴포넌트에 함수를 `props`로 전달할 때 성능을 최적화하는 데 매우 중요합니다.

##### 왜 필요할까?

자바스크립트에서 함수는 객체이므로, 컴포넌트가 렌더링될 때마다 내부에 선언된 함수는 새로운 참조값을 갖는 "새로운" 함수가 됩니다. 이 함수를 자식 컴포넌트에 `props`로 전달하면, 자식 컴포넌트는 `props`가 변경되었다고 인식하여 불필요한 리렌더링을 유발할 수 있습니다.

##### 활용 예시

`React.memo`와 함께 사용하여 자식 컴포넌트의 불필요한 리렌더링을 방지합니다.

```jsx
// 자식 컴포넌트
const ChildComponent = React.memo(({ onClick }) => {
  console.log('자식 컴포넌트가 렌더링되었습니다.');
  return <button onClick={onClick}>클릭</button>;
});

// 부모 컴포넌트
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // useCallback을 사용하지 않은 경우:
  // ParentComponent가 렌더링될 때마다 새로운 handleClick 함수가 생성됨
  // const handleClick = () => {
  //   console.log('버튼 클릭됨');
  // };

  // useCallback을 사용한 경우:
  // 의존성 배열이 비어있으므로, 최초 렌더링 시 생성된 함수를 계속 재사용함
  const handleClick = useCallback(() => {
    console.log('버튼 클릭됨');
  }, []); // 의존성 없음

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
};
```

위 예시에서 `useCallback`을 사용하면 `ParentComponent`의 `count` 상태가 변경되어도 `handleClick` 함수는 재생성되지 않습니다. 따라서 `ChildComponent`는 불필요한 리렌더링을 하지 않습니다.

#### 4. 핵심 규칙: `eslint-plugin-react-hooks/exhaustive-deps`

이 ESLint 규칙은 Hooks의 의존성 배열을 자동으로 검사하여, 누락된 의존성을 경고로 알려줍니다.

> **규칙: Hook 내부에서 사용되는 모든 외부 값(props, state, context 등)은 의존성 배열에 포함되어야 한다.**

이 경고를 무시하면 오래된 클로저 문제로 인해 버그가 발생할 수 있습니다. 경고가 나타나면 무시하지 말고, 왜 이 의존성이 필요한지 이해하고 배열에 추가하는 것이 중요합니다.
