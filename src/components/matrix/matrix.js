import { useState } from 'react'
import './matrix.css'

function Square({value, onClick})
{

    return (
        <div>
            <button
                className="square"
                onClick={onClick}
            >
                {value}
            </button>
        </div>
    )
}


export default function Matrix()
{

    
    const [turn, setTurn] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null))
    
    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++)
        {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            {
                return squares[a];
            }
        }
        return null;
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner)
    {
        status = "Winner : " + winner;
    }
    else
    {
        status = "Next player : " + (turn ? "X" : "O");    
    }


    function handleClick(i)
    {
        if (squares[i] || calculateWinner(squares))
        {
            return;
        }

        setTurn(prevTurn => !prevTurn)
        const newSquares = squares.slice();
        newSquares[i] = turn ? "X" : "O";
        setSquares(newSquares);
    }

    function resetGame()
    {
        const newSquares = Array(9).fill(null);
        setSquares(newSquares);
        setTurn(true);
    }
    function changeStart()
    {
        setTurn(prevTurn => !prevTurn)
    }


    return (
        <div className='tic-tac-toe'>
            <div className='status'>
                {status}
            </div>
            <div className='matrix'>
                <div className='matrix-row'>
                    <Square 
                    value  = {squares[0]}
                    onClick={() => handleClick(0) }
                    />
                    <Square 
                    value  = {squares[1]}
                    onClick={() => handleClick(1) }
                    />
                    <Square 
                    value  = {squares[2]}
                    onClick={() => handleClick(2) }
                    />
                </div>
                <div className='matrix-row'>
                    <Square 
                    value  = {squares[3]}
                    onClick={() => handleClick(3) }
                    />
                    <Square 
                    value  = {squares[4]}
                    onClick={() => handleClick(4) }
                    />
                    <Square 
                    value  = {squares[5]}
                    onClick={() => handleClick(5) }
                    />
                </div>
                <div className='matrix-row'>
                    <Square 
                    value  = {squares[6]}
                    onClick={() => handleClick(6) }
                    />
                    <Square 
                    value  = {squares[7]}
                    onClick={() => handleClick(7) }
                    />
                    <Square 
                    value  = {squares[8]}
                    onClick={() => handleClick(8) }
                    />
                </div>
            </div>
            <div className='changes'>
                <button
                    className='reset-button'
                    onClick={resetGame}
                >
                    Reset
                </button>
                <button
                    className='change-start'
                    onClick={changeStart}
                >
                    Start with {turn ? "O":"X"}
                </button>
            </div>
        </div>
    )

    
}