import React, { Component } from 'react';
import Board from "../../widgets/Board";
import {Helmet} from "react-helmet";

export default class TicTacToe extends Component {
    render() {
        return (
            <div className="page">
                <Helmet>
                    <title>Tic Tac Toe</title>
                </Helmet>
                <h1>Tic Tac Toe</h1>
                <Board/>
            </div>
        )
    }
}