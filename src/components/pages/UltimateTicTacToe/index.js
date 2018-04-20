import React from 'react';
import {Helmet} from "react-helmet";
import {TicTacToe} from "../TicTacToe";
import MatchChecker from "../../../helpers/MatchChecker";

import './UltimateTicTacToe.scss';

export default class UltimateTicTacToe extends React.Component{

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

    setWinner(yPos, xPos) {
        let board = [...this.state.board];
        if (board[yPos][xPos] === '' && !this.state.hasWinner) {
            board[yPos][xPos] = this.state.currentPlayer;
            this.setState({
                hasWinner: this.matchChecker.checkForWinner(),
                board: board
            })
        }
    }

    updatePlayer() {
        console.log(this.state.currentPlayer);
        this.setState({
            currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X'
        })
    }

    render(){
        return(
            <div className="page">
                <Helmet>
                    <title>Game</title>
                </Helmet>
                <h1>ULTIMATE Tic Tac Toe</h1>
                { !this.state.hasWinner ? (
                    <h2>Current Player: {this.state.currentPlayer} </h2>
                ) : (
                    <h2>Winner: {this.state.hasWinner ? (this.state.currentPlayer  === 'X' ? 'O' : 'X') : ''} </h2>
                )}
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
            </div>
        );
    }
}