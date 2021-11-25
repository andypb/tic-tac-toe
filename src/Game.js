import Board from "./Board";
import {useState} from "react";
import calculateWinner from "./calculateWinner";

export default function Game() {

    // All below code will all run when state variables are updated

    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [isXNext, setIsXNext] = useState(true);
    const [selectedMove, setSelectedMove] = useState(0);

    const current = history[selectedMove];
    let squares = current.squares;
    const winner = calculateWinner(squares);

    let status;
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        if (!squares.includes(null)) { status = 'Game over, no-one won' }
        else { status = 'Next player: ' + (isXNext ? 'X' : 'O'); }
    }

    const moves = history.map((historyStep, moveNum) => {
       const desc = moveNum > 0 ? `Go to move # ${moveNum}` : 'Go to game start';
       return (
        <li key={moveNum}>
           <button onClick={() => jumpToMove(moveNum)}>{desc}</button>
        </li>
       );
    });

    function handleSquareClick(i) {
        if (winner || squares[i]) { return; }
        const squaresCopy = squares.slice();
        squaresCopy[i] = isXNext ? 'X' : 'O';
        const historyCopy = getUpdatedHistory(selectedMove);
        setSelectedMove(historyCopy.length);
        setHistory(historyCopy.concat([{squares: squaresCopy}]));
        setIsXNext(!isXNext);
    }

    /**
     * if moveNum < (history.length - 1) then history will be truncated to the moveNum+1 size,
     * so that the new move (square has been clicked) resets the game from that position
     * */
    function getUpdatedHistory(moveNum) {
        return history.slice(0, moveNum + 1);
    }

    function jumpToMove(moveNum) {
        setSelectedMove(moveNum);
        setIsXNext(moveNum % 2 === 0);
        if (moveNum === 0) { setHistory(getUpdatedHistory(moveNum)); } // reset history
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={squares} onSquareClick={handleSquareClick}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
