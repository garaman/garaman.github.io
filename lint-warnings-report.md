# JSX 파일 린트 경고 분석 및 수정 보고서

## 개요

프로젝트 내의 JSX 파일들을 대상으로 `eslint`를 실행하여 발견된 경고들을 분석하고 수정한 내용입니다.

주요 경고 원인은 React Hooks(`useEffect`, `useCallback`)의 의존성 배열이 잘못 설정된 경우였습니다.

## 파일별 분석 및 수정 내역

### 1. `Lotto.jsx`

- **경고 원인**:
  1.  `useEffect`가 `winNumbers` 상태에 의존하지만, 의존성 배열에 명시되지 않았습니다.
  2.  `useCallback`이 실제로는 사용하지 않는 `winNumbers`를 의존성 배열에 포함하고 있었습니다.
- **수정 내용**:
  - `useEffect`의 의존성 배열에 `winNumbers`를 추가했습니다.
  - `useCallback`의 의존성 배열에서 불필요한 `winNumbers`를 제거했습니다.

### 2. `mineSearch/Form.jsx`

- **경고 원인**:
  - `useCallback`이 `dispatch` 함수에 의존하지만, 의존성 배열에 명시되지 않았습니다.
- **수정 내용**:
  - `useCallback`의 의존성 배열에 `dispatch`를 추가했습니다.

### 3. `mineSearch/Td.jsx`

- **경고 원인**:
  1.  `useMemo`를 `import`했지만 사용하지 않았습니다.
  2.  `useCallback`이 `tableData`, `dispatch`, `rowIndex`, `cellIndex`에 의존하지만, 의존성 배열에 명시되지 않았습니다.
  3.  의존성 배열에 `tableData[rowIndex][cellIndex]`와 같은 복잡한 표현식을 사용했습니다.
- **수정 내용**:
  - 불필요한 `useMemo` `import`를 제거했습니다.
  - `useCallback`의 의존성 배열에 필요한 의존성을 모두 추가했습니다.
  - 복잡한 표현식을 간단한 변수로 추출하여 의존성 배열을 단순화했습니다.

### 4. `numberBaseBall/NumberBaseball.jsx`

- **경고 원인**:
  - `useCallback`이 `tries.length`에 의존하지만, 의존성 배열에 명시되지 않았습니다.
- **수정 내용**:
  - `useCallback`의 의존성 배열에 `tries.length`를 추가했습니다.

### 5. `rock-scissors-paper/RSP.jsx`

- **경고 원인**:
  - `useEffect`가 `changeHand` 함수에 의존하지만, 의존성 배열에 명시되지 않았습니다.
- **수정 내용**:
  - `changeHand` 함수를 `useCallback`으로 감싸고, `useEffect`의 의존성 배열에 `changeHand`를 추가했습니다.

### 6. `tictectoe/Td.jsx`

- **경고 원인**:
  - `useCallback`이 `dispatch`, `rowIndex`, `cellIndex`에 의존하지만, 의존성 배열에 명시되지 않았습니다.
- **수정 내용**:
  - `useCallback`의 의존성 배열에 필요한 의존성을 모두 추가했습니다.

### 7. `tictectoe/TicTacToe.jsx`

- **경고 원인**:
  - `useEffect`가 `tableData`와 `turn` 상태에 의존하지만, 의존성 배열에 명시되지 않았습니다.
- **수정 내용**:
  - `useEffect`의 의존성 배열에 `tableData`와 `turn`을 추가했습니다.

## 결론

모든 경고를 수정하여 코드의 안정성과 예측 가능성을 높였습니다. 이제 `eslint`를 실행해도 경고가 발생하지 않습니다.
