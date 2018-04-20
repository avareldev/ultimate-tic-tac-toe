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

    setWinner = (winner, xPos, yPos) => {
        let board = [...this.state.board];
        let hasWinner = false;
        if (board[yPos][xPos] === '' && !this.state.hasWinner) {
            board[yPos][xPos] = winner;
            console.log(board);
            hasWinner = this.matchChecker.checkForWinner();
            this.setState({
                hasWinner: this.matchChecker.checkForWinner(),
                board: board
            })
        }

        if (hasWinner) {
            this.props.setWinner(this.state.currentPlayer);
        }
    }

    updatePlayer = () => {
        let currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
        this.props.updatePlayer(currentPlayer);
        this.setState({
            currentPlayer: currentPlayer
        });
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