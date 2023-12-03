import {useState} from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [toggleSort, setToggleSort] = useState(true);
    const player = currentMove % 2 === 0 ? "X" : "O";
    const currentSquares = history[currentMove];

    function handlePlay(index) {
        if (currentSquares[index]) {
            return;
        }
        const nextSquares = currentSquares.slice();
        nextSquares[index] = player;
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        const nextHistory = [...history.slice(0, nextMove + 1)];
        setHistory(nextHistory);
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

    const {winner, winnerMap} = calculateWinner(currentSquares);

    let moveIndicator = (currentMove >= 9) || winner ? "Game Over" : "You are at move " + (currentMove + 1);

    let status;
    if (winner) {
        status = "Winner is " + winner;
    } else {
        status = moves.length > 9 ? "Draw" : "Next player is " + player;
    }

    return (<div className="game" data-testid="game">
        <div className="game-board">
            <div className="status" data-testid="status">{status}</div>
            <Board winnerMap={winnerMap} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <button onClick={() => {
                setToggleSort(!toggleSort)
            }}>{toggleSort ? 'Sort Descending' : 'Sort Ascending'}</button>
            <ul>{toggleSort ? moves : moves.reverse()}</ul>
            <span data-testid="move-indicator">{moveIndicator}</span>
        </div>
    </div>);
}

function calculateWinner(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            let winnerMap = {};
            lines[i].map(ix => winnerMap[ix] = 'winner-square');
            return {winner: squares[a], winnerMap: winnerMap};
        }
    }
    return {winner: null, winnerMap: {}};
}

function Board({winnerMap, squares, onPlay}) {
    return <>
        {[0, 1, 2].map(row =>
            <BoardRow key={'row' + row} row={row} squares={squares} winnerMap={winnerMap} onSquareClick={onPlay}/>)}
    </>;
}

function BoardRow({row, squares, winnerMap, onSquareClick}) {
    return <>
        <div className="board-row" data-testid={'row' + row}>
            {[0, 1, 2]
                .map(column => column + (row * 3))
                .map(squareIndex => <Square key={'column' + squareIndex} value={squares[squareIndex]}
                                            index={squareIndex}
                                            winnerMap={winnerMap}
                                            onSquareClick={onSquareClick}/>)}
        </div>
    </>
}

function Square({value, onSquareClick, index, winnerMap}) {
    let squareClass = (winnerMap[index] === undefined) ? "square" : winnerMap[index];
    return (<>
        <button onClick={() => onSquareClick(index)} className={squareClass}
                data-testid={`square-${index}`}>
            {value}
        </button>
    </>);
}