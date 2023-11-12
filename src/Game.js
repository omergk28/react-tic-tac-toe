import {useState} from "react";

function Square({value, onSquareClicked}) {
  return (
      <>
        <button onClick={onSquareClicked} className="square">
            {value}
        </button>
      </>
  );
}

function Board({player, squares, onPlay}) {
    function handleClick(index) {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[index] = player;
        onPlay(newSquares);
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner is " + winner;
    }
    else {
        status = "Next player is " + player;
    }

    function getRow(i) {
        const rows = [0,1,2]
            .map(r=> r+(i*3))
            .map(r=> <Square value={squares[r]} onSquareClicked={() => handleClick(r)}/>);
        return rows;
    }

  return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
            {getRow(1)}
        </div>
        <div className="board-row">
            {getRow(2)}
        </div>
        <div className="board-row">
            {getRow(3)}
        </div>
      </>
  );
}


export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const player = currentMove % 2 === 0 ? "X" : "O";
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        if (nextMove === 0) {
            setHistory([Array(9).fill(null)]);
        }
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move # " + move;
        }
        else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board player={player} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i=0; i< lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}