import React, { Component } from 'react';

export default class Field extends Component {

    handleClick = () => {
        this.props.setField(this.props.yPos, this.props.xPos);
    }

    render() {
        let className = 'field';
        if (this.props.content) {
            className += ' player-' + this.props.content.toLowerCase();
        }
        return (
            <div className={className} onClick={this.handleClick}>
                {this.props.content}
            </div>
        );
    }
}