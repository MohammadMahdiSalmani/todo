import React from "react";

const TaskContent = (props) => {
    return (
        <span
            {...props.elementConfig}
            onInput={props.change}
            className={props.className}
            style={props.style}
            maxLength={props.maxLength}
            minLength={props.minLength}
            contentEditable={props.contentEditable}
            suppressContentEditableWarning={true}
        >{props.children}</span>
    )
}

export default TaskContent