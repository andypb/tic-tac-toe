import Board from "./Board";
import {useState} from "react";
import calculateWinner from "./calculateWinner";

export default function Game() {

    // All below code will all run when state variables are updated

    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [isXNext, setIsXNext] = useState(true);

    const current = history[history.length - 1];
    const squares = current.squares;
    const winner = calculateWinner(squares);

    let status;
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        status = 'Next player: ' + (isXNext ? 'X' : 'O');
    }

    function handleSquareClick(i) {
        if (winner || squares[i]) { return; }
        const squaresCopy = squares.slice();
        squaresCopy[i] = isXNext ? 'X' : 'O'
        setHistory(history.concat([{squares: squaresCopy}]));
        setIsXNext(!isXNext);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={squares} onSquareClick={handleSquareClick}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}
