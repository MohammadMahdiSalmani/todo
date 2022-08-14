import React from "react";

const Input = (props) => {
    return (
        <input
            {...props.elementConfig}
            value={props.value}
            defaultValue={props.defaultValue}
            onChange={props.change}
            readOnly={props.readOnly}
            className={props.className}
            style={props.style}
            maxLength={props.maxLength}
            minLength={props.minLength}
        />
    )
}

export default Input