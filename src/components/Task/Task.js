import React from "react";

import "./Task.css"

class Task extends React.Component {
    render() {
        return (
            <li style={this.props.style}>{this.props.children}</li>
        )
    }
}

export default Task