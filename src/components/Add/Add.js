import React, { useState } from "react";
import Input from "../Input/Input";

import "./Add.css";
import axios from "../../axios";

const Add = () => {
    const [form, setForm] = useState({
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
    })

    const submitHandler = (event) => {
        event.preventDefault()

        const formData = {
            readOnly: true,
            check: false
        }

        for (let item in form) {
            formData[item] = form[item].value

            const updatedForm = {
                ...form,
            }

            const updatedElement = { ...updatedForm[item] }

            updatedElement.value = ""

            updatedForm[item] = updatedElement

            setForm(updatedForm)
        }

        axios.post('/tasks.json', formData).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const inputChangeHandler = (event, inputElement) => {
        const updatedForm = {
            ...form,
        }

        const updatedElement = { ...updatedForm[inputElement] }

        updatedElement.value = event.target.value

        updatedForm[inputElement] = updatedElement

        setForm(updatedForm)
    }

    const elementsArray = []

    for (let item in form) {
        elementsArray.push({
            id: item,
            config: form[item],
        })
    }

    return (
        <form onSubmit={submitHandler} >
            {elementsArray.map((item) => {
                return (
                    <Input
                        key={item.id}
                        elementType={item.config.elementType}
                        elementConfig={item.config.elementConfig}
                        value={item.config.value}
                        change={(event) => inputChangeHandler(event, item.id)}
                        maxLength="170"
                        minLength="5"
                    />
                )
            })}
        </form>
    )
}

export default Add