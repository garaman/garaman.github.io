import React, { useState, useRef } from 'react';
import './WordRelay.css';

const WordRelay = () => {
  const [word, setWord] = useState('수박');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const inputWord = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (word[word.length - 1] === value[0]) {
      setResult('통과~');
      setWord(value);
      setValue('');
      setScore((prevScore) => prevScore + 10); // 정답일 경우 점수 10점 증가
      inputWord.current.focus();
    } else {
      setResult('틀렸습니다. 다시 시도하세요.');
      setValue('');
      setScore((prevScore) => Math.max(0, prevScore - 5)); // 오답일 경우 점수 5점 감소 (0점 이하로 내려가지 않게)
      inputWord.current.focus();
    }
  };

  return (
    <>
      <div className="wordRelay-container">
        <div className="wordRelay-question">
          <div>{word}</div>
          <form onSubmit={onSubmitForm}>
            <input
              ref={inputWord}
              value={value}
              className="wordRelay-input"
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button className="wordRelay-button">입력!</button>
          </form>
          <div className="wordRelay-result">{result}</div>
          <div className="wordRelay-score">점수: {score}</div>
        </div>
      </div>
    </>
  );
};

export default WordRelay;
