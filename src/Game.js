import {useState} from "react";

function Square({value, onSquareClicked, index}) {
    return (<>
        <button onClick={onSquareClicked} className="square" data-testid={`square-${index}`}>
            {value}
        </button>
    </>);
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

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner is " + winner;
    } else {
        status = "Next player is " + player;
    }

    function BoardRow({rowNumber}) {
        return <>
            <div className="board-row" data-testid={'row'+rowNumber}>
                {[0, 1, 2]
                    .map(col => col + (rowNumber * 3))
                    .map(col => <Square key={'column' + col} value={squares[col]} index={col}
                                        onSquareClicked={() => handleClick(col)}/>)
                }
            </div>
        </>
    }

    return (<>
        <div className="status">{status}</div>
        {[0, 1, 2].map(i => <BoardRow key={'row' + i} rowNumber={i}/>)})
    </>);

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
        } else {
            description = "Go to game start";
        }
        return (<li key={'move' + move}>
            <button key={'jump' + move} onClick={() => jumpTo(move)}>{description}</button>
        </li>);
    });

    return (<div className="game" data-testid="game">
        <div className="game-board">
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