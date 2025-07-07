import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(`Td clicked: row=${rowIndex}, cell=${cellIndex}, cellData=${cellData}`);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData, dispatch, rowIndex, cellIndex]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
