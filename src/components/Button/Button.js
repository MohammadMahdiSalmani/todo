import React from "react";

import "./Button.css"

class Button extends React.Component {
    render() {
        const btnClasses = [`btn ${this.props.btnColor}`]
        return (
            <button style={this.props.style} className={btnClasses} onClick={this.props.controller} disabled={this.props.disabled}>{this.props.children}</button>
        )
    }
}

export default Button