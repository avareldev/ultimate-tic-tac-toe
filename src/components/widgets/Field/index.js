import React, { Component } from 'react';

export default class Field extends Component {

    handleClick = () => {
        this.props.setField(this.props.yPos, this.props.xPos);
    }

    render() {
        return (
            <div className="field" onClick={this.handleClick}>
                {this.props.content}
            </div>
        );
    }
}