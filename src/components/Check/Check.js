import React from "react";

import "./Check.css"

class Check extends React.Component {
    render() {
        return (
            <input type="checkbox" className="check" onChange={this.props.change} checked={this.props.checked}/>
        )
    }
}

export default Check