import React from "react";
import Input from "../Input/Input";
import axios from "../../axios";

import "./Add.css";

class Add extends React.Component {
    state = {
        form: {
            task: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Add a new Task",
                },
                value: "",
                readOnly: true,
                check: false,
            },
        }
    }

    submitHandler = (event) => {
        event.preventDefault()

        const formData = {
            readOnly: true,
            check: false
        }

        for (let item in this.state.form) {
            formData[item] = this.state.form[item].value

            const updatedForm = {
                ...this.state.form,
            }

            const updatedElement = { ...updatedForm[item] }

            updatedElement.value = ""

            updatedForm[item] = updatedElement

            this.setState({ form: updatedForm })
        }

        axios.post('/tasks.json', formData).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    inputChangeHandler = (event, inputElement) => {
        const updatedForm = {
            ...this.state.form,
        }

        const updatedElement = { ...updatedForm[inputElement] }

        updatedElement.value = event.target.value

        updatedForm[inputElement] = updatedElement

        this.setState({ form: updatedForm })
    }

    render() {
        const elementsArray = []

        for (let item in this.state.form) {
            elementsArray.push({
                id: item,
                config: this.state.form[item],
            })
        }

        return (
            <form onSubmit={this.submitHandler} >
                {elementsArray.map((item) => {
                    return (
                        <Input
                            key={item.id}
                            elementType={item.config.elementType}
                            elementConfig={item.config.elementConfig}
                            value={item.config.value}
                            change={(event) => this.inputChangeHandler(event, item.id)}
                            maxLength="170"
                            minLength="5"
                        />
                    )
                })}
            </form>
        )
    }
}

export default Add