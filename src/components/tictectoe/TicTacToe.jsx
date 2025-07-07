import React, { useEffect, useReducer } from 'react';
import Table from './Table';
import './TicTacToe.css';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
  lastPlayer: '', // 마지막으로 수를 둔 플레이어를 저장할 새로운 상태 추가
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  console.log('Reducer action:', action);
  console.log('Reducer state before:', state);
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn; // 현재 턴의 플레이어가 셀에 표시
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
        lastPlayer: state.turn, // 수를 둔 플레이어를 lastPlayer에 저장
        turn: state.turn === 'O' ? 'X' : 'O', // 턴은 다음 플레이어로 변경
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        winner: '',
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
        lastPlayer: '', // 게임 리셋 시 lastPlayer도 초기화
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell, lastPlayer } = state; // lastPlayer 상태 추가

  useEffect(() => {
    console.log('useEffect triggered');
    console.log('recentCell:', recentCell, 'tableData:', tableData, 'turn:', turn, 'lastPlayer:', lastPlayer);

    const [row, cell] = recentCell;

    // 게임 시작 시(-1, -1)에는 승리/무승부 검사를 하지 않음
    if (row < 0) {
      return;
    }

    // 승리 조건 검사
    let win = false;
    // 가로 승리
    if (
      tableData[row][0] === lastPlayer &&
      tableData[row][1] === lastPlayer &&
      tableData[row][2] === lastPlayer
    ) {
      win = true;
    }
    // 세로 승리
    if (
      tableData[0][cell] === lastPlayer &&
      tableData[1][cell] === lastPlayer &&
      tableData[2][cell] === lastPlayer
    ) {
      win = true;
    }
    // 대각선 승리 (왼쪽 상단에서 오른쪽 하단)
    if (
      tableData[0][0] === lastPlayer &&
      tableData[1][1] === lastPlayer &&
      tableData[2][2] === lastPlayer
    ) {
      win = true;
    }
    // 대각선 승리 (오른쪽 상단에서 왼쪽 하단)
    if (
      tableData[0][2] === lastPlayer &&
      tableData[1][1] === lastPlayer &&
      tableData[2][0] === lastPlayer
    ) {
      win = true;
    }

    if (win) {
      // 승리 시
      dispatch({ type: SET_WINNER, winner: lastPlayer }); // lastPlayer를 승자로 설정
      setTimeout(() => {
        dispatch({ type: RESET_GAME });
      }, 2000);
    } else {
      // 승리하지 않았을 경우 무승부 검사
      let allCellsFilled = true; // 모든 칸이 채워졌는지 여부
      tableData.forEach((r) => { // row와 변수 이름 충돌을 피하기 위해 r로 변경
        r.forEach((c) => { // cell과 변수 이름 충돌을 피하기 위해 c로 변경
          if (!c) { // 칸이 비어있으면
            allCellsFilled = false;
          }
        });
      });

      if (allCellsFilled) {
        // 모든 칸이 채워졌고 승자가 없으면 무승부
        dispatch({ type: SET_WINNER, winner: '무승부' }); // 무승부 메시지 설정 (null 대신 '무승부' 문자열 사용)
        setTimeout(() => {
          dispatch({ type: RESET_GAME });
        }, 2000);
      }
    }
  }, [recentCell, tableData, lastPlayer]); // lastPlayer를 의존성 배열에 추가

  return (
    <div className="tictactoe-container">
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div className="tictactoe-winner">{winner === '무승부' ? '무승부입니다!' : `${winner}님의 승리!`}</div>}
    </div>
  );
};

export default TicTacToe;