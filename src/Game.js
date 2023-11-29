import {useState} from "react";

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
        } else {
            description = "Go to game start";
        }
        return (<li key={'move' + move}>
            <button key={'jump' + move} onClick={() => jumpTo(move)}>{description}</button>
        </li>);
    });

    return (<div className="game" data-testid="game">
        <div className="game-board">
            <div className="status" data-testid="status">{calculateStatus(currentSquares, player, moves)}</div>
            <Board player={player} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <ol>{moves}</ol>
        </div>
    </div>);
}

function calculateWinner(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Board({player, squares, onPlay}) {
    function handleClick(index) {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[index] = player;
        onPlay(newSquares);
    }

    return <>
        {[0, 1, 2].map(i => <BoardRow key={'row' + i} row={i} squares={squares}
                                      onSquareClick={handleClick}/>)}
    </>;
}

function calculateStatus(squares, nextPlayer, moves) {
    const winner = calculateWinner(squares);
    if (winner) {
        return "Winner is " + winner;
    } else {
        return moves.length > 9 ? "Draw" : "Next player is " + nextPlayer;
    }
}

function BoardRow({row, squares, onSquareClick}) {
    return <>
        <div className="board-row" data-testid={'row' + row}>
            {[0, 1, 2]
                .map(column => column + (row * 3))
                .map(squareIndex => <Square key={'column' + squareIndex} value={squares[squareIndex]}
                                            index={squareIndex}
                                            onSquareClick={() => onSquareClick(squareIndex)}/>)}
        </div>
    </>
}

function Square({value, onSquareClick, index}) {
    return (<>
        <button onClick={onSquareClick} className="square" data-testid={`square-${index}`}>
            {value}
        </button>
    </>);
}