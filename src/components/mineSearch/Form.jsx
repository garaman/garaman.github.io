import React, { useState, useCallback, useContext } from 'react';
import { TableContext, START_GAME } from './MineSearch';

const Form = () => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [dispatch, row, cell, mine]);

  return (
    <div className="mine-search-form">
      <div className="input-group">
        <label htmlFor="row-input">세로:</label>
        <input
          id="row-input"
          type="number"
          value={row}
          onChange={onChangeRow}
        />
      </div>
      <div className="input-group">
        <label htmlFor="cell-input">가로:</label>
        <input
          id="cell-input"
          type="number"
          value={cell}
          onChange={onChangeCell}
        />
      </div>
      <div className="input-group">
        <label htmlFor="mine-input">지뢰:</label>
        <input
          id="mine-input"
          type="number"
          value={mine}
          onChange={onChangeMine}
        />
      </div>
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
};

export default Form;
