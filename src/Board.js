import calculateWinner from "./calculateWinner";
import Square from "./Square";
import {useRef, useState} from "react";

export default function Board() {

    const [squareVals, setSquareVals] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = useRef(null);

    const  status = setStatus(winner.current);

    function setStatus(winnerVal) {
        if (winnerVal) {
            return 'Winner: ' + winnerVal
        } else {
            return 'Next player: ' + (isXNext ? 'X' : 'O');
        }
    }

    function handleSquareClick(i) {
        if (winner.current || squareVals[i]) { return; }
        const squareValsCopy = squareVals.slice();
        isXNext ? squareValsCopy[i] = 'X' : squareValsCopy[i] = 'O'
        setSquareVals(squareValsCopy);
        winner.current = calculateWinner(squareValsCopy);
        setIsXNext(!isXNext);
    }

    function renderSquare(i) {
        return <Square value={squareVals[i]} onClick={() => handleSquareClick(i)}/>;
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
