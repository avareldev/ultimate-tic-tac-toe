import React, { Component } from 'react';
import Board from "../../widgets/Board";
import {Helmet} from "react-helmet";

import './TicTacToe.scss';

export default class TicTacToe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            currentPlayer: 'X'
        }
    }

    updatePlayer = (player) => {
        this.setState({
            currentPlayer: player
        })
    }

    setWinner = (winner) => {
        this.setState({
            winner: winner
        })
    }

    restart = () => {
        this.state = {
            winner: null,
            currentPlayer: 'X'
        }
    }

    render() {
        return (
            <div className="page">
                <Helmet>
                    <title>Tic Tac Toe</title>
                </Helmet>
                <h1>Tic Tac Toe</h1>
                { !this.state.winner ? (
                    <h2>Current Player: {this.state.currentPlayer} </h2>
                ) : (
                    <h2>Winner: {this.state.winner} </h2>
                )}
                <Board updatePlayer={this.updatePlayer} setWinner={this.setWinner} />
            </div>
        )
    }
}