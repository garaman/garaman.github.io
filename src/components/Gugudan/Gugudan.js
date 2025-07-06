import React, { useState, useRef } from 'react';
import './Gugudan.css';

function Gugudan() {
  const [first, setFirst] = useState(() => Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(() => Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(first +'x'+second+' = ' + value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      });
    } else {
      setResult('틀렸습니다. 다시 시도하세요.');
      setValue('');
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      });
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="gugudan-container">
      <div className="gugudan-question">
        {first} 곱하기 {second}는?
      </div>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={onChange}
          className="gugudan-input"
          placeholder="정답 입력"
          autoFocus
        />
        <button className="gugudan-button">입력!</button>
      </form>
      <div className="gugudan-result">
        {result ? result : '결과가 여기에 표시됩니다.'}
      </div>
    </div>
  );
}

export default Gugudan;

