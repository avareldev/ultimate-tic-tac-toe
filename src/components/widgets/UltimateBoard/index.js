import React from 'react';
import Board from "../Board";
import MatchChecker from "../../../helpers/MatchChecker";

import './UltimateBoard.scss';

export default class UltimateBoard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            hasWinner: false,
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            currentPlayer: 'X'
        };

        this.matchChecker = new MatchChecker(this.state.board);
    }

    setWinner = (yPos, xPos) => {
        let board = [...this.state.board];
        if (board[yPos][xPos] === '' && !this.state.hasWinner) {
            board[yPos][xPos] = this.state.currentPlayer;
            this.setState({
                hasWinner: this.matchChecker.checkForWinner(),
                board: board
            })
        }
    }

    updatePlayer = () => {
        this.setState({
            currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
        })
    }

    render(){
        return(
            <div className="board-row">
                {
                    this.state.board.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex}>
                                {row.map((field, index) => {
                                    return (<Board key={index} yPos={rowIndex} xPos={index} updatePlayer={this.updatePlayer} setWinner={this.setWinner} />)
                                })}
                            </div>)
                    })
                }
            </div>
        );
    }
}